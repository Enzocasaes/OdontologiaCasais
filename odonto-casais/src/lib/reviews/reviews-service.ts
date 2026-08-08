import { fallbackReviewsResult } from "./fallback-reviews";
import { createGooglePlacesProvider } from "./google-places-provider";
import type { GoogleReview, ReviewsResult } from "./types";

function sortReviews(reviews: GoogleReview[]): GoogleReview[] {
  return [...reviews].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    if (b.time !== a.time) return b.time - a.time;
    return b.text.length - a.text.length;
  });
}

function fallbackResult(reason: string) {
  console.warn(`[google-reviews] ${reason} Usando dados de reserva até a integração com o Google ser configurada.`);
  return { summary: fallbackReviewsResult.summary, reviews: sortReviews(fallbackReviewsResult.reviews) };
}

export async function getGoogleReviews(): Promise<ReviewsResult> {
  const provider = createGooglePlacesProvider();

  try {
    const result = await provider.getReviews();
    if (!result) {
      return fallbackResult("GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID não configurados.");
    }
    // A nota e o total de avaliações são reais assim que a API responde, mesmo que o
    // Google não devolva o texto de nenhuma avaliação individual para este local.
    if (result.reviews.length === 0) {
      return { summary: result.summary, reviews: sortReviews(fallbackReviewsResult.reviews) };
    }
    return { summary: result.summary, reviews: sortReviews(result.reviews) };
  } catch (error) {
    return fallbackResult(`Falha ao buscar avaliações reais: ${error instanceof Error ? error.message : String(error)}`);
  }
}
