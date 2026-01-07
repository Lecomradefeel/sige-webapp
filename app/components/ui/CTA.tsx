"use client";

import * as React from "react";
import GlassButton, { GlassButtonProps } from "./GlassButton";

type CTAProps = GlassButtonProps;

export default function CTA({
  variant = "ghost",
  size = "md",
  className,
  ...props
}: CTAProps) {
  return (
    <GlassButton
      {...props}
      variant={variant}
      size={size}
      className={["cta-pill", className].filter(Boolean).join(" ")}
    />
  );
}
