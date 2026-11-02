import type { MetadataRoute } from "next";

import { homeUpdatedAt, siteUrl } from "@/lib/site";
import { getTreatmentPath, treatments } from "@/lib/treatments";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: homeUpdatedAt,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...treatments.map((item) => ({
      url: `${siteUrl}${getTreatmentPath(item.slug)}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
