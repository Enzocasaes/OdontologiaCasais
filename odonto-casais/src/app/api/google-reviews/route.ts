import { NextResponse } from "next/server";

import { getGoogleReviews } from "@/lib/reviews/reviews-service";

export const revalidate = 3600;

export async function GET() {
  const data = await getGoogleReviews();
  return NextResponse.json(data);
}
