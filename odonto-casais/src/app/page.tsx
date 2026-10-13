import SiteHome from "@/components/site-home";
import { JsonLd, getClinicJsonLd } from "@/components/structured-data";
import { getGoogleReviews } from "@/lib/reviews/reviews-service";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Clínica Odontológica em Teófilo Otoni | Odonto Casais",
  description:
    "Conheça a Odonto Casais, clínica odontológica no Centro de Teófilo Otoni, MG. Implantes, lentes de contato dental, ortodontia e canal. Agende sua avaliação.",
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
