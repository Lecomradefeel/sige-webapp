"use client";

import { useMemo, useState } from "react";

export type FeaturedItem = {
  label?: string | null;
  title: string;
  excerpt?: string | null;
  priority: number;
  link?: string | null;
};

function SafeText({ children }: { children?: string | null }) {
  return <>{children ?? ""}</>;
}

function safeUrl(url?: string | null) {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) return `https://${u}`;
  return u;
}

function CardBase({
  kind,
  open,
  href,
  onEnter,
  onLeave,
  style,
  children,
}: {
  kind: "primary" | "small";
  open: boolean;
  href?: string | null;
  onEnter: () => void;
  onLeave: () => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {

const commonStyle: React.CSSProperties = {
  display: "block",
  cursor: href ? "pointer" : "default",
  borderRadius: kind === "primary" ? 28 : 22,
  border: open
    ? "1px solid rgba(255,255,255,0.30)"
    : "1px solid rgba(255,255,255,0.15)",
  background: "rgba(255,255,255,0.02)",
  padding: kind === "primary" ? 28 : 20,
  color: "inherit",
  textDecoration: "none",
  transition: "box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease",
  boxShadow: open ? "0 22px 70px rgba(0,0,0,0.55)" : "none",
  outline: "none",
  ...style,
};

  const interactiveProps = {
    onPointerEnter: onEnter,
    onPointerLeave: onLeave,
    onFocus: onEnter, // tastiera: focus apre
    onBlur: onLeave,  // blur chiude
  };

  if (href) {
    return (
      <a href={href} style={commonStyle} {...interactiveProps}>
        {children}
      </a>
    );
  }

  return (
    <article style={commonStyle} {...interactiveProps}>
      {children}
    </article>
  );
}

function Extra({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  const transition = open
    ? "max-height 520ms cubic-bezier(0.4, 0, 0.2, 1), opacity 380ms ease"
    : "max-height 900ms cubic-bezier(0.2, 0, 0, 1), opacity 520ms ease 80ms";

  return (
    <div
      style={{
        maxHeight: open ? 240 : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition,
      }}
    >
      <div style={{ paddingTop: 14 }}>{children}</div>
    </div>
  );
}

export default function FeaturedSection({ items }: { items: FeaturedItem[] }) {
  const featured = useMemo(() => {
    const arr = [...items].sort(
      (a, b) => (a.priority ?? 999) - (b.priority ?? 999)
    );
    return arr.slice(0, 3);
  }, [items]);

  const main = featured.find((f) => f.priority === 1) ?? featured[0];
  const s1 = featured.find((f) => f.priority === 2) ?? featured[1];
  const s2 = featured.find((f) => f.priority === 3) ?? featured[2];

  // Stato SOLO per hover/focus (non per click)
  const [hovered, setHovered] = useState<"main" | "s1" | "s2" | null>(null);

  const mainHref = safeUrl(main?.link);
  const s1Href = safeUrl(s1?.link);
  const s2Href = safeUrl(s2?.link);

  const primaryOpen = hovered === "main";
  const s1Open = hovered === "s1";
  const s2Open = hovered === "s2";

  // “trascinamento”: se apro primaria -> destra giù; se apro una secondaria -> sinistra giù
  const rightDraggedDown = primaryOpen;
  const leftDraggedDown = s1Open || s2Open;

  return (
    <section>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>In evidenza</h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Le priorità politiche di questo momento
        </div>
      </div>

      <div
        className="wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {/* COLONNA SINISTRA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: leftDraggedDown ? "flex-end" : "flex-start",
            transition: "justify-content 320ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <CardBase
  kind="primary"
  href={mainHref}
  open={primaryOpen}
  onEnter={() => setHovered("main")}
  onLeave={() => setHovered((v) => (v === "main" ? null : v))}
  style={{
    height: primaryOpen ? "auto" : "100%",
  }}
>

            <div style={{ fontSize: 12, opacity: 0.6 }}>
              <SafeText>{main?.label ?? "CAMPAGNA"}</SafeText>
            </div>

            <h3 style={{ fontSize: 30, margin: "12px 0" }}>
              <SafeText>{main?.title ?? ""}</SafeText>
            </h3>

            {main?.excerpt ? (
              <p style={{ maxWidth: 560, margin: 0, opacity: 0.95 }}>
                <SafeText>{main.excerpt}</SafeText>
              </p>
            ) : null}

            <Extra open={primaryOpen}>
              {/* Qui puoi metterci “più info” oltre al bottone */}
              {mainHref ? (
                <span
                  style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: 14,
                    background: "#fff",
                    color: "#000",
                    fontWeight: 800,
                  }}
                >
                  Approfondisci
                </span>
              ) : (
                <div style={{ fontSize: 13, opacity: 0.75 }}>
                  Aggiungi un link nel CMS per mostrare “Approfondisci”.
                </div>
              )}
            </Extra>
          </CardBase>
        </div>

        {/* COLONNA DESTRA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            height: "100%",
            justifyContent: rightDraggedDown ? "flex-end" : "flex-start",
            transition: "justify-content 320ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <CardBase
            kind="small"
            href={s1Href}
            open={s1Open}
            onEnter={() => setHovered("s1")}
            onLeave={() => setHovered((v) => (v === "s1" ? null : v))}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              <SafeText>{s1?.label ?? "EVENTO"}</SafeText>
            </div>

            <strong style={{ display: "block", marginTop: 8 }}>
              <SafeText>{s1?.title ?? ""}</SafeText>
            </strong>

            {s1?.excerpt ? (
              <div style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>
                <SafeText>{s1.excerpt}</SafeText>
              </div>
            ) : null}

            <Extra open={s1Open}>
              {s1Href ? (
                <span style={{ fontWeight: 800, opacity: 0.9 }}>
                  Approfondisci →
                </span>
              ) : (
                <div style={{ fontSize: 13, opacity: 0.75 }}>
                  Aggiungi un link nel CMS.
                </div>
              )}
            </Extra>
          </CardBase>

          <CardBase
            kind="small"
            href={s2Href}
            open={s2Open}
            onEnter={() => setHovered("s2")}
            onLeave={() => setHovered((v) => (v === "s2" ? null : v))}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              <SafeText>{s2?.label ?? "DOSSIER"}</SafeText>
            </div>

            <strong style={{ display: "block", marginTop: 8 }}>
              <SafeText>{s2?.title ?? ""}</SafeText>
            </strong>

            {s2?.excerpt ? (
              <div style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>
                <SafeText>{s2.excerpt}</SafeText>
              </div>
            ) : null}

            <Extra open={s2Open}>
              {s2Href ? (
                <span style={{ fontWeight: 800, opacity: 0.9 }}>
                  Approfondisci →
                </span>
              ) : (
                <div style={{ fontSize: 13, opacity: 0.75 }}>
                  Aggiungi un link nel CMS.
                </div>
              )}
            </Extra>
          </CardBase>
        </div>
      </div>

      {/* Mobile: su touch non esiste hover. Se vuoi, nel prossimo step
          aggiungiamo “tap-to-preview” SENZA rubare il click al link. */}
      <style>{`
        @media (max-width: 860px) {
          .wrap {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
