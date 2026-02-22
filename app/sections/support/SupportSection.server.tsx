import SupportSectionClient from "./SupportSection.client";
import { SUPPORT_OPTIONS_QUERY, SUPPORT_SECTION_QUERY } from "./support.query";
import type { SupportSectionData } from "./types";

async function getSupportData(): Promise<SupportSectionData | null> {
  const sectionRes = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query: SUPPORT_SECTION_QUERY }),
    next: { revalidate: 60 },
  } as any);

  const sectionJson = await sectionRes.json();

  if (!sectionRes.ok || sectionJson.errors) {
    console.error("DatoCMS Support section error:", sectionJson.errors);
    return null;
  }

  const section = sectionJson?.data?.supportSection ?? null;

  const enabled = section?.enabled ?? true;
  const maxItems = section?.maxItems ?? null;
  const first = Number.isFinite(maxItems) && maxItems > 0 ? maxItems : null;

  const optionsRes = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: SUPPORT_OPTIONS_QUERY,
      variables: { first },
    }),
    next: { revalidate: 60 },
  } as any);

  const optionsJson = await optionsRes.json();

  if (!optionsRes.ok || optionsJson.errors) {
    console.error("DatoCMS Support options error:", optionsJson.errors);
    return null;
  }

  const allOptions = (optionsJson?.data?.allSupportOptions ?? []) as any[];

  const options = allOptions.filter((o) => o?.isEnabled !== false);

  return {
    enabled,
    title: section?.title ?? "Sostienici",
    intro:
      section?.intro ??
      "Il nostro lavoro sul territorio vive di tempo, competenze e sostegno concreto.",
    maxItems,
    options: options.map((o) => ({
      id: o.id,
      priority: o.priority ?? 999,
      title: o.title,
      excerpt: o.excerpt ?? null,
      body: o.body ?? null,
      link: o.link ?? null,
      ctaLabel: o.ctaLabel ?? null,
      image: o.image ?? null,
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
