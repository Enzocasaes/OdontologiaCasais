import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

import { clinicName, siteUrl } from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
};

// Padrões do site. Título, descrição, canonical e Open Graph ficam em cada página
// (via buildPageMetadata), para não herdar o canonical da home por engano.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `Clínica Odontológica em Teófilo Otoni | ${clinicName}`,
    template: `%s | ${clinicName}`,
  },
  applicationName: clinicName,
  // Permite miniaturas grandes e trechos completos no Google (o 404 sobrescreve com noindex).
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
  // Código da verificação por meta tag do Google Search Console (dispensável se o domínio foi verificado por DNS).
  ...(process.env.GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  }),
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} ${poppins.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
