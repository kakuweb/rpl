/**
 * Sottopercorso in cui il sito è pubblicato, vuoto quando sta alla radice
 * (robophysics.poliba.it). È la stessa variabile, NEXT_PUBLIC_BASE_PATH, che
 * next.config.ts usa per `basePath`, così non possono divergere.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Percorso di un file di public/, con il prefisso davanti.
 *
 * Serve perché con `images.unoptimized` Next NON applica il basePath agli
 * `src` di next/image: i link di navigazione lo prendono, le immagini no.
 * Senza questo, con un sottopercorso sarebbero tutte 404.
 * Gli indirizzi assoluti (le miniature YouTube) restano intatti.
 */
export const asset = (path: string) =>
  path.startsWith("/") ? `${basePath}${path}` : path;

/**
 * Dati del sito che non vivono nel database: identità, navigazione, contatti.
 */
export const site = {
  name: "RoboPhysics Laboratory",
  shortName: "RPL",
  institution: "Politecnico di Bari",
  title: "RoboPhysics Laboratory — Politecnico di Bari",
  claim: "“We use robots to hack the laws of physics”",
  description:
    "We study physical intelligence to build soft robots, artificial muscles and wearable devices designed to work alongside people. RoboPhysics Laboratory, Politecnico di Bari.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "vito.cacucciolo@poliba.it",
  department: "Department of Mechanics, Mathematics and Management (DMMM)",
  address: "Politecnico di Bari — Viale Japigia 188, 70126 Bari, Italy",
  /**
   * Coordinate del laboratorio, usate per il pin della mappa e per le
   * indicazioni stradali. Sono più affidabili di una ricerca testuale, che
   * su un viale lungo può cadere sul civico sbagliato.
   */
  coords: { lat: 41.1126074, lng: 16.9008456 },
  spinoff: { name: "OmniGrasp", url: "https://omnigrasp.com" },
} as const;

/**
 * Profili social del laboratorio, nell'ordine in cui compaiono nel footer.
 * Per LinkedIn serve l'indirizzo pubblico della pagina azienda: quello che
 * finisce in /admin/dashboard/ è la vista di amministrazione e a chi non
 * gestisce il profilo restituisce un errore.
 */
export const social = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/robophysicslab_rpl/",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/107037469/",
  },
] as const;

/**
 * URL assoluto di una pagina, per sitemap.xml e robots.txt.
 *
 * Non usa `new URL(path, site.url)`: un percorso che inizia con "/" sostituisce
 * l'intero percorso della base, quindi con il sito servito da un sottopercorso
 * (…/rpl) il prefisso spariva e la sitemap elencava indirizzi inesistenti.
 * I canonical non ne soffrono: quelli li risolve Next con metadataBase.
 */
export const pageUrl = (path: string) => {
  const base = site.url.replace(/\/+$/, "");
  return path === "/" ? `${base}/` : `${base}${path}`;
};

export const navigation = [
  { href: "/people", label: "People" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/videos", label: "Videos" },
  { href: "/news", label: "News" },
  { href: "/contacts", label: "Contacts" },
] as const;

/** Intestazioni dei gruppi in /people, nell'ordine di visualizzazione. */
export const roleGroups = [
  { key: "pi", label: "Principal Investigator" },
  { key: "researchers", label: "Researchers & Postdocs" },
  { key: "phd", label: "PhD Students" },
  { key: "students", label: "Students" },
  { key: "visitors", label: "Visitors" },
  { key: "alumni", label: "Alumni" },
] as const;

export const formatNewsDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(
    new Date(value),
  );

export const formatFullDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
