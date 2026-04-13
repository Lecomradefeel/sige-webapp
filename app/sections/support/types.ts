export type SupportOption = {
  id: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  ctaLabel?: string | null;
  priority?: number | null;
  link?: { url: string } | null;
  image?: { url: string; alt?: string | null } | null;
};

export type SupportSectionData = {
  enabled: boolean;
  title?: string | null;
  intro?: string | null;
  maxItems?: number | null;
  options: SupportOption[];
};
