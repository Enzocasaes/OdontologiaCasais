"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Globe,
  Heart,
  HeartHandshake,
  Lightbulb,
  MapPinned,
  Menu,
  Scale,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Star,
  Smile,
  Target,
  UserCheck,
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
import instagramIconImage from "@/images/instagram.png";
import logoLockupImage from "@/images/logo-odontocasais-lockup.png";
import mapsIconImage from "@/images/maps.png";
import clockIconImage from "@/images/relogio.png";
import whatsappIconImage from "@/images/wpp.png";
import { createIllustration } from "@/lib/placeholders";
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
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Antes e depois", href: "#antes-e-depois" },
  { label: "Equipe", href: "#equipe" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

const heroImage = createIllustration({
  title: "Consultório moderno",
  subtitle: "Tecnologia, acolhimento e precisão clínica.",
  accent: "#c5beba",
  tone: "#1b1d20",
  mode: "clinic",
  initials: "OC",
});

const aboutImage = createIllustration({
  title: "Ambiente acolhedor",
  subtitle: "Estrutura pensada para conforto e confiança.",
  accent: "#bab2ad",
  tone: "#222429",
  mode: "clinic",
  initials: "OC",
});

const comparisonCases = [
  {
    title: "Clareamento controlado",
    description: "Resultados naturais com acompanhamento clínico.",
    badge: "Estética",
    before: createIllustration({
      title: "Antes",
      subtitle: "Manchas e opacidade no esmalte.",
      accent: "#616775",
      tone: "#27292e",
      mode: "clinic",
      initials: "A",
    }),
    after: createIllustration({
      title: "Depois",
      subtitle: "Mais luminosidade, sem aspecto artificial.",
      accent: "#c2bbb7",
      tone: "#1d1f22",
      mode: "clinic",
      initials: "D",
    }),
  },
  {
    title: "Harmonia do sorriso",
    description: "Pequenos ajustes que elevam a estética facial.",
    badge: "Facetas",
    before: createIllustration({
      title: "Antes",
      subtitle: "Desgaste e assimetria discretos.",
      accent: "#5f6471",
      tone: "#26282d",
      mode: "clinic",
      initials: "A",
    }),
    after: createIllustration({
      title: "Depois",
      subtitle: "Linha do sorriso refinada e proporcional.",
      accent: "#ccc6c2",
      tone: "#1d1f22",
      mode: "clinic",
      initials: "D",
    }),
  },
  {
    title: "Restauração integrada",
    description: "Reabilitação funcional com acabamento premium.",
    badge: "Implantes",
    before: createIllustration({
      title: "Antes",
      subtitle: "Espaços e insegurança ao sorrir.",
      accent: "#5c616e",
      tone: "#282a2e",
      mode: "clinic",
      initials: "A",
    }),
    after: createIllustration({
      title: "Depois",
      subtitle: "Função, conforto e estética em equilíbrio.",
      accent: "#bdb6b1",
      tone: "#1d1f22",
      mode: "clinic",
      initials: "D",
    }),
  },
] as const;

const differentials = [
  {
    title: "Atendimento humanizado",
    description: "Escuta ativa e acompanhamento próximo, com atenção genuína às necessidades de cada paciente.",
    icon: BadgeCheck,
  },
  {
    title: "Tecnologia de ponta",
    description: "Equipamentos modernos e recursos avançados de diagnóstico para tratamentos mais precisos e seguros.",
    icon: ScanFace,
  },
  {
    title: "Cuidado personalizado",
    description: "Planejamento individual para cada caso, respeitando o ritmo e as expectativas de cada paciente.",
    icon: Sparkles,
  },
  {
    title: "Tratamentos seguros",
    description: "Protocolos rigorosos de biossegurança e processos organizados em cada etapa do atendimento.",
    icon: ShieldCheck,
  },
  {
    title: "Ambiente moderno",
    description: "Espaços leves, silenciosos e acolhedores, pensados para reduzir ansiedade e elevar a experiência.",
    icon: Clock3,
  },
  {
    title: "Busca por excelência",
    description: "Compromisso contínuo com atualização técnica e qualidade em cada etapa do tratamento.",
    icon: Smile,
  },
] as const;

const missionText =
  "Promover saúde, bem-estar e autoestima por meio de um atendimento odontológico humanizado, aliado à tecnologia e à excelência clínica.";

const visionText =
  "Ser reconhecida como referência em odontologia em Teófilo Otoni, oferecendo tratamentos modernos, atendimento humanizado e uma experiência que inspire confiança em cada paciente.";

const values = [
  {
    title: "Respeito",
    description: "Valorizamos cada paciente e suas necessidades.",
    icon: Heart,
  },
  {
    title: "Ética",
    description: "Transparência e responsabilidade em cada atendimento.",
    icon: Scale,
  },
  {
    title: "Acolhimento",
    description: "Um ambiente preparado para que todos se sintam confortáveis.",
    icon: HeartHandshake,
  },
  {
    title: "Inovação",
    description: "Investimos continuamente em tecnologia e atualização profissional.",
    icon: Lightbulb,
  },
  {
    title: "Compromisso com a qualidade",
    description: "Excelência em cada etapa do tratamento.",
    icon: Award,
  },
  {
    title: "Cuidado individualizado",
    description: "Cada paciente recebe um plano de atendimento personalizado.",
    icon: UserCheck,
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

const team = [
  {
    name: "Dra. Iana Guedes",
    role: "Dentística, Prótese Dentária e Ortodontia",
    cro: "CRO-MG 58340",
    graduationLabel: "Formada",
    graduationYear: "2020",
    yearsOfExperience: "6 anos de atuação",
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
    graduationLabel: "Formado",
    graduationYear: "2022",
    yearsOfExperience: "4 anos e meio de atuação",
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
    graduationLabel: "Formado",
    graduationYear: "2025",
    yearsOfExperience: "6 meses de atuação",
    postGraduations: ["Imersão em Implantodontia"],
    bio: "Há histórias que não mudam de propósito, apenas de missão. A minha começou vestindo uma farda da Polícia Militar, onde aprendi que servir ao próximo exige coragem, disciplina e compromisso. São anos protegendo vidas, enfrentando desafios e entendendo o verdadeiro significado da palavra dedicação. Com o passar do tempo, nasceu uma nova paixão: a Odontologia. Descobri que também era possível transformar vidas por meio de um sorriso, aliviar dores, devolver autoestima e cuidar das pessoas de uma forma diferente, mas igualmente importante. A missão continua a mesma, fazer a diferença na vida das pessoas.",
    image: drDeivsonImage,
  },
] as const;

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

const beforeAfterAlt = (title: string, variant: "Antes" | "Depois") => `${title} - ${variant}`;

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
    <Button asChild className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full p-0 shadow-[0_18px_50px_rgba(23,24,26,0.24)]" size="lg">
      <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener" aria-label="Agendar avaliação via WhatsApp">
        <Image src={whatsappIconImage} alt="" className="h-6 w-6 object-contain" />
      </Link>
    </Button>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[22px] border border-white/12 bg-white/8 px-4 py-3 text-left backdrop-blur-sm">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/65">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function SlideDots({ count, active, onChange }: { count: number; active: number; onChange: (index: number) => void }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`Ir para o item ${index + 1}`}
          onClick={() => onChange(index)}
          className={cn(
            "h-2.5 rounded-full transition-all duration-200",
            index === active ? "w-8 bg-[#18191c]" : "w-2.5 bg-[#aca29a] hover:bg-[#8d8077]",
          )}
        />
      ))}
    </div>
  );
}

