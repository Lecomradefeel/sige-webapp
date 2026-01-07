"use client";

import * as React from "react";

type BaseProps = {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
};

export type GlassButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function GlassButton({
  variant = "primary",
  size = "md",
  href,
  className,
  ...props
}: GlassButtonProps) {
  const classes = [
    "glass-button",
    `glass-button--${variant}`,
    `glass-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return <a {...props} href={href} className={classes} />;
  }

  return <button {...props} type={props.type ?? "button"} className={classes} />;
}
