"use client";

import { useEffect, useState } from "react";
import Modal from "@/app/components/ui/Modal";
import type { EventItem } from "./types";

type Props = {
  open: boolean;
  onClose: () => void;
  event: EventItem | null;
};

export default function ParticipateModal({ open, onClose, event }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetStatus = () => {
    setStatus("idle");
    setErrorMessage(null);
  };

  useEffect(() => {
    if (!open) {
      setEmail("");
      resetStatus();
    }
  }, [open]);

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
            onSubmit={async (e) => {
              e.preventDefault();
              if (!event) return;
              setStatus("loading");
              setErrorMessage(null);
              try {
                const res = await fetch("/api/rsvp", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email,
                    eventId: event.id,
                    eventTitle: event.title,
                    eventStartsAt: event.startsAt,
                  }),
                });

                if (!res.ok) {
                  const payload = await res.json().catch(() => null);
                  throw new Error(payload?.error ?? "Errore durante l’iscrizione.");
                }

                setStatus("success");
              } catch (error) {
                setStatus("error");
                setErrorMessage(error instanceof Error ? error.message : "Errore inatteso.");
              }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={resetStatus}
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
              disabled={status === "loading" || status === "success"}
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.22)",
                background:
                  status === "success" ? "rgba(88, 214, 141, 0.24)" : "rgba(255,255,255,0.14)",
                color: "#fff",
                fontWeight: 900,
                cursor: "pointer",
                opacity: status === "loading" ? 0.7 : 1,
              }}
            >
              {status === "loading"
                ? "Invio in corso..."
                : status === "success"
                  ? "Iscrizione confermata!"
                  : event.ctaLabel ?? "Partecipa all’evento"}
            </button>

            {status === "success" ? (
              <div style={{ fontSize: 13, color: "#8ef3b7" }}>
                Ti abbiamo registrato: a breve riceverai aggiornamenti via email.
              </div>
            ) : null}

            {status === "error" ? (
              <div style={{ fontSize: 13, color: "#ff8d8d" }}>
                {errorMessage ?? "Errore durante l’iscrizione. Riprova più tardi."}
              </div>
            ) : null}
          </form>
        </div>
      )}
    </Modal>
  );
}
