import * as React from "react";

export type GlassCardProps = React.HTMLAttributes<HTMLDivElement>;

export default function GlassCard({ style, ...props }: GlassCardProps) {
  const base: React.CSSProperties = {
    padding: 18,
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "transform 220ms ease, border-color 220ms ease, background 220ms ease",
  };

  return <div {...props} style={{ ...base, ...(style ?? null) }} />;
}
