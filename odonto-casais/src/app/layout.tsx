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
  formatDetection: { telephone: false },
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
