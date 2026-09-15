export type RoleGroup =
  | "pi"
  | "researchers"
  | "phd"
  | "students"
  | "visitors"
  | "alumni";

export type Person = {
  id: string;
  slug: string;
  name: string;
  role: string;
  role_group: RoleGroup;
  bio: string;
  photo_url: string | null;
  photo_label: string;
  /** Pagina istituzionale o profilo pubblico, se la persona ne ha uno. */
  profile_url: string | null;
  sort_order: number;
  published: boolean;
};

export type PaperFact = {
  value: string;
  label: string;
};

/**
 * Blocchi del corpo di un approfondimento, nell'ordine in cui vanno resi.
 * In `media`, `url` assente significa che l'immagine non c'è ancora: al suo
 * posto resta il segnaposto a righe del wireframe.
 */
export type PaperSection =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "media";
      label: string;
      caption: string;
      url?: string | null;
      width?: number;
      height?: number;
    }
  | { type: "video"; youtube_id: string; label: string; caption: string };

export type Paper = {
  id: string;
  slug: string;
  title: string;
  journal: string;
  year: number;
  authors_short: string;
  authors_full: string;
  citation: string;
  summary: string;
  abstract: string;
  external_url: string | null;
  external_label: string;
  extra_url: string | null;
  extra_label: string | null;
  /** Anteprima usata dalla card in /research e dalla voce in /publications. */
  media_label: string;
  media_url: string | null;
  media_width: number | null;
  media_height: number | null;
  facts: PaperFact[];
  sections: PaperSection[];
  sort_order: number;
  published: boolean;
};

export type ResearchLine = {
  id: string;
  number: string;
  title: string;
  description: string;
  sort_order: number;
  published: boolean;
};

/** Foto della galleria di un articolo di news. */
export type NewsImage = {
  url: string;
  label: string;
};

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  body: string;
  /** Apertura dell'articolo e anteprima della card. */
  image_url: string | null;
  image_label: string;
  /**
   * Foto in coda all'articolo, oltre all'apertura. Vuota su quasi tutte le
   * news: serve ai racconti che hanno un reportage dietro, non un'immagine
   * sola.
   */
  gallery: NewsImage[];
  /** Post o pagina da cui viene il racconto, se esiste. */
  source_url: string | null;
  source_label: string | null;
  published_at: string;
  published: boolean;
};

export type Video = {
  id: string;
  slug: string;
  title: string;
  youtube_id: string | null;
  category: string;
  date_label: string;
  description: string;
  thumb_label: string;
  sort_order: number;
  published: boolean;
};

export type ContactTopic = "general" | "thesis" | "industry" | "press";

export type ContactMessageInput = {
  name: string;
  email: string;
  affiliation: string | null;
  topic: ContactTopic;
  message: string;
};
