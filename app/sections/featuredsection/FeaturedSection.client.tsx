"use client";

import { useMemo, useState } from "react";
import type { FeaturedItem } from "./types";

type FeaturedSectionClientProps = {
  title: string;
  subtitle: string;
  mainItem: FeaturedItem;
  sideItems: FeaturedItem[];
};

export default function FeaturedSectionClient({
  title,
  subtitle,
  mainItem,
  sideItems,
}: FeaturedSectionClientProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(null);

  const expandedId = lockedId ?? activeId;

  const cards = useMemo(() => sideItems, [sideItems]);

  return (
    <section style={{ marginTop: 26 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>{title}</h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>{subtitle}</div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        <a
          href={mainItem.href}
          style={{
            position: "relative",
            minHeight: 220,
            padding: 28,
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.18)",
            overflow: "hidden",
            color: "inherit",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 12,
            background: mainItem.image?.url
              ? `linear-gradient(140deg, rgba(9,11,16,0.1), rgba(9,11,16,0.92)), url(${mainItem.image.url}) center/cover`
              : "rgba(255,255,255,0.02)",
            transition: "transform 260ms ease, box-shadow 260ms ease, border-color 260ms ease",
            boxShadow: "0 26px 70px rgba(0,0,0,0.45)",
          }}
          onPointerEnter={(ev) => {
            const el = ev.currentTarget as HTMLAnchorElement;
            el.style.transform = "translateY(-2px)";
            el.style.borderColor = "rgba(255,255,255,0.35)";
            el.style.boxShadow = "0 34px 90px rgba(0,0,0,0.6)";
          }}
          onPointerLeave={(ev) => {
            const el = ev.currentTarget as HTMLAnchorElement;
            el.style.transform = "translateY(0)";
            el.style.borderColor = "rgba(255,255,255,0.18)";
            el.style.boxShadow = "0 26px 70px rgba(0,0,0,0.45)";
          }}
        >
          <div style={{ fontSize: 12, letterSpacing: 1, opacity: 0.75 }}>
            {mainItem.label}
          </div>
          <h3 style={{ fontSize: 30, margin: 0 }}>{mainItem.title}</h3>
          <p style={{ maxWidth: 560, margin: 0, opacity: 0.9 }}>
            {mainItem.preview}
          </p>
        </a>

        <div style={{ display: "grid", gap: 20 }}>
          {cards.map((item) => {
            const expanded = expandedId === item.id;
            const previewHeight = expanded ? 84 : 0;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLockedId(expanded ? null : item.id)}
                onPointerEnter={() => setActiveId(item.id)}
                onPointerLeave={() => setActiveId(null)}
                style={{
                  textAlign: "left",
                  padding: 20,
                  borderRadius: 22,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.02)",
                  color: "inherit",
                  cursor: "pointer",
                  display: "grid",
                  gap: 8,
                  transition:
                    "transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
                  boxShadow: expanded
                    ? "0 18px 45px rgba(0,0,0,0.45)"
                    : "none",
                  transform: expanded ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.65 }}>{item.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{item.title}</div>
                <div
                  style={{
                    maxHeight: previewHeight,
                    opacity: expanded ? 0.85 : 0,
                    overflow: "hidden",
                    transition: "max-height 240ms ease, opacity 240ms ease",
                    fontSize: 13,
                    lineHeight: 1.4,
                  }}
                >
                  {item.preview}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
