"use client";

import { useMemo, useState } from "react";
import Modal from "@/app/components/ui/Modal";
import type { NewsItem } from "./types";

function formatRomeDate(iso?: string | null) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Europe/Rome",
    }).format(new Date(iso));
  } catch {
    return new Date(iso).toLocaleDateString();
  }
}

export default function NewsSectionClient({ news }: { news: NewsItem[] }) {
  const main = useMemo(() => news[0] ?? null, [news]);
  const rest = useMemo(() => news.slice(1), [news]);

  const [selected, setSelected] = useState<NewsItem | null>(main);
  const [open, setOpen] = useState(false);

  if (!main) return null;

  return (
    <section style={{ marginTop: 56 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>Notizie</h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Aggiornamenti dal territorio e dal gruppo.
        </div>
      </div>

      <button
        onClick={() => {
          setSelected(main);
          setOpen(true);
        }}
        style={{
          textAlign: "left",
          borderRadius: 28,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.03)",
          padding: 20,
          color: "inherit",
          cursor: "pointer",
          width: "100%",
          display: "grid",
          gridTemplateColumns: main.image?.url ? "1.1fr 1fr" : "1fr",
          gap: 18,
          alignItems: "stretch",
          boxShadow: "0 22px 70px rgba(0,0,0,0.55)",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
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
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            {formatRomeDate(main.publishedAt)}
          </div>
          <div
            style={{
              fontSize: 30,
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
                marginTop: 12,
                fontSize: 15,
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              {main.excerpt}
            </div>
          ) : null}
          <div style={{ marginTop: 16, fontWeight: 900 }}>Leggi tutto →</div>
        </div>

        {main.image?.url ? (
          <img
            src={main.image.url}
            alt={main.image.alt ?? main.title}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 20,
              objectFit: "cover",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        ) : null}
      </button>

      {rest.length ? (
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 13, opacity: 0.65, marginBottom: 10 }}>
            Altre notizie
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              overflowX: "auto",
              paddingBottom: 8,
            }}
          >
            {rest.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelected(item);
                  setOpen(true);
                }}
                style={{
                  minWidth: 240,
                  textAlign: "left",
                  padding: 14,
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.02)",
                  color: "inherit",
                  cursor: "pointer",
                  display: "grid",
                  gap: 10,
                  transition:
                    "transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
                }}
                onPointerEnter={(ev) => {
                  const el = ev.currentTarget as HTMLButtonElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.borderColor = "rgba(255,255,255,0.28)";
                  el.style.boxShadow = "0 14px 40px rgba(0,0,0,0.45)";
                }}
                onPointerLeave={(ev) => {
                  const el = ev.currentTarget as HTMLButtonElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(255,255,255,0.15)";
                  el.style.boxShadow = "none";
                }}
              >
                {item.image?.url ? (
                  <img
                    src={item.image.url}
                    alt={item.image.alt ?? item.title}
                    style={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  />
                ) : null}
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {formatRomeDate(item.publishedAt)}
                </div>
                <div style={{ fontWeight: 900, lineHeight: 1.2 }}>{item.title}</div>
                {item.excerpt ? (
                  <div style={{ fontSize: 13, opacity: 0.8 }}>{item.excerpt}</div>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={selected?.title ?? "Notizia"}
      >
        {!selected ? null : (
          <div style={{ display: "grid", gap: 14 }}>
            {selected.image?.url ? (
              <img
                src={selected.image.url}
                alt={selected.image.alt ?? selected.title}
                style={{
                  width: "100%",
                  borderRadius: 16,
                  objectFit: "cover",
                  maxHeight: 280,
                }}
              />
            ) : null}

            {selected.excerpt ? (
              <div style={{ fontSize: 15, opacity: 0.9 }}>{selected.excerpt}</div>
            ) : null}

            {selected.body ? (
              <div style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>
                {selected.body}
              </div>
            ) : null}
          </div>
        )}
      </Modal>
    </section>
  );
}
