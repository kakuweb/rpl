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
  address: "Politecnico di Bari — Via Edoardo Orabona 4, 70125 Bari, Italy",
  spinoff: { name: "OmniGrasp", url: "https://omnigrasp.com" },
} as const;

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
