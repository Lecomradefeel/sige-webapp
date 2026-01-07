"use client";

import * as React from "react";
import GlassButton from "./GlassButton";

type CTAProps = {
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "ghost";
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
};

export default function CTA({
  href,
  target,
  rel,
  variant = "primary",
  style,
  children,
  onClick,
  disabled,
}: CTAProps) {
  if (href) {
    return (
      <GlassButton
        as="a"
        href={href}
        target={target}
        rel={rel}
        variant={variant}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        style={{
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          ...(style ?? null),
        }}
        aria-disabled={disabled || undefined}
      >
        {children}
      </GlassButton>
    );
  }

  return (
    <GlassButton
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      variant={variant}
      style={style}
      disabled={disabled}
    >
      {children}
    </GlassButton>
  );
}
