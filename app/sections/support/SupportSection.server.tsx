import SupportSectionClient from "./SupportSection.client";
import { SUPPORT_QUERY } from "./support.query";
import type { SupportSectionData } from "./types";

async function getSupportData(): Promise<SupportSectionData | null> {
  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query: SUPPORT_QUERY }),
    next: { revalidate: 60 },
  } as any);

  const json = await res.json();

  if (!res.ok || json.errors) {
    console.error("DatoCMS Support error:", json.errors);
    return null;
  }

  const section = json?.data?.supportSection ?? null;
  const allOptions = (json?.data?.allSupportOptions ?? []) as any[];

  // Se il singleton non esiste ancora, non rompiamo la home
  const enabled = section?.enabled ?? true;

  const options = allOptions
    .filter((o) => o?.enabled !== false)
    .sort((a, b) => (a?.priority ?? 999) - (b?.priority ?? 999));

  const maxItems = section?.maxItems ?? null;
  const sliced = Number.isFinite(maxItems) && maxItems > 0 ? options.slice(0, maxItems) : options;

  return {
    enabled,
    title: section?.title ?? "Sostienici",
    intro:
      section?.intro ??
      "Il nostro lavoro sul territorio vive di tempo, competenze e sostegno concreto.",
    maxItems,
    options: sliced.map((o) => ({
      id: o.id,
      enabled: o.enabled !== false,
      priority: o.priority ?? 999,
      label: o.label ?? null,
      title: o.title,
      excerpt: o.excerpt ?? null,
      body: o.body ?? null,
      link: o.link ?? null,
      ctaLabel: o.ctaLabel ?? null,
    })),
  };
}

export default async function SupportSection() {
  const data = await getSupportData();

  // feature-flag CMS + fallback robusto
  if (!data?.enabled) return null;

  // Se non ci sono opzioni, nascondi sezione (evita “vuoti”)
  if (!data.options.length) return null;

  return <SupportSectionClient data={data} />;
}
