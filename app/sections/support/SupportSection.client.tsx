"use client";

import { useMemo, useState } from "react";
import type { SupportOption, SupportSectionData } from "./types";

function clampText(s?: string | null) {
  return s ?? "";
}

export default function SupportSectionClient({ data }: { data: SupportSectionData }) {
  const options = useMemo(() => data.options.slice(0, 6), [data.options]);
  const [selectedId, setSelectedId] = useState<string>(options[0]?.id ?? "");

  const selectedOption: SupportOption | undefined =
    options.find((opt) => opt.id === selectedId) ?? options[0];

  if (!selectedOption) return null;

  return (
    <section style={{ marginTop: 56 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>{data.title ?? "Sostienici"}</h2>
        <div style={{ fontSize: 14, opacity: 0.75, maxWidth: 860 }}>{clampText(data.intro)}</div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {options.map((opt) => {
          const isActive = opt.id === selectedOption.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedId(opt.id)}
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                border: isActive
                  ? "1px solid rgba(255,255,255,0.55)"
                  : "1px solid rgba(255,255,255,0.22)",
                background: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.04)",
                color: "inherit",
                cursor: "pointer",
                fontWeight: 800,
                transition: "all 180ms ease",
              }}
            >
              {opt.title}
            </button>
          );
        })}
      </div>

      <article
        style={{
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.22)",
          background: "rgba(255,255,255,0.04)",
          boxShadow: "0 22px 60px rgba(0,0,0,0.48)",
          padding: 20,
          display: "grid",
          gridTemplateColumns: selectedOption.image?.url ? "1.35fr 0.95fr" : "1fr",
          gap: 18,
          alignItems: "start",
        }}
      >
        <div>
          <div style={{ fontSize: 13, opacity: 0.72, fontWeight: 700 }}>Opzione selezionata</div>

          <h3 style={{ fontSize: 34, margin: "8px 0 0", lineHeight: 1.08 }}>{selectedOption.title}</h3>

          {selectedOption.excerpt ? (
            <p style={{ marginTop: 10, fontSize: 16, opacity: 0.9, lineHeight: 1.45 }}>
              {selectedOption.excerpt}
            </p>
          ) : null}

          {selectedOption.body ? (
            <p style={{ marginTop: 10, fontSize: 15, opacity: 0.82, lineHeight: 1.55 }}>
              {selectedOption.body}
            </p>
          ) : null}

          {selectedOption.link?.url ? (
            <div style={{ marginTop: 16 }}>
              <a
                href={selectedOption.link.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "11px 15px",
                  borderRadius: 14,
                  background: "#fff",
                  color: "#000",
                  fontWeight: 900,
                  textDecoration: "none",
                }}
              >
                {selectedOption.ctaLabel ?? "Sostieni ora"}
              </a>
            </div>
          ) : null}
        </div>

        {selectedOption.image?.url ? (
          <img
            src={selectedOption.image.url}
            alt={selectedOption.image.alt ?? selectedOption.title}
            style={{
              width: "100%",
              maxHeight: 280,
              objectFit: "cover",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          />
        ) : null}
      </article>
    </section>
  );
}
