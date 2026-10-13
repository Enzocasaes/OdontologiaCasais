import {
  clinicLocations,
  clinicName,
  instagramProfiles,
  openingHours,
  phoneE164,
  siteUrl,
} from "@/lib/site";

/*
 * JSON-LD (schema.org). Só entram dados que estão publicados no site.
 * Não há avaliações aqui de propósito: o Google não aceita avaliações de uma empresa
 * publicadas pela própria empresa (self-serving reviews) em LocalBusiness.
 * Coordenadas e CEP ficam de fora até serem confirmados.
 */

const organizationId = `${siteUrl}/#organizacao`;

function formatStreetAddress(street: string, district: string) {
  const neighborhood = district.split(",")[0];
  return `${street} - ${neighborhood}`;
}

export function getClinicJsonLd() {
  const sameAs = instagramProfiles.map((profile) => profile.href);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: clinicName,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/og-image.jpg`,
        telephone: phoneE164,
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#site`,
        url: siteUrl,
        name: clinicName,
        inLanguage: "pt-BR",
        publisher: { "@id": organizationId },
      },
      ...clinicLocations.map((location) => ({
        "@type": "Dentist",
        "@id": `${siteUrl}/#${location.slug}`,
        name: `${clinicName} — ${location.name}`,
        url: siteUrl,
        image: `${siteUrl}/og-image.jpg`,
        logo: `${siteUrl}/logo.png`,
        telephone: phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: formatStreetAddress(location.street, location.district),
          addressLocality: "Teófilo Otoni",
          addressRegion: "MG",
          addressCountry: "BR",
        },
        areaServed: { "@type": "City", name: "Teófilo Otoni" },
        openingHoursSpecification: openingHours.map((item) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: item.dayOfWeek,
          opens: item.opens,
          closes: item.closes,
        })),
        parentOrganization: { "@id": organizationId },
        sameAs,
      })),
    ],
  };
}

export function getBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" escapado para o conteúdo não fechar a tag <script> por engano.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
