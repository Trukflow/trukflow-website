import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowRight, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/site/SiteFooter";
import Reveal from "@/components/site/Reveal";
import { ParallaxImage } from "@/components/site/Parallax";
import { SectionHeading, useHashScroll } from "@/components/site/Section";
import { cn } from "@/lib/utils";

type Tone = "frost" | "leaf";

const tones: Record<Tone, { dot: string; icon: string; iconBg: string; glow: string; overlay: string }> = {
  frost: {
    dot: "bg-frost-400",
    icon: "text-frost-400",
    iconBg: "bg-frost-400/10",
    glow: "bg-frost-400/20",
    overlay: "to-sky-950/50",
  },
  leaf: {
    dot: "bg-leaf-400",
    icon: "text-leaf-400",
    iconBg: "bg-leaf-400/10",
    glow: "bg-leaf-400/15",
    overlay: "to-emerald-950/40",
  },
};

type Item = { icon: LucideIcon; title: string; body: string };

export type ProductPageProps = {
  tone: Tone;
  name: string;
  heroTitle: ReactNode;
  heroDescription: ReactNode;
  heroVisual?: ReactNode;
  heroImage?: string;
  heroImageAlt?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  audienceTitle: ReactNode;
  audiences: Item[];
  stepsTitle: ReactNode;
  steps: Item[];
  band: { image: string; alt: string; title: ReactNode; body?: ReactNode };
  extra?: ReactNode;
  closingTitle: ReactNode;
  closingBody: ReactNode;
  closingCtas: { label: string; href: string }[];
};

/** Shared layout for products that are still in development (Smartcold, Chukua). */
const ProductPage = ({
  tone,
  name,
  heroTitle,
  heroDescription,
  heroVisual,
  heroImage,
  heroImageAlt = "",
  primaryCta,
  secondaryCta,
  audienceTitle,
  audiences,
  stepsTitle,
  steps,
  band,
  extra,
  closingTitle,
  closingBody,
  closingCtas,
}: ProductPageProps) => {
  useHashScroll();
  const t = tones[tone];

  return (
    <div className="site">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[92svh] items-center overflow-hidden grain">
        {heroImage ? (
          <ParallaxImage
            src={heroImage}
            alt={heroImageAlt}
            speed={0.25}
            priority
            className="absolute inset-0"
            overlay={
              <>
                <div className={cn("absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85", t.overlay)} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
              </>
            }
          />
        ) : (
          <>
            <div className={cn("absolute -top-40 right-0 h-[600px] w-[600px] rounded-full blur-[140px]", t.glow)} />
            <div className="absolute inset-0 hairline-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          </>
        )}

        <div className="site-container relative z-10 grid items-center gap-16 pb-20 pt-36 lg:grid-cols-12">
          <div className={heroVisual ? "lg:col-span-7" : "lg:col-span-9"}>
            <Reveal>
              <span className="eyebrow">
                <span className={cn("h-1.5 w-1.5 rounded-full animate-glow-pulse", t.dot)} />
                {name} · Coming soon
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display mt-7 text-[clamp(2.75rem,1.6rem+5vw,6rem)]">{heroTitle}</h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300">{heroDescription}</p>
            </Reveal>
            <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={primaryCta.href} className="btn-light h-12 px-6">
                <Mail className="h-4 w-4" />
                {primaryCta.label}
              </a>
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn-ghost h-12 px-6">
                  {secondaryCta.label}
                </a>
              )}
            </Reveal>
          </div>
          {heroVisual && (
            <Reveal delay={200} className="lg:col-span-5">
              {heroVisual}
            </Reveal>
          )}
        </div>
      </section>

      {/* Audiences */}
      <section className="py-24 md:py-32">
        <div className="site-container">
          <SectionHeading eyebrow="Who it's for" title={audienceTitle} />
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="card-surface h-full p-8 transition-colors hover:border-ink-600">
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-full", t.iconBg, t.icon)}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-normal tracking-[-0.02em] text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax band */}
      <section className="relative overflow-hidden">
        <ParallaxImage
          src={band.image}
          alt={band.alt}
          speed={0.3}
          className="h-[70vh] min-h-[460px]"
          overlay={<div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/40 to-ink-950" />}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="site-container">
            <Reveal>
              <h2 className="display max-w-4xl text-[clamp(2.25rem,1.4rem+4vw,5rem)]">{band.title}</h2>
              {band.body && <p className="mt-6 max-w-xl text-lg text-ink-200">{band.body}</p>}
            </Reveal>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 md:py-32">
        <div className="site-container">
          <SectionHeading eyebrow="How it will work" title={stepsTitle} />
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="card-surface relative h-full overflow-hidden p-8">
                  <span className="absolute right-6 top-4 font-mono text-7xl text-white/[0.04]">0{i + 1}</span>
                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-full", t.iconBg, t.icon)}>
                    <step.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-normal tracking-[-0.02em] text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {extra}

      {/* Closing CTA */}
      <section id="waitlist" className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-ink-700 bg-ink-900">
          <div className={cn("absolute -bottom-40 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full blur-[120px]", t.glow)} />
          <div className="relative px-6 py-20 text-center md:px-16 md:py-24">
            <h2 className="display mx-auto max-w-3xl text-[clamp(2.25rem,1.4rem+3vw,4rem)]">{closingTitle}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-300">{closingBody}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              {closingCtas.map((cta, i) => (
                <a key={cta.label} href={cta.href} className={cn(i === 0 ? "btn-light" : "btn-ghost", "h-12 px-6")}>
                  {cta.label}
                  {i === 0 && <ArrowRight className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
};

export default ProductPage;
