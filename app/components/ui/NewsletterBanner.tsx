"use client";

import * as React from "react";
import GlassButton from "./GlassButton";

type NewsletterBannerProps = {
  label?: string;
  title: string;
  description?: string;
  ctaLabel: string;
  href: string;
  onClick?: () => void;
};

export default function NewsletterBanner({
  label = "Newsletter",
  title,
  description,
  ctaLabel,
  href,
  onClick,
}: NewsletterBannerProps) {
  return (
    <section className="newsletter-banner">
      <div>
        <div className="newsletter-banner__label">{label}</div>
        <div className="newsletter-banner__title">{title}</div>
        {description ? (
          <div className="newsletter-banner__description">{description}</div>
        ) : null}
      </div>

      <GlassButton href={href} onClick={onClick} variant="primary" size="md">
        {ctaLabel}
      </GlassButton>
    </section>
  );
}
