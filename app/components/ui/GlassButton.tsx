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
    border: "1px solid rgba(255,255,255,0.28)",
    background: "rgba(255,255,255,0.10)",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    transition: "transform 180ms ease, background 180ms ease, border-color 180ms ease",
    userSelect: "none",
  };

  const ghost: React.CSSProperties = {
    background: "rgba(0,0,0,0.14)",
    border: "1px solid rgba(255,255,255,0.22)",
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
          variant === "ghost" ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.14)";
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.background =
          variant === "ghost" ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.10)";
        props.onMouseLeave?.(e);
      }}
    />
  );
}
