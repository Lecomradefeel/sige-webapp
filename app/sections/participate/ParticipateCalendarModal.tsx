"use client";

import Modal from "./Modal";
import type { EventItem } from "./types";

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function getMonthRange(now: Date) {
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
}

export default function ParticipateCalendarModal({
  open,
  events,
  onPickEvent,
  onClose,
}: {
  open: boolean;
  events: EventItem[];
  onPickEvent: (e: EventItem) => void;
  onClose: () => void;
}) {
  const now = new Date();
  const { start, end } = getMonthRange(now);
  const daysInMonth = end.getDate();

  const startMs = start.getTime();
  const endMs = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59).getTime();

  const monthEvents = events.filter((e) => {
    const t = new Date(e.startsAt).getTime();
    return t >= startMs && t <= endMs;
  });

  const byDay = new Map<number, EventItem[]>();
  for (const e of monthEvents) {
    const d = new Date(e.startsAt);
    const day = d.getDate();
    byDay.set(day, [...(byDay.get(day) ?? []), e]);
  }

  return (
    <Modal open={open} title="Eventi del mese" onClose={onClose}>
      <div style={{ marginBottom: 12, opacity: 0.85 }}>
        Mese corrente: <strong>{monthKey(now)}</strong>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const list = byDay.get(day) ?? [];
          return (
            <div
              key={day}
              style={{
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.02)",
                padding: 10,
                minHeight: 74,
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.8, fontWeight: 900 }}>{day}</div>

              {list.length ? (
                <div style={{ marginTop: 6, display: "grid", gap: 6 }}>
                  {list.slice(0, 2).map((e) => (
                    <button
                      key={e.id}
                      onClick={() => onPickEvent(e)}
                      style={{
                        textAlign: "left",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(0,0,0,0.25)",
                        color: "inherit",
                        borderRadius: 10,
                        padding: "6px 8px",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 800,
                        opacity: 0.92,
                      }}
                    >
                      {e.title}
                    </button>
                  ))}
                  {list.length > 2 ? (
                    <div style={{ fontSize: 12, opacity: 0.7 }}>+{list.length - 2} altri</div>
                  ) : null}
                </div>
              ) : (
                <div style={{ marginTop: 8, fontSize: 12, opacity: 0.35 }}>—</div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 14, fontSize: 13, opacity: 0.8 }}>
        Clicca un evento nel calendario per aprire i dettagli.
      </div>
    </Modal>
  );
}
