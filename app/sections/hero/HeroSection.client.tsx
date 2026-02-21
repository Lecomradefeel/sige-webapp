"use client";

import { useState } from "react";
import GlassButton from "@/app/components/ui/GlassButton";
import Modal from "@/app/components/ui/Modal";

type Props = {
  eventsEnabled: boolean;
  newsletterUrl: string;
};

export default function HeroSectionClient({ eventsEnabled, newsletterUrl }: Props) {
  const [openNewsletter, setOpenNewsletter] = useState(false);

  const handlePartecipa = () => {
    if (!eventsEnabled) return;
    const el = document.getElementById("partecipa");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section>
      <header style={{ padding: "72px 0 40px" }}>
        <div style={{ fontSize: 14, opacity: 0.78 }}>Sinistra Italiana · Genova</div>

        <h1
          style={{
            fontSize: 56,
            lineHeight: 1.05,
            margin: "12px 0 16px",
            letterSpacing: -0.6,
          }}
        >
          Genova merita di più.
        </h1>

        <p style={{ fontSize: 18, maxWidth: 760, opacity: 0.92 }}>
          Diritti, territorio, lavoro. Una politica utile, concreta, partecipata.
        </p>

        <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* TESSERATI */}
          <a href="/tesserati" style={{ textDecoration: "none" }}>
            <GlassButton style={{ background: "rgba(255,255,255,0.16)" }}>
              Tesserati
            </GlassButton>
          </a>

          {/* PARTECIPA (solo se enabled) */}
          {eventsEnabled ? <GlassButton onClick={handlePartecipa}>Partecipa</GlassButton> : null}

          {/* SEGUICI */}
          <GlassButton
            onClick={() => setOpenNewsletter(true)}
            style={{
              borderColor: "rgba(255,255,255,0.22)",
              background: "rgba(0,0,0,0.16)",
            }}
          >
            Seguici
          </GlassButton>
        </div>

        <div style={{ marginTop: 14, fontSize: 13, opacity: 0.75 }}>
          {eventsEnabled
            ? "Eventi e notizie aggiornati ogni mese. Iscriviti per non perderti nulla."
            : "Notizie e iniziative aggiornate ogni mese. Iscriviti per non perderti nulla."}
        </div>
      </header>

      <Modal
        open={openNewsletter}
        onClose={() => setOpenNewsletter(false)}
        title="Iscriviti alla newsletter"
      >
        <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 10 }}>
          Una mail al mese. Niente spam. Solo iniziative e aggiornamenti locali.
        </div>

        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <iframe
            title="Newsletter Brevo"
            src={newsletterUrl}
            style={{ width: "100%", height: 640, border: 0 }}
          />
        </div>
      </Modal>
    </section>
  );
}
