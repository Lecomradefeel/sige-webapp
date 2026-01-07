export type NewsItem = {
  id: string;
  title: string;
  excerpt?: string | null;
  body?: string | null;
  publishedAt?: string | null;
  image?: { url: string; alt?: string | null } | null;
};
