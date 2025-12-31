export default function NewsletterSection() {
  return (
    <section
      id="newsletter"
      style={{
        marginTop: 44,
        padding: 24,
        borderRadius: 28,
        border: "1px solid rgba(255,255,255,0.18)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>NEWSLETTER</div>
      <h2 style={{ fontSize: 28, margin: "10px 0 8px" }}>Seguici</h2>
      <p style={{ fontSize: 16, opacity: 0.85, maxWidth: 720, margin: 0 }}>
        Iscriviti per ricevere una volta al mese notizie, iniziative, campagne e
        appuntamenti su Genova.
      </p>

      <div style={{ marginTop: 16 }}>
        {/* TODO: qui incolleremo l'embed Brevo */}
        <div
          style={{
            padding: 16,
            borderRadius: 18,
            border: "1px dashed rgba(255,255,255,0.25)",
            opacity: 0.9,
          }}
        >
          Qui inseriamo il form Brevo.
        </div>
      </div>
    </section>
  );
}
