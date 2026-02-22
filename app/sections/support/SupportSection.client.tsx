"use client";

import { useMemo, useState } from "react";
import type { SupportSectionData } from "./types";

function clampText(s?: string | null) {
  return s ?? "";
}

export default function SupportSectionClient({ data }: { data: SupportSectionData }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const options = useMemo(() => data.options.slice(0, 6), [data.options]);

  return (
    <section style={{ marginTop: 44 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>{data.title ?? "Sostienici"}</h2>
        <div style={{ fontSize: 14, opacity: 0.75, maxWidth: 860 }}>
          {clampText(data.intro)}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {options.slice(0, 3).map((opt) => {
          const isOpen = openId === opt.id;

          return (
            <article
              key={opt.id}
              onMouseEnter={() => setOpenId(opt.id)}
              onMouseLeave={() => setOpenId(null)}
              onClick={() => setOpenId((prev) => (prev === opt.id ? null : opt.id))}
              role="button"
              tabIndex={0}
              style={{
                cursor: "pointer",
                padding: 18,
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.02)",
                transition: "transform 220ms ease, border-color 220ms ease",
                transform: isOpen ? "translateY(-2px)" : "translateY(0)",
                outline: "none",
                userSelect: "none",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                MODALITÀ
              </div>

              <div style={{ fontSize: 18, fontWeight: 900, marginTop: 6 }}>
                {opt.title}
              </div>

              {opt.image?.url ? (
                <img
                  src={opt.image.url}
                  alt={opt.image.alt ?? opt.title}
                  style={{ width: "100%", borderRadius: 14, marginTop: 10 }}
                />
              ) : null}

              {opt.excerpt ? (
                <div style={{ fontSize: 14, opacity: 0.82, marginTop: 6 }}>
                  {opt.excerpt}
                </div>
              ) : null}

              {/* Area espandibile */}
              <div
                style={{
                  maxHeight: isOpen ? 260 : 0,
                  overflow: "hidden",
                  transition: "max-height 380ms ease",
                }}
              >
                <div style={{ height: 10 }} />
                {opt.body ? (
                  <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.5 }}>
                    {opt.body}
                  </div>
                ) : null}

                {opt.link ? (
                  <div style={{ marginTop: 12 }}>
                    <a
                      href={opt.link.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-block",
                        padding: "10px 12px",
                        borderRadius: 14,
                        background: "#fff",
                        color: "#000",
                        fontWeight: 900,
                        textDecoration: "none",
                      }}
                    >
                      {opt.ctaLabel ?? "Apri"}
                    </a>
                  </div>
                ) : null}

                <div style={{ height: 6 }} />
              </div>

              <div style={{ fontSize: 12, opacity: 0.6, marginTop: 10 }}>
                {isOpen ? "Tocca per chiudere" : "Tocca per leggere di più"}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
