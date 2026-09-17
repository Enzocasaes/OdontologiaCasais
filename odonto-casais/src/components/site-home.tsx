"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  MapPinned,
  Menu,
  Star,
  X,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleReviewsCarousel } from "@/components/google-reviews/google-reviews-carousel";
import { GoogleReviewsSummary } from "@/components/google-reviews/reviews-summary";
import { GoogleReviewsStructuredData } from "@/components/google-reviews/structured-data";
import draIanaImage from "@/images/DraIana.jpg";
import drChristianImage from "@/images/DrChristian.jpg";
import drDeivsonImage from "@/images/DrDeivson.jpeg";
import tratamentoAntesImage from "@/images/tratamentoAntes.jpeg";
import tratamentoDepoisImage from "@/images/tratamentoDepois.jpeg";
import instagramIconImage from "@/images/instagram.png";
import logoLockupImage from "@/images/logo-odontocasais-lockup.png";
import logoIconImage from "@/images/logo-odontocasais-icon.png";
import mapsIconImage from "@/images/maps.png";
import clockIconImage from "@/images/relogio.png";
import whatsappIconImage from "@/images/wpp.png";
import type { ReviewsResult } from "@/lib/reviews/types";
import { cn } from "@/lib/utils";

const whatsappNumber = "5533998669729";
const whatsappText = encodeURIComponent("Olá, gostaria de agendar uma avaliação na Odonto Casais.");
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

const clinicLocations = [
  { name: "Unidade Centro", address: "Rua Minervino de Castro Pinto, 80 - Centro, Teófilo Otoni/MG" },
  { name: "Unidade Getúlio Vargas", address: "Av. Getúlio Vargas, 1200 - Centro, Teófilo Otoni/MG" },
];
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

function getGoogleMapsSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Equipe", href: "#equipe" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const essenceParagraph =
  "Acreditamos que tratar bem vai além do procedimento em si: envolve explicar as opções com calma, respeitar o ritmo de cada paciente e acompanhar o caso até o fim. É esse padrão que buscamos manter nas duas unidades, em Teófilo Otoni.";

const principles = [
  {
    title: "Atenção individual",
    description: "Cada plano de tratamento é pensado para a pessoa que está na cadeira, não para um protocolo padrão.",
  },
  {
    title: "Transparência",
    description: "Você sabe o que está sendo feito, e por quê, em cada etapa do tratamento.",
  },
  {
    title: "Atualização constante",
    description: "A equipe segue em formação — pós-graduações, especializações e associações científicas.",
  },
] as const;

const differentials = [
  {
    number: "01",
    title: "Diagnóstico por imagem",
    description: "Planejamento com apoio de radiografia e um dentista especializado em radiologia odontológica antes de iniciar o tratamento.",
  },
  {
    number: "02",
    title: "Biossegurança",
    description: "Protocolos de esterilização e organização seguidos em cada etapa do atendimento, nas duas unidades.",
  },
  {
    number: "03",
    title: "Consultório pensado para reduzir a ansiedade",
    description: "Salas silenciosas e explicação de cada passo antes de começar, para quem evita ir ao dentista.",
  },
] as const;

const featuredTreatment = {
  title: "Implantes e Reabilitação Oral",
  description:
    "Recupere a estética, a mastigação e a confiança para sorrir com tratamentos personalizados e planejamento digital.",
  image: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?q=80&w=1800&auto=format&fit=crop",
  benefits: [
    "Recuperação da função mastigatória",
    "Estética natural",
    "Planejamento individualizado",
    "Tecnologia moderna",
  ],
  conversionPoints: [
    "Avaliação personalizada",
    "Planejamento digital",
    "Atendimento humanizado",
    "Tecnologia moderna",
  ],
} as const;

