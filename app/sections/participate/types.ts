export type ParticipateCard = {
  order: number;
  kicker?: string | null;
  title: string;
  description?: string | null;
  link?: string | null;
  variant?: "default" | "primary" | null;
};

export type ParticipateSectionData = {
  title: string;
  subtitle?: string | null;
  cards: ParticipateCard[];
};