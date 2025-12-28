"use client";

import { useMemo, useState } from "react";

export type FeaturedItem = {
  label?: string | null;
  title: string;
  excerpt?: string | null; // breve descrizione
  priority: number;
  link?: string | null; // URL (stringa) in Dato
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

function Extra({
  open,
  maxOpenHeight = 240,
  children,
}: {
  open: boolean;
  maxOpenHeight?: number;
  children: React.ReactNode;
}) {
  // apertura ok, rientro più lento
  const transition = open
    ? "max-height 520ms cubic-bezier(0.4, 0, 0.2, 1), opacity 380ms ease"
    : "max-height 900ms cubic-bezier(0.2, 0, 0, 1), opacity 520ms ease 80ms";

  return (
    <div
      style={{
        maxHeight: open ? maxOpenHeight : 0,
        opacity: open ? 1 : 0,
        overflow: "hidden",
        transition,
      }}
    >
      <div style={{ paddingTop: 14 }}>{children}</div>
    </div>
  );
}

function CardBase({
  kind,
  open,
  href,
  ariaLabel,
  onEnter,
  onLeave,
  style,
  children,
}: {
  kind: "primary" | "small";
  open: boolean;
  href?: string | null;
  ariaLabel: string;
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
    transition:
      "box-shadow 180ms ease, border-color 180ms ease, transform 180ms ease",
    boxShadow: open ? "0 22px 70px rgba(0,0,0,0.55)" : "none",
    outline: "none",
    ...style,
  };

  const interactiveProps = {
    onPointerEnter: onEnter,
    onPointerLeave: onLeave,
    onFocus: onEnter,
    onBlur: onLeave,
  };

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} style={commonStyle} {...interactiveProps}>
        {children}
      </a>
    );
  }

  return (
    <article aria-label={ariaLabel} style={commonStyle} {...interactiveProps}>
      {children}
    </article>
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

  // hover indipendenti (non si influenzano tra loro)
  const [hoverMain, setHoverMain] = useState(false);
  const [hoverS1, setHoverS1] = useState(false);
  const [hoverS2, setHoverS2] = useState(false);

  const mainHref = safeUrl(main?.link);
  const s1Href = safeUrl(s1?.link);
  const s2Href = safeUrl(s2?.link);

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
    alignItems: "stretch", // 🔑 fondamentale
  }}

      >
        {/* COLONNA SINISTRA: PRIMARIA indipendente */}
        <div style={{ minWidth: 0 }}>
          <CardBase
            kind="primary"
            href={mainHref}
            ariaLabel={`Apri: ${main?.title ?? "contenuto in evidenza"}`}
            open={hoverMain}
            onEnter={() => setHoverMain(true)}
            onLeave={() => setHoverMain(false)}
              style={{
    height: hoverMain ? "auto" : "100%", // 🔑 ALLINEAMENTO PERFETTO
  }}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              <SafeText>{main?.label ?? "CAMPAGNA"}</SafeText>
            </div>

            <h3 style={{ fontSize: 30, margin: "12px 0" }}>
              <SafeText>{main?.title ?? "Primaria"}</SafeText>
            </h3>

            {/* breve descrizione SEMPRE */}
            <p style={{ maxWidth: 680, margin: 0, opacity: 0.95 }}>
              <SafeText>
                {main?.excerpt ??
                  "Aggiungi una breve descrizione (excerpt) nel CMS."}
              </SafeText>
            </p>

            {/* extra MOLTO grande, solo per primaria */}
            <Extra open={hoverMain} maxOpenHeight={1400}>
              <div style={{ fontSize: 14, opacity: 0.9, lineHeight: 1.55 }}>
                <div style={{ marginBottom: 10, opacity: 0.85 }}>
                  Spazio per più dettagli (in futuro possiamo collegare un campo
                  “body” dal CMS).
                </div>

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
                    Approfondisci →
                  </span>
                ) : (
                  <div style={{ fontSize: 13, opacity: 0.75 }}>
                    Aggiungi un link nel CMS per rendere la box cliccabile.
                  </div>
                )}
              </div>
            </Extra>
          </CardBase>
        </div>

        {/* COLONNA DESTRA: SECONDARIA + TERZIARIA indipendenti */}
        <div style={{ display: "grid", gap: 20, minWidth: 0 }}>
          <CardBase
            kind="small"
            href={s1Href}
            ariaLabel={`Apri: ${s1?.title ?? "contenuto secondario"}`}
            open={hoverS1}
            onEnter={() => setHoverS1(true)}
            onLeave={() => setHoverS1(false)}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              <SafeText>{s1?.label ?? "EVENTO"}</SafeText>
            </div>

            <strong style={{ display: "block", marginTop: 8 }}>
              <SafeText>{s1?.title ?? "Secondaria"}</SafeText>
            </strong>

            {/* breve descrizione SEMPRE */}
            <div style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>
              <SafeText>
                {s1?.excerpt ?? "Aggiungi una breve descrizione (excerpt) nel CMS."}
              </SafeText>
            </div>

            {/* extra piccolo: comportamento attuale */}
            <Extra open={hoverS1} maxOpenHeight={320}>
              <div style={{ fontSize: 14, opacity: 0.9, fontWeight: 800 }}>
                Approfondisci →
              </div>
            </Extra>
          </CardBase>

          <CardBase
            kind="small"
            href={s2Href}
            ariaLabel={`Apri: ${s2?.title ?? "contenuto terziario"}`}
            open={hoverS2}
            onEnter={() => setHoverS2(true)}
            onLeave={() => setHoverS2(false)}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              <SafeText>{s2?.label ?? "DOSSIER"}</SafeText>
            </div>

            <strong style={{ display: "block", marginTop: 8 }}>
              <SafeText>{s2?.title ?? "Terziaria"}</SafeText>
            </strong>

            {/* breve descrizione SEMPRE */}
            <div style={{ marginTop: 6, fontSize: 14, opacity: 0.8 }}>
              <SafeText>
                {s2?.excerpt ?? "Aggiungi una breve descrizione (excerpt) nel CMS."}
              </SafeText>
            </div>

            {/* extra piccolo: comportamento attuale */}
            <Extra open={hoverS2} maxOpenHeight={320}>
              <div style={{ fontSize: 14, opacity: 0.9, fontWeight: 800 }}>
                Approfondisci →
              </div>
            </Extra>
          </CardBase>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

