import type { GoogleReview, ReviewsProvider } from "./types";

const PLACE_DETAILS_ENDPOINT = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "rating,userRatingCount,googleMapsUri,reviews";

type GooglePlaceReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
  };
};

type GooglePlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceReview[];
};

function mapReview(review: GooglePlaceReview, index: number): GoogleReview {
  return {
    id: review.name ?? `google-review-${index}`,
    authorName: review.authorAttribution?.displayName ?? "Paciente Google",
    authorPhotoUrl: review.authorAttribution?.photoUri,
    rating: review.rating ?? 5,
    relativeTime: review.relativePublishTimeDescription ?? "",
    time: review.publishTime ? Date.parse(review.publishTime) / 1000 : Date.now() / 1000,
    text: review.text?.text ?? review.originalText?.text ?? "",
  };
}

export function createGooglePlacesProvider(): ReviewsProvider {
  return {
    async getReviews() {
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      const placeId = process.env.GOOGLE_PLACE_ID;

      if (!apiKey || !placeId) {
        return null;
      }

      const response = await fetch(`${PLACE_DETAILS_ENDPOINT}/${placeId}?languageCode=pt-BR`, {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        throw new Error(`Google Places API respondeu com status ${response.status}.`);
      }

      const data = (await response.json()) as GooglePlaceDetails;

      return {
        summary: {
          averageRating: data.rating ?? 0,
          totalReviews: data.userRatingCount ?? data.reviews?.length ?? 0,
          profileUrl: data.googleMapsUri ?? "https://www.google.com/maps",
        },
        reviews: (data.reviews ?? []).map(mapReview),
      };
    },
  };
}
