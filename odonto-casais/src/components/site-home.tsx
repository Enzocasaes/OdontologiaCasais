"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@/components/google-reviews/google-logo";
import { GoogleReviewCard, StarRow } from "@/components/google-reviews/review-card";
import { GoogleReviewsStructuredData } from "@/components/google-reviews/structured-data";
import draIanaImage from "@/images/DraIana.jpg";
import drChristianImage from "@/images/DrChristian.jpg";
import drDeivsonImage from "@/images/DrDeivson.jpeg";
import tratamentoAntesImage from "@/images/tratamentoAntes.jpeg";
import tratamentoDepoisImage from "@/images/tratamentoDepois.jpeg";
import logoLockupImage from "@/images/logo-odontocasais-lockup.png";
import clinicSignImage from "@/images/logoOdontocasaes.jpeg";
import whatsappIconImage from "@/images/wpp.png";
import type { ReviewsResult } from "@/lib/reviews/types";
import { cn } from "@/lib/utils";

const whatsappNumber = "5533998669729";
const whatsappDisplay = "(33) 99866-9729";

function getWhatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const whatsappUrl = getWhatsappUrl("Olá, gostaria de agendar uma avaliação na Odonto Casais.");
const whatsappQuestionUrl = getWhatsappUrl("Olá, tenho uma dúvida sobre um tratamento na Odonto Casais.");

const openingHours = [
  { days: "Segunda a sexta", hours: "08h às 18h" },
  { days: "Sábado", hours: "08h às 12h" },
] as const;

const clinicLocations = [
  { name: "Unidade Centro", street: "Rua Minervino de Castro Pinto, 80", district: "Centro, Teófilo Otoni/MG" },
  { name: "Unidade Getúlio Vargas", street: "Av. Getúlio Vargas, 1200", district: "Centro, Teófilo Otoni/MG" },
] as const;

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// Formato que o Google Maps reconhece ("Rua, número, Bairro, Cidade - UF").
function getFullAddress(location: (typeof clinicLocations)[number]) {
  return `${location.street}, ${location.district.replace("/", " - ")}`;
}

function getDirectionsUrl(address: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
}

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
] as const;

/*
 * Fotos de ambiente. Quando houver fotos reais da recepção, dos consultórios ou de
 * um atendimento, importe o arquivo de src/images e troque `src`/`alt` aqui —
 * o layout já está preparado para imagens verticais (4:5).
 */
const photos = {
  hero: {
    src: draIanaImage,
    alt: "Dra. Iana Guedes sentada à mesa do consultório da Odonto Casais",
    caption: "Dra. Iana Guedes, no consultório",
    detail: "CRO-MG 58340",
    position: "50% 40%",
  },
  about: {
    src: clinicSignImage,
    alt: "Placa com a marca Odonto Casais, clínica odontológica",
    position: "55% 50%",
  },
};

const aboutParagraphs = [
  "A Odonto Casais reúne dentistas de dentística, prótese, ortodontia, endodontia e implantodontia, para que cada paciente encontre o profissional certo para o seu caso sem precisar procurar em vários lugares.",
  "Acreditamos que tratar bem vai além do procedimento em si: envolve explicar as opções com calma, respeitar o ritmo de cada paciente e acompanhar o caso até o fim. É esse padrão que buscamos manter nas duas unidades.",
] as const;

const aboutHighlights = [
  {
    title: "Duas unidades",
    description: "Rua Minervino de Castro Pinto e Av. Getúlio Vargas, ambas no Centro de Teófilo Otoni.",
  },
  {
    title: "Diagnóstico por imagem",
    description: "Planejamento com apoio de radiografia e de um dentista com formação em radiologia odontológica, antes de iniciar o tratamento.",
  },
  {
    title: "Biossegurança",
    description: "Protocolos de esterilização e organização seguidos em cada etapa do atendimento, nas duas unidades.",
  },
  {
    title: "Para quem tem receio",
    description: "Salas silenciosas e explicação de cada passo antes de começar, para quem evita ir ao dentista.",
  },
] as const;

const clinicFigures = [
  { value: "12.000+", label: "pacientes atendidos" },
  { value: "3+", label: "anos de experiência" },
] as const;

