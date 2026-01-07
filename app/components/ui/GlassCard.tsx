"use client";

import * as React from "react";

type GlassCardProps = React.HTMLAttributes<HTMLElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  as?: "div" | "section" | "article";
  className?: string;
};

export default function GlassCard({
  variant = "default",
  size = "md",
  href,
  as: Tag = "div",
  className,
  style,
  ...props
}: GlassCardProps) {
  const classes = [
    "glass-card",
    `glass-card--${variant}`,
    `glass-card--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        {...props}
        href={href}
        className={classes}
        style={{ textDecoration: "none", ...style }}
      />
    );
  }

  return <Tag {...props} className={classes} style={style} />;
}
