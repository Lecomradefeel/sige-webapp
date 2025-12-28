import ParticipateSectionClient from "./ParticipateSection.client";
import { PARTICIPATE_QUERY } from "./participate.query";
import type { ParticipateSectionData } from "./types";

async function getParticipateSection(): Promise<ParticipateSectionData | null> {
  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query: PARTICIPATE_QUERY }),
    next: { revalidate: 60 },
  } as any);

  const json = await res.json();

  if (!res.ok || json.errors) {
    console.error("DatoCMS Participate error:", json.errors);
    return null;
  }

  const section = json?.data?.allCtaSections?.[0];
  if (!section) return null;

  return {
    title: section.title,
    subtitle: section.subtitle,
    cards: section.items ?? [],
  };
}

export default async function ParticipateSection() {
  const data = await getParticipateSection();
  if (!data) return null;

  return (
    <ParticipateSectionClient
      title={data.title}
      subtitle={data.subtitle}
      cards={data.cards}
    />
  );
}