const team = [
  {
    name: "Dra. Iana Guedes",
    role: "Dentística, Prótese e Ortodontia",
    cro: "CRO-MG 58340",
    summary: "Pós-graduada em Dentística e em Prótese Dentária, especializando em Ortodontia. Cuida da estética e da função do sorriso.",
    bio: "Tenho a convicção de que a odontologia vai muito além de tratar dentes: ela tem o poder de transformar vidas. Ao longo da minha trajetória, busco constantemente novos conhecimentos para oferecer tratamentos de excelência, sempre aliados a um atendimento humanizado. Acredito que cada paciente é único e merece ser acolhido com carinho, atenção e respeito. Meu propósito é cuidar de pessoas, devolver confiança, promover saúde e proporcionar sorrisos que reflitam felicidade e bem-estar.",
    image: draIanaImage,
    position: "50% 22%",
  },
  {
    name: "Dr. Christian Freitas",
    role: "Endodontia e Radiologia",
    cro: "CRO-MG 62584",
    summary: "Especialista em Endodontia e pós-graduando em Radiologia Odontológica. Formado pela UFJF-GV, associado à SBPqO e à IADR.",
    bio: "Sou cirurgião-dentista graduado pela Universidade Federal de Juiz de Fora – Campus Governador Valadares (UFJF-GV), especialista em Endodontia, capacitado em Blindagem de Dentes Tratados Endodonticamente e, atualmente, pós-graduando em Radiologia Odontológica. Minha atuação é voltada à preservação dos dentes naturais por meio de diagnósticos precisos e tratamentos endodônticos realizados com técnicas modernas. Acredito que cada paciente merece um atendimento humanizado, transparente e individualizado.",
    image: drChristianImage,
    position: "50% 18%",
  },
  {
    name: "Dr. Deivson Norte",
    role: "Implantodontia",
    cro: "CRO-MG 78629",
    summary: "Cirurgião-dentista com imersão em Implantodontia. Traz da carreira na Polícia Militar a disciplina e o compromisso de servir.",
    bio: "Há histórias que não mudam de propósito, apenas de missão. A minha começou vestindo uma farda da Polícia Militar, onde aprendi que servir ao próximo exige coragem, disciplina e compromisso. Com o passar do tempo, nasceu uma nova paixão: a Odontologia. Descobri que também era possível transformar vidas por meio de um sorriso, aliviar dores, devolver autoestima e cuidar das pessoas de uma forma diferente, mas igualmente importante.",
    image: drDeivsonImage,
    position: "50% 15%",
  },
] as const;

type TeamMember = (typeof team)[number];
const [iana, christian, deivson] = team;

const featuredTreatments = [
  {
    id: "facetas-e-lentes",
    title: "Facetas e lentes de contato dental",
    description:
      "Lâminas finas que corrigem cor, formato e alinhamento dos dentes. As facetas em porcelana são mais resistentes; as lentes de contato são ultrafinas e preservam ao máximo o dente natural.",
    points: ["Cor", "Formato", "Alinhamento"],
    professional: iana,
  },
  {
    id: "implantes",
    title: "Implantes e reabilitação oral",
    description:
      "Para quem perdeu um ou mais dentes. O implante devolve a mastigação e a estética do sorriso, com planejamento individual para cada caso.",
    points: ["Mastigação", "Estética natural", "Planejamento individual"],
    professional: deivson,
    image: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?q=75&w=1600&auto=format&fit=crop",
    imageAlt: "Modelo odontológico mostrando um implante entre dois dentes naturais",
  },
] as const;

const otherTreatments = [
  {
    title: "Ortodontia",
    description: "Alinhamento funcional e estético da mordida, com acompanhamento contínuo ao longo do tratamento.",
    professional: iana,
  },
  {
    title: "Prótese removível",
    description: "Reposição confortável e estável de dentes, devolvendo função e naturalidade ao sorriso.",
    professional: iana,
  },
  {
    title: "Endodontia",
    description: "Tratamento de canal com técnica precisa para aliviar a dor e preservar o dente natural.",
    professional: christian,
  },
] as const;

