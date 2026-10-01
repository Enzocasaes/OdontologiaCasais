import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/lib/reviews/types";
import { GoogleLogo } from "./google-logo";

export function StarRow({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)} role="img" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={cn("h-3.5 w-3.5", index < Math.round(rating) ? "fill-bronze" : "fill-stone")}
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

export function GoogleReviewCard({ review, className }: { review: GoogleReview; className?: string }) {
  return (
    <figure className={cn("flex flex-col border-t border-line pt-6", className)}>
      <StarRow rating={review.rating} />
      <blockquote className="mt-4 flex-1 text-[1.0625rem] leading-[1.65] text-ink-soft">
        &ldquo;{review.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-4 text-sm">
        <span className="min-w-0">
          <span className="block truncate font-medium text-ink">{review.authorName}</span>
          {review.relativeTime && <span className="text-muted">{review.relativeTime}</span>}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
          <GoogleLogo className="h-3.5 w-3.5" />
          Google
        </span>
      </figcaption>
    </figure>
  );
}
