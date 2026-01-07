"use client";

export default function NewsletterSection() {
  const brevoUrl = process.env.NEXT_PUBLIC_BREVO_NEWSLETTER_URL;

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
        {brevoUrl ? (
          <iframe
            title="Iscrizione newsletter Brevo"
            src={brevoUrl}
            style={{
              width: "100%",
              minHeight: 320,
              border: "none",
              borderRadius: 18,
              background: "rgba(255,255,255,0.02)",
            }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              padding: 16,
              borderRadius: 18,
              border: "1px dashed rgba(255,255,255,0.25)",
              opacity: 0.9,
            }}
          >
            Configura NEXT_PUBLIC_BREVO_NEWSLETTER_URL per mostrare il form
            Brevo.
          </div>
        )}
      </div>
    </section>
  );
}
