"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Eyebrow, ExternalLink, FloatingWhatsApp, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@/components/google-reviews/google-logo";
import { GoogleReviewCard, StarRow } from "@/components/google-reviews/review-card";
import draIanaImage from "@/images/DraIana.jpg";
import drChristianImage from "@/images/DrChristian.jpg";
import fachadaImage from "@/images/fachada.png";
import drDeivsonImage from "@/images/DrDeivson.jpeg";
import secaoDentesFixosImage from "@/images/secaodentesfixos.png";
import tratamentoAntesImage from "@/images/tratamentoAntes.jpeg";
import tratamentoDepoisImage from "@/images/tratamentoDepois.jpeg";
import consultorioImage from "@/images/consultorio.png";
import type { ReviewsResult } from "@/lib/reviews/types";
import {
  clinicLocations,
  getDirectionsUrl,
  getFullAddress,
  getWhatsappUrl,
  openingHours,
  whatsappDisplay,
  whatsappNumber,
  whatsappQuestionUrl,
  whatsappUrl,
} from "@/lib/site";
import { getTreatmentPath, treatments } from "@/lib/treatments";
import { cn } from "@/lib/utils";

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

/*
 * Fotos de ambiente. Quando houver fotos reais da recepção, dos consultórios ou de
 * um atendimento, importe o arquivo de src/images e troque `src`/`alt` aqui —
 * o layout já está preparado para imagens verticais (4:5).
 */
const photos = {
  hero: {
    src: fachadaImage,
    alt: "Fachada da Odonto Casais, clínica odontológica no Centro de Teófilo Otoni, com a placa e a porta de entrada",
    position: "50% 50%",
  },
  about: {
    src: consultorioImage,
    alt: "Consultório da Odonto Casais, com cadeira odontológica azul e bancada de apoio",
    position: "50% 60%",
  },
};

