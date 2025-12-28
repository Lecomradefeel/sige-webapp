export default function Home() {
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
              border: "1px solid rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>CAMPAGNA</div>
            <h3 style={{ fontSize: 30, margin: "12px 0" }}>
              Trasporto pubblico: più corse, meno attese
            </h3>
            <p style={{ maxWidth: 560 }}>
              Frequenze insufficienti, quartieri isolati, diritto alla mobilità
              negato. La nostra proposta per Genova.
            </p>
          </article>

          {/* CARD SECONDARIE */}
          <div style={{ display: "grid", gap: 20 }}>
            <article
              style={{
                padding: 20,
                borderRadius: 22,
                border: "1px solid rgba(0,0,0,0.15)",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.6 }}>EVENTO</div>
              <strong>Assemblea pubblica · Centro Ovest</strong>
              <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
                Mercoledì 8 · ore 18:30
              </div>
            </article>

            <article
              style={{
                padding: 20,
                borderRadius: 22,
                border: "1px solid rgba(0,0,0,0.15)",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.6 }}>DOSSIER</div>
              <strong>Case popolari e manutenzione</strong>
              <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
                Dati, problemi, proposte
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