const allTreatmentTitles = [
  ...featuredTreatments.map((item) => item.title),
  ...otherTreatments.map((item) => item.title),
];

const videoTestimonial = {
  treatment: "Facetas e lentes de contato dental",
  video: "/videos/depoimento1.mp4",
} as const;

const instagramProfiles = [
  { handle: "@odontocasais", href: "https://www.instagram.com/odontocasais/" },
  { handle: "@clinica.odontocasais", href: "https://www.instagram.com/clinica.odontocasais/" },
] as const;

const revealMotion: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } }),
};

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={revealMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, className, tone = "default" }: { children: React.ReactNode; className?: string; tone?: "default" | "light" }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.18em]",
        tone === "light" ? "text-paper/60" : "text-bronze",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "light" ? "bg-paper/40" : "bg-bronze/60")} />
      {children}
    </p>
  );
}

function SectionTitle({ children, className, as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h2" | "h3" }) {
  return (
    <Tag className={cn("font-heading text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink", className)}>
      {children}
    </Tag>
  );
}

function ExternalLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer noopener" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function Photo({
  src,
  alt,
  sizes,
  position = "50% 50%",
  className,
  preload = false,
}: {
  src: StaticImageData | string;
  alt: string;
  sizes: string;
  position?: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[3px] bg-stone", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        placeholder={typeof src === "string" ? "empty" : "blur"}
        style={{ objectPosition: position }}
        className="photo-tone photo-hover object-cover"
      />
    </div>
  );
}

