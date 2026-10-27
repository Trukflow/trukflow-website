import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  KeyRound,
  Package,
  PhoneCall,
  QrCode,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Truck,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/site/SiteFooter";
import Reveal from "@/components/site/Reveal";
import LockerVisual from "@/components/site/LockerVisual";
import { ParallaxImage } from "@/components/site/Parallax";
import { Accent, Marquee, SectionHeading, useHashScroll } from "@/components/site/Section";
import {
  SMARTDROP_URL,
  SMARTDROP_USSD,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  SUPPORT_PHONE_DISPLAY,
  smartdropLocations,
} from "@/components/site/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const smartdropSteps = [
  {
    icon: Wallet,
    title: "Book and pay",
    body: "The merchant books a locker and door size in the app or over USSD, pays with M-Pesa, and assigns a rider or delivers the parcel themselves.",
  },
  {
    icon: QrCode,
    title: "Drop at the locker",
    body: "The rider gets deposit instructions by SMS, scans the cabinet QR code (no app needed) and places the parcel behind the right door.",
  },
  {
    icon: KeyRound,
    title: "Customer collects",
    body: "The customer gets pickup details by SMS, enters a one-time code at the cabinet, and walks away with the parcel, any time it suits them.",
  },
];

const smartdropFacts = [
  { value: "KES 50", label: "to reserve any locker" },
  { value: "6 hrs", label: "free storage for recipients" },
  { value: "72 hrs", label: "collection window" },
  { value: SMARTDROP_USSD, label: "USSD on Safaricom, no data" },
];

const challengeStats = [
  { value: "70%", label: "of East Africa's cargo moves by road" },
  { value: "40%", label: "higher intra-African trade costs than the global average" },
  { value: "60%", label: "of the regional workforce depends on agriculture" },
  { value: "$2.5B", label: "annual East African logistics market" },
];

const faqs = [
  {
    question: "What is TRUKFLOW?",
    answer:
      "TRUKFLOW is a Nairobi-based logistics company building physical and digital infrastructure for moving goods: Smartdrop parcel lockers, Smartcold cold-storage lockers, and the Chukua App for collection logistics.",
  },
  {
    question: "How does Smartdrop work?",
    answer:
      "A merchant books a locker and pays the KES 50 reservation with M-Pesa. Their rider drops the parcel at the cabinet using a QR code or USSD. The customer receives an SMS with a one-time code and collects the parcel whenever it suits them.",
  },
  {
    question: "Do I need a smartphone or the internet?",
    answer: `No. Smartdrop works on any phone. Merchants, riders and customers can use USSD on Safaricom by dialling ${SMARTDROP_USSD}, with no app or data required.`,
  },
  {
    question: "What does Smartdrop cost?",
    answer:
      "Merchants pay KES 50 per booking. Recipients get 6 free hours of storage, after which storage is KES 10, 15 or 20 per hour for small, medium or large doors. Parcels must be collected within 72 hours.",
  },
  {
    question: "When and where does Smartdrop launch?",
    answer:
      "Our Nairobi pilot is targeted for November 2026, with phase one aiming for 10 locations across the CBD, Westlands, Eastlands and along Thika Road and Mombasa Road. Property owners can apply to host a locker.",
  },
  {
    question: "What happened to the TRUK app, agriTRUK and cargoTRUK?",
    answer:
      "We retired the TRUK app and its agriTRUK and cargoTRUK services. Collection of farm produce and cargo is being rebuilt as the Chukua App, which is coming soon. You can join the Chukua App waitlist today.",
  },
  {
    question: "What is Smartcold?",
    answer:
      "Smartcold takes the Smartdrop model and adds refrigeration, so fish, meat, dairy and fresh produce can be handed off and collected at a safe temperature. It is in development and you can join the waitlist.",
  },
];

