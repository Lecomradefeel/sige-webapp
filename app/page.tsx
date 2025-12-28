type FeaturedItem = {
  label?: string | null;
  title: string;
  excerpt?: string | null;
  priority: number;
  link?: string | null; // <-- link è una stringa nel tuo schema
};

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
      cache: "no-store",
    } as any
  );

  const json: any = await res.json();

  if (!res.ok || json?.errors) {
    console.error("DatoCMS error:", json?.errors);
    return [];
  }

  return (json?.data?.allFeatureds as FeaturedItem[]) ?? [];
}

function SafeText({ children }: { children?: string | null }) {
  return <>{children ?? ""}</>;
}

export default async function Home() {
  const featured = await getFeatured();

  const main = featured.find((f) => f.priority === 1) ?? featured[0];
  const secondary = featured.filter((f) => f !== main).slice(0, 2);

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

      {/* IN EVIDENZA */}
      <section>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 28, margin: 0 }}>In evidenza</h2>
          <div style={{ fontSize: 14, opacity: 0.7 }}>
            Le priorità politiche di questo momento
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 20,
          }}
        >
          {/* CARD PRINCIPALE */}
          <article
            style={{
              padding: 28,
              borderRadius: 28,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              <SafeText>{main?.label ?? "CAMPAGNA"}</SafeText>
            </div>

            <h3 style={{ fontSize: 30, margin: "12px 0" }}>
              <SafeText>{main?.title ?? "Nessun contenuto trovato"}</SafeText>
            </h3>

            <p style={{ maxWidth: 560 }}>
              <SafeText>{main?.excerpt ?? ""}</SafeText>
            </p>

            {main?.link ? (
              <div style={{ marginTop: 14 }}>
                <a
                  href={main.link}
                  style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: 14,
                    background: "#fff",
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                >
                  Apri
                </a>
              </div>
            ) : null}
          </article>

          {/* CARD SECONDARIE */}
          <div style={{ display: "grid", gap: 20 }}>
            {secondary.map((item) => (
              <article
                key={item.priority}
                style={{
                  padding: 20,
                  borderRadius: 22,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.6 }}>
                  <SafeText>{item.label ?? "IN EVIDENZA"}</SafeText>
                </div>

                <strong>
                  <SafeText>{item.title}</SafeText>
                </strong>

                {item.excerpt ? (
                  <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
                    <SafeText>{item.excerpt}</SafeText>
                  </div>
                ) : null}

                {item.link ? (
                  <div style={{ marginTop: 10 }}>
                    <a
                      href={item.link}
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: 800,
                        opacity: 0.9,
                      }}
                    >
                      Apri →
                    </a>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
