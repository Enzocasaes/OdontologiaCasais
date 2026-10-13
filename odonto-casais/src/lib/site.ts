/*
 * Dados institucionais da clínica, usados pelo site, pelos metadados e pelo JSON-LD.
 * Mantenha tudo aqui para que as informações fiquem iguais em todas as páginas.
 */

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "https://odontocasais.com.br";
}

export const siteUrl = resolveSiteUrl();

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

export const clinicLocations = [
  { slug: "unidade-centro", name: "Unidade Centro", street: "Rua Minervino de Castro Pinto, 80", district: "Centro, Teófilo Otoni/MG" },
  { slug: "unidade-getulio-vargas", name: "Unidade Getúlio Vargas", street: "Av. Getúlio Vargas, 1200", district: "Centro, Teófilo Otoni/MG" },
] as const;

export type ClinicLocation = (typeof clinicLocations)[number];

// Formato que o Google Maps reconhece ("Rua, número, Bairro, Cidade - UF").
export function getFullAddress(location: ClinicLocation) {
  return `${location.street}, ${location.district.replace("/", " - ")}`;
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