const treatments = [
  {
    title: "Facetas em porcelana",
    description: "Lâminas finas e resistentes que corrigem cor, formato e alinhamento com resultado natural.",
    image: "https://images.unsplash.com/photo-1677026010083-78ec7f1b84ed?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Lentes de contato dental",
    description: "Ultrafinas e translúcidas, elevam a estética do sorriso preservando o dente natural.",
    image: "https://images.unsplash.com/photo-1654373535457-383a0a4d00f9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Ortodontia",
    description: "Alinhamento funcional e estético da mordida, com acompanhamento contínuo e resultados previsíveis.",
    image: "https://images.unsplash.com/photo-1720685193942-5a1c5ac7fd80?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Prótese removível",
    description: "Reposição confortável e estável de dentes, devolvendo função e naturalidade ao sorriso.",
    image: "https://images.unsplash.com/photo-1562330743-fbc6ef07ca78?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Endodontia",
    description: "Tratamento de canal com técnica precisa para aliviar a dor e preservar o dente natural.",
    image: "https://images.unsplash.com/photo-1643292116094-bd2fb3ed4d64?q=80&w=1200&auto=format&fit=crop",
  },
] as const;

const beforeAfterCase = {
  treatment: "facetas e lentes de contato dental",
  before: tratamentoAntesImage,
  after: tratamentoDepoisImage,
} as const;

const team = [
  {
    name: "Dra. Iana Guedes",
    role: "Dentística, Prótese Dentária e Ortodontia",
    cro: "CRO-MG 58340",
    postGraduations: [
      "Pós-graduada em Dentística",
      "Pós-graduada em Prótese Dentária",
      "Especializando em Ortodontia",
    ],
    bio: "Tenho a convicção de que a odontologia vai muito além de tratar dentes: ela tem o poder de transformar vidas. Ao longo da minha trajetória, busco constantemente novos conhecimentos para oferecer tratamentos de excelência, sempre aliados a um atendimento humanizado. Acredito que cada paciente é único e merece ser acolhido com carinho, atenção e respeito. Meu propósito é cuidar de pessoas, devolver confiança, promover saúde e proporcionar sorrisos que reflitam felicidade e bem-estar. É com dedicação, amor pela profissão e compromisso com a qualidade que sigo construindo essa história, fazendo da odontologia uma ferramenta de transformação na vida de cada paciente.",
    image: draIanaImage,
  },
  {
    name: "Dr. Christian Freitas",
    role: "Endodontia e Radiologia Odontológica",
    cro: "CRO-MG 62584",
    postGraduations: [
      "Especialista em Endodontia",
      "Capacitado em Blindagem de Dentes Tratados Endodonticamente",
      "Pós-graduando em Radiologia Odontológica",
      "Associado à SBPqO e à IADR",
    ],
    bio: "Sou cirurgião-dentista graduado pela Universidade Federal de Juiz de Fora – Campus Governador Valadares (UFJF-GV), especialista em Endodontia, capacitado em Blindagem de Dentes Tratados Endodonticamente e, atualmente, pós-graduando em Radiologia Odontológica. Sou associado à Sociedade Brasileira de Pesquisa Odontológica (SBPqO) e à International Association for Dental Research (IADR), mantendo constante atualização científica e compromisso com uma Odontologia baseada em evidências. Minha atuação é voltada à preservação dos dentes naturais por meio de diagnósticos precisos e tratamentos endodônticos realizados com técnicas modernas e tecnologia de ponta. Acredito que cada paciente merece um atendimento humanizado, transparente e individualizado, priorizando conforto, segurança e excelência em cada etapa do tratamento. Meu compromisso é oferecer soluções eficazes para promover saúde, qualidade de vida e confiança aos pacientes, sempre pautado pela ética, dedicação e aprimoramento profissional contínuo.",
    image: drChristianImage,
  },
  {
    name: "Dr. Deivson Norte",
    role: "Implantodontia",
    cro: "CRO-MG 78629",
    postGraduations: ["Imersão em Implantodontia"],
    bio: "Há histórias que não mudam de propósito, apenas de missão. A minha começou vestindo uma farda da Polícia Militar, onde aprendi que servir ao próximo exige coragem, disciplina e compromisso. São anos protegendo vidas, enfrentando desafios e entendendo o verdadeiro significado da palavra dedicação. Com o passar do tempo, nasceu uma nova paixão: a Odontologia. Descobri que também era possível transformar vidas por meio de um sorriso, aliviar dores, devolver autoestima e cuidar das pessoas de uma forma diferente, mas igualmente importante. A missão continua a mesma, fazer a diferença na vida das pessoas.",
    image: drDeivsonImage,
  },
] as const;

