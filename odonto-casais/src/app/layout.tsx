import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteDescription =
  "Site institucional premium da Odonto Casais, com foco em confiança, tecnologia, acolhimento e geração de novos pacientes.";

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
    "odontologia premium",
    "Teófilo Otoni",
    "clareamento dental",
    "implantes dentários",
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
      <body className="min-h-full bg-[#e1ddda] font-sans text-[#18191c] selection:bg-[#c5beba] selection:text-[#18191c]">
        {children}
      </body>
    </html>
  );
}
