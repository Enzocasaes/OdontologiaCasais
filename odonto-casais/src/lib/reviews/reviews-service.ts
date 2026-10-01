import { createGooglePlacesProvider } from "./google-places-provider";
import type { GoogleReview, ReviewsResult } from "./types";

// Sem dados do Google, o site não mostra nota nem avaliações — nunca exibimos textos
// que não vieram da API.
const emptyResult: ReviewsResult = {
  summary: { averageRating: 0, totalReviews: 0, profileUrl: "", isLive: false },
  reviews: [],
};

function sortReviews(reviews: GoogleReview[]): GoogleReview[] {
  return [...reviews].sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    if (b.time !== a.time) return b.time - a.time;
    return b.text.length - a.text.length;
  });
}

export async function getGoogleReviews(): Promise<ReviewsResult> {
  const provider = createGooglePlacesProvider();

  try {
    const result = await provider.getReviews();
    if (!result) {
      console.warn("[google-reviews] GOOGLE_PLACES_API_KEY/GOOGLE_PLACE_ID não configurados.");
      return emptyResult;
    }
    // O Google pode devolver a nota e o total sem o texto de nenhuma avaliação;
    // nesse caso a seção mostra só a nota e o link para o perfil.
    return { summary: result.summary, reviews: sortReviews(result.reviews.filter((review) => review.text.trim())) };
  } catch (error) {
    console.warn(`[google-reviews] Falha ao buscar avaliações: ${error instanceof Error ? error.message : String(error)}`);
    return emptyResult;
  }
}
