-- ============================================================================
-- RoboPhysics Laboratory — schema
-- Eseguire nel SQL Editor di Supabase, oppure: npm run db:setup
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------- people --
-- role_group pilota il raggruppamento della pagina /people (Principal
-- Investigator, Researchers & Postdocs, PhD Students, Students, Visitors,
-- Alumni). Le intestazioni e il loro ordine stanno in src/lib/site.ts.
create table if not exists public.people (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  role        text not null,
  role_group  text not null check (role_group in ('pi', 'researchers', 'phd', 'students', 'visitors', 'alumni')),
  bio         text not null default '',
  photo_url   text,
  photo_label text not null default 'Portrait photo',
  profile_url text,
  sort_order  integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ----------------------------------------------------------------- papers --
-- Una riga alimenta tre viste: la card in /research, la voce in
-- /publications e la pagina di approfondimento /research/[slug].
--   facts:    [{ "value": "900 kPa/m", "label": "pressure generated" }]
--   sections: blocchi del corpo, nell'ordine di lettura:
--     { "type": "heading",   "text": "..." }
--     { "type": "paragraph", "text": "..." }
--     { "type": "media",     "label": "...", "caption": "...",
--                            "url": "/papers/x.jpg", "width": 0, "height": 0 }
--     { "type": "video",     "youtube_id": "...", "label": "...", "caption": "..." }
--   Nei blocchi media, "url" assente lascia il segnaposto del wireframe.
create table if not exists public.papers (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  title          text not null,
  journal        text not null,
  year           integer not null,
  authors_short  text not null default '',
  authors_full   text not null default '',
  citation       text not null default '',
  summary        text not null default '',
  abstract       text not null default '',
  external_url   text,
  external_label text not null default 'Read publication',
  extra_url      text,
  extra_label    text,
  media_label    text not null default 'Image',
  media_url      text,
  media_width    integer,
  media_height   integer,
  facts          jsonb not null default '[]'::jsonb,
  sections       jsonb not null default '[]'::jsonb,
  sort_order     integer not null default 0,
  published      boolean not null default true,
  created_at     timestamptz not null default now()
);

-- --------------------------------------------------------- research_lines --
create table if not exists public.research_lines (
  id          uuid primary key default gen_random_uuid(),
  number      text not null,
  title       text not null,
  description text not null default '',
  sort_order  integer not null default 0,
  published   boolean not null default true
);

-- ------------------------------------------------------------------- news --
--   gallery: foto in coda all'articolo, oltre all'apertura. Vuota su quasi
--            tutte le news; serve ai racconti con un reportage dietro.
--            [{ "url": "/news/x.jpg", "label": "Photo — ..." }]
create table if not exists public.news (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  category     text not null default 'News',
  excerpt      text not null default '',
  body         text not null default '',
  image_url    text,
  image_label  text not null default 'Photo',
  gallery      jsonb not null default '[]'::jsonb,
  source_url   text,
  source_label text,
  published_at timestamptz not null default now(),
  published    boolean not null default true
);

-- ------------------------------------------------------------- migrazioni --
-- `create table if not exists` non tocca una tabella che esiste già: quello
-- che è cambiato dopo il primo rilascio va riapplicato qui sotto.

-- role_group ora accetta anche 'visitors' e 'alumni'.
alter table public.people drop constraint if exists people_role_group_check;
alter table public.people add constraint people_role_group_check
  check (role_group in ('pi', 'researchers', 'phd', 'students', 'visitors', 'alumni'));

-- news: galleria di foto e link al post di origine.
alter table public.news add column if not exists gallery      jsonb not null default '[]'::jsonb;
alter table public.news add column if not exists source_url   text;
alter table public.news add column if not exists source_label text;

-- ----------------------------------------------------------------- videos --
create table if not exists public.videos (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  youtube_id  text,
  category    text not null default 'Research',
  date_label  text not null default '',
  description text not null default '',
  thumb_label text not null default 'YouTube video',
  sort_order  integer not null default 0,
  published   boolean not null default true
);

-- ------------------------------------------------------- contact_messages --
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  affiliation text,
  topic       text not null default 'general',
  message     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists people_group_idx  on public.people (published, role_group, sort_order);
create index if not exists papers_order_idx   on public.papers (published, sort_order);
create index if not exists news_date_idx      on public.news (published, published_at desc);
create index if not exists videos_order_idx   on public.videos (published, sort_order);

-- ============================================================================
-- Row Level Security
--
-- Il sito legge con la chiave anon, che è pubblica: finisce nel bundle del
-- browser. Sono queste policy — non la segretezza della chiave — a decidere
-- cosa quella chiave può fare.
--   people/papers/research_lines/news/videos : sola lettura dei pubblicati
--   contact_messages                         : solo insert, nessuna lettura
--                                              (si leggono dalla dashboard)
-- ============================================================================

alter table public.people           enable row level security;
alter table public.papers           enable row level security;
alter table public.research_lines   enable row level security;
alter table public.news             enable row level security;
alter table public.videos           enable row level security;
alter table public.contact_messages enable row level security;

do $$
declare
  t text;
begin
  foreach t in array array['people', 'papers', 'research_lines', 'news', 'videos']
  loop
    execute format('drop policy if exists "public read %1$s" on public.%1$I', t);
    execute format(
      'create policy "public read %1$s" on public.%1$I for select to anon, authenticated using (published = true)',
      t
    );
  end loop;
end $$;

drop policy if exists "public insert contact_messages" on public.contact_messages;
create policy "public insert contact_messages"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);
