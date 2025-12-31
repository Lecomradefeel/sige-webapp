export type SupportOption = {
  id: string;
  enabled: boolean;
  priority: number;
  label?: string | null;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  link?: string | null;
  ctaLabel?: string | null;
};

export type SupportSectionData = {
  enabled: boolean;
  title?: string | null;
  intro?: string | null;
  maxItems?: number | null;
  options: SupportOption[];
};
