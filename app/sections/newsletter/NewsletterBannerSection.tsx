export default function NewsletterBanner() {
  return (
    <section
      style={{
        marginTop: 26,
        padding: 20,
        borderRadius: 22,
        border: "1px solid var(--glass-border)",
        background: "var(--glass-bg-strong)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "var(--glass-shadow-soft)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>NEWSLETTER</div>
        <div style={{ fontSize: 18, fontWeight: 900 }}>
          Ricevi notizie e iniziative una volta al mese
        </div>
        <div style={{ fontSize: 14, opacity: 0.75 }}>
          Aggiornamenti locali, eventi, campagne e dossier.
        </div>
      </div>

      <a
        href="#newsletter"
        className="primary-cta"
        style={{ whiteSpace: "nowrap" }}
      >
        Iscriviti
      </a>
    </section>
  );
}
