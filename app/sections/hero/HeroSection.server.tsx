import HeroSectionClient from "./HeroSection.client";

type Props = {
  eventsEnabled: boolean;
};

export default async function HeroSection({ eventsEnabled }: Props) {
  // tieni qui configurazioni “di ambiente”
  const newsletterUrl =
    process.env.NEXT_PUBLIC_BREVO_NEWSLETTER_URL ??
    "https://3350a044.sibforms.com/serve/MUIFAI4ZSahwShbY75oEMC3WUOPXMdL54q2n1utsd46sfgdlWVEdq5fcZ3yimSTFDc1--7_Q_jIqwjb-Qz23YYljq4UBm4U2GQSsDxkYPO_655O2INfoBcCDZfdqlO87ucBAZIpt9QEsNFKRLrBBkAfUytmkMbH5-bza8x_W67oYtFZ9jPUVZLmdjVqvj4P_cYIjnXFr5NmEcrdk";

  return <HeroSectionClient eventsEnabled={eventsEnabled} newsletterUrl={newsletterUrl} />;
}
