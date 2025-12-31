type HeroProps = {
  eventsEnabled: boolean;
};

export default function Hero({ eventsEnabled }: HeroProps) {
  return (
    <header style={{ padding: "72px 0 40px" }}>
      <div style={{ fontSize: 14, opacity: 0.7 }}>Sinistra Italiana · Genova</div>

      <h1 style={{ fontSize: 56, lineHeight: 1.05, margin: "12px 0 16px" }}>
        Genova merita di più.
      </h1>

      <p style={{ fontSize: 18, maxWidth: 720 }}>
        Diritti, territorio, lavoro. Una politica utile, concreta, partecipata.
      </p>

      <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
        <a
          href="/tesserati"
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 16,
            background: "#fff",
            color: "#000",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Tesserati
        </a>

        {eventsEnabled ? (
          <a
            href="#partecipa"
            style={{
              display: "inline-block",
              padding: "12px 16px",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.25)",
              color: "#fff",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Partecipa
          </a>
        ) : null}

        <a
          href="#newsletter"
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          Seguici
        </a>
      </div>
    </header>
  );
}
