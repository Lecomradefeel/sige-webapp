export default function FeaturedSectionServer() {
  return (
    <section
      style={{
        marginTop: 26,
        padding: 24,
        borderRadius: 24,
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "var(--glass-shadow)",
      }}
    >
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
            border: "1px solid var(--glass-border)",
            background: "var(--glass-bg-strong)",
            boxShadow: "var(--glass-shadow-soft)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
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
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
              boxShadow: "var(--glass-shadow-soft)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <strong>Secondaria</strong>
          </article>

          <article
            style={{
              minHeight: 80,
              padding: 20,
              borderRadius: 22,
              border: "1px solid var(--glass-border)",
              background: "var(--glass-bg)",
              boxShadow: "var(--glass-shadow-soft)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          >
            <strong>Terziaria</strong>
          </article>
        </div>
      </div>
    </section>
  );
}
