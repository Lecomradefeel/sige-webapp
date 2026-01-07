import FeaturedSectionClient from "./FeaturedSection.client";
import type { FeaturedItem } from "./types";

const featuredItems: FeaturedItem[] = [
  {
    id: "primaria",
    label: "CAMPAGNA",
    title: "Primaria",
    preview:
      "Un percorso aperto per costruire la prossima agenda condivisa: ascolto, territorio e proposte.",
    href: "/campagna/primaria",
    image: {
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
      alt: "Persone che lavorano insieme",
    },
  },
  {
    id: "secondaria",
    label: "FOCUS",
    title: "Secondaria",
    preview:
      "Azioni concrete su scuola, mobilità e servizi di prossimità: cosa stiamo facendo oggi.",
    href: "/focus/secondaria",
    image: {
      url: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=900&q=80",
      alt: "Lavoro di squadra",
    },
  },
  {
    id: "terziaria",
    label: "APPUNTI",
    title: "Terziaria",
    preview:
      "Gli ultimi aggiornamenti dal gruppo di lavoro con priorità e prossime tappe.",
    href: "/appunti/terziaria",
    image: {
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
      alt: "Persone al computer",
    },
  },
];

export default function FeaturedSectionServer() {
  const [main, ...side] = featuredItems;

  if (!main) return null;

  return (
    <FeaturedSectionClient
      title="In evidenza"
      subtitle="Le priorità politiche di questo momento"
      mainItem={main}
      sideItems={side}
    />
  );
}
