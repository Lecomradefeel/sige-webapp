"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "./types";
import Modal from "@/app/components/ui/Modal";

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

function getRomeDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("it-IT", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value ?? "0000";
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  return `${year}-${month}-${day}`;
}

const WEEKDAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

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
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 12);
  });

  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    events.forEach((event) => {
      if (!event.startsAt) return;
      const key = getRomeDateKey(new Date(event.startsAt));
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    });

    map.forEach((value) =>
      value.sort((a, b) => {
        const ta = a.startsAt ? new Date(a.startsAt).getTime() : 0;
        const tb = b.startsAt ? new Date(b.startsAt).getTime() : 0;
        return ta - tb;
      }),
    );
    return map;
  }, [events]);

  const monthLabel = new Intl.DateTimeFormat("it-IT", {
    month: "long",
    year: "numeric",
  }).format(currentMonth);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
    12,
  ).getDay();
  const leadingBlanks = (firstDay + 6) % 7;

  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <Modal open={open} onClose={onClose} title="Tutti gli eventi">
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            type="button"
            onClick={() =>
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1, 12),
              )
            }
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <div style={{ fontWeight: 900, textTransform: "capitalize" }}>{monthLabel}</div>
          <button
            type="button"
            onClick={() =>
              setCurrentMonth(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1, 12),
              )
            }
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            gap: 8,
          }}
        >
          {WEEKDAYS.map((day) => (
            <div key={day} style={{ fontSize: 12, opacity: 0.7, textAlign: "center" }}>
              {day}
            </div>
          ))}

          {Array.from({ length: leadingBlanks }).map((_, index) => (
            <div key={`blank-${index}`} />
          ))}

          {days.map((day) => {
            const date = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day,
              12,
            );
            const key = getRomeDateKey(date);
            const dayEvents = eventsByDate.get(key) ?? [];

            return (
              <div
                key={key}
                style={{
                  minHeight: 86,
                  padding: 8,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  display: "grid",
                  gap: 6,
                  alignContent: "start",
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 900 }}>{day}</div>
                {dayEvents.length === 0 ? (
                  <div style={{ fontSize: 11, opacity: 0.4 }}>—</div>
                ) : (
                  dayEvents.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onPickEvent(event)}
                      style={{
                        textAlign: "left",
                        padding: "6px 8px",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.16)",
                        background: "rgba(255,255,255,0.08)",
                        color: "inherit",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {event.title}
                      <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 500 }}>
                        {formatRomeDate(event.startsAt)}
                      </div>
                    </button>
                  ))
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
