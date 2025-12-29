import FeaturedSection, {
  type FeaturedItem,
} from "./components/FeaturedSection";
import ParticipateSection from "./sections/participate/ParticipateSection.server";

async function getFeatured(): Promise<FeaturedItem[]> {
  const query = `
    query {
      allFeatureds(orderBy: priority_ASC, first: 3) {
        label
        title
        excerpt
        priority
        link
      }
    }
  `;

  const res = await fetch(
    "https://graphql.datocms.com/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      // caching “buono” su Next (1 min)
      next: { revalidate: 60 },
    } as any
  );

  const json: any = await res.json();

  if (!res.ok || json?.errors) {
    console.error("DatoCMS error:", json?.errors);
    return [];
  }

  return (json?.data?.allFeatureds as FeaturedItem[]) ?? [];
}

export default async function Home() {
  const featured = await getFeatured();

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px" }}>
      {/* HERO */}
      <header style={{ padding: "72px 0 40px" }}>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Sinistra Italiana · Genova
        </div>

        <h1
          style={{
            fontSize: 56,
            lineHeight: 1.05,
            margin: "12px 0 16px",
          }}
        >
          Genova merita di più.
        </h1>

        <p style={{ fontSize: 18, maxWidth: 720 }}>
          Diritti, territorio, lavoro. Una politica utile, concreta,
          partecipata.
        </p>
      </header>

      {/* IN EVIDENZA (da DatoCMS + hover/tap expand) */}
      <FeaturedSection items={featured} />
           
      <ParticipateSection />

    </main>
  );
}

