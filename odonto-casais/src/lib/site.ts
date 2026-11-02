/*
 * Dados institucionais da clínica, usados pelo site, pelos metadados e pelo JSON-LD.
 * Mantenha tudo aqui para que as informações fiquem iguais em todas as páginas.
 */

/*
 * Domínio canônico (com www, que é para onde a Vercel redireciona o domínio sem www).
 * Não usar VERCEL_PROJECT_PRODUCTION_URL: a Vercel escolhe o domínio mais curto, que
 * seria o sem www, e o canonical passaria a apontar para uma URL que redireciona.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  return "https://www.clinicaodontocasais.com.br";
}

export const siteUrl = resolveSiteUrl();

// Data da última mudança relevante no conteúdo da home (vai para o sitemap). Atualize à mão.
export const homeUpdatedAt = "2026-11-02";

export const clinicName = "Odonto Casais";

export const whatsappNumber = "5533998669729";
export const whatsappDisplay = "(33) 99866-9729";
export const phoneE164 = "+55-33-99866-9729";

export function getWhatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const whatsappUrl = getWhatsappUrl("Olá, gostaria de agendar uma avaliação na Odonto Casais.");
export const whatsappQuestionUrl = getWhatsappUrl("Olá, tenho uma dúvida sobre um tratamento na Odonto Casais.");

export const openingHours = [
  { days: "Segunda a sexta", hours: "08h às 18h", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
  { days: "Sábado", hours: "08h às 12h", dayOfWeek: ["Saturday"], opens: "08:00", closes: "12:00" },
] as const;

export type ClinicLocation = {
  slug: string;
  name: string;
  street: string;
  district: string;
  /*
   * CEP e coordenadas entram no JSON-LD só quando preenchidos. Use exatamente os mesmos
   * dados do perfil da unidade no Google Meu Negócio (coordenadas: clique com o botão
   * direito no pino do Google Maps e copie os números).
   */
  postalCode?: string;
  geo?: { latitude: number; longitude: number };
};

export const clinicLocations: readonly ClinicLocation[] = [
  { slug: "unidade-centro", name: "Unidade Centro", street: "Rua Minervino de Castro Pinto, 80", district: "Centro, Teófilo Otoni/MG", postalCode: "39800-091" },
  { slug: "unidade-getulio-vargas", name: "Unidade Getúlio Vargas", street: "Av. Getúlio Vargas, 1200", district: "Centro, Teófilo Otoni/MG", postalCode: "39800-015" },
];

// Formato que o Google Maps reconhece ("Rua, número, Bairro, Cidade - UF").
export function getFullAddress(location: ClinicLocation) {
  return `${location.street}, ${location.district.replace("/", " - ")}`;
}

export function getMapUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function getDirectionsUrl(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

export const instagramProfiles = [
  { handle: "@odontocasais", href: "https://www.instagram.com/odontocasais/" },
  { handle: "@clinica.odontocasais", href: "https://www.instagram.com/clinica.odontocasais/" },
] as const;

export const navItems = [
  { label: "Sobre", href: "/#sobre" },
  { label: "Tratamentos", href: "/#tratamentos" },
  { label: "Equipe", href: "/#equipe" },
  { label: "Depoimentos", href: "/#depoimentos" },
  { label: "Contato", href: "/#contato" },
] as const;
