import GlassCard from "@/app/components/ui/GlassCard";

export default function FeaturedSectionServer() {
  return (
    <section style={{ marginTop: 26 }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 28, margin: 0 }}>In evidenza</h2>
        <div style={{ fontSize: 14, opacity: 0.7 }}>
          Le priorità politiche di questo momento
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 20,
        }}
      >
        <GlassCard
          as="article"
          size="lg"
          style={{ minHeight: 180, borderRadius: 28 }}
        >
          <div style={{ fontSize: 12, opacity: 0.6 }}>CAMPAGNA</div>
          <h3 style={{ fontSize: 30, margin: "12px 0" }}>Primaria</h3>
          <p style={{ maxWidth: 560, opacity: 0.85 }}>
            Placeholder: qui ricolleghiamo DatoCMS.
          </p>
        </GlassCard>

        <div style={{ display: "grid", gap: 20 }}>
          <GlassCard as="article" size="sm" style={{ minHeight: 80 }}>
            <strong>Secondaria</strong>
          </GlassCard>

          <GlassCard as="article" size="sm" style={{ minHeight: 80 }}>
            <strong>Terziaria</strong>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
