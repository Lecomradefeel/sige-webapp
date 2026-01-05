"use client";

import type { EventItem } from "./types";
import Modal from "@/app/components/ui/Modal"; // se il tuo Modal sta altrove, aggiorna questo import

function formatRomeDate(iso?: string | null) {
  if (!iso) return "";
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
    return new Date(iso ?? "").toLocaleString();
  }
}

export default function ParticipateCalendarModal({
  open,
  events,
  onClose,
  onPickEvent,
}: {
  open: boolean;
  events: EventItem[];
  onClose: () => void;
  onPickEvent: (e: EventItem) => void;
}) {
  // Ordina per data crescente (safe anche se manca startsAt)
  const sorted = [...events].sort((a, b) => {
    const ta = a.startsAt ? new Date(a.startsAt).getTime() : 0;
    const tb = b.startsAt ? new Date(b.startsAt).getTime() : 0;
    return ta - tb;
  });

  return (
    <Modal open={open} onClose={onClose} title="Tutti gli eventi">
      <div style={{ display: "grid", gap: 10 }}>
        {sorted.length === 0 ? (
          <div style={{ opacity: 0.8 }}>Nessun evento in programma.</div>
        ) : (
          sorted.map((e) => (
            <button
              key={e.id}
              onClick={() => onPickEvent(e)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: 14,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "rgba(255,255,255,0.03)",
                color: "inherit",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: e.image?.url ? "76px 1fr" : "1fr",
                gap: 12,
                alignItems: "center",
                transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
              }}
              onPointerEnter={(ev) => {
                const el = ev.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(255,255,255,0.30)";
                el.style.boxShadow = "0 14px 40px rgba(0,0,0,0.45)";
                el.style.transform = "translateY(-1px)";
              }}
              onPointerLeave={(ev) => {
                const el = ev.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(255,255,255,0.16)";
                el.style.boxShadow = "none";
                el.style.transform = "translateY(0)";
              }}
            >
              {e.image?.url ? (
                <img
                  src={e.image.url}
                  alt={e.image.alt ?? e.title}
                  style={{
                    width: 76,
                    height: 62,
                    objectFit: "cover",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                />
              ) : null}

              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 900, lineHeight: 1.2 }}>{e.title}</div>

                {e.startsAt ? (
                  <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
                    {formatRomeDate(e.startsAt)}
                  </div>
                ) : null}

                {e.excerpt ? (
                  <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>
                    {e.excerpt}
                  </div>
                ) : null}
              </div>
            </button>
          ))
        )}
      </div>
    </Modal>
  );
}
