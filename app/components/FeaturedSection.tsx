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

function Card({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <article
      onClick={onClick}
      style={{
        padding: active ? 30 : 20,
        borderRadius: active ? 28 : 22,
        border: "1px solid rgba(255,255,255,0.15)",
        cursor: onClick ? "pointer" : "default",
        transition:
          "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, padding 180ms ease",
        willChange: "transform",
        boxShadow: active ? "0 20px 60px rgba(0,0,0,0.45)" : "none",
      }}
      onMouseEnter={(e) => {
        // hover “stretch” leggero (solo desktop)
        (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.28)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 18px 50px rgba(0,0,0,0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.15)";
        (e.currentTarget as HTMLElement).style.boxShadow = active
          ? "0 20px 60px rgba(0,0,0,0.45)"
          : "none";
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      {children}
    </article>
  );
}

export default function FeaturedSection({ items }: { items: FeaturedItem[] }) {
  const main = useMemo(
    () => items.find((f) => f.priority === 1) ?? items[0],
    [items]
  );
  const secondary = useMemo(
    () => items.filter((f) => f !== main).slice(0, 2),
    [items, main]
  );

  // card “attiva” su mobile/tap
  const [active, setActive] = useState<"main" | "s1" | "s2" | null>(null);

  const hasSecondaries = secondary.length === 2;

  return (
    <section>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>In evidenza</h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Le priorità politiche di questo momento
        </div>
      </div>

      {/* Grid responsiva: su mobile va in colonna */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 20,
          alignItems: "start",
        }}
      >
        {/* MAIN: normalmente 8 colonne, se attiva diventa 12 */}
        <div
          style={{
            gridColumn:
              active === "main"
                ? "1 / -1"
                : "span 12",
          }}
        >
          <Card
            active={active === "main"}
            onClick={() => setActive((v) => (v === "main" ? null : "main"))}
          >
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              <SafeText>{main?.label ?? "CAMPAGNA"}</SafeText>
            </div>

            <h3 style={{ fontSize: 30, margin: "12px 0" }}>
              <SafeText>{main?.title ?? "Nessun contenuto trovato"}</SafeText>
            </h3>

            {main?.excerpt ? (
              <p style={{ maxWidth: 560, margin: 0, opacity: 0.9 }}>
                <SafeText>{main.excerpt}</SafeText>
              </p>
            ) : null}

            {main?.link ? (
              <div style={{ marginTop: 14 }}>
                <a
                  href={main.link}
                  style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: 14,
                    background: "#fff",
                    color: "#000",
                    textDecoration: "none",
                    fontWeight: 800,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Apri
                </a>
              </div>
            ) : null}
          </Card>
        </div>

        {/* Secondarie wrapper: su desktop sta a destra, su mobile sotto */}
        <div
          style={{
            gridColumn:
              active === "main"
                ? "1 / -1"
                : "span 12",
            display: "grid",
            gap: 20,
          }}
        >
          {hasSecondaries ? (
            secondary.map((item, idx) => {
              const key = idx === 0 ? "s1" : "s2";
              const isActive = active === key;

              return (
                <div
                  key={item.priority}
                  style={{
                    // se una secondaria è attiva: diventa “larga” (full width)
                    gridColumn: isActive ? "1 / -1" : "auto",
                  }}
                >
                  <Card
                    active={isActive}
                    onClick={() =>
                      setActive((v) => (v === key ? null : key))
                    }
                  >
                    <div style={{ fontSize: 12, opacity: 0.6 }}>
                      <SafeText>{item.label ?? "IN EVIDENZA"}</SafeText>
                    </div>

                    <strong style={{ display: "block", marginTop: 8 }}>
                      <SafeText>{item.title}</SafeText>
                    </strong>

                    {item.excerpt ? (
                      <div style={{ fontSize: 14, opacity: 0.8, marginTop: 6 }}>
                        <SafeText>{item.excerpt}</SafeText>
                      </div>
                    ) : null}

                    {item.link ? (
                      <div style={{ marginTop: 10 }}>
                        <a
                          href={item.link}
                          style={{
                            color: "#fff",
                            textDecoration: "none",
                            fontWeight: 800,
                            opacity: 0.9,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Apri →
                        </a>
                      </div>
                    ) : null}
                  </Card>
                </div>
              );
            })
          ) : (
            <>
              <Card>
                <div style={{ fontSize: 12, opacity: 0.6 }}>EVENTO</div>
                <strong style={{ display: "block", marginTop: 8 }}>
                  Crea un record Featured con priority = 2
                </strong>
              </Card>
              <Card>
                <div style={{ fontSize: 12, opacity: 0.6 }}>DOSSIER</div>
                <strong style={{ display: "block", marginTop: 8 }}>
                  Crea un record Featured con priority = 3
                </strong>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Nota: su desktop vogliamo 8/4: lo facciamo con una media query CSS globale se vuoi.
          Per ora questo è già responsive e “allargabile” al tap. */}
    </section>
  );
}