function ProfessionalTag({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <Link href="#equipe" className={cn("group/pro inline-flex items-center gap-3 text-sm", className)}>
      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-stone">
        <Image src={member.image} alt="" fill sizes="36px" style={{ objectPosition: member.position }} className="photo-tone object-cover" />
      </span>
      <span className="leading-tight">
        <span className="block text-muted">Com</span>
        <span className="link-underline font-medium text-ink">{member.name}</span>
      </span>
    </Link>
  );
}

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        solid
          ? "border-line bg-paper/95 shadow-[0_1px_16px_rgba(32,33,36,0.04)] backdrop-blur-[6px]"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between md:h-20">
        <Link href="#inicio" aria-label="Odonto Casais — ir para o início" onClick={() => setMenuOpen(false)}>
          <Image src={logoLockupImage} alt="Odonto Casais" preload className="h-11 w-auto rounded-[5px] md:h-[3.25rem]" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="link-underline text-[0.9375rem] text-ink-soft transition-colors duration-200 hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-1">
            <ExternalLink href={whatsappUrl}>
              Agende agora
              <ArrowRight className="h-4 w-4" />
            </ExternalLink>
          </Button>
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 items-center gap-3 text-sm font-medium text-ink lg:hidden"
        >
          {menuOpen ? "Fechar" : "Menu"}
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span className={cn("absolute left-0 h-px w-6 bg-ink transition-all duration-300", menuOpen ? "top-1.5 rotate-45" : "top-0")} />
            <span className={cn("absolute left-0 h-px w-6 bg-ink transition-all duration-300", menuOpen ? "top-1.5 -rotate-45" : "top-3")} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-paper md:top-20 lg:hidden"
          >
            <nav aria-label="Menu" className="container-site flex min-h-full flex-col pb-10 pt-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-line py-4 font-heading text-[1.75rem] font-medium tracking-[-0.02em] text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-auto pt-10">
                <Button asChild size="lg" className="w-full">
                  <ExternalLink href={whatsappUrl} onClick={() => setMenuOpen(false)}>
                    Agende sua avaliação
                    <ArrowRight className="h-4 w-4" />
                  </ExternalLink>
                </Button>
                <p className="mt-6 text-sm leading-6 text-muted">
                  WhatsApp {whatsappDisplay}
                  <br />
                  Duas unidades no Centro de Teófilo Otoni
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ summary }: { summary: ReviewsResult["summary"] }) {
  const trustItems = [
    { title: "Duas unidades", detail: "no Centro de Teófilo Otoni" },
    { title: "Especialistas", detail: "em diferentes áreas da odontologia" },
    ...(summary.isLive && summary.totalReviews > 0
      ? [
          {
            title: `${summary.averageRating.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} no Google`,
            detail: `${summary.totalReviews.toLocaleString("pt-BR")} avaliações de pacientes`,
          },
        ]
      : []),
  ];

  return (
    <section id="inicio" className="pt-[4.5rem] md:pt-20">
      <div className="container-site grid gap-10 pb-16 pt-8 md:pb-20 md:pt-12 lg:grid-cols-12 lg:items-end lg:gap-x-10 lg:pb-24 lg:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 lg:pb-2"
        >
          <Eyebrow>
            <span>
              <span className="hidden sm:inline">Clínica odontológica · </span>Teófilo Otoni, MG
            </span>
          </Eyebrow>
          <h1 className="mt-6 max-w-[11em] font-heading text-[clamp(2.5rem,4.6vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
            Sorrisos saudáveis começam com confiança.
          </h1>
          <p className="mt-6 max-w-[33rem] text-[1.0625rem] leading-[1.7] text-muted md:text-lg">
            Dentistas de especialidades diferentes, em duas unidades no Centro de Teófilo Otoni — e explicação clara sobre cada tratamento antes de começar.
          </p>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <ExternalLink href={whatsappUrl}>
                Agende uma avaliação
                <ArrowRight className="h-4 w-4" />
              </ExternalLink>
            </Button>
            <Link href="#tratamentos" className="link-underline-static self-center text-[0.9375rem] text-ink-soft hover:opacity-70 sm:self-auto">
              Conheça nossos tratamentos
            </Link>
          </div>

          <dl className={cn("mt-12 grid gap-x-8 gap-y-4 border-t border-line pt-6 text-sm sm:mt-14", trustItems.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
            {trustItems.map((item) => (
              <div key={item.title} className="flex flex-wrap gap-x-1.5 sm:block">
                <dt className="font-medium text-ink">{item.title}</dt>
                <dd className="leading-snug text-muted sm:mt-0.5">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="group lg:col-span-5 lg:col-start-8"
        >
          <Photo
            src={photos.hero.src}
            alt={photos.hero.alt}
            position={photos.hero.position}
            preload
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:h-[min(76vh,680px)]"
          />
          <figcaption className="mt-3 flex justify-between gap-4 text-[0.8125rem] text-muted">
            <span>{photos.hero.caption}</span>
            <span>{photos.hero.detail}</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="border-t border-line py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:gap-x-10">
          <Eyebrow className="lg:col-span-3 lg:pt-4">Sobre a clínica</Eyebrow>
          <SectionTitle className="max-w-[16ch] lg:col-span-9 lg:text-[clamp(2.5rem,4.4vw,4rem)]">
            Especialidades diferentes, num só lugar.
          </SectionTitle>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-x-10">
          <Reveal className="group lg:col-span-5">
            <Photo
              src={photos.about.src}
              alt={photos.about.alt}
              position={photos.about.position}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]"
            />
            <dl className="mt-6 grid grid-cols-2 gap-6">
              {clinicFigures.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="font-heading text-[2rem] font-medium leading-none tracking-[-0.03em] text-ink">{item.value}</dd>
                  <dd className="mt-2 text-sm text-muted">{item.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
            <p className="text-[1.1875rem] leading-[1.65] text-ink-soft md:text-xl">{aboutParagraphs[0]}</p>
            <p className="mt-5 max-w-[36rem] text-base leading-[1.75] text-muted">{aboutParagraphs[1]}</p>

            <dl className="mt-12 border-b border-line">
              {aboutHighlights.map((item) => (
                <div key={item.title} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="font-medium text-ink">{item.title}</dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-muted">{item.description}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SaibaMais({ treatment, className }: { treatment: string; className?: string }) {
  return (
    <ExternalLink
      href={getWhatsappUrl(`Olá, gostaria de saber mais sobre ${treatment.toLowerCase()} na Odonto Casais.`)}
      className={cn("group/link inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink", className)}
    >
      <span className="link-underline-static">Saiba mais</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-[3px]" />
      <span className="sr-only">sobre {treatment} pelo WhatsApp</span>
    </ExternalLink>
  );
}

function TreatmentsSection() {
  const [veneers, implants] = featuredTreatments;

  return (
    <section id="tratamentos" className="bg-sand py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>Tratamentos</Eyebrow>
            <SectionTitle className="mt-5 max-w-[18ch]">Os tratamentos que mais realizamos.</SectionTitle>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[0.9375rem] leading-relaxed text-muted">
              {allTreatmentTitles.join(", ")}. Cada um começa por uma avaliação.
            </p>
            <ExternalLink href={whatsappQuestionUrl} className="link-underline-static mt-3 inline-block text-[0.9375rem] text-ink hover:opacity-70">
              Não encontrou o seu caso? Pergunte à equipe
            </ExternalLink>
          </div>
        </Reveal>

        <article id={veneers.id} className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <Reveal className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {[
                { src: tratamentoAntesImage, label: "Antes", position: "50% 58%" },
                { src: tratamentoDepoisImage, label: "Depois", position: "50% 47%" },
              ].map((item) => (
                <figure key={item.label} className="group">
                  <Photo
                    src={item.src}
                    alt={`${veneers.title} — ${item.label.toLowerCase()} do tratamento`}
                    position={item.position}
                    sizes="(min-width: 1024px) 28vw, 50vw"
                    className="aspect-[4/5]"
                  />
                  <figcaption className="mt-2.5 text-[0.8125rem] text-muted">{item.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted/80">Caso real de paciente da clínica, fotos publicadas com autorização.</p>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pl-6" delay={0.08}>
            <p className="text-[0.8125rem] text-bronze">Em destaque</p>
            <h3 className="mt-3 font-heading text-[clamp(1.75rem,2.6vw,2.375rem)] font-medium leading-[1.12] tracking-[-0.025em] text-ink">
              {veneers.title}
            </h3>
            <p className="mt-5 text-base leading-[1.75] text-muted">{veneers.description}</p>
            <p className="mt-5 text-sm text-ink-soft">Corrige: {veneers.points.join(" · ")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
              <ProfessionalTag member={veneers.professional} />
              <SaibaMais treatment={veneers.title} />
            </div>
          </Reveal>
        </article>

        <article id={implants.id} className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <Reveal className="group lg:order-2 lg:col-span-7 lg:col-start-6">
            <Photo src={implants.image} alt={implants.imageAlt} sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[3/2]" />
          </Reveal>
          <Reveal className="lg:order-1 lg:col-span-5 lg:col-start-1 lg:pr-6" delay={0.08}>
            <p className="text-[0.8125rem] text-bronze">Em destaque</p>
            <h3 className="mt-3 font-heading text-[clamp(1.75rem,2.6vw,2.375rem)] font-medium leading-[1.12] tracking-[-0.025em] text-ink">
              {implants.title}
            </h3>
            <p className="mt-5 text-base leading-[1.75] text-muted">{implants.description}</p>
            <p className="mt-5 text-sm text-ink-soft">{implants.points.join(" · ")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-6">
              <ProfessionalTag member={implants.professional} />
              <SaibaMais treatment={implants.title} />
            </div>
          </Reveal>
        </article>

        <Reveal className="mt-20 md:mt-28">
          <h3 className="text-[0.8125rem] text-muted">Também realizamos</h3>
          <ul className="mt-4 border-b border-ink/15">
            {otherTreatments.map((item) => (
              <li key={item.title} className="grid gap-3 border-t border-ink/15 py-7 md:grid-cols-12 md:items-baseline md:gap-x-10">
                <h4 className="font-heading text-[1.5rem] font-medium tracking-[-0.02em] text-ink md:col-span-4 md:text-[1.75rem]">{item.title}</h4>
                <p className="max-w-[34rem] text-[0.9375rem] leading-relaxed text-muted md:col-span-5">
                  {item.description}
                  <span className="mt-1 block text-ink-soft">Com {item.professional.name}</span>
                </p>
                <SaibaMais treatment={item.title} className="md:col-span-3 md:justify-self-end" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function TeamMemberProfile({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <article className={cn("group", className)}>
      <Photo
        src={member.image}
        alt={`Retrato de ${member.name}`}
        position={member.position}
        sizes="(min-width: 768px) 30vw, 80vw"
        className="aspect-[4/5]"
      />
      <h3 className="mt-6 font-heading text-[1.375rem] font-medium tracking-[-0.02em] text-ink">{member.name}</h3>
      <p className="mt-1 text-sm text-bronze">{member.role}</p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{member.summary}</p>
      <p className="mt-4 text-xs tracking-[0.04em] text-muted">{member.cro}</p>
      <details className="group/bio mt-4 border-t border-line pt-3">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-ink-soft marker:hidden [&::-webkit-details-marker]:hidden">
          Apresentação completa
          <span aria-hidden="true" className="text-lg leading-none transition-transform duration-300 group-open/bio:rotate-45">
            +
          </span>
        </summary>
        <p className="pt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
      </details>
    </article>
  );
}

function TeamSection() {
  return (
    <section id="equipe" className="py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>Equipe</Eyebrow>
            <SectionTitle className="mt-5 max-w-[16ch]">Quem vai cuidar do seu sorriso.</SectionTitle>
          </div>
          <p className="max-w-[26rem] text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Três dentistas, cada um com uma especialidade. Você é atendido por quem entende do seu caso.
          </p>
        </Reveal>

        <Reveal className="no-scrollbar -mx-5 mt-12 flex scroll-px-5 snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:mt-16 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0 lg:gap-10">
          {team.map((member, index) => (
            <TeamMemberProfile
              key={member.name}
              member={member}
              className={cn("w-[80%] shrink-0 snap-start sm:w-[46%] md:w-auto", index === 1 && "md:mt-16")}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function GoogleRatingSummary({ summary }: { summary: ReviewsResult["summary"] }) {
  return (
    <div className="border-t border-ink/15 pt-6">
      <div className="flex items-end gap-4">
        <span className="font-heading text-[3.5rem] font-medium leading-none tracking-[-0.04em] text-ink">
          {summary.averageRating.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
        </span>
        <span className="pb-1.5">
          <StarRow rating={summary.averageRating} />
          <span className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
            <GoogleLogo className="h-3.5 w-3.5" />
            {summary.totalReviews.toLocaleString("pt-BR")} avaliações no Google
          </span>
        </span>
      </div>
      <ExternalLink href={summary.profileUrl} className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink">
        <span className="link-underline-static">Ler as avaliações no Google</span>
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </ExternalLink>
    </div>
  );
}

function ReviewsSection({ reviewsData }: { reviewsData: ReviewsResult }) {
  const { summary, reviews } = reviewsData;
  const hasRating = summary.isLive && summary.totalReviews > 0;

  // Quando o Google devolve só a nota (sem textos), a seção fica com a nota e o vídeo.
  if (reviews.length === 0) {
    return (
      <section id="depoimentos" className="bg-sand py-20 md:py-28 lg:py-32">
        <GoogleReviewsStructuredData summary={summary} reviews={reviews} />
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Depoimentos</Eyebrow>
            <SectionTitle className="mt-5 max-w-[14ch]">O que os pacientes dizem.</SectionTitle>
            <p className="mt-6 max-w-[30rem] text-base leading-[1.75] text-muted">
              As avaliações da Odonto Casais ficam públicas no Google, escritas por quem já foi atendido nas nossas unidades.
            </p>
            {hasRating && (
              <div className="mt-10 max-w-[26rem]">
                <GoogleRatingSummary summary={summary} />
              </div>
            )}
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <figure className="mx-auto max-w-[20rem] lg:mx-0">
              <VideoTestimonial />
            </figure>
          </Reveal>
        </div>
      </section>
    );
  }

  const [pullQuote, ...rest] = reviews;
  const gridReviews = rest.slice(0, 4);

  return (
    <section id="depoimentos" className="bg-sand py-20 md:py-28 lg:py-32">
      <GoogleReviewsStructuredData summary={summary} reviews={reviews} />
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-10">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Depoimentos</Eyebrow>
          <SectionTitle className="mt-5 max-w-[14ch]">O que os pacientes dizem.</SectionTitle>

          {hasRating && (
            <div className="mt-10">
              <GoogleRatingSummary summary={summary} />
            </div>
          )}

          <figure className="mt-12 hidden max-w-[17rem] lg:block">
            <VideoTestimonial />
          </figure>
        </Reveal>

        <div className="lg:col-span-8 lg:col-start-5 lg:pl-6">
          <Reveal>
            <figure>
              <StarRow rating={pullQuote.rating} />
              <blockquote className="mt-5 font-heading text-[clamp(1.5rem,2.4vw,2.125rem)] font-normal leading-[1.3] tracking-[-0.02em] text-ink">
                &ldquo;{pullQuote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className="font-medium text-ink">{pullQuote.authorName}</span>
                <span className="text-muted">{pullQuote.relativeTime}</span>
                <span className="flex items-center gap-1.5 text-xs text-muted">
                  <GoogleLogo className="h-3.5 w-3.5" />
                  Google
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {gridReviews.length > 0 && (
            <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-x-10">
              {gridReviews.map((review, index) => (
                <Reveal key={review.id} delay={(index % 2) * 0.06}>
                  <GoogleReviewCard review={review} className="h-full" />
                </Reveal>
              ))}
            </div>
          )}

          <figure className="mt-14 max-w-[17rem] lg:hidden">
            <VideoTestimonial />
          </figure>
        </div>
      </div>
    </section>
  );
}

function VideoTestimonial() {
  return (
    <>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[3px] bg-ink">
        <video
          src={`${videoTestimonial.video}#t=0.5`}
          controls
          preload="metadata"
          playsInline
          className="h-full w-full object-cover"
        >
          Seu navegador não suporta vídeos.
        </video>
      </div>
      <figcaption className="mt-3 text-[0.8125rem] leading-snug text-muted">
        Depoimento em vídeo de paciente · {videoTestimonial.treatment}
      </figcaption>
    </>
  );
}

function BookingSection() {
  return (
    <section aria-labelledby="agendar-titulo" className="bg-slate text-paper">
      <div className="container-site grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-end lg:gap-x-10">
        <Reveal className="lg:col-span-7">
          <Eyebrow tone="light">Agendamento</Eyebrow>
          <h2 id="agendar-titulo" className="mt-6 max-w-[17ch] font-heading text-[clamp(2.1rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            Vamos entender qual tratamento faz sentido para você.
          </h2>
          <p className="mt-6 max-w-[32rem] text-base leading-[1.75] text-paper/70 md:text-[1.0625rem]">
            Na avaliação, o dentista examina, explica as opções com calma e você decide o próximo passo sem pressa.
          </p>
          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <Button asChild variant="light" size="lg" className="w-full sm:w-auto">
              <ExternalLink href={whatsappUrl}>
                Agendar avaliação
                <ArrowRight className="h-4 w-4" />
              </ExternalLink>
            </Button>
            <ExternalLink href={whatsappQuestionUrl} className="link-underline-static self-center text-[0.9375rem] text-paper/85 hover:opacity-70 sm:self-auto">
              Falar pelo WhatsApp
            </ExternalLink>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.08}>
          <dl className="grid gap-6 border-t border-paper/15 pt-6 text-sm sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <dt className="text-paper/55">Horário</dt>
              {openingHours.map((item) => (
                <dd key={item.days} className="mt-1 text-paper">
                  {item.days}, {item.hours}
                </dd>
              ))}
            </div>
            <div>
              <dt className="text-paper/55">WhatsApp</dt>
              <dd className="mt-1 text-paper">{whatsappDisplay}</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function LocationsSection() {
  return (
    <section id="contato" className="py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>Unidades</Eyebrow>
            <SectionTitle className="mt-5 max-w-[18ch]">Duas unidades no Centro de Teófilo Otoni.</SectionTitle>
          </div>
          <p className="text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            O mesmo WhatsApp atende as duas unidades. Escolha a que fica mais perto de você.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-16 md:mt-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          {clinicLocations.map((location, index) => {
            const address = getFullAddress(location);
            return (
              <Reveal key={location.name} delay={index * 0.08}>
                <article className="border-t border-ink pt-6">
                  <p className="text-[0.8125rem] text-muted">Unidade {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 font-heading text-[1.75rem] font-medium tracking-[-0.02em] text-ink md:text-[2rem]">{location.name}</h3>

                  <dl className="mt-8 grid gap-5 text-[0.9375rem] sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted">Endereço</dt>
                      <dd className="mt-1 leading-relaxed text-ink">
                        {location.street}
                        <br />
                        {location.district}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted">Horário</dt>
                      {openingHours.map((item) => (
                        <dd key={item.days} className="mt-1 leading-relaxed text-ink">
                          {item.days}, {item.hours}
                        </dd>
                      ))}
                    </div>
                    <div>
                      <dt className="text-sm text-muted">Telefone e WhatsApp</dt>
                      <dd className="mt-1 text-ink">
                        <a href={`tel:+${whatsappNumber}`} className="link-underline">
                          {whatsappDisplay}
                        </a>
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button asChild>
                      <ExternalLink href={getWhatsappUrl(`Olá, gostaria de agendar uma avaliação na ${location.name} da Odonto Casais.`)}>
                        Agendar nesta unidade
                        <ArrowRight className="h-4 w-4" />
                      </ExternalLink>
                    </Button>
                    <Button asChild variant="outline">
                      <ExternalLink href={getDirectionsUrl(address)}>
                        Como chegar
                        <ArrowUpRight className="h-4 w-4" />
                      </ExternalLink>
                    </Button>
                  </div>

                  {googleMapsApiKey && (
                    <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-[3px] bg-stone">
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(address)}&zoom=16`}
                        title={`Mapa da ${location.name}`}
                        className="absolute inset-0 h-full w-full border-0 grayscale-[0.35]"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                      />
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <Image src={logoLockupImage} alt="Odonto Casais" className="h-14 w-auto rounded-[5px]" />
          <p className="mt-5 max-w-[20rem] text-sm leading-relaxed text-muted">
            Clínica odontológica com duas unidades no Centro de Teófilo Otoni/MG.
          </p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-6">
          <p className="text-[0.8125rem] text-muted">Navegação</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline text-ink-soft hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="text-[0.8125rem] text-muted">Tratamentos</p>
          <ul className="mt-4 grid gap-2.5 text-sm">
            {allTreatmentTitles.map((title) => (
              <li key={title}>
                <Link href="#tratamentos" className="link-underline text-ink-soft hover:text-ink">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[0.8125rem] text-muted">Contato</p>
          <ul className="mt-4 grid gap-2.5 text-sm text-ink-soft">
            <li>
              <ExternalLink href={whatsappUrl} className="link-underline hover:text-ink">
                WhatsApp {whatsappDisplay}
              </ExternalLink>
            </li>
            {instagramProfiles.map((profile) => (
              <li key={profile.handle}>
                <ExternalLink href={profile.href} className="link-underline hover:text-ink">
                  Instagram {profile.handle}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-site flex flex-col gap-2 border-t border-line py-6 text-[0.8125rem] text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Odonto Casais. Todos os direitos reservados.</p>
        <p>Teófilo Otoni, Minas Gerais</p>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Só aparece depois do hero, para não competir com o CTA principal.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ExternalLink
      href={whatsappUrl}
      className={cn(
        "fixed bottom-4 right-4 z-40 flex h-12 items-center gap-2.5 rounded-full bg-ink pl-2 pr-2 text-sm font-medium text-paper shadow-[0_6px_20px_rgba(32,33,36,0.18)] transition-[opacity,transform,background-color] duration-300 hover:bg-slate sm:bottom-6 sm:right-6 sm:pr-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Image src={whatsappIconImage} alt="" className="h-8 w-8 object-contain" />
      <span className="hidden sm:inline">Agendar pelo WhatsApp</span>
      <span className="sr-only sm:hidden">Agendar avaliação pelo WhatsApp</span>
    </ExternalLink>
  );
}

export default function SiteHome({ reviewsData }: { reviewsData: ReviewsResult }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main>
        <Hero summary={reviewsData.summary} />
        <AboutSection />
        <TreatmentsSection />
        <TeamSection />
        <ReviewsSection reviewsData={reviewsData} />
        <BookingSection />
        <LocationsSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </MotionConfig>
  );
}
