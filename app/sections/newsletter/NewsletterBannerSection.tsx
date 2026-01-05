export default function NewsletterBanner() {
  return (
    <section
      style={{
        marginTop: 26,
        padding: 20,
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.18)",
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
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
        style={{
          display: "inline-block",
          padding: "12px 16px",
          borderRadius: 16,
          background: "#fff",
          color: "#000",
          fontWeight: 900,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Iscriviti
      </a>
    </section>
  );
}