function ComparisonSlider({ item }: { item: (typeof comparisonCases)[number] }) {
  const [split, setSplit] = useState(56);

  return (
    <motion.div variants={sectionMotion} className="grid gap-6">
      <Card className="overflow-hidden bg-[#17181a] text-white shadow-[0_24px_60px_rgba(23,24,26,0.18)]">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={item.after} alt={beforeAfterAlt(item.title, "Depois")} fill priority={false} className="object-cover" />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
              <Image src={item.before} alt={beforeAfterAlt(item.title, "Antes")} fill priority={false} className="object-cover" />
            </div>
            <div className="absolute inset-y-0 left-[calc(var(--split)-1px)] hidden w-[2px] bg-white/80 shadow-[0_0_0_8px_rgba(255,255,255,0.22)] lg:block" style={{ left: `${split}%` }} />
            <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/18 via-transparent to-black/12" />
            <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm">
              Antes e depois
            </div>
            <div className="absolute left-5 bottom-5 right-5 flex flex-wrap items-center justify-between gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Caso atual</p>
                <p className="mt-1 text-lg font-semibold text-white">{item.title}</p>
              </div>
              <div className="rounded-2xl bg-[#cbc5c1] px-4 py-3 text-[#18191c] shadow-[0_12px_30px_rgba(23,24,26,0.16)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#535863]">Resultado esperado</p>
                <p className="mt-1 text-lg font-semibold">{item.description}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 bg-[#1c1d1f] px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-white/70">Arraste o controle para comparar a evolução clínica.</span>
              <span className="text-sm font-medium text-white/90">{split}%</span>
            </div>
            <input
              type="range"
              min={18}
              max={82}
              value={split}
              onChange={(event) => setSplit(Number(event.target.value))}
              className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#c2bbb7]"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
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
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#18191c]/10 bg-white text-[#18191c] transition hover:-translate-y-0.5 hover:bg-[#18191c] hover:text-white"
      aria-label={label}
    >
      {"src" in Icon ? <Image src={Icon} alt="" className="h-5 w-5 object-contain" /> : <Icon className="h-4 w-4" />}
    </a>
  );
}

function CounterStat({ value, label }: { value: number; label: string }) {
  return (
    <Card className="group border-[#18191c]/8 bg-white/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
      <CardContent className="p-6">
        <p className="font-heading text-4xl font-semibold tracking-tight text-[#18191c] md:text-5xl">
          <AnimatedCounter value={value} suffix={value === 100 ? "%" : "+"} />
        </p>
        <p className="mt-2 text-sm leading-6 text-[#50545e]">{label}</p>
      </CardContent>
    </Card>
  );
}

function TeamPortrait({ name, role, cro, graduationLabel, graduationYear, yearsOfExperience, postGraduations, bio, image }: (typeof team)[number]) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="group h-full overflow-hidden border-[#18191c]/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
      <div className="flex h-full flex-col sm:flex-row">
        <div className="p-4 sm:w-[38%] sm:shrink-0">
          <Image src={image} alt={name} width={500} height={625} className="aspect-[4/5] w-full rounded-[20px] object-cover" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3 p-5 pt-1 sm:pt-5 sm:pl-0">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-[#81756c]">{role}</p>
            <p className="mt-1.5 text-xs text-[#847b74]">
              {cro} · {graduationLabel} em {graduationYear} · {yearsOfExperience}
            </p>
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
                  <Image src={whatsappIconImage} alt="" className="h-4 w-4 shrink-0 object-contain" />
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
    <motion.div variants={sectionMotion} whileHover={{ y: -8, scale: 1.015 }} transition={{ duration: 0.25 }}>
      <Card className="group h-full overflow-hidden border-[#18191c]/8 bg-white transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(23,24,26,0.14)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild variant="outline" className="w-full">
            <Link href="#contato">
              Saiba mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function SiteHome({ reviewsData }: { reviewsData: ReviewsResult }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeComparison, setActiveComparison] = useState(0);

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

  const activeComparisonCase = comparisonCases[activeComparison];

  return (
    <div className="relative min-h-screen bg-[linear-gradient(180deg,#e1ddda_0%,#e8e5e2_40%,#e1ddda_100%)]">
      <SiteHeader scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="relative z-10 pt-20 md:pt-24">
        <section id="inicio" className="scroll-mt-28">
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-16 pt-8 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-14 xl:py-16">
            <motion.div initial="hidden" animate="visible" variants={staggerMotion} className="max-w-2xl">
              <motion.div variants={sectionMotion}>
                <SectionBadge>Odonto Casais</SectionBadge>
              </motion.div>
              <motion.h1 variants={sectionMotion} className="mt-6 font-heading text-5xl font-semibold tracking-tight text-[#18191c] md:text-7xl">
                Sorrisos saudáveis começam com confiança.
              </motion.h1>
              <motion.p variants={sectionMotion} className="mt-6 max-w-xl text-lg leading-8 text-[#4f535b] md:text-xl">
                Uma experiência odontológica premium para quem busca tecnologia, cuidado real e uma apresentação impecável em cada detalhe.
              </motion.p>
              <motion.div variants={sectionMotion} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener">
                    Agende uma avaliação
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="#tratamentos">Conheça nossos tratamentos</Link>
                </Button>
              </motion.div>
              <motion.div variants={sectionMotion} className="mt-8 flex flex-wrap gap-3">
                {[
                  "Atendimento humanizado",
                  "Equipamentos modernos",
                  "Ambiente confortável",
                ].map((item) => (
                  <div key={item} className="rounded-full border border-[#18191c]/10 bg-white/75 px-4 py-2 text-sm font-medium text-[#3d414a] shadow-sm">
                    {item}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden"
            >
              <div className="absolute -left-5 top-8 hidden rounded-[24px] border border-white/20 bg-[#17181a]/80 px-4 py-3 text-white shadow-[0_20px_50px_rgba(23,24,26,0.18)] backdrop-blur-md lg:block">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/60">Experiência premium</p>
                <p className="mt-1 text-sm font-medium">Alta sofisticação, baixo ruído visual</p>
              </div>
              <Card className="overflow-hidden border-[#18191c]/8 bg-[#17181a] p-4 shadow-[0_24px_64px_rgba(23,24,26,0.18)] md:p-5">
                <div className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#18191c_0%,#27292e_48%,#8b7e75_100%)]">
                  <Image src={heroImage} alt="Consultório odontológico moderno" width={1200} height={900} priority className="h-full w-full object-cover opacity-95" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.18),transparent_24%),radial-gradient(circle_at_75%_10%,rgba(255,255,255,0.1),transparent_20%),linear-gradient(180deg,transparent_42%,rgba(23,24,26,0.28)_100%)]" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <Badge className="bg-white/12 text-white backdrop-blur-sm">Tecnologia</Badge>
                    <Badge className="bg-white/12 text-white backdrop-blur-sm">Acolhimento</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-3">
                    <HeroStat label="Primeira impressão" value="Clínica premium" />
                    <HeroStat label="Abordagem" value="Explicações claras" />
                    <HeroStat label="Contato" value="WhatsApp rápido" />
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <AppDivider />

        <section id="sobre" className="scroll-mt-28 px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <motion.div variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }}>
                <Card className="overflow-hidden border-[#18191c]/8 bg-white p-4 shadow-[0_20px_50px_rgba(23,24,26,0.10)] md:p-5">
                  <Image src={aboutImage} alt="Ambiente da clínica Odonto Casais" width={1200} height={900} className="aspect-[4/3] w-full rounded-[26px] object-cover" />
                </Card>
              </motion.div>
              <div>
                <SectionHeading
                  eyebrow="Sobre a clínica"
                  title="Cuidando do seu sorriso com tecnologia, acolhimento e excelência."
                  description="A Odonto Casais nasceu com o propósito de oferecer um atendimento odontológico humanizado, combinando tecnologia, conhecimento técnico e cuidado individualizado para proporcionar mais saúde, bem-estar e autoestima aos nossos pacientes."
                />
                <motion.div variants={sectionMotion} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-12% 0px" }} className="mt-5 text-[#4f535b]">
                  <p className="text-base leading-8 md:text-lg">
                    Acreditamos que cada sorriso é único. Por isso, buscamos oferecer tratamentos personalizados em um ambiente moderno, confortável e preparado para atender toda a família.
                  </p>
                </motion.div>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {stats.map((item) => (
                    <CounterStat key={item.label} value={item.value} label={item.label} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <AppDivider />

        <section id="essencia" className="scroll-mt-28 px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Nossa Essência"
              title="Os princípios que orientam cada sorriso."
              description="Mais do que oferecer tratamentos odontológicos, acreditamos em um atendimento baseado em confiança, respeito, tecnologia e cuidado individualizado."
              align="center"
            />

            <motion.div
              variants={staggerMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1.35fr_1fr]"
            >
              <motion.div variants={sectionMotion} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                <Card className="flex h-full flex-col justify-center gap-6 border-[#18191c]/8 bg-white p-10 shadow-[0_26px_70px_rgba(23,24,26,0.12)] md:p-14">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#18191c] text-white shadow-[0_12px_30px_rgba(23,24,26,0.2)]">
                    <Target className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#81756c]">Nossa Missão</p>
                    <p className="mt-4 font-heading text-2xl font-semibold leading-snug tracking-tight text-[#18191c] md:text-3xl">
                      {missionText}
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={sectionMotion} whileHover={{ y: -4 }} transition={{ duration: 0.25 }}>
                <Card className="flex h-full flex-col gap-4 border-[#18191c]/8 bg-[#ddd9d5] p-8 shadow-[0_18px_50px_rgba(23,24,26,0.08)] md:p-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#18191c] shadow-[0_10px_24px_rgba(23,24,26,0.1)]">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#81756c]">Nossa Visão</p>
                    <p className="mt-3 text-base leading-7 text-[#3d414a] md:text-lg">{visionText}</p>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {values.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={sectionMotion}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full border-[#18191c]/8 bg-white/95 p-6 shadow-[0_14px_40px_rgba(23,24,26,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ccc6c2] text-[#18191c]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-4 text-base font-semibold text-[#18191c]">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#4f535b]">{item.description}</p>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="diferenciais" className="scroll-mt-28 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Diferenciais"
              title="Atendimento humanizado, tecnologia de ponta e cuidado personalizado."
              description="Valorizamos a experiência de cada paciente, oferecendo tratamentos seguros, modernos e planejados de acordo com as necessidades individuais, sempre buscando excelência em cada etapa do atendimento."
              align="center"
            />
            <motion.div variants={staggerMotion} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px" }} className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {differentials.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={sectionMotion} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                    <Card className="h-full border-[#18191c]/8 bg-white/96 transition-all duration-300 hover:shadow-[0_18px_50px_rgba(23,24,26,0.12)]">
                      <CardHeader>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ccc6c2] text-[#18191c] shadow-inner">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="mt-4">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="tratamentos" className="scroll-mt-28 px-6 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Tratamentos"
              title="Tratamentos pensados para transformar sorrisos e devolver qualidade de vida."
              description="Conheça os principais procedimentos realizados pela Odonto Casais, sempre com tecnologia, planejamento individualizado e atendimento humanizado."
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

        <section id="antes-e-depois" className="scroll-mt-28 px-6 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Antes e depois"
              title="Um slider elegante para mostrar evolução sem exagero visual."
              description="O controle de comparação foi desenhado para ser intuitivo no desktop e ainda legível no mobile, preservando o foco em clareza e credibilidade."
            />
            <div className="mt-10">
              <motion.div key={activeComparisonCase.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <Badge>{activeComparisonCase.badge}</Badge>
                    <h3 className="mt-3 font-heading text-2xl font-semibold text-[#18191c] md:text-3xl">{activeComparisonCase.title}</h3>
                  </div>
                  <div className="hidden items-center gap-2 md:flex">
                    <button
                      type="button"
                      onClick={() => setActiveComparison((current) => (current - 1 + comparisonCases.length) % comparisonCases.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#18191c]/10 bg-white transition hover:bg-[#18191c] hover:text-white"
                      aria-label="Caso anterior"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveComparison((current) => (current + 1) % comparisonCases.length)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#18191c]/10 bg-white transition hover:bg-[#18191c] hover:text-white"
                      aria-label="Próximo caso"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <ComparisonSlider item={activeComparisonCase} />
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <SlideDots count={comparisonCases.length} active={activeComparison} onChange={setActiveComparison} />
                  <p className="text-sm text-[#4f535b]">
                    Os placeholders são fictícios e podem ser substituídos por fotografias reais no futuro sem alterar a estrutura.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="equipe" className="scroll-mt-28 px-6 py-16 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <motion.div
              variants={sectionMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mx-auto max-w-2xl text-center"
            >
              <SectionBadge>Nossa Equipe</SectionBadge>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-tight text-[#18191c] md:text-6xl">
                Conheça os profissionais que cuidam do seu sorriso
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-[#4f535b] md:text-lg">
                Nossa equipe é formada por profissionais altamente qualificados, que unem experiência clínica, atualização constante e um atendimento humanizado. Cada paciente recebe um plano de tratamento individualizado, baseado em confiança, transparência e excelência em cada etapa do cuidado.
              </p>
            </motion.div>

            <motion.div
              variants={sectionMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-3"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b7afaa]" />
              <HeartHandshake className="h-5 w-5 shrink-0 text-[#85786f]" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b7afaa]" />
            </motion.div>

            <motion.div
              variants={staggerMotion}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px" }}
              className="mx-auto mt-8 grid max-w-5xl grid-cols-1 items-stretch gap-5 md:grid-cols-2"
            >
              {team.map((member) => (
                <motion.div key={member.name} variants={sectionMotion} whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="h-full">
                  <TeamPortrait {...member} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="depoimentos" className="scroll-mt-28 px-6 py-20 md:px-8 md:py-28">
          <GoogleReviewsStructuredData summary={reviewsData.summary} reviews={reviewsData.reviews} />
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Avaliações dos pacientes"
              title="A confiança dos nossos pacientes é o nosso maior reconhecimento."
              description="Conheça experiências reais de pacientes que confiaram na Odonto Casais para cuidar do sorriso."
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

        <section className="px-6 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl rounded-[36px] border border-[#18191c]/8 bg-[linear-gradient(135deg,#17181a_0%,#26282e_60%,#8f837a_100%)] px-6 py-12 text-white shadow-[0_30px_80px_rgba(23,24,26,0.18)] md:px-10 md:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <Badge className="bg-white/12 text-white">Chamada final</Badge>
                <h2 className="mt-6 max-w-3xl font-heading text-4xl font-semibold tracking-tight md:text-6xl">
                  Seu próximo sorriso começa com uma conversa simples.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                  Agende uma avaliação e descubra como a Odonto Casais pode transformar sua experiência em um atendimento seguro, acolhedor e visualmente impecável.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <Button asChild size="lg" variant="secondary" className="min-w-[240px] bg-white text-[#18191c] hover:bg-[#d9d5d2]">
                  <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener">
                    Falar no WhatsApp
                    <Image src={whatsappIconImage} alt="" className="h-4 w-4 object-contain" />
                  </Link>
                </Button>
                <p className="text-sm text-white/72">Resposta rápida, linguagem clara e atendimento pensado para sua rotina.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="scroll-mt-28 px-6 pb-20 pt-6 md:px-8 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Contato"
              title="Informações essenciais organizadas com clareza e facilidade de ação."
              description="A área de contato foi desenhada para equilibrar presença institucional e conversão, com meios de contato evidentes e mapa reservado para expansão futura."
            />
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
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
                  <CardHeader>
                    <Image src={mapsIconImage} alt="" className="h-12 w-12 object-contain" />
                    <CardTitle className="mt-4 text-lg">Endereços</CardTitle>
                    <div className="mt-1 grid gap-4 sm:grid-cols-2">
                      {clinicLocations.map((location) => (
                        <div key={location.name}>
                          <p className="text-sm font-semibold text-[#18191c]">{location.name}</p>
                          <CardDescription>{location.address}</CardDescription>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    <Button asChild variant="secondary">
                      <Link href={whatsappUrl} target="_blank" rel="noreferrer noopener">
                        Agendar agora
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(23,24,26,0.12)]">
                  <CardHeader>
                    <Image src={instagramIconImage} alt="" className="h-12 w-12 object-contain" />
                    <CardTitle className="mt-4 text-lg">Instagram</CardTitle>
                    <CardDescription>Acompanhe bastidores, antes e depois e novidades das duas unidades.</CardDescription>
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

      <footer className="relative z-10 border-t border-[#18191c]/8 bg-[#e0dcda]/85 px-6 py-10 backdrop-blur-sm md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-xl text-sm leading-7 text-[#525660]">
              Site institucional premium para Odonto Casais, com estrutura preparada para futuras expansões como agendamento online, blog e área do paciente.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {socialLinks.map((social) => (
              <SocialLink key={social.label} {...social} />
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4 border-t border-[#18191c]/8 pt-6 text-sm text-[#565b66] md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {footerLinks.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:text-[#18191c]">
                {item.label}
              </Link>
            ))}
          </div>
          <p>© 2026 Odonto Casais. Todos os direitos reservados.</p>
        </div>
      </footer>

      <FloatingWhatsApp />
    </div>
  );
}