const videoTestimonials: {
  name?: string;
  treatment?: string;
  video?: string;
  poster?: StaticImageData;
}[] = [
  {
    name: "Paciente Odonto Casais",
    treatment: "Facetas e lentes de contato dental",
    video: "/videos/depoimento1.mp4",
  },
  {},
  {},
];

const stats = [
  { value: 12000, label: "pacientes atendidos" },
  { value: 3, label: "anos de experiência" },
  { value: 100, label: "dedicação ao cliente" },
] as const;

const socialLinks = [
  { label: "Instagram @odontocasais", href: "https://www.instagram.com/odontocasais/", icon: instagramIconImage },
  { label: "Instagram @clinica.odontocasais", href: "https://www.instagram.com/clinica.odontocasais/", icon: instagramIconImage },
  { label: "Portal", href: "https://odontocasais.com.br", icon: Globe },
];

const footerLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Contato", href: "#contato" },
] as const;

const sectionMotion: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const staggerMotion: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function BrandMark({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src={logoLockupImage}
        alt="Odonto Casais"
        className="h-10 w-auto rounded-xl shadow-[0_12px_32px_rgba(23,24,26,0.18)] sm:h-12"
        priority={priority}
      />
    </div>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="soft" className="border border-[#bcb5b0] bg-[#d5d2cf] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#525763]">
      {children}
    </Badge>
  );
}

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(() => (reducedMotion ? value : 0));

  useEffect(() => {
    if (reducedMotion) return;

    const element = ref.current;
    if (!element) return;

    let started = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const duration = 1100;
          const startTime = performance.now();

          const tick = (time: number) => {
            const progress = Math.min((time - startTime) / duration, 1);
            setCurrent(Math.round(progress * value));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion, value]);

  return (
    <span ref={ref}>
      {prefix}
      {current.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description: string; align?: "left" | "center" }) {
  return (
    <motion.div variants={sectionMotion} className={cn("max-w-3xl", align === "center" && "mx-auto text-center") }>
      <SectionBadge>{eyebrow}</SectionBadge>
      <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-[#18191c] md:text-5xl">{title}</h2>
      <p className={cn("mt-4 text-base leading-8 text-[#4f535b] md:text-lg", align === "center" && "mx-auto max-w-2xl")}>
        {description}
      </p>
    </motion.div>
  );
}

function FloatingWhatsApp() {
  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Agendar avaliação via WhatsApp"
      className="fixed bottom-5 right-5 z-50 rounded-full transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18191c]/50 focus-visible:ring-offset-2"
    >
      <Image src={whatsappIconImage} alt="" className="h-20 w-20 rounded-2xl object-contain" />
    </Link>
  );
}

function MediaPlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className,
  dark = false,
}: {
  label: string;
  aspect?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      data-placeholder={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-[22px]",
        dark
          ? "bg-[linear-gradient(155deg,#26282c_0%,#1b1c1f_100%)]"
          : "bg-[linear-gradient(155deg,#dedad7_0%,#c9c3be_100%)]",
        aspect,
        className,
      )}
    >
      <Image src={logoIconImage} alt="" className={cn("h-10 w-10 object-contain", dark ? "opacity-30" : "opacity-25")} />
    </div>
  );
}

