export default function FeaturedSectionServer() {
  return (
    <section style={{ marginTop: 26 }}>
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
        <article
          style={{
            minHeight: 180,
            padding: 28,
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>CAMPAGNA</div>
          <h3 style={{ fontSize: 30, margin: "12px 0" }}>Primaria</h3>
          <p style={{ maxWidth: 560, opacity: 0.85 }}>
            Placeholder: qui ricolleghiamo DatoCMS.
          </p>
        </article>

        <div style={{ display: "grid", gap: 20 }}>
          <article
            style={{
              minHeight: 80,
              padding: 20,
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <strong>Secondaria</strong>
          </article>

          <article
            style={{
              minHeight: 80,
              padding: 20,
              borderRadius: 22,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <strong>Terziaria</strong>
          </article>
        </div>
      </div>
    </section>
  );
}
