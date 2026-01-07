"use client";

import { useState } from "react";

import NewsletterSection from "./NewsletterSection";

export default function NewsletterBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 16,
            background: "#fff",
            color: "#000",
            fontWeight: 900,
            border: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Iscriviti
        </button>
      </section>
      {isModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Iscrizione newsletter"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 50,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              width: "min(720px, 100%)",
              maxHeight: "90vh",
              overflow: "auto",
              borderRadius: 24,
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.18)",
              padding: 24,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: 18,
                  cursor: "pointer",
                }}
                aria-label="Chiudi"
              >
                ✕
              </button>
            </div>
            <NewsletterSection />
          </div>
        </div>
      ) : null}
    </>
  );
}
