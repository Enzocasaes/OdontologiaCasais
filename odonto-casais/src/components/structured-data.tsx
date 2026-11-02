import {
  clinicLocations,
  clinicName,
  getFullAddress,
  getMapUrl,
  instagramProfiles,
  openingHours,
  phoneE164,
  siteUrl,
  type ClinicLocation,
} from "@/lib/site";
import { team, type TeamMember } from "@/lib/team";
import { getTreatmentPath, type Treatment } from "@/lib/treatments";

/*
 * JSON-LD (schema.org). Só entram dados que estão publicados no site.
 * Não há avaliações aqui de propósito: o Google não aceita avaliações de uma empresa
 * publicadas pela própria empresa (self-serving reviews) em LocalBusiness.
 * CEP e coordenadas só entram quando preenchidos em src/lib/site.ts.
 */

const organizationId = `${siteUrl}/#organizacao`;

function formatStreetAddress(street: string, district: string) {
  const neighborhood = district.split(",")[0];
  return `${street} - ${neighborhood}`;
}

function getDentistId(location: ClinicLocation) {
  return `${siteUrl}/#${location.slug}`;
}

function getDentistNode(location: ClinicLocation) {
  return {
    "@type": "Dentist",
    "@id": getDentistId(location),
    name: `${clinicName} — ${location.name}`,
    url: `${siteUrl}/#${location.slug}`,
    image: `${siteUrl}/og-image.jpg`,
    logo: `${siteUrl}/logo.png`,
    telephone: phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: formatStreetAddress(location.street, location.district),
      addressLocality: "Teófilo Otoni",
      addressRegion: "MG",
      ...(location.postalCode && { postalCode: location.postalCode }),
      addressCountry: "BR",
    },
    ...(location.geo && { geo: { "@type": "GeoCoordinates", ...location.geo } }),
    hasMap: getMapUrl(getFullAddress(location)),
    areaServed: { "@type": "City", name: "Teófilo Otoni" },
    openingHoursSpecification: openingHours.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: item.dayOfWeek,
      opens: item.opens,
      closes: item.closes,
    })),
    parentOrganization: { "@id": organizationId },
    sameAs: instagramProfiles.map((profile) => profile.href),
  };
}

function getPersonId(member: TeamMember) {
  return `${siteUrl}/#${member.slug}`;
}

// Só o que está publicado na seção Equipe: nome, área de atuação, CRO, foto e resumo.
function getPersonNode(member: TeamMember) {
  return {
    "@type": "Person",
    "@id": getPersonId(member),
    name: member.name,
    jobTitle: "Dentista",
    description: member.summary,
    knowsAbout: member.role.split(/, | e /),
    identifier: { "@type": "PropertyValue", propertyID: "CRO-MG", value: member.cro.replace("CRO-MG ", "") },
    image: `${siteUrl}${member.image.src}`,
    url: getPersonId(member),
    worksFor: { "@id": organizationId },
  };
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
        employee: team.map((member) => ({ "@id": getPersonId(member) })),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#site`,
        url: siteUrl,
        name: clinicName,
        inLanguage: "pt-BR",
        publisher: { "@id": organizationId },
      },
      ...clinicLocations.map(getDentistNode),
      ...team.map(getPersonNode),
    ],
  };
}

/*
 * Página de tratamento: o serviço, oferecido pelas duas unidades, e as perguntas
 * frequentes que aparecem na página (o FAQPage precisa refletir o texto visível).
 */
export function getTreatmentJsonLd(treatment: Treatment) {
  const url = `${siteUrl}${getTreatmentPath(treatment.slug)}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#servico`,
        name: treatment.name,
        serviceType: treatment.name,
        description: treatment.description,
        url,
        areaServed: { "@type": "City", name: "Teófilo Otoni" },
        provider: clinicLocations.map(getDentistNode),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#perguntas-frequentes`,
        mainEntity: treatment.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
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
