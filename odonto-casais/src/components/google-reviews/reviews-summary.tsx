import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReviewsSummary } from "@/lib/reviews/types";

export function GoogleReviewsSummary({ summary }: { summary: ReviewsSummary }) {
  const rounded = Math.round(summary.averageRating * 10) / 10;
  const filledStars = Math.round(summary.averageRating);

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-[28px] border border-[#bcb5b0] bg-white/85 px-5 py-4 shadow-[0_10px_28px_rgba(23,24,26,0.06)] sm:rounded-full sm:py-3">
      <span className="text-lg font-semibold text-[#18191c]">{rounded.toLocaleString("pt-BR")}/5</span>
      <div className="flex items-center gap-1 text-[#b6aea8]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className={cn("h-4 w-4", index < filledStars ? "fill-current" : "fill-none text-[#cdc8c4]")} />
        ))}
      </div>
      <span className="text-sm text-[#4f535b]">
        Baseado em {summary.totalReviews.toLocaleString("pt-BR")} avaliações no Google
      </span>
      <Button asChild variant="outline" size="sm" className="w-full sm:ml-auto sm:w-auto">
        <Link href={summary.profileUrl} target="_blank" rel="noreferrer noopener">
          Ver todas as avaliações no Google
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
