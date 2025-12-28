"use client";

import { useMemo, useState } from "react";

export type FeaturedItem = {
  label?: string | null;
  title: string;
  excerpt?: string | null;
  priority: number;
  link?: string | null;
};

function safeUrl(url?: string | null) {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  if (!/^https?:\/\//i.test(u)) return `https://${u}`;
  return u;
}

export default function FeaturedSection({ items }: { items: FeaturedItem[] }) {
  const featured = useMemo(() => {
    const arr = [...items].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
    return arr.slice(0, 3);
  }, [items]);

  const main = featured.find((f) => f.priority === 1) ?? featured[0];
  const s1 = featured.find((f) => f.priority === 2) ?? featured[1];
  const s2 = featured.find((f) => f.priority === 3) ?? featured[2];

  // tap/click “sticky”: resta aperta finché non ritappi
  const [active, setActive] = useState<"main" | "s1" | "s2" | null>(null);

  const mainUrl = safeUrl(main?.link);
  const s1Url = safeUrl(s1?.link);
  const s2Url = safeUrl(s2?.link);

  const primaryExpanded = active === "main";

  return (
    <section>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>In evidenza</h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Le priorità politiche di questo momento
        </div>
      </div>

      {/* Layout “prima edizione”: 2 colonne, destra con 2 card */}
      <div className={`wrap ${primaryExpanded ? "primaryExpanded" : ""}`}>
        {/* PRIMARIA */}
        <article
          className={`card primary ${active === "main" ? "isActive" : ""}`}
          onClick={() => setActive((v) => (v === "main" ? null : "main"))}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setActive((v) => (v === "main" ? null : "main"));
            }
          }}
        >
          <div className="tag">{main?.label ?? "CAMPAGNA"}</div>
          <h3 className="title">{main?.title ?? "Primaria (priority 1)"}</h3>
          <p className="excerpt">{main?.excerpt ?? ""}</p>

          {/* EXTRA: si apre su hover (desktop) o se isActive (tap/click) */}
          <div className={`extra ${active === "main" ? "open" : ""}`}>
            <div className="extraInner">
              {mainUrl ? (
                <a className="btn" href={mainUrl} onClick={(e) => e.stopPropagation()}>
                  Apri
                </a>
              ) : (
                <div className="hint">Aggiungi un link nel CMS per mostrare il bottone.</div>
              )}
            </div>
          </div>
        </article>

        {/* DESTRA: due card, devono “seguire” l’allungamento */}
        <div className="rightCol">
          <article
            className={`card small ${active === "s1" ? "isActive" : ""}`}
            onClick={() => setActive((v) => (v === "s1" ? null : "s1"))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActive((v) => (v === "s1" ? null : "s1"));
              }
            }}
          >
            <div className="tag">{s1?.label ?? "EVENTO"}</div>
            <div className="strong">{s1?.title ?? "Secondaria (priority 2)"}</div>
            {s1?.excerpt ? <div className="mini">{s1.excerpt}</div> : null}

            <div className={`extra ${active === "s1" ? "open" : ""}`}>
              <div className="extraInner">
                {s1Url ? (
                  <a className="link" href={s1Url} onClick={(e) => e.stopPropagation()}>
                    Apri →
                  </a>
                ) : (
                  <div className="hint">Aggiungi un link nel CMS.</div>
                )}
              </div>
            </div>
          </article>

          <article
            className={`card small ${active === "s2" ? "isActive" : ""}`}
            onClick={() => setActive((v) => (v === "s2" ? null : "s2"))}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setActive((v) => (v === "s2" ? null : "s2"));
              }
            }}
          >
            <div className="tag">{s2?.label ?? "DOSSIER"}</div>
            <div className="strong">{s2?.title ?? "Terziaria (priority 3)"}</div>
            {s2?.excerpt ? <div className="mini">{s2.excerpt}</div> : null}

            <div className={`extra ${active === "s2" ? "open" : ""}`}>
              <div className="extraInner">
                {s2Url ? (
                  <a className="link" href={s2Url} onClick={(e) => e.stopPropagation()}>
                    Apri →
                  </a>
                ) : (
                  <div className="hint">Aggiungi un link nel CMS.</div>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* CSS inline per non creare altri file */}
      <style jsx>{`
        .wrap {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          align-items: stretch; /* fondamentale: destra segue l’altezza della sinistra */
        }

        .card {
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 22px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
          cursor: pointer;
          outline: none;
        }

        .primary {
          padding: 28px;
          border-radius: 28px;
        }

        .card:hover {
          transform: scale(1.01);
          border-color: rgba(255, 255, 255, 0.28);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
        }

        .card.isActive {
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 22px 70px rgba(0, 0, 0, 0.55);
        }

        .tag {
          font-size: 12px;
          opacity: 0.6;
        }

        .title {
          font-size: 30px;
          margin: 12px 0;
        }

        .excerpt {
          max-width: 560px;
          margin: 0;
          opacity: 0.95;
        }

        .strong {
          font-weight: 800;
          margin-top: 8px;
        }

        .mini {
          margin-top: 6px;
          font-size: 14px;
          opacity: 0.8;
        }

        /* Colonna destra: si “ancora al fondo” quando la primaria si espande */
        .rightCol {
          display: flex;
          flex-direction: column;
          gap: 20px;
          height: 100%; /* si estende all’altezza della cella grid */
          justify-content: flex-start;
          transition: justify-content 220ms ease;
        }

        .wrap.primaryExpanded .rightCol {
          justify-content: flex-end; /* EFFETTO “trascinata giù” */
        }

        /* EXTRA: la parte che “allunga il bordo inferiore” */
        .extra {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 260ms ease, opacity 220ms ease;
        }

        /* su hover desktop si apre */
        .card:hover .extra {
          max-height: 220px;
          opacity: 1;
        }

        /* su tap/click resta aperto */
        .extra.open {
          max-height: 220px;
          opacity: 1;
        }

        .extraInner {
          padding-top: 14px;
        }

        .btn {
          display: inline-block;
          padding: 10px 14px;
          border-radius: 14px;
          background: #fff;
          color: #000;
          text-decoration: none;
          font-weight: 800;
        }

        .link {
          color: #fff;
          text-decoration: none;
          font-weight: 800;
          opacity: 0.9;
        }

        .hint {
          font-size: 13px;
          opacity: 0.75;
        }

        /* Mobile: layout in colonna (se vuoi mantenerlo 2fr/1fr anche su mobile dimmelo) */
        @media (max-width: 860px) {
          .wrap {
            grid-template-columns: 1fr;
          }
          .wrap.primaryExpanded .rightCol {
            justify-content: flex-start; /* su mobile non ha senso “ancorare al fondo” */
          }
        }
      `}</style>
    </section>
  );
}

