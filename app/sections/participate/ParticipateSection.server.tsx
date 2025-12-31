import ParticipateSectionClient from "./ParticipateSection.client";
import { PARTICIPATE_QUERY } from "./participate.query";
import type { EventItem } from "./types";

async function getEvents(): Promise<EventItem[]> {
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
    return [];
  }

  const rawEvents = json?.data?.allEvents ?? [];

  return rawEvents.map((e: any) => ({
    id: e.id,
    title: e.title,
    excerpt: e.excerpt ?? null,
    body: e.body ?? null,
    startsAt: e.startsAt,              // ✅ camelCase
    ctaLabel: e.ctaLabel ?? null,      // ✅ camelCase
    image: e.image ? { url: e.image.url, alt: e.image.alt } : null,
    location: e.location
      ? { latitude: e.location.latitude, longitude: e.location.longitude }
      : null,
  }));
}

export default async function ParticipateSection() {
  const envEnabled = (process.env.EVENTS_ENABLED ?? "true").toLowerCase() === "true";
  if (!envEnabled) return null;

  const events = await getEvents();
  if (!events.length) return null;

  return <ParticipateSectionClient events={events} />;
}
