import HeroSection from "./sections/hero/HeroSection.server";
import FeaturedSection from "./sections/featuredsection/FeaturedSection.server";
import NewsletterBanner from "./sections/newsletter/NewsletterBannerSection";
import ParticipateSection from "./sections/participate/ParticipateSection.server";
import SupportSection from "./sections/support/SupportSection.server";
// import NewsSection from "./sections/news/NewsSection.server"; // quando lo fai

export default async function Home() {
  // se ti serve il feature flag lato server:
  const eventsEnabled = process.env.EVENTS_ENABLED === "true";

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px" }}>
      <HeroSection eventsEnabled={eventsEnabled} />

      <FeaturedSection />

      <NewsletterBanner />

      <div id="partecipa">
        <ParticipateSection />
      </div>

      <div id="sostienici">
        <SupportSection />
      </div>

      {/* <NewsSection /> */}
    </main>
  );
}
