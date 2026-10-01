export type GoogleReview = {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  relativeTime: string;
  time: number;
  text: string;
};

export type ReviewsSummary = {
  averageRating: number;
  totalReviews: number;
  profileUrl: string;
  /** true quando nota e total vieram da API do Google; false quando são dados de reserva. */
  isLive: boolean;
};

export type ReviewsResult = {
  summary: ReviewsSummary;
  reviews: GoogleReview[];
};

export interface ReviewsProvider {
  getReviews(): Promise<ReviewsResult | null>;
}
