import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteDescription =
  "Clínica odontológica com duas unidades no Centro de Teófilo Otoni/MG. Implantes, facetas e lentes de contato dental, ortodontia, prótese e endodontia. Agende sua avaliação.";

export const viewport: Viewport = {
  themeColor: "#f7f4ef",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://odontocasais.com.br"),
  title: {
    default: "Odonto Casais | Sorrisos saudáveis começam com confiança",
    template: "%s | Odonto Casais",
  },
  description: siteDescription,
  keywords: [
    "Odonto Casais",
    "consultório odontológico",
    "dentista Teófilo Otoni",
    "Teófilo Otoni",
    "implantes dentários",
    "lentes de contato dental",
    "facetas em porcelana",
    "ortodontia",
    "endodontia",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Odonto Casais",
    title: "Odonto Casais | Sorrisos saudáveis começam com confiança",
    description: siteDescription,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Odonto Casais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Odonto Casais | Sorrisos saudáveis começam com confiança",
    description: siteDescription,
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "/",
  },
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
