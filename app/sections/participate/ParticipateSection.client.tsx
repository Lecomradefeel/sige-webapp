"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "./types";
import ParticipateModal from "./ParticipateModal";
import ParticipateCalendarModal from "./ParticipateCalendarModal";

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
    return new Date(iso).toLocaleString();
  }
}

export default function ParticipateSectionClient({
  events,
}: {
  events: EventItem[];
}) {
  const top = useMemo(() => events.slice(0, 5), [events]);

  const [main, setMain] = useState<EventItem | null>(top[0] ?? null);
  const [left, setLeft] = useState<EventItem[]>(top.slice(1, 5));

  // swap animation state
  const [swapId, setSwapId] = useState<string | null>(null);

  // modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const onSwap = (clicked: EventItem) => {
    if (!main || clicked.id === main.id || swapId) return;

    setSwapId(clicked.id);

    setMain((prevMain) => {
      if (!prevMain) return prevMain;

      setLeft((prevLeft) => {
        const idx = prevLeft.findIndex((x) => x.id === clicked.id);
        if (idx === -1) return prevLeft;

        const next = [...prevLeft];
        next[idx] = prevMain;
        return next;
      });

      return clicked;
    });

    window.setTimeout(() => setSwapId(null), 520);
  };

  // Se non ci sono eventi, non renderizzare la sezione (o metti un placeholder)
  if (!main) return null;

  return (
    <section style={{ marginTop: 56 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>Partecipa</h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Eventi, assemblee, iniziative: vieni a conoscerci.
        </div>
      </div>

      <div
        className="eventsGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 2fr",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {/* SINISTRA */}
        <div style={{ display: "grid", gap: 14 }}>
          {left.map((e) => {
            const isSwapping = swapId === e.id;

            return (
              <button
                key={e.id}
                onClick={() => onSwap(e)}
                style={{
                  textAlign: "left",
                  padding: 14,
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.02)",
                  color: "inherit",
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: e.image?.url ? "76px 1fr" : "1fr",
                  gap: 12,
                  alignItems: "center",
                  transition:
                    "transform 260ms ease, opacity 260ms ease, border-color 220ms ease, box-shadow 220ms ease",
                  transform: isSwapping
                    ? "translateY(6px) scale(0.985)"
                    : "translateY(0) scale(1)",
                  opacity: isSwapping ? 0.85 : 1,
                  boxShadow: "none",
                }}
                onPointerEnter={(ev) => {
                  const el = ev.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "rgba(255,255,255,0.28)";
                  el.style.boxShadow = "0 14px 40px rgba(0,0,0,0.45)";
                }}
                onPointerLeave={(ev) => {
                  const el = ev.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "rgba(255,255,255,0.15)";
                  el.style.boxShadow = "none";
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
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {formatRomeDate(e.startsAt)}
                  </div>
                  <div style={{ fontWeight: 900, marginTop: 4, lineHeight: 1.2 }}>
                    {e.title}
                  </div>
                  {e.excerpt ? (
                    <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6 }}>
                      {e.excerpt}
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {/* CENTRALE */}
        <button
          onClick={() => setDetailOpen(true)}
          style={{
            textAlign: "left",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.03)",
            padding: 18,
            color: "inherit",
            cursor: "pointer",
            overflow: "hidden",
            transition: "border-color 220ms ease, box-shadow 220ms ease",
            boxShadow: "0 22px 70px rgba(0,0,0,0.55)",
          }}
          onPointerEnter={(ev) => {
            const el = ev.currentTarget as HTMLButtonElement;
            el.style.borderColor = "rgba(255,255,255,0.32)";
            el.style.boxShadow = "0 28px 90px rgba(0,0,0,0.65)";
          }}
          onPointerLeave={(ev) => {
            const el = ev.currentTarget as HTMLButtonElement;
            el.style.borderColor = "rgba(255,255,255,0.18)";
            el.style.boxShadow = "0 22px 70px rgba(0,0,0,0.55)";
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: main.image?.url ? "1.25fr 0.95fr" : "1fr",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                {formatRomeDate(main.startsAt)}
              </div>

              <div
                style={{
                  fontSize: 28,
                  fontWeight: 950,
                  marginTop: 10,
                  lineHeight: 1.1,
                }}
              >
                {main.title}
              </div>

              {main.excerpt ? (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    opacity: 0.9,
                    lineHeight: 1.45,
                  }}
                >
                  {main.excerpt}
                </div>
              ) : null}

              <div style={{ marginTop: 14, fontWeight: 900 }}>Apri dettagli →</div>
            </div>

            {main.image?.url ? (
              <img
                src={main.image.url}
                alt={main.image.alt ?? main.title}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              />
            ) : null}
          </div>
        </button>
      </div>

      {/* CTA Tutti gli eventi */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}>
        <button
          onClick={() => setCalendarOpen(true)}
          style={{
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.03)",
            color: "inherit",
            cursor: "pointer",
            fontWeight: 900,
            transition:
              "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
          }}
          onPointerEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "scale(1.02)";
            el.style.borderColor = "rgba(255,255,255,0.30)";
            el.style.boxShadow = "0 14px 40px rgba(0,0,0,0.45)";
          }}
          onPointerLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "scale(1)";
            el.style.borderColor = "rgba(255,255,255,0.18)";
            el.style.boxShadow = "none";
          }}
        >
          Tutti gli eventi
        </button>
      </div>

      {/* Modali */}
      {main ? (
        <ParticipateModal
          open={detailOpen}
          event={main}
          onClose={() => setDetailOpen(false)}
        />
      ) : null}

      <ParticipateCalendarModal
        open={calendarOpen}
        events={events}
        onClose={() => setCalendarOpen(false)}
        onPickEvent={(e) => {
          setMain(e);
          setCalendarOpen(false);
          setDetailOpen(true);
        }}
      />

      <style>{`
        @media (max-width: 920px) {
          .eventsGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
