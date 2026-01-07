export default function NewsSection() {
  return (
    <section id="notizie" style={{ marginTop: 32 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>Notizie</h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Aggiornamenti dal territorio e dalle campagne.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        <article
          style={{
            minHeight: 140,
            padding: 20,
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>IN EVIDENZA</div>
          <h3 style={{ margin: "8px 0 12px" }}>Notizia principale</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Placeholder: qui colleghiamo la sezione Notizie.
          </p>
        </article>

        <article
          style={{
            minHeight: 140,
            padding: 20,
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>AGGIORNAMENTO</div>
          <h3 style={{ margin: "8px 0 12px" }}>Titolo notizia</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Placeholder: aggiungere headline e summary.
          </p>
        </article>
      </div>
    </section>
  );
}
