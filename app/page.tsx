import HeroSection from "./sections/hero/HeroSection.server";
import FeaturedSection from "./sections/featuredsection/FeaturedSection.server";
import NewsletterBanner from "./sections/newsletter/NewsletterBannerSection";

import ParticipateSection from "./sections/participate/ParticipateSection.server";
import SupportSection from "./sections/support/SupportSection.server";

export default async function Home() {
  const eventsEnabled = process.env.EVENTS_ENABLED === "true";

  return (
    <main className="snap-page">
      <section className="snap-section">
        <div className="snap-inner">
          <HeroSection eventsEnabled={eventsEnabled} />
        </div>
      </section>

      <section className="snap-section">
        <div className="snap-inner">
          <FeaturedSection />
        </div>
      </section>

      <section className="snap-section">
        <div className="snap-inner">
          <NewsletterBanner />
        </div>
      </section>

      <section id="partecipa" className="snap-section">
        <div className="snap-inner">
          <ParticipateSection />
        </div>
      </section>

      <section id="sostienici" className="snap-section">
        <div className="snap-inner">
          <SupportSection />
        </div>
      </section>

      <div id="newsletter" />
    </main>
  );
}
