"use client";

export type ParticipateCard = {
  order: number;
  kicker?: string | null;
  title: string;
  description?: string | null;
  link?: string | null;
  variant?: "default" | "primary" | null;
};

function safeUrl(url?: string | null) {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) return `https://${u}`;
  return u;
}

export default function ParticipateSectionClient({
  title,
  subtitle,
  cards,
}: {
  title: string;
  subtitle?: string | null;
  cards: ParticipateCard[];
}) {
  const sorted = [...cards].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return (
    <section style={{ marginTop: 48 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>{title}</h2>
        {subtitle ? (
          <div style={{ fontSize: 14, opacity: 0.7 }}>{subtitle}</div>
        ) : null}
      </div>

      <div
        className="ctaGrid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          alignItems: "stretch",
        }}
      >
        {sorted.map((c) => {
          const isPrimary = c.variant === "primary";
          const href = safeUrl(c.link);

          const baseStyle: React.CSSProperties = {
            display: "block",
            padding: 22,
            borderRadius: 22,
            textDecoration: "none",
            color: "inherit",
            background: isPrimary
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.02)",
            border: isPrimary
              ? "1px solid rgba(255,255,255,0.30)"
              : "1px solid rgba(255,255,255,0.15)",
            boxShadow: isPrimary ? "0 22px 70px rgba(0,0,0,0.55)" : "none",
            transition:
              "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
            cursor: href ? "pointer" : "default",
          };

          const onEnter = (e: React.PointerEvent<HTMLElement>) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1.01)";
            if (!isPrimary) el.style.borderColor = "rgba(255,255,255,0.28)";
            el.style.boxShadow = isPrimary
              ? "0 26px 80px rgba(0,0,0,0.65)"
              : "0 18px 50px rgba(0,0,0,0.45)";
          };

          const onLeave = (e: React.PointerEvent<HTMLElement>) => {
            const el = e.currentTarget as HTMLElement;
            el.style.transform = "scale(1)";
            el.style.borderColor = isPrimary
              ? "rgba(255,255,255,0.30)"
              : "rgba(255,255,255,0.15)";
            el.style.boxShadow = isPrimary
              ? "0 22px 70px rgba(0,0,0,0.55)"
              : "none";
          };

          const content = (
            <>
              <div style={{ fontSize: 12, opacity: isPrimary ? 0.7 : 0.6 }}>
                {c.kicker ?? ""}
              </div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: isPrimary ? 900 : 800,
                  marginTop: 8,
                }}
              >
                {c.title}
              </div>

              {c.description ? (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 14,
                    opacity: isPrimary ? 0.9 : 0.8,
                  }}
                >
                  {c.description}
                </div>
              ) : null}

              <div
                style={{
                  marginTop: 12,
                  fontWeight: isPrimary ? 900 : 800,
                  opacity: 0.9,
                }}
              >
                Vai →
              </div>
            </>
          );

          return href ? (
            <a
              key={c.order}
              href={href}
              style={baseStyle}
              onPointerEnter={onEnter}
              onPointerLeave={onLeave}
            >
              {content}
            </a>
          ) : (
            <div
              key={c.order}
              style={baseStyle}
              onPointerEnter={onEnter}
              onPointerLeave={onLeave}
            >
              {content}
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .ctaGrid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
