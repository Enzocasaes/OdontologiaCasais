import type { Metadata } from "next";

import { clinicName } from "@/lib/site";

const shareImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Fachada da Odonto Casais, clínica odontológica em Teófilo Otoni",
};

/*
 * Metadados de uma página indexável. O Next mescla `openGraph` e `alternates` de forma
 * rasa (o da página substitui o do layout), então cada página monta os seus completos.
 */
export function buildPageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: clinicName,
      url: path,
      title,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
