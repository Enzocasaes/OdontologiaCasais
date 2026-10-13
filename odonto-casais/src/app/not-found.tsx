import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Eyebrow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { getTreatmentPath, treatments } from "@/lib/treatments";

// O Next já adiciona <meta name="robots" content="noindex"> nas respostas 404.
export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[4.5rem] md:pt-20">
        <section className="container-site py-20 md:py-28">
          <Eyebrow>Erro 404</Eyebrow>
          <h1 className="mt-6 max-w-[16ch] font-heading text-[clamp(2.25rem,4.2vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.035em] text-ink">
            Não encontramos esta página.
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-muted">
            O endereço pode ter mudado ou estar digitado errado. Veja abaixo os tratamentos da Odonto Casais ou volte para o início.
          </p>
          <Button asChild size="lg" className="mt-9 w-full sm:w-auto">
            <Link href="/">
              Voltar para o início
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <ul className="mt-16 max-w-[40rem] border-b border-line">
            {treatments.map((item) => (
              <li key={item.slug} className="border-t border-line">
                <Link href={getTreatmentPath(item.slug)} className="link-underline-static my-4 inline-block text-[0.9375rem] text-ink-soft hover:opacity-70">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
