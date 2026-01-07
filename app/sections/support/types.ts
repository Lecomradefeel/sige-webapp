export type SupportOption = {
  id: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  cta_label?: string | null;
  priority?: number | null;
  is_enabled?: boolean | null;
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
