import ParticipateSectionClient from "./ParticipateSection.client";
import { PARTICIPATE_QUERY } from "./participate.query";
import type { EventItem, EventsSettings } from "./types";

type Payload = {
  settings: EventsSettings | null;
  events: EventItem[];
};

async function getPayload(): Promise<Payload> {
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
    return { settings: null, events: [] };
  }

  const rawSettings = json?.data?.eventsSettings ?? null;
  const rawEvents = json?.data?.allEvents ?? [];

  const settings: EventsSettings | null = rawSettings
    ? { enabled: !!rawSettings.enabled }
    : null;

  const events: EventItem[] = rawEvents.map((e: any) => ({
    id: e.id,
    title: e.title,
    excerpt: e.excerpt ?? null,
    body: e.body ?? null,
    startsAt: e.starts_at,
    ctaLabel: e.cta_label ?? null,
    image: e.image ? { url: e.image.url, alt: e.image.alt } : null,
    location: e.location
      ? { latitude: e.location.latitude, longitude: e.location.longitude }
      : null,
  }));

  return { settings, events };
}

export default async function ParticipateSection() {
  // Feature flag “hard” via env (Vercel)
  const envEnabled = (process.env.EVENTS_ENABLED ?? "true").toLowerCase() === "true";
  if (!envEnabled) return null;

  const { settings, events } = await getPayload();

  // Feature flag “soft” via CMS (se manca record settings, default = true)
  const cmsEnabled = settings?.enabled ?? true;
  if (!cmsEnabled) return null;

  if (!events.length) return null;

  return <ParticipateSectionClient events={events} />;
}
