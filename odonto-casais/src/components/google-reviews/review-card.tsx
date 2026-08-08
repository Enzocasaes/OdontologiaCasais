import Image from "next/image";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/lib/reviews/types";
import { GoogleLogo } from "./google-logo";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function GoogleReviewCard({ review, className }: { review: GoogleReview; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[28px] border border-[#18191c]/8 bg-white p-6 shadow-[0_16px_40px_rgba(23,24,26,0.07)] transition-shadow duration-300 hover:shadow-[0_22px_54px_rgba(23,24,26,0.13)]",
        className,
      )}
    >
      <div className="flex items-center gap-1 text-[#b6aea8]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className={cn("h-4 w-4", index < review.rating ? "fill-current" : "fill-none text-[#cdc8c4]")} />
        ))}
      </div>

      <p className="mt-4 line-clamp-6 flex-1 text-sm leading-6 text-[#3d414a]">&ldquo;{review.text}&rdquo;</p>

      <div className="mt-6 flex items-center gap-3 border-t border-[#18191c]/6 pt-4">
        {review.authorPhotoUrl ? (
          <Image
            src={review.authorPhotoUrl}
            alt={review.authorName}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ccc6c2] text-sm font-semibold text-[#18191c]">
            {getInitials(review.authorName) || "GC"}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-[#18191c]">{review.authorName}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-[#83776e]">{review.relativeTime}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#18191c]/8 bg-[#e0dcda] px-2.5 py-1 text-[11px] font-medium text-[#474a52]">
          <GoogleLogo className="h-3.5 w-3.5" />
          Google
        </div>
      </div>
    </div>
  );
}
