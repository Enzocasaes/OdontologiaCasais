import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";
import { getTreatmentPath, treatments } from "@/lib/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...treatments.map((item) => ({
      url: `${siteUrl}${getTreatmentPath(item.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
