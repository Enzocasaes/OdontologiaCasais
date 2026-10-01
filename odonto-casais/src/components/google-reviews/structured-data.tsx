import type { ReviewsResult } from "@/lib/reviews/types";

export function GoogleReviewsStructuredData({ summary, reviews }: ReviewsResult) {
  if (!summary.isLive) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "Odonto Casais",
    ...(summary.totalReviews > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: summary.averageRating,
        reviewCount: summary.totalReviews,
      },
    }),
    ...(reviews.length > 0 && {
      review: reviews.slice(0, 10).map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.authorName,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.text,
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
