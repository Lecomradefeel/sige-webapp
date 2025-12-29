export type GeoPoint = {
  latitude: number;
  longitude: number;
};

export type EventItem = {
  id: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  startsAt: string; // ISO
  location?: GeoPoint | null;
  ctaLabel?: string | null;
  image?: { url: string; alt?: string | null } | null;
};

export type EventsSettings = {
  enabled: boolean;
};
