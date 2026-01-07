import * as React from "react";

export type CTAProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "light" | "dark";
};

export default function CTA({ variant = "light", style, ...props }: CTAProps) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 14,
    fontWeight: 900,
    textDecoration: "none",
    border: "1px solid transparent",
    transition: "transform 180ms ease, background 180ms ease, border-color 180ms ease",
  };

  const variantStyles: React.CSSProperties =
    variant === "dark"
      ? {
          background: "rgba(0,0,0,0.65)",
          color: "#fff",
          borderColor: "rgba(255,255,255,0.2)",
        }
      : {
          background: "#fff",
          color: "#000",
        };

  return <a {...props} style={{ ...base, ...variantStyles, ...(style ?? null) }} />;
}
