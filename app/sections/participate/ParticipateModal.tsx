"use client";

import Modal from "@/app/components/ui/Modal";
import type { EventItem } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  event: EventItem | null;
};

export default function ParticipateModal({ open, onClose, event }: Props) {
  return (
    <Modal open={open} onClose={onClose} title={event?.title ?? "Partecipa"}>
      {!event ? null : (
        <div style={{ display: "grid", gap: 14 }}>
          {event.image?.url ? (
            <img
              src={event.image.url}
              alt={event.image.alt ?? event.title}
              style={{
                width: "100%",
                borderRadius: 16,
                objectFit: "cover",
                maxHeight: 260,
              }}
            />
          ) : null}

          {/* preview breve */}
          {event.excerpt ? (
            <div style={{ fontSize: 15, opacity: 0.9 }}>{event.excerpt}</div>
          ) : null}

          {/* testo lungo (opzionale) */}
          {event.body ? (
            <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.5 }}>
              {event.body}
            </div>
          ) : null}

          {/* FORM EMAIL */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: integrazione Brevo / endpoint
              onClose();
            }}
            style={{ display: "grid", gap: 10, marginTop: 6 }}
          >
            <label style={{ fontSize: 13, opacity: 0.8 }}>
              Inserisci la tua email
            </label>

            <input
              type="email"
              required
              placeholder="nome@dominio.it"
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                outline: "none",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.22)",
                background: "rgba(255,255,255,0.14)",
                color: "#fff",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {event.ctaLabel ?? "Partecipa all’evento"}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}
