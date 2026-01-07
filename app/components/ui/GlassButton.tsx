"use client";

import * as React from "react";

export type GlassButtonProps<E extends React.ElementType = "button"> = {
  as?: E;
  variant?: "primary" | "ghost";
  style?: React.CSSProperties;
} & React.ComponentPropsWithoutRef<E>;

export default function GlassButton<E extends React.ElementType = "button">({
  as,
  variant = "primary",
  style,
  ...props
}: GlassButtonProps<E>) {
  const Component = as ?? "button";
  const isDisabled = "disabled" in props ? Boolean(props.disabled) : false;

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

  const disabled: React.CSSProperties = {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none",
  };

  return (
    <Component
      {...props}
      style={{
        ...base,
        ...(variant === "ghost" ? ghost : null),
        ...(isDisabled ? disabled : null),
        ...(style ?? null),
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        if (isDisabled) return;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        (e.currentTarget as HTMLElement).style.background =
          variant === "ghost" ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.14)";
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        if (isDisabled) return;
        (e.currentTarget as HTMLElement).style.transform = "translateY(0px)";
        (e.currentTarget as HTMLElement).style.background =
          variant === "ghost" ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.10)";
        props.onMouseLeave?.(e);
      }}
    />
  );
}
