"use client";

import { useState } from "react";
import CTA from "@/app/components/ui/CTA";
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

  const handleSeguici = () => {
    const el = document.getElementById("newsletter");
    if (el) {
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setOpenNewsletter(true);
  };

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px" }}>
      <header style={{ padding: "72px 0 40px" }}>
        <div style={{ fontSize: 14, opacity: 0.78 }}>Sinistra Italiana · Genova</div>

        <div
          className="heroLayout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 32,
            alignItems: "end",
            marginTop: 12,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontSize: 56,
                lineHeight: 1.05,
                margin: "0 0 16px",
                letterSpacing: -0.6,
              }}
            >
              Genova merita di più.
            </h1>

            <p style={{ fontSize: 18, maxWidth: 760, opacity: 0.92 }}>
              Diritti, territorio, lavoro. Una politica utile, concreta, partecipata.
            </p>
          </div>

          <div
            className="heroCtas"
            style={{ display: "grid", gap: 12, justifyItems: "start" }}
          >
            <CTA href="/tesserati" style={{ background: "rgba(255,255,255,0.16)" }}>
              Tesserati
            </CTA>

            <CTA onClick={handlePartecipa} disabled={!eventsEnabled}>
              Partecipa
            </CTA>

            <CTA
              onClick={handleSeguici}
              variant="ghost"
              style={{ borderColor: "rgba(255,255,255,0.22)" }}
            >
              Seguici
            </CTA>
          </div>
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

      <style>{`
        @media (max-width: 880px) {
          .heroLayout {
            grid-template-columns: 1fr !important;
          }

          .heroCtas {
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            justify-items: stretch !important;
          }
        }
      `}</style>
    </main>
  );
}
