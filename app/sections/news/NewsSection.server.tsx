import NewsSectionClient from "./NewsSection.client";
import { NEWS_QUERY } from "./news.query";
import type { NewsItem } from "./types";

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query: NEWS_QUERY }),
    next: { revalidate: 60 },
  } as any);

  const json = await res.json();

  if (!res.ok || json.errors) {
    console.error("DatoCMS News error:", json.errors);
    return [];
  }

  const rawNews = json?.data?.allNotizias ?? [];

  return rawNews.map((n: any) => ({
    id: n.id,
    title: n.title,
    excerpt: n.excerpt ?? null,
    body: n.body ?? null,
    publishedAt: n._firstPublishedAt ?? null,
    image: n.image ? { url: n.image.url, alt: n.image.alt } : null,
  }));
}

export default async function NewsSection() {
  const news = await getNews();

  if (!news.length) return null;

  return <NewsSectionClient news={news} />;
}
