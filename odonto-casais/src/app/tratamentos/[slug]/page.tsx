import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Eyebrow, ExternalLink, FloatingWhatsApp, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { JsonLd, getBreadcrumbJsonLd } from "@/components/structured-data";
import { Button } from "@/components/ui/button";
import tratamentoAntesImage from "@/images/tratamentoAntes.jpeg";
import tratamentoDepoisImage from "@/images/tratamentoDepois.jpeg";
import { buildPageMetadata } from "@/lib/seo";
import { clinicLocations, getWhatsappUrl, openingHours, whatsappDisplay, whatsappNumber } from "@/lib/site";
import { getTreatment, getTreatmentPath, treatments, type Treatment } from "@/lib/treatments";

export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return {};

  return buildPageMetadata({
    title: treatment.seoTitle,
    description: treatment.description,
    path: getTreatmentPath(treatment.slug),
  });
}

function TreatmentMedia({ treatment }: { treatment: Treatment }) {
  if (treatment.slug === "facetas-e-lentes-de-contato-dental") {
    return (
      <figure>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[
            { src: tratamentoAntesImage, label: "Antes", position: "50% 58%" },
            { src: tratamentoDepoisImage, label: "Depois", position: "50% 47%" },
          ].map((item) => (
            <div key={item.label}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-stone">
                <Image
                  src={item.src}
                  alt={`Paciente da Odonto Casais ${item.label.toLowerCase()} do tratamento com lentes de contato dental`}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  placeholder="blur"
                  style={{ objectPosition: item.position }}
                  className="photo-tone object-cover"
                />
              </div>
              <p className="mt-2.5 text-[0.8125rem] text-muted">{item.label}</p>
            </div>
          ))}
        </div>
        <figcaption className="mt-3 text-xs text-muted/80">Caso real de paciente da clínica, fotos publicadas com autorização.</figcaption>
      </figure>
    );
  }

  if (treatment.slug === "implante-dentario") {
    return (
      <div className="relative aspect-[3/2] overflow-hidden rounded-[3px] bg-stone">
        <Image
          src="https://images.unsplash.com/photo-1593022356769-11f762e25ed9?q=75&w=1600&auto=format&fit=crop"
          alt="Modelo odontológico mostrando um implante entre dois dentes naturais"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="photo-tone object-cover"
        />
      </div>
    );
  }

  return null;
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const bookingUrl = getWhatsappUrl(treatment.whatsappMessage);
  const related = treatments.filter((item) => item.slug !== treatment.slug);
  const hasMedia = treatment.slug === "facetas-e-lentes-de-contato-dental" || treatment.slug === "implante-dentario";

  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: treatment.name, path: getTreatmentPath(treatment.slug) },
        ])}
      />
      <SiteHeader />
      <main className="pt-[4.5rem] md:pt-20">
        <section className="container-site pb-16 pt-8 md:pb-20 md:pt-12">
          <nav aria-label="Você está em" className="text-[0.8125rem] text-muted">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="link-underline hover:text-ink">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#tratamentos" className="link-underline hover:text-ink">
                  Tratamentos
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-soft">
                {treatment.name}
              </li>
            </ol>
          </nav>

          <div className={hasMedia ? "mt-10 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10" : "mt-10"}>
            <div className={hasMedia ? "lg:col-span-6" : undefined}>
              <Eyebrow>Tratamento</Eyebrow>
              <h1 className="mt-6 max-w-[18ch] font-heading text-[clamp(2.25rem,4.2vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.035em] text-ink">
                {treatment.heading}
              </h1>
              <p className="mt-6 max-w-[36rem] text-[1.0625rem] leading-[1.7] text-muted md:text-lg">{treatment.intro}</p>
              <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <ExternalLink href={bookingUrl}>
                    Agende sua avaliação
                    <ArrowRight className="h-4 w-4" />
                  </ExternalLink>
                </Button>
                <Link href="/#contato" className="link-underline-static self-center whitespace-nowrap text-[0.9375rem] text-ink-soft hover:opacity-70 sm:self-auto">
                  Ver endereços das unidades
                </Link>
              </div>
            </div>
            {hasMedia && (
              <div className="lg:col-span-5 lg:col-start-8">
                <TreatmentMedia treatment={treatment} />
              </div>
            )}
          </div>
        </section>

        <section aria-label={`Sobre ${treatment.name.toLowerCase()}`} className="border-t border-line py-16 md:py-24">
          <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-10">
            <div className="grid gap-12 lg:col-span-8">
              {treatment.sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-heading text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-ink">{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 max-w-[40rem] text-base leading-[1.75] text-muted">
                      {paragraph}
                    </p>
                  ))}
                  {section.items && (
                    <ul className="mt-5 max-w-[40rem] border-b border-line">
                      {section.items.map((item) => (
                        <li key={item} className="border-t border-line py-3.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <aside className="lg:col-span-4">
              <div className="border-t border-ink pt-6 lg:sticky lg:top-28">
                <p className="font-heading text-[1.25rem] font-medium tracking-[-0.015em] text-ink">Cada caso começa por uma avaliação</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  O dentista examina, explica as opções com calma e você decide o próximo passo sem pressa.
                </p>
                <Button asChild className="mt-6 w-full">
                  <ExternalLink href={bookingUrl}>
                    Agendar pelo WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </ExternalLink>
                </Button>
                <dl className="mt-8 grid gap-5 text-sm">
                  <div>
                    <dt className="text-muted">Telefone e WhatsApp</dt>
                    <dd className="mt-1 text-ink">
                      <a href={`tel:+${whatsappNumber}`} className="link-underline">
                        {whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted">Unidades</dt>
                    {clinicLocations.map((location) => (
                      <dd key={location.slug} className="mt-1 leading-relaxed text-ink">
                        {location.street} — {location.district}
                      </dd>
                    ))}
                  </div>
                  <div>
                    <dt className="text-muted">Horário</dt>
                    {openingHours.map((item) => (
                      <dd key={item.days} className="mt-1 text-ink">
                        {item.days}, {item.hours}
                      </dd>
                    ))}
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </section>

        <section aria-labelledby="perguntas-frequentes" className="bg-sand py-16 md:py-24">
          <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-4">
              <h2 id="perguntas-frequentes" className="font-heading text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
                Perguntas frequentes
              </h2>
              <p className="mt-4 max-w-[22rem] text-[0.9375rem] leading-relaxed text-muted">
                Informações gerais, que não substituem a avaliação clínica.
              </p>
            </div>
            <div className="border-b border-ink/15 lg:col-span-8">
              {treatment.faq.map((item) => (
                <details key={item.question} className="group border-t border-ink/15 py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 marker:hidden [&::-webkit-details-marker]:hidden">
                    <h3 className="font-heading text-[1.125rem] font-medium leading-snug tracking-[-0.015em] text-ink">{item.question}</h3>
                    <span aria-hidden="true" className="text-xl leading-none text-ink-soft transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="max-w-[40rem] pt-3 text-[0.9375rem] leading-relaxed text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="outros-tratamentos" className="py-16 md:py-24">
          <div className="container-site">
            <h2 id="outros-tratamentos" className="text-[0.8125rem] text-muted">
              Outros tratamentos na Odonto Casais
            </h2>
            <ul className="mt-4 border-b border-ink/15">
              {related.map((item) => (
                <li key={item.slug} className="border-t border-ink/15">
                  <Link href={getTreatmentPath(item.slug)} className="group/link flex items-center justify-between gap-6 py-6">
                    <span className="font-heading text-[1.375rem] font-medium tracking-[-0.02em] text-ink md:text-[1.625rem]">{item.name}</span>
                    <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-300 group-hover/link:translate-x-[3px]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWhatsApp href={bookingUrl} />
    </>
  );
}