const aboutParagraphs = [
  "A Odonto Casais é uma clínica odontológica em Teófilo Otoni que reúne dentistas de dentística, prótese, ortodontia, endodontia e implantodontia, para que cada paciente encontre o profissional certo para o seu caso sem precisar procurar em vários lugares.",
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
  { value: "5+", label: "anos de experiência" },
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

const featuredTreatments = [
  {
    id: "facetas-e-lentes",
    slug: "facetas-e-lentes-de-contato-dental",
    title: "Facetas e lentes de contato dental",
    description:
      "Lâminas finas que corrigem cor, formato e alinhamento dos dentes. As facetas em porcelana são mais resistentes; as lentes de contato são ultrafinas e preservam ao máximo o dente natural.",
    points: ["Cor", "Formato", "Alinhamento"],
  },
  {
    id: "implantes",
    slug: "implante-dentario",
    title: "Implantes e reabilitação oral",
    description:
      "Para quem perdeu um ou mais dentes. O implante devolve a mastigação e a estética do sorriso, com planejamento individual para cada caso.",
    points: ["Mastigação", "Estética natural", "Planejamento individual"],
    image: "https://images.unsplash.com/photo-1593022356769-11f762e25ed9?q=75&w=1600&auto=format&fit=crop",
    imageAlt: "Modelo odontológico mostrando um implante entre dois dentes naturais",
  },
] as const;

const otherTreatments = [
  {
    title: "Ortodontia",
    slug: "ortodontia",
    description: "Alinhamento funcional e estético da mordida, com acompanhamento contínuo ao longo do tratamento.",
  },
  {
    title: "Endodontia",
    slug: "endodontia",
    description: "Tratamento de canal com técnica precisa para aliviar a dor e preservar o dente natural.",
  },
] as const;

const fixedTeethWhatsappUrl = getWhatsappUrl(
  "Olá, gostaria de agendar uma avaliação para saber se o protocolo de dentes fixos em até 72 horas é indicado para o meu caso.",
);

const fixedTeethSteps = [
  {
    title: "Avaliação e planejamento",
    description: "Analisamos cuidadosamente sua condição bucal e definimos a estratégia mais adequada para o seu caso.",
  },
  {
    title: "Cirurgia e instalação dos implantes",
    description: "Os implantes são posicionados de forma planejada para proporcionar estabilidade e sustentação à prótese.",
  },
  {
    title: "Preparação do novo sorriso",
    description: "Na própria etapa cirúrgica, iniciamos o processo de confecção da prótese personalizada para o paciente.",
  },
  {
    title: "Dentes fixos em até 72 horas",
    description:
      "Quando houver indicação clínica, a prótese pode ser entregue dentro de 48 a 72 horas, proporcionando uma reabilitação mais rápida e confortável.",
  },
] as const;

const fixedTeethFigures = [
  {
    value: "48–72h",
    description: "Possibilidade de entrega dos dentes fixos após o procedimento, conforme indicação clínica.",
  },
  {
    value: "4–6",
    unit: "implantes",
    description: "Protocolo planejado de acordo com a necessidade de cada paciente.",
  },
] as const;

const videoTestimonials: ReadonlyArray<{ video: string; treatment?: string }> = [
  { treatment: "Facetas e lentes de contato dental", video: "/videos/depoimento1.mp4" },
  { video: "/videos/depoimento2.mp4" },
  { video: "/videos/depoimento3.mp4" },
];

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

function SectionTitle({ children, className, as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h2" | "h3" }) {
  return (
    <Tag className={cn("font-heading text-[clamp(2rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink", className)}>
      {children}
    </Tag>
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
          className="lg:col-span-6 lg:pb-2"
        >
          <h1>
            <Eyebrow as="span">Clínica odontológica em Teófilo Otoni, MG</Eyebrow>
            <span className="mt-6 block max-w-[11em] font-heading text-[clamp(2.5rem,4.6vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink">
              Sorrisos saudáveis começam com confiança.
            </span>
          </h1>
          <p className="mt-6 max-w-[33rem] text-[1.0625rem] leading-[1.7] text-muted md:text-lg">
            Dentistas de especialidades diferentes, em duas unidades no Centro de Teófilo Otoni — e explicação clara sobre cada tratamento antes de começar.
          </p>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <ExternalLink href={whatsappUrl}>
                Agende uma avaliação
                <ArrowRight className="h-4 w-4" />
              </ExternalLink>
            </Button>
            <Link href="#tratamentos" className="link-underline-static self-center whitespace-nowrap text-[0.9375rem] text-ink-soft hover:opacity-70 sm:self-auto">
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
          className="group lg:col-span-6 lg:col-start-7 lg:self-center"
        >
          <Photo
            src={photos.hero.src}
            alt={photos.hero.alt}
            position={photos.hero.position}
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3]"
          />
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

function TreatmentLink({ slug, title, className }: { slug: string; title: string; className?: string }) {
  return (
    <Link
      href={getTreatmentPath(slug)}
      className={cn("group/link inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink", className)}
    >
      <span className="link-underline-static">Saiba mais</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-[3px]" />
      <span className="sr-only">sobre {title.toLowerCase()} em Teófilo Otoni</span>
    </Link>
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
              {treatments.map((item) => item.name).join(", ")}. Cada um começa por uma avaliação.
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
            <TreatmentLink slug={veneers.slug} title={veneers.title} className="mt-7" />
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
            <TreatmentLink slug={implants.slug} title={implants.title} className="mt-7" />
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
                </p>
                <TreatmentLink slug={item.slug} title={item.title} className="md:col-span-3 md:justify-self-end" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FixedTeethSection() {
  return (
    <section id="dentes-fixos" aria-labelledby="dentes-fixos-titulo" className="border-t border-line py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <Reveal className="lg:col-span-6">
            <Eyebrow>Reabilitação oral</Eyebrow>
            <h2
              id="dentes-fixos-titulo"
              className="mt-6 max-w-[12ch] text-balance font-heading text-[clamp(2.5rem,5.2vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink"
            >
              Dentes fixos em até 72 horas
            </h2>
            <p className="mt-7 max-w-[30rem] font-heading text-[1.25rem] leading-[1.45] tracking-[-0.01em] text-ink-soft md:text-[1.375rem]">
              Recupere seu sorriso, sua segurança e sua qualidade de vida.
            </p>
            <p className="mt-6 max-w-[34rem] text-base leading-[1.75] text-muted">
              Para pacientes que perderam todos os dentes, utilizam dentadura ou possuem dentes severamente comprometidos, oferecemos um
              protocolo avançado de reabilitação com{" "}
              <Link href={getTreatmentPath("implante-dentario")} className="link-underline-static font-medium text-ink-soft hover:opacity-70">
                prótese fixa sobre implantes
              </Link>
              .
            </p>
            <p className="mt-4 max-w-[34rem] text-base leading-[1.75] text-muted">
              Após uma avaliação individualizada e um planejamento preciso, são instalados normalmente{" "}
              <strong className="font-medium text-ink-soft">4 a 6 implantes</strong>, criando uma base segura para a nova prótese fixa.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <ExternalLink href={fixedTeethWhatsappUrl}>
                  Agende sua avaliação
                  <ArrowRight className="h-4 w-4" />
                </ExternalLink>
              </Button>
              <p className="max-w-[17rem] text-sm leading-snug text-muted">
                Descubra se o protocolo de dentes fixos em até 72 horas é indicado para o seu caso.
              </p>
            </div>
          </Reveal>

          <Reveal className="group lg:col-span-5 lg:col-start-8" delay={0.08}>
            <figure>
              <Photo
                src={secaoDentesFixosImage}
                alt="Paciente sorrindo e abraçando o dentista na Odonto Casais"
                sizes="(min-width: 1024px) 40vw, 26rem"
                className="mx-auto aspect-[901/1600] w-full max-w-[26rem] lg:max-w-none"
              />
            </figure>
          </Reveal>
        </div>

        <Reveal className="mt-16 md:mt-24">
          <dl className="grid border-y border-ink/15 sm:grid-cols-2">
            {fixedTeethFigures.map((item, index) => (
              <div
                key={item.value}
                className={cn("py-8 sm:py-10", index === 0 ? "sm:pr-10" : "border-t border-ink/15 sm:border-l sm:border-t-0 sm:pl-10")}
              >
                <dt className="flex items-baseline gap-3 font-heading font-medium tracking-[-0.04em] text-ink">
                  <span className="text-[clamp(3.25rem,6.5vw,5.5rem)] leading-none">{item.value}</span>
                  {"unit" in item && <span className="text-[clamp(1.25rem,2vw,1.75rem)] tracking-[-0.02em] text-bronze">{item.unit}</span>}
                </dt>
                <dd className="mt-4 max-w-[24rem] text-[0.9375rem] leading-relaxed text-muted">{item.description}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-20 md:mt-28">
          <Reveal className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <h3 className="font-heading text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink lg:col-span-6">
              Como funciona?
            </h3>
            <p className="max-w-[26rem] text-[0.9375rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
              Cada etapa é conduzida de acordo com a avaliação do paciente. O prazo pode variar conforme cada caso.
            </p>
          </Reveal>

          <ol className="mt-10 grid md:mt-14 lg:grid-cols-4 lg:gap-x-10">
            {fixedTeethSteps.map((step, index) => (
              <motion.li
                key={step.title}
                variants={revealMotion}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                custom={index * 0.06}
                className={cn(
                  "grid grid-cols-[4.5rem_1fr] gap-x-4 border-t py-8 sm:grid-cols-[6rem_1fr] lg:block lg:pb-0 lg:pt-7",
                  index === fixedTeethSteps.length - 1 ? "border-bronze" : "border-ink/15",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-heading text-[2.75rem] font-normal leading-none tracking-[-0.04em] lg:text-[4rem]",
                    index === fixedTeethSteps.length - 1 ? "text-bronze" : "text-ink/30",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-heading text-[1.1875rem] font-medium leading-snug tracking-[-0.015em] text-ink lg:mt-8">
                    <span className="sr-only">Etapa {index + 1}: </span>
                    {step.title}
                  </h4>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-20 grid gap-10 border-t border-ink pt-10 md:mt-28 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <h3 className="max-w-[18ch] font-heading text-[clamp(1.875rem,3.4vw,3rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              Mais do que novos dentes. Uma nova experiência ao sorrir.
            </h3>
            <p className="mt-6 max-w-[34rem] text-base leading-[1.75] text-muted">
              O objetivo do tratamento é devolver <span className="text-ink-soft">função, estética e confiança</span>, reduzindo o período entre a
              cirurgia e a entrega do novo sorriso.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-snug text-muted">Descubra se o protocolo é indicado para o seu caso.</p>
            <Button asChild size="lg" className="mt-4 w-full">
              <ExternalLink href={fixedTeethWhatsappUrl}>
                Agende sua avaliação
                <ArrowRight className="h-4 w-4" />
              </ExternalLink>
            </Button>
          </div>
        </Reveal>

        <p className="mt-12 max-w-[40rem] text-xs leading-relaxed text-muted/80">
          O tratamento, indicação e prazo de conclusão dependem da avaliação clínica e das condições individuais de cada paciente.
        </p>
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
    <section id="equipe" className="border-t border-line py-20 md:py-28 lg:py-32">
      <div className="container-site">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">
          <div className="lg:col-span-7">
            <Eyebrow>Equipe</Eyebrow>
            <SectionTitle className="mt-5 max-w-[16ch]">Quem vai cuidar do seu sorriso.</SectionTitle>
          </div>
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
                <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-10">
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
          <Reveal className="lg:col-span-12" delay={0.08}>
            <VideoTestimonials />
          </Reveal>
        </div>
      </section>
    );
  }

  const [pullQuote, ...rest] = reviews;
  const gridReviews = rest.slice(0, 4);

  return (
    <section id="depoimentos" className="bg-sand py-20 md:py-28 lg:py-32">
            <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-10">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Depoimentos</Eyebrow>
          <SectionTitle className="mt-5 max-w-[14ch]">O que os pacientes dizem.</SectionTitle>

          {hasRating && (
            <div className="mt-10">
              <GoogleRatingSummary summary={summary} />
            </div>
          )}
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
        </div>

        <Reveal className="lg:col-span-12">
          <VideoTestimonials />
        </Reveal>
      </div>
    </section>
  );
}

function VideoTestimonials() {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:gap-6">
      {videoTestimonials.map((item) => (
        <figure key={item.video} className="w-[65%] shrink-0 snap-start sm:w-auto">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[3px] bg-ink">
            <video
              src={`${item.video}#t=0.5`}
              controls
              preload="metadata"
              playsInline
              aria-label={`Depoimento em vídeo de paciente${item.treatment ? ` · ${item.treatment}` : ""}`}
              className="h-full w-full object-cover"
            >
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </figure>
      ))}
    </div>
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

                  <dl className="mt-8 grid gap-5 text-[0.9375rem] sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
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

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

export default function SiteHome({ reviewsData }: { reviewsData: ReviewsResult }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main>
        <Hero summary={reviewsData.summary} />
        <AboutSection />
        <FixedTeethSection />
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