function SiteHeader({ scrolled, menuOpen, setMenuOpen }: { scrolled: boolean; menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-[#e1dfdd]/82 shadow-[0_14px_40px_rgba(23,24,26,0.08)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="#inicio" aria-label="Ir para o início">
          <BrandMark priority />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#474a52] transition hover:bg-white/70 hover:text-[#18191c]"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="ml-2">
            <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener">
              Agende agora
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#18191c]/10 bg-white/80 text-[#18191c] shadow-[0_10px_30px_rgba(23,24,26,0.08)] lg:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-[#18191c]/8 bg-[#e1dfdd]/96 px-6 pb-6 pt-2 shadow-[0_16px_34px_rgba(23,24,26,0.08)] backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-[#18191c] hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-3 w-full">
                <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => setMenuOpen(false)}>
                  Agende uma avaliação
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MapPlaceholder() {
  const [unitCentro, unitGetulioVargas] = clinicLocations;
  const googleMapsDirectionsEmbedUrl = googleMapsApiKey
    ? `https://www.google.com/maps/embed/v1/directions?key=${googleMapsApiKey}&origin=${encodeURIComponent(unitCentro.address)}&destination=${encodeURIComponent(unitGetulioVargas.address)}`
    : null;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Como chegar</CardTitle>
            <CardDescription>Nossas duas unidades em Teófilo Otoni</CardDescription>
          </div>
          <Image src={mapsIconImage} alt="" className="h-10 w-10 object-contain" />
        </div>
      </CardHeader>
      <CardContent>
        {googleMapsDirectionsEmbedUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-[#18191c]/8">
            <iframe
              src={googleMapsDirectionsEmbedUrl}
              title="Mapa com as unidades Odonto Casais"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-[26px] border border-[#18191c]/8 bg-[linear-gradient(180deg,#dedad8_0%,#d4cfcc_100%)] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(23,24,26,0.06),transparent_22%),radial-gradient(circle_at_80%_25%,rgba(23,24,26,0.05),transparent_18%),linear-gradient(transparent_49%,rgba(23,24,26,0.03)_50%,transparent_51%),linear-gradient(90deg,transparent_49%,rgba(23,24,26,0.03)_50%,transparent_51%)] bg-[length:100%_100%,100%_100%,24px_24px,24px_24px]" />
            <div className="relative aspect-[4/3] rounded-[22px] border border-white/70 bg-white/55 p-5 shadow-[0_18px_40px_rgba(23,24,26,0.08)] backdrop-blur-sm">
              <div className="absolute left-[38%] top-[42%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17181a] text-white shadow-[0_14px_30px_rgba(23,24,26,0.18)]">
                  <MapPinned className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#535863] shadow-sm">
                  {unitCentro.name}
                </span>
              </div>
              <div className="absolute left-[66%] top-[62%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17181a] text-white shadow-[0_14px_30px_rgba(23,24,26,0.18)]">
                  <MapPinned className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#535863] shadow-sm">
                  {unitGetulioVargas.name}
                </span>
              </div>
              <div className="absolute left-5 top-5 flex gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#515662] shadow-sm">Google Maps</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#515662] shadow-sm">
                  chave não configurada
                </span>
              </div>
              <div className="absolute inset-x-5 bottom-5 rounded-[20px] bg-[#17181a]/92 px-4 py-3 text-white shadow-[0_14px_34px_rgba(23,24,26,0.18)]">
                <p className="text-xs uppercase tracking-[0.22em] text-white/65">Endereços</p>
                {clinicLocations.map((location) => (
                  <p key={location.name} className="mt-1 text-sm font-medium">
                    {location.name} — {location.address}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        {clinicLocations.map((location) => (
          <Button asChild variant="secondary" key={location.name}>
            <Link href={getGoogleMapsSearchUrl(location.address)} target="_blank" rel="noreferrer noopener">
              Abrir {location.name} no Maps
            </Link>
          </Button>
        ))}
        <Button asChild variant="outline">
          <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener">
            Tirar dúvidas no WhatsApp
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon | StaticImageData;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={
        "src" in Icon
          ? "flex h-11 w-11 items-center justify-center transition hover:-translate-y-0.5"
          : "flex h-11 w-11 items-center justify-center rounded-full border border-[#18191c]/10 bg-white text-[#18191c] transition hover:-translate-y-0.5 hover:bg-[#18191c] hover:text-white"
      }
      aria-label={label}
    >
      {"src" in Icon ? <Image src={Icon} alt="" className="h-9 w-9 object-contain" /> : <Icon className="h-4 w-4" />}
    </a>
  );
}

function TeamPortrait({ name, role, cro, postGraduations, bio, image }: (typeof team)[number]) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="group overflow-hidden border-[#18191c]/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
      <div className="flex flex-col sm:flex-row">
        <div className="p-4 sm:w-[38%] sm:shrink-0 sm:self-start">
          <Image src={image} alt={name} width={500} height={625} className="aspect-[4/5] w-full rounded-[20px] object-cover object-top" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 p-5 pt-1 sm:pt-5 sm:pl-0">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-[#81756c]">{role}</p>
            <p className="mt-1.5 text-xs text-[#847b74]">{cro}</p>
          </div>
          <div>
            <p className={`text-sm leading-6 text-[#4f535b] ${expanded ? "" : "line-clamp-4"}`}>{bio}</p>
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-1 text-xs font-medium text-[#18191c] underline underline-offset-2 hover:text-[#4f535b]"
            >
              {expanded ? "Ler menos" : "Ler mais"}
            </button>
          </div>
          <p className="text-xs leading-5 text-[#847b74]">{postGraduations.join(" · ")}</p>
          <Button asChild variant="outline" size="sm" className="w-fit">
            <Link href="#contato">Agendar avaliação</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

function VideoTestimonialCard({ item }: { item: (typeof videoTestimonials)[number] }) {
  return (
    <motion.div variants={sectionMotion} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Card className="h-full overflow-hidden border-[#18191c]/8 bg-white transition-all duration-300 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
        <div className="relative aspect-[9/16] w-full overflow-hidden bg-[#18191c]">
          {item.video ? (
            <video
              src={item.video}
              poster={item.poster?.src}
              controls
              preload="none"
              playsInline
              className="h-full w-full object-cover"
            >
              Seu navegador não suporta vídeos.
            </video>
          ) : (
            <MediaPlaceholder label="Vídeo de depoimento de paciente" aspect="" className="h-full w-full rounded-none" dark />
          )}
        </div>
        {item.video && (
          <CardHeader>
            <CardTitle className="text-base">{item.name}</CardTitle>
            <p className="text-xs uppercase tracking-[0.18em] text-[#81756c]">{item.treatment}</p>
          </CardHeader>
        )}
      </Card>
    </motion.div>
  );
}

function AppDivider() {
  return <div className="mx-auto h-px w-full max-w-7xl bg-[linear-gradient(90deg,transparent,rgba(24,25,28,0.12),transparent)]" />;
}

function FeaturedTreatmentCard({ item }: { item: typeof featuredTreatment }) {
  return (
    <motion.div variants={sectionMotion} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden border-[#18191c]/8 bg-white shadow-[0_30px_80px_rgba(23,24,26,0.14)]">
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[320px] overflow-hidden lg:min-h-[640px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority={false}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,24,26,0.05)_0%,transparent_28%,rgba(23,24,26,0.28)_100%)] lg:bg-[linear-gradient(90deg,transparent_55%,rgba(23,24,26,0.18)_100%)]" />
            <div className="absolute left-5 top-5">
              <Badge className="flex items-center gap-1.5 bg-[#17181a] px-4 py-1.5 text-white shadow-[0_14px_34px_rgba(23,24,26,0.28)]">
                <Star className="h-3.5 w-3.5 fill-current text-[#c2bbb7]" />
                Especialidade da clínica
              </Badge>
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-8 p-8 md:p-10 lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#81756c]">Tratamento em destaque</p>
              <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#18191c] md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[#4f535b] md:text-lg">{item.description}</p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {item.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#3d414a]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#81756c]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg" className="mt-8 h-auto whitespace-normal py-3.5 text-center">
                <Link href="#contato">
                  Quero agendar uma avaliação
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            </div>

            <div className="rounded-[24px] border border-[#18191c]/8 bg-[#e0dcda] p-6">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {item.conversionPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-[#3d414a]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#18191c]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-5 h-auto w-full whitespace-normal py-3.5 text-center sm:w-auto">
                <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener">
                  Agendar minha avaliação pelo WhatsApp
                  <Image src={whatsappIconImage} alt="" className="h-6 w-6 shrink-0 object-contain" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function TreatmentCard({ item }: { item: (typeof treatments)[number] }) {
  return (
    <motion.div variants={sectionMotion} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="group h-full overflow-hidden border-[#18191c]/8 bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(23,24,26,0.1)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Link
            href="#contato"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#18191c] underline-offset-4 hover:underline"
          >
            Agendar avaliação
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function SiteHome({ reviewsData }: { reviewsData: ReviewsResult }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#e1ddda_0%,#e8e5e2_40%,#e1ddda_100%)]">
      <SiteHeader scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="relative z-10 pt-20 md:pt-24">
        <section id="inicio" className="scroll-mt-28">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-16 pt-8 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-14 xl:py-16">
            <motion.div initial="hidden" animate="visible" variants={staggerMotion} className="min-w-0 max-w-2xl">
              <motion.div variants={sectionMotion}>
                <SectionBadge>Odonto Casais</SectionBadge>
              </motion.div>
              <motion.h1 variants={sectionMotion} className="mt-6 font-heading text-5xl font-semibold tracking-tight text-[#18191c] md:text-7xl">
                Sorrisos saudáveis começam com confiança.
              </motion.h1>
              <motion.p variants={sectionMotion} className="mt-6 max-w-xl text-lg leading-8 text-[#4f535b] md:text-xl">
                Duas unidades em Teófilo Otoni, com dentistas de especialidades diferentes e explicação clara sobre cada tratamento antes de começar.
              </motion.p>
              <motion.div variants={sectionMotion} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Button asChild size="lg">
                  <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener">
                    Agende uma avaliação
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Link
                  href="#tratamentos"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#18191c] underline-offset-4 hover:underline"
                >
                  Conheça nossos tratamentos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0"
            >
              <Card className="overflow-hidden border-[#18191c]/8 bg-[#17181a] p-4 shadow-[0_24px_64px_rgba(23,24,26,0.18)] md:p-5">
                <MediaPlaceholder label="Foto da recepção ou de um consultório em uso" aspect="aspect-[4/3]" dark />
              </Card>
            </motion.div>
          </div>
        </section>

        <AppDivider />

        <section id="sobre" className="scroll-mt-28 px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <motion.div variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }} className="min-w-0">
                <Card className="overflow-hidden border-[#18191c]/8 bg-white p-4 shadow-[0_20px_50px_rgba(23,24,26,0.10)] md:p-5">
                  <MediaPlaceholder label="Foto da fachada ou da recepção da clínica" aspect="aspect-[4/3]" />
                </Card>
              </motion.div>
              <div className="min-w-0">
                <SectionHeading
                  eyebrow="Sobre a clínica"
                  title="Especialidades diferentes, num só lugar."
                  description="A Odonto Casais reúne dentistas de dentística, prótese, ortodontia, endodontia e implantodontia, para que cada paciente encontre o profissional certo para o seu caso sem precisar procurar em vários lugares."
                />
                <motion.div variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }} className="mt-5 text-[#4f535b]">
                  <p className="text-base leading-8 md:text-lg">
                    Atendemos em duas unidades no Centro de Teófilo Otoni, de segunda a sábado.
                  </p>
                </motion.div>
                <motion.div
                  variants={sectionMotion}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-12% 0px" }}
                  className="mt-8 flex flex-wrap gap-x-10 gap-y-6 border-t border-[#18191c]/10 pt-6"
                >
                  {stats.map((item, index) => (
                    <div key={item.label} className={cn("flex items-baseline gap-3", index !== 0 && "border-l border-[#18191c]/10 pl-10")}>
                      <p className="font-heading text-4xl font-semibold tracking-tight text-[#18191c]">
                        <AnimatedCounter value={item.value} suffix={item.value === 100 ? "%" : "+"} />
                      </p>
                      <p className="max-w-[9rem] text-sm leading-5 text-[#50545e]">{item.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <AppDivider />

        <section id="equipe" className="scroll-mt-28 px-6 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={sectionMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mx-auto max-w-2xl text-center"
            >
              <SectionBadge>Nossa equipe</SectionBadge>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-[#18191c] md:text-6xl">
                Quem vai cuidar do seu sorriso
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#4f535b] md:text-lg">
                Três dentistas, cada um com uma especialidade. Você é atendido por quem entende do seu caso.
              </p>
            </motion.div>

            <motion.div
              variants={staggerMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-start gap-5 md:grid-cols-2"
            >
              {team.map((member) => (
                <motion.div key={member.name} variants={sectionMotion} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <TeamPortrait {...member} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <AppDivider />

        <section id="essencia" className="scroll-mt-28 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <motion.div variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }} className="min-w-0">
                <MediaPlaceholder label="Foto da área de espera ou de um consultório" aspect="aspect-[4/3]" />
              </motion.div>
              <div className="min-w-0">
                <SectionBadge>Nossa essência</SectionBadge>
                <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-[#18191c] md:text-4xl">
                  O que guia o nosso trabalho todos os dias.
                </h2>
                <p className="mt-4 text-base leading-8 text-[#4f535b] md:text-lg">{essenceParagraph}</p>
                <ul className="mt-8 grid gap-5 sm:grid-cols-3">
                  {principles.map((item) => (
                    <li key={item.title}>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#81756c]">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#4f535b]">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="diferenciais" className="scroll-mt-28 px-6 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Diferenciais"
              title="O que sustenta o nosso atendimento."
              description="Três coisas que fazem diferença no dia a dia do consultório, além do procedimento em si."
            />
            <motion.div variants={staggerMotion} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px" }} className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
              {differentials.map((item) => (
                <motion.div key={item.number} variants={sectionMotion} className="border-t border-[#18191c]/10 pt-6">
                  <span className="font-heading text-sm font-semibold text-[#81756c]">{item.number}</span>
                  <h3 className="mt-3 text-lg font-semibold text-[#18191c]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4f535b]">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="tratamentos" className="scroll-mt-28 px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Tratamentos"
              title="Tratamentos que realizamos com mais frequência."
              description="Do clareamento à reabilitação completa. Fale com a equipe para saber qual se aplica ao seu caso."
            />
            <motion.div
              variants={staggerMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mt-10"
            >
              <FeaturedTreatmentCard item={featuredTreatment} />
            </motion.div>

            <motion.div
              variants={staggerMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {treatments.map((item) => (
                <TreatmentCard key={item.title} item={item} />
              ))}
            </motion.div>
          </div>
        </section>

        <section id="antes-e-depois" className="scroll-mt-28 px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Resultado real"
              title={`${beforeAfterCase.treatment.charAt(0).toUpperCase()}${beforeAfterCase.treatment.slice(1)}: um caso real.`}
              description="Fotos do mesmo paciente, com autorização para divulgação."
            />
            <motion.div
              variants={sectionMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mx-auto mt-10 max-w-3xl"
            >
              <Card className="overflow-hidden border-[#18191c]/8 bg-white p-4 shadow-[0_24px_60px_rgba(23,24,26,0.12)] md:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[18px]">
                      <Image src={beforeAfterCase.before} alt={`${beforeAfterCase.treatment} - antes`} fill className="object-cover" />
                    </div>
                    <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#81756c]">Antes</p>
                  </div>
                  <div>
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[18px]">
                      <Image src={beforeAfterCase.after} alt={`${beforeAfterCase.treatment} - depois`} fill className="object-cover" />
                    </div>
                    <p className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#81756c]">Depois</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="depoimentos" className="scroll-mt-28 px-6 py-20 md:px-8 md:py-28">
          <GoogleReviewsStructuredData summary={reviewsData.summary} reviews={reviewsData.reviews} />
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Avaliações dos pacientes"
              title="O que os pacientes dizem no Google."
              description="Avaliações reais, sem edição, de quem já passou pela Odonto Casais."
            />
            <motion.div
              variants={sectionMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mt-6"
            >
              <GoogleReviewsSummary summary={reviewsData.summary} />
            </motion.div>
            {reviewsData.reviews.length > 0 && (
              <div className="mt-10">
                <GoogleReviewsCarousel reviews={reviewsData.reviews} />
              </div>
            )}
          </div>
        </section>

        <section id="depoimentos-video" className="scroll-mt-28 px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Depoimentos em vídeo"
              title="Experiências de quem já passou pela Odonto Casais."
              description="Relatos gravados por pacientes que autorizaram o uso da imagem."
              align="center"
            />
            <motion.div
              variants={staggerMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {videoTestimonials.map((item, index) => (
                <VideoTestimonialCard key={item.video ?? `pendente-${index}`} item={item} />
              ))}
            </motion.div>
          </div>
        </section>

        <section id="contato" className="scroll-mt-28 px-6 pb-20 pt-6 md:px-8 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Contato" title="Fale com a gente." description="WhatsApp, endereços das duas unidades e horário de atendimento." />
            <div className="mt-10 grid items-start gap-5 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
                    <CardHeader>
                      <Image src={whatsappIconImage} alt="" className="h-12 w-12 object-contain" />
                      <CardTitle className="mt-4 text-lg">WhatsApp</CardTitle>
                      <CardDescription>(33) 99866-9729</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
                    <CardHeader>
                      <Image src={clockIconImage} alt="" className="h-12 w-12 object-contain" />
                      <CardTitle className="mt-4 text-lg">Horário</CardTitle>
                      <CardDescription>Segunda a sexta, 08h às 18h · Sábado, 08h às 12h</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  {clinicLocations.map((location) => (
                    <Card key={location.name} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
                      <CardHeader>
                        <Image src={mapsIconImage} alt="" className="h-12 w-12 object-contain" />
                        <CardTitle className="mt-4 text-lg">{location.name}</CardTitle>
                        <CardDescription>{location.address}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-3">
                        <Button asChild variant="secondary" size="sm">
                          <Link href={getGoogleMapsSearchUrl(location.address)} target="_blank" rel="noreferrer noopener">
                            Como chegar
                          </Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener">
                            Agendar
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
                  <CardHeader>
                    <Image src={instagramIconImage} alt="" className="h-12 w-12 object-contain" />
                    <CardTitle className="mt-4 text-lg">Instagram</CardTitle>
                    <CardDescription>Bastidores e novidades das duas unidades.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href="https://www.instagram.com/odontocasais/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-between gap-3 rounded-2xl border border-[#18191c]/10 bg-white/60 px-4 py-3 text-sm font-medium text-[#18191c] transition hover:border-[#18191c]/25 hover:bg-white"
                    >
                      @odontocasais
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/clinica.odontocasais/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center justify-between gap-3 rounded-2xl border border-[#18191c]/10 bg-white/60 px-4 py-3 text-sm font-medium text-[#18191c] transition hover:border-[#18191c]/25 hover:bg-white"
                    >
                      @clinica.odontocasais
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </div>
              <MapPlaceholder />
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#18191c]/8 bg-[#e0dcda]/85 px-6 py-12 backdrop-blur-sm md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.7fr_0.7fr_1fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-xs text-sm leading-7 text-[#525660]">
              Duas unidades no Centro de Teófilo Otoni/MG, com dentistas de especialidades diferentes.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <SocialLink key={social.label} {...social} />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#81756c]">Navegação</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {footerLinks.map((item) => (
                <Link key={item.label} href={item.href} className="text-[#525660] transition hover:text-[#18191c]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#81756c]">Tratamentos</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <Link href="#tratamentos" className="text-[#525660] transition hover:text-[#18191c]">
                {featuredTreatment.title}
              </Link>
              {treatments.map((item) => (
                <Link key={item.title} href="#tratamentos" className="text-[#525660] transition hover:text-[#18191c]">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#81756c]">Contato</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#525660]">
              <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="transition hover:text-[#18191c]">
                (33) 99866-9729
              </Link>
              {clinicLocations.map((location) => (
                <p key={location.name}>
                  <span className="block font-medium text-[#3d414a]">{location.name}</span>
                  {location.address}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-[#18191c]/8 pt-6 text-sm text-[#565b66]">
          <p>© 2026 Odonto Casais. Todos os direitos reservados.</p>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
