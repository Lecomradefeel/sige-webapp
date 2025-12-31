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
  startsAt: e.startsAt,        // ← camelCase
  ctaLabel: e.ctaLabel ?? null,
  image: e.image
    ? { url: e.image.url, alt: e.image.alt }
    : null,
  location: e.location
    ? { latitude: e.location.latitude, longitude: e.location.longitude }
    : null,
}));

}

export default async function ParticipateSection() {
  const envEnabled = (process.env.EVENTS_ENABLED ?? "true").toLowerCase() === "true";

  // DEBUG: se non compare nemmeno questo box, il problema è page.tsx (import/JSX)
  if (!envEnabled) {
    return (
      <section style={{ marginTop: 40, padding: 16, border: "1px solid #f00", borderRadius: 16 }}>
        <strong>DEBUG Participate</strong>
        <div style={{ opacity: 0.8 }}>EVENTS_ENABLED=false → sezione disabilitata</div>
      </section>
    );
  }

  const events = await getEvents();

  // DEBUG: mostra quanti eventi arrivano
  if (!events.length) {
    return (
      <section style={{ marginTop: 40, padding: 16, border: "1px solid #f90", borderRadius: 16 }}>
        <strong>DEBUG Participate</strong>
        <div style={{ opacity: 0.8 }}>EVENTS_ENABLED=true</div>
        <div style={{ opacity: 0.8 }}>Eventi da DatoCMS: 0</div>
        <div style={{ opacity: 0.8 }}>
          Se vedi questo box, l’import in page.tsx è OK: il problema è la query/filtro o i dati.
        </div>
      </section>
    );
  }

  return <ParticipateSectionClient events={events} />;
}