const Index = () => {
  useHashScroll();

  return (
    <div className="site">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden grain">
        <ParallaxImage
          src="/images/hero-van.jpg"
          alt="Courier loading parcels into a delivery van"
          speed={0.25}
          priority
          className="absolute inset-0"
          overlay={
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
            </>
          }
        />
        <div className="absolute inset-0 hairline-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />

        <div className="site-container relative z-10 grid items-center gap-16 pb-24 pt-36 lg:grid-cols-12 lg:pb-28">
          <div className="lg:col-span-7">
            <Reveal>
              <a href={SMARTDROP_URL} className="eyebrow transition-colors hover:border-white/30 hover:text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-flame-400 animate-glow-pulse" />
                Smartdrop Nairobi pilot · November 2026
                <ArrowRight className="h-3 w-3" />
              </a>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display mt-7 text-[clamp(2.75rem,1.6rem+5vw,6rem)]">
                The infrastructure
                <br />
                that moves <Accent className="text-gradient-flame pr-2">Africa's goods.</Accent>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300">
                TRUKFLOW builds smart lockers, cold storage and collection networks so merchants, farmers and
                customers can hand off goods securely, without the wait.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={SMARTDROP_URL} className="btn-light h-12 px-6">
                Join the Smartdrop pilot
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#products" className="btn-ghost h-12 px-6">
                Explore products
              </a>
            </Reveal>
            <Reveal delay={320} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-300">
              <span className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-flame-400" />
                Dial <span className="font-mono text-white">{SMARTDROP_USSD}</span>
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-flame-400" />
                OTP-secured lockers
              </span>
              <span className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-flame-400" />
                M-Pesa payments
              </span>
            </Reveal>
          </div>

          <Reveal delay={200} className="hidden lg:col-span-5 lg:block">
            <LockerVisual className="mx-auto max-w-sm" />
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="relative py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="Our products"
            title={
              <>
                One network, <Accent className="text-ink-300">three ways</Accent> to move goods.
              </>
            }
            description="Smartdrop is live in pilot. Smartcold and the Chukua App extend the same network to fresh food and first-mile collection."
          />

          <div className="mt-14 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* Smartdrop */}
            <Reveal className="lg:col-span-2 lg:row-span-2">
              <a
                href={SMARTDROP_URL}
                className="group relative flex h-full min-h-[520px] flex-col overflow-hidden card-surface p-8 transition-colors hover:border-flame-500/40 md:p-10"
              >
                <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-flame-500/20 blur-3xl transition-opacity group-hover:opacity-80" />
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-flame-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-flame-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-flame-400 animate-glow-pulse" />
                    Nairobi pilot · Nov 2026
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <div className="relative mt-auto grid items-end gap-10 md:grid-cols-2">
                  <div>
                    <Package className="h-8 w-8 text-flame-400" />
                    <h3 className="display mt-5 text-5xl md:text-6xl">Smartdrop</h3>
                    <p className="mt-4 text-lg text-white">Smart parcel lockers for faster merchant deliveries.</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-300">
                      Riders drop, customers collect with a one-time code. No missed deliveries, no waiting at the
                      door, no smartphone required.
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-flame-200">
                      Visit smartdrop.africa <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <LockerVisual className="hidden scale-90 md:block" />
                </div>
              </a>
            </Reveal>

            {/* Smartcold */}
            <Reveal delay={100}>
              <Link
                to="/smartcold"
                className="group relative flex h-full min-h-[250px] flex-col overflow-hidden card-surface p-8 transition-colors hover:border-frost-400/40"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-frost-400/15 blur-3xl" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-frost-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-frost-200">
                    Coming soon
                  </span>
                  <ArrowRight className="h-5 w-5 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <div className="relative mt-auto">
                  <Snowflake className="h-7 w-7 text-frost-400" />
                  <h3 className="display mt-4 text-4xl">Smartcold</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    Refrigerated lockers for fish, meat, dairy and fresh produce.
                  </p>
                </div>
              </Link>
            </Reveal>

            {/* Chukua */}
            <Reveal delay={200}>
              <Link
                to="/chukua"
                className="group relative flex h-full min-h-[250px] flex-col overflow-hidden card-surface p-8 transition-colors hover:border-leaf-400/40"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-leaf-400/15 blur-3xl" />
                <div className="relative flex items-center justify-between">
                  <span className="rounded-full bg-leaf-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-leaf-200">
                    Coming soon
                  </span>
                  <ArrowRight className="h-5 w-5 text-ink-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <div className="relative mt-auto">
                  <Truck className="h-7 w-7 text-leaf-400" />
                  <h3 className="display mt-4 text-4xl">Chukua App</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">
                    On-demand collection for cargo and farm produce.
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Smartdrop: how it works */}
      <section id="how-it-works" className="relative border-t border-ink-800 py-24 md:py-32">
        <div className="site-container grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Smartdrop · How it works"
                title={
                  <>
                    Drop. Code. <Accent className="text-gradient-flame pr-1">Collect.</Accent>
                  </>
                }
                description="A parcel handoff that works for merchants, riders and customers on any phone, at any hour."
              />
              <Reveal delay={120} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-700 bg-ink-700">
                {smartdropFacts.map((fact) => (
                  <div key={fact.label} className="bg-ink-900 p-5">
                    <p className="font-mono text-xl text-white md:text-2xl">{fact.value}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-400">{fact.label}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-7">
            {smartdropSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 100}>
                <div className="group card-surface flex gap-6 p-7 transition-colors hover:border-ink-600 md:p-9">
                  <span className="font-mono text-sm text-ink-400">0{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-flame-500/10 text-flame-400">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-2xl font-normal tracking-[-0.03em] text-white">{step.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-300">{step.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal className="flex flex-col gap-3 pt-4 sm:flex-row">
              <a href={SMARTDROP_URL} className="btn-light">
                Join the merchant pilot <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={SMARTDROP_URL} className="btn-ghost">
                Host a locker
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Parallax band: locations */}
      <section className="relative overflow-hidden">
        <ParallaxImage
          src="/images/highway.jpg"
          alt="Truck on a highway"
          speed={0.35}
          className="h-[80vh] min-h-[520px]"
          overlay={<div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/40 to-ink-950" />}
        />
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="site-container">
            <Reveal>
              <span className="eyebrow">Phase one · 10 proposed Nairobi sites</span>
              <h2 className="display mt-6 max-w-4xl text-[clamp(2.5rem,1.5rem+4.5vw,5.5rem)]">
                Software ready.
                <br />
                <Accent className="text-gradient-flame pr-2">First sites next.</Accent>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150} className="mt-12">
            <Marquee items={smartdropLocations} />
          </Reveal>
        </div>
      </section>

      {/* Smartcold + Chukua */}
      <section className="relative py-24 md:py-32">
        <div className="site-container space-y-24 md:space-y-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative order-2 lg:order-1">
              <ParallaxImage
                src="/images/fresh-crates.jpg"
                alt="Crates of fresh produce"
                speed={0.15}
                className="aspect-[4/5] rounded-3xl border border-ink-700"
                overlay={<div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-sky-950/20 to-transparent" />}
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/70 p-4 backdrop-blur">
                <Snowflake className="h-5 w-5 text-frost-400" />
                <p className="text-sm text-ink-200">Held cold from drop-off to pickup</p>
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <SectionHeading
                eyebrow={<><span className="h-1.5 w-1.5 rounded-full bg-frost-400" /> Smartcold · Coming soon</>}
                title={
                  <>
                    Fresh food deserves <Accent className="text-gradient-frost pr-1">a colder handoff.</Accent>
                  </>
                }
                description="Smartcold brings the Smartdrop experience to perishables. Fishmongers, butchers, dairies and grocers drop orders into refrigerated lockers; customers collect them fresh, on their own schedule."
              />
              <Reveal delay={120} className="mt-8">
                <Link to="/smartcold" className="btn-ghost">
                  Learn about Smartcold <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow={<><span className="h-1.5 w-1.5 rounded-full bg-leaf-400" /> Chukua App · Coming soon</>}
                title={
                  <>
                    From the farm gate <Accent className="text-gradient-leaf pr-1">to the market.</Accent>
                  </>
                }
                description="The Chukua App (“chukua” is Swahili for “pick up”) connects farmers, traders and businesses with verified transporters to collect cargo and farm produce, on demand."
              />
              <Reveal delay={120} className="mt-8">
                <Link to="/chukua" className="btn-ghost">
                  Learn about the Chukua App <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </div>
            <Reveal className="relative">
              <ParallaxImage
                src="/images/produce-load.jpg"
                alt="Farm produce being loaded onto a pickup truck"
                speed={0.15}
                className="aspect-[4/5] rounded-3xl border border-ink-700"
                overlay={<div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />}
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-950/70 p-4 backdrop-blur">
                <Truck className="h-5 w-5 text-leaf-400" />
                <p className="text-sm text-ink-200">Verified transporters, booked on demand</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Challenge stats */}
      <section className="relative border-y border-ink-800 bg-ink-900/40 py-20 md:py-24">
        <div className="site-container">
          <SectionHeading
            eyebrow="Why it matters"
            title={
              <>
                Moving goods here costs too much and <Accent className="text-ink-300">loses too much.</Accent>
              </>
            }
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
            {challengeStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className="bg-ink-950 p-8">
                <p className="display text-5xl md:text-6xl">{stat.value}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-300">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20">
        <div className="site-container flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">Payments & partners</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { src: "/M-PESA_LOGO-01.svg.png", alt: "M-PESA" },
              { src: "/CIC insurance.png", alt: "CIC Insurance" },
            ].map((logo) => (
              <div key={logo.alt} className="flex h-16 w-40 items-center justify-center rounded-2xl bg-white px-5">
                <img src={logo.src} alt={logo.alt} className="max-h-12 w-auto object-contain" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="relative border-t border-ink-800 py-24 md:py-32">
        <div className="site-container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="FAQs"
              title={
                <>
                  Questions, <Accent className="text-ink-300">answered.</Accent>
                </>
              }
              description="Can't find what you're looking for? Our team is a call or email away."
            />
            <Reveal delay={120} className="mt-10 space-y-3">
              <a
                href={`tel:${SUPPORT_PHONE}`}
                className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-ink-600"
              >
                <PhoneCall className="h-5 w-5 text-flame-400" />
                <div>
                  <p className="text-xs text-ink-400">Call us</p>
                  <p className="text-white">{SUPPORT_PHONE_DISPLAY}</p>
                </div>
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-ink-600"
              >
                <Mail className="h-5 w-5 text-flame-400" />
                <div>
                  <p className="text-xs text-ink-400">Email us</p>
                  <p className="text-white">{SUPPORT_EMAIL}</p>
                </div>
              </a>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7">
            <Accordion type="single" collapsible className="divide-y divide-ink-700 border-y border-ink-700">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`} className="border-0">
                  <AccordionTrigger className="py-6 text-left text-lg font-normal tracking-[-0.02em] text-white hover:no-underline [&>svg]:text-ink-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pr-8 text-base leading-relaxed text-ink-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-ink-700">
          <ParallaxImage
            src="/images/doorstep.jpg"
            alt=""
            speed={0.2}
            className="absolute inset-0"
            overlay={<div className="absolute inset-0 bg-gradient-to-br from-ink-950/95 via-ink-950/80 to-flame-600/40" />}
          />
          <div className="relative px-6 py-20 text-center md:px-16 md:py-28">
            <h2 className="display mx-auto max-w-3xl text-[clamp(2.25rem,1.4rem+3.5vw,4.5rem)]">
              Be one of the first merchants on <Accent className="text-gradient-flame pr-1">Smartdrop.</Accent>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-300">
              Reserve any locker for KES 50. Join the Nairobi pilot, or propose your property as a locker site.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={SMARTDROP_URL} className="btn-light h-12 px-6">
                Join the pilot <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={`mailto:${SUPPORT_EMAIL}?subject=Smartdrop%20demo`} className="btn-ghost h-12 px-6">
                Request a demo
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
