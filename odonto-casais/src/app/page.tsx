import SiteHome from "@/components/site-home";
import { JsonLd, getClinicJsonLd } from "@/components/structured-data";
import { getGoogleReviews } from "@/lib/reviews/reviews-service";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Clínica Odontológica em Teófilo Otoni | Odonto Casais",
  description:
    "Dentistas em Teófilo Otoni, MG: duas unidades no Centro, com implantes, lentes de contato dental, ortodontia, canal e próteses. Agende sua avaliação.",
  path: "/",
});

export default async function Home() {
  const reviewsData = await getGoogleReviews();

  return (
    <>
      <JsonLd data={getClinicJsonLd()} />
      <SiteHome reviewsData={reviewsData} />
    </>
  );
}
