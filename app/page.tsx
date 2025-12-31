import Hero from "./components/Hero";
import FeaturedSection from "./components/FeaturedSection"; // o dov’è ora
import NewsletterBanner from "./components/NewsletterBanner";
import ParticipateSection from "./sections/participate/ParticipateSection.server";
import SupportSection from "./sections/support/SupportSection.server";
import NewsletterSection from "./sections/newsletter/NewsletterSection";
 // se ce l’hai
// import InformatiSection from "./sections/news/InformatiSection.server";

export default function Home() {
  const eventsEnabled = (process.env.EVENTS_ENABLED ?? "true").toLowerCase() === "true";

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "32px 20px" }}>
      <Hero eventsEnabled={eventsEnabled} />

      <FeaturedSection />
      <NewsletterBanner />

      <div id="partecipa">
        <ParticipateSection />
      </div>

      <SupportSection />

      {/* InformatiSection (news mensili) */}

      <div id="newsletter">
        <NewsletterSection />
      </div>
    </main>
  );
}
