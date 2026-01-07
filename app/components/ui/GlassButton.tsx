"use client";

import * as React from "react";

export type GlassButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function GlassButton({
  variant = "primary",
  style,
  ...props
}: GlassButtonProps) {
  const base: React.CSSProperties = {
    padding: "12px 16px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.22)",
    background: "var(--accent)",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    transition: "transform 180ms ease, background 180ms ease, border-color 180ms ease",
    userSelect: "none",
  };

  const ghost: React.CSSProperties = {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
  };

  return (
    <button
      {...props}
      style={{
        ...base,
        ...(variant === "ghost" ? ghost : null),
        ...(style ?? null),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.background =
          variant === "ghost" ? "rgba(255,255,255,0.12)" : "var(--accent-hover)";
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.background =
          variant === "ghost" ? "rgba(255,255,255,0.08)" : "var(--accent)";
        props.onMouseLeave?.(e);
      }}
    />
  );
}
