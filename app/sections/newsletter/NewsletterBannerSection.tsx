import NewsletterBanner from "@/app/components/ui/NewsletterBanner";

export default function NewsletterBannerSection() {
  return (
    <NewsletterBanner
      label="Newsletter"
      title="Ricevi notizie e iniziative una volta al mese"
      description="Aggiornamenti locali, eventi, campagne e dossier."
      ctaLabel="Iscriviti"
      href="#newsletter"
    />
  );
}
