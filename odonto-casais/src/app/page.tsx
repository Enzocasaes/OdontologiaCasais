import SiteHome from "@/components/site-home";
import { getGoogleReviews } from "@/lib/reviews/reviews-service";

export default async function Home() {
  const reviewsData = await getGoogleReviews();

  return <SiteHome reviewsData={reviewsData} />;
}
