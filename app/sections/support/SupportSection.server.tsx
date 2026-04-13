import SupportSectionClient from "./SupportSection.client";
import { SUPPORT_QUERY } from "./support.query";
import type { SupportOption, SupportSectionData } from "./types";

type SupportOptionDTO = {
  id?: string;
  title?: string;
  excerpt?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  priority?: number | null;
  link?: { url?: string | null } | null;
  image?: { url?: string | null; alt?: string | null } | null;
};

type SupportSectionDTO = {
  enabled?: boolean;
  title?: string | null;
  intro?: string | null;
  maxItems?: number | null;
  options?: SupportOptionDTO[];
};

type SupportQueryResponse = {
  data?: {
    supportSection?: SupportSectionDTO | null;
    allSupportOptions?: SupportOptionDTO[];
  };
  errors?: unknown;
};

function normalizeOption(raw: SupportOptionDTO): SupportOption | null {
  if (!raw.id || !raw.title) return null;

  return {
    id: raw.id,
    title: raw.title,
    excerpt: raw.excerpt ?? null,
    body: raw.body ?? null,
    ctaLabel: raw.ctaLabel ?? null,
    priority: raw.priority ?? null,
    link: raw.link?.url ? { url: raw.link.url } : null,
    image: raw.image?.url
      ? {
          url: raw.image.url,
          alt: raw.image.alt ?? null,
        }
      : null,
  };
}

async function getSupportData(): Promise<SupportSectionData | null> {
  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query: SUPPORT_QUERY }),
    next: { revalidate: 60 },
  });

  const json = (await res.json()) as SupportQueryResponse;

  if (!res.ok || json.errors) {
    console.error("DatoCMS Support error:", json.errors);
    return null;
  }

  const section = json.data?.supportSection ?? null;
  const sectionOptions = section?.options ?? [];
  const allOptions = json.data?.allSupportOptions ?? [];

  const enabled = section?.enabled ?? true;
  const baseOptions = sectionOptions.length ? sectionOptions : allOptions;

  const options = baseOptions
    .map(normalizeOption)
    .filter((o): o is SupportOption => Boolean(o))
    .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  const maxItems = section?.maxItems ?? null;
  const sliced = Number.isFinite(maxItems) && maxItems > 0 ? options.slice(0, maxItems) : options;

  return {
    enabled,
    title: section?.title ?? "Sostienici",
    intro:
      section?.intro ??
      "Il nostro lavoro sul territorio vive di tempo, competenze e sostegno concreto.",
    maxItems,
    options: sliced,
  };
}

export default async function SupportSection() {
  const data = await getSupportData();

  if (!data?.enabled) return null;
  if (!data.options.length) return null;

  return <SupportSectionClient data={data} />;
}
