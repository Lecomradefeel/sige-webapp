"use client";

import { useState } from "react";
import type { EventItem } from "./types";
import Modal from "./Modal";

function formatRomeDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("it-IT", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Rome",
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleString();
  }
}

function mapsUrl(e: EventItem) {
  if (!e.location) return null;
  return `https://www.google.com/maps?q=${e.location.latitude},${e.location.longitude}`;
}

export default function ParticipateModal({
  open,
  event,
  onClose,
}: {
  open: boolean;
  event: EventItem;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async () => {
    setMsg(null);
    const mail = email.trim();
    if (!mail || !/^\S+@\S+\.\S+$/.test(mail)) {
      setMsg("Inserisci una mail valida.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mail,
          eventId: event.id,
          eventTitle: event.title,
          startsAt: event.startsAt,
        }),
      });

      if (!res.ok) throw new Error("RSVP failed");

      setMsg("Perfetto! Ti abbiamo registrato.");
      setEmail("");
    } catch {
      setMsg("Non sono riuscito a registrarti. Riprova tra poco.");
    } finally {
      setSending(false);
    }
  };

  const murl = mapsUrl(event);

  return (
    <Modal
      open={open}
      title="Dettagli evento"
      onClose={() => {
        setMsg(null);
        onClose();
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 0.85fr", gap: 16 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, opacity: 0.78 }}>
            {formatRomeDate(event.startsAt)}
            {murl ? (
              <>
                {" · "}
                <a
                  href={murl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "underline", opacity: 0.9 }}
                >
                  Apri mappa
                </a>
              </>
            ) : null}
          </div>

          <div style={{ fontSize: 26, fontWeight: 950, marginTop: 10, lineHeight: 1.15 }}>
            {event.title}
          </div>

          <div
            style={{
              marginTop: 12,
              fontSize: 15,
              opacity: 0.92,
              lineHeight: 1.55,
              whiteSpace: "pre-wrap",
            }}
          >
            {event.body ?? event.excerpt ?? "Dettagli non disponibili."}
          </div>
        </div>

        <div>
          {event.image?.url ? (
            <img
              src={event.image.url}
              alt={event.image.alt ?? event.title}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            />
          ) : null}

          <div
            style={{
              marginTop: 14,
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.14)",
              padding: 14,
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div style={{ fontWeight: 950, marginBottom: 10 }}>Prenota</div>

            <label style={{ fontSize: 13, opacity: 0.8 }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@dominio.it"
              style={{
                width: "100%",
                marginTop: 6,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(0,0,0,0.35)",
                color: "inherit",
                outline: "none",
              }}
            />

            <button
              onClick={submit}
              disabled={sending}
              style={{
                width: "100%",
                marginTop: 10,
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "#fff",
                color: "#000",
                cursor: sending ? "default" : "pointer",
                fontWeight: 950,
                opacity: sending ? 0.7 : 1,
              }}
            >
              {event.ctaLabel ?? "Partecipa all’evento"}
            </button>

            {msg ? (
              <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>{msg}</div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
}
