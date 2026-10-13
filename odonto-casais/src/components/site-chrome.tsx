"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import logoLockupImage from "@/images/logo-odontocasais-lockup.png";
import whatsappIconImage from "@/images/wpp.png";
import { instagramProfiles, navItems, whatsappDisplay, whatsappUrl } from "@/lib/site";
import { getTreatmentPath, treatments } from "@/lib/treatments";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "default",
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "light";
  as?: "p" | "span";
}) {
  return (
    <Tag
      className={cn(
        "flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.18em]",
        tone === "light" ? "text-paper/60" : "text-bronze",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6 shrink-0", tone === "light" ? "bg-paper/40" : "bg-bronze/60")} />
      {children}
    </Tag>
  );
}

export function ExternalLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer noopener" className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
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
        <Link href="/" aria-label="Odonto Casais — ir para o início" onClick={() => setMenuOpen(false)}>
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

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-sand">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <Image src={logoLockupImage} alt="Odonto Casais" className="h-14 w-auto rounded-[5px]" />
          <p className="mt-5 max-w-[20rem] text-sm leading-relaxed text-muted">
            Clínica odontológica com duas unidades no Centro de Teófilo Otoni/MG.
          </p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-5">
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
            {treatments.map((item) => (
              <li key={item.slug}>
                <Link href={getTreatmentPath(item.slug)} className="link-underline text-ink-soft hover:text-ink">
                  {item.name}
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

export function FloatingWhatsApp({ href = whatsappUrl }: { href?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Só aparece depois do hero, para não competir com o CTA principal.
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={cn(
        "fixed bottom-4 right-4 z-40 flex h-12 items-center gap-2.5 rounded-full bg-ink pl-2 pr-2 text-sm font-medium text-paper shadow-[0_6px_20px_rgba(32,33,36,0.18)] transition-[opacity,transform,background-color] duration-300 hover:bg-slate sm:bottom-6 sm:right-6 sm:pr-5",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <Image src={whatsappIconImage} alt="" className="h-8 w-8 object-contain" />
      <span className="hidden sm:inline">Agendar pelo WhatsApp</span>
      <span className="sr-only sm:hidden">Agendar avaliação pelo WhatsApp</span>
    </Link>
  );
}
