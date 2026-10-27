import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/site/SiteFooter";
import Reveal from "@/components/site/Reveal";
import { ParallaxImage } from "@/components/site/Parallax";
import { Accent, SectionHeading, useHashScroll } from "@/components/site/Section";
import { products, SMARTDROP_URL } from "@/components/site/content";
import { cn } from "@/lib/utils";

type Person = {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin: string;
};

const team: Person[] = [
  {
    name: "Abisai Nandi",
    role: "Founder & CEO, TRUKFLOW Ventures",
    image: "/AbisaiPhoto.jpg",
    bio: "Serial entrepreneur with 10+ years building and scaling complex supply chain and distribution operations across East Africa. Grew a multi-branch agribusiness spanning fleet logistics, cold storage, farmer aggregation, distribution and last-mile delivery to over $1M in revenue across 20+ locations. At TRUKFLOW Ventures, Abisai brings that hard-earned operational depth to building East Africa's smartest logistics and commerce infrastructure. His approach is simple: build the backbone first. Every TRUKFLOW product is designed by someone who has lived the inefficiencies and knows exactly how to fix them across the team.",
    linkedin: "https://www.linkedin.com/in/abisai-nandi-443405145/",
  },
  {
    name: "Mumbua Mutuku",
    role: "Co-founder & Backend Engineer",
    image: "/photo_2025-06-19 23.37.40.jpeg",
    bio: "Senior Software Engineer with 10+ years of experience specializing in scalable backend systems and cloud infrastructure for the logistics platforms.",
    linkedin: "https://www.linkedin.com/in/mumbuamutuku/",
  },
  {
    name: "Mititi Isaac",
    role: "Co-founder, Frontend Engineer & Branding",
    image: "/Official Photo.jpg",
    bio: "Full-stack Software Engineer and UX designer with 5+ years of experience; part of the team building TRUKFLOW's customer-facing interfaces and brand systems.",
    linkedin: "https://www.linkedin.com/in/io-mititi/",
  },
  {
    name: "Ayub Ng'ang'a",
    role: "CTO & Systems Engineer",
    image: "/Ayub Ng'ang'a.jpeg",
    bio: "IoT and embedded systems engineer with 6+ years of experience deploying connected energy storage, PV, and microgrid solutions across emerging markets. Specializes in firmware, telemetry, cloud integration, and secure OTA systems, with hands-on experience delivering scalable diagnostics, monitoring, and remote control infrastructure for distributed ESS fleets across East Africa.",
    linkedin: "https://www.linkedin.com/in/ayubnganga/",
  },
  {
    name: "Dickson Mumo",
    role: "Lead IoT & Hardware Engineer",
    image: "/Dickson.jpg",
    bio: "Firmware and hardware engineer with 8+ years of experience building embedded systems across automotive, agriculture, medical devices, and consumer electronics. Brings deep expertise in microcontrollers, wireless connectivity, schematic capture, and PCB design, delivering production-ready connected hardware from concept through deployment.",
    linkedin: "https://www.linkedin.com/in/dickson-mumo-4bba7697/",
  },
];

const advisors: Person[] = [
  {
    name: "Olum Alex",
    role: "Board Advisor, Sales & Market Development",
    image: "/Olum Alex Image.jpeg",
    bio: "Executive MBA and Bachelor of Education holder with deep experience in sales strategy, trade marketing, distributor management, direct sales, agency operations, team mobilization, promotions, event execution, and data-led decision making.",
    linkedin: "https://www.linkedin.com/in/olum-alex-a003344b/",
  },
  {
    name: "Joseph Newton Okech",
    role: "Board Advisor, Agricultural Economics & Operations",
    image: "/Joseph Newton Image.jpeg",
    bio: "Agricultural economist with an MSc in Agricultural Economics and operations leadership experience as Director of Operations at Aquarech Ltd. Provides economic evaluation services and develops farmer training materials for fish production and marketing.",
    linkedin: "https://www.linkedin.com/in/joseph-newton-okech-016b03133/",
  },
  {
    name: "Otieno Omondi",
    role: "Board Advisor, Technology & Cybersecurity",
    image: "/Otieno Omondi Image.jpeg",
    bio: "IT specialist, network administrator, software developer, cybersecurity specialist, and BI consultant with experience leading digital transformation, analytics, AI security solutions, cybersecurity strategy, and technology-enabled operational improvements.",
    linkedin: "https://www.linkedin.com/in/otieno-omondi/",
  },
];

const industryStats = [
  {
    number: "2.5B",
    label: "East Africa logistics market value (USD)",
    detail: "Projected to grow at 7.2% CAGR through 2030 due to rising trade and infrastructure investments.",
  },
  {
    number: "15%",
    label: "Agricultural GDP contribution",
    detail: "Agriculture drives logistics demand, but inefficiencies cost the region ~$1.5B yearly.",
  },
  {
    number: "60%",
    label: "Employment in agriculture",
    detail: "Highlights the need for cold-chain logistics to reduce post-harvest losses.",
  },
  {
    number: "40%",
    label: "Intra-African trade costs above global average",
    detail: "AfCFTA aims to reduce tariffs, but non-tariff barriers such as customs delays persist.",
  },
  {
    number: "70%",
    label: "Cargo transported by road",
    detail: "Rail and maritime are underused; Mombasa and Dar es Salaam ports handle 90% of trade.",
  },
  {
    number: "3",
    label: "Products on one network",
    detail: "Smartdrop, Smartcold and the Chukua App are built to work together, from first mile to final pickup.",
  },
];

const values = [
  { title: "Reliability", body: "Consistent, dependable infrastructure our customers can build their business on." },
  { title: "Innovation", body: "We keep improving our hardware and software to serve users better." },
  { title: "Trust", body: "Lasting relationships built on transparency, security and integrity." },
];

const productDots: Record<string, string> = {
  smartdrop: "bg-flame-500",
  smartcold: "bg-frost-400",
  chukua: "bg-leaf-400",
};

const PersonCard = ({ person, featured }: { person: Person; featured?: boolean }) => (
  <article
    className={cn(
      "group card-surface h-full overflow-hidden transition-colors hover:border-ink-600",
      featured && "md:grid md:grid-cols-5"
    )}
  >
    <div className={cn("overflow-hidden bg-ink-800", featured ? "aspect-[4/5] md:col-span-2 md:aspect-auto" : "aspect-[4/5]")}>
      <img
        src={person.image}
        alt={person.name}
        loading="lazy"
        className="h-full w-full object-cover object-top grayscale-[35%] transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
      />
    </div>
    <div className={cn("p-7", featured && "md:col-span-3 md:p-10")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className={cn("font-normal tracking-[-0.02em] text-white", featured ? "text-3xl" : "text-xl")}>
            {person.name}
          </h3>
          <p className="mt-1 text-sm text-flame-200">{person.role}</p>
        </div>
        <a
          href={person.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${person.name} on LinkedIn`}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-ink-700 text-ink-300 transition-colors hover:border-white/30 hover:text-white"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-ink-300">{person.bio}</p>
    </div>
  </article>
);

const About = () => {
  useHashScroll();

  return (
    <div className="site">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden grain">
        <ParallaxImage
          src="/images/doorstep.jpg"
          alt="Courier delivering a parcel"
          speed={0.25}
          priority
          className="absolute inset-0"
          overlay={
            <>
              <div className="absolute inset-0 bg-ink-950/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/60" />
            </>
          }
        />
        <div className="site-container relative z-10 pb-20 pt-40">
          <Reveal>
            <span className="eyebrow">About TRUKFLOW</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-7 max-w-5xl text-[clamp(2.75rem,1.6rem+5vw,6rem)]">
              Build the backbone <Accent className="text-gradient-flame pr-2">first.</Accent>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-300">
              We're a Nairobi team of operators and engineers building the physical and digital infrastructure that
              lets goods change hands reliably: smart lockers, cold storage and on-demand collection.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & vision */}
      <section className="py-24 md:py-32">
        <div className="site-container grid gap-4 md:grid-cols-2">
          {[
            {
              label: "Our mission",
              body: "To make moving goods in East Africa secure, affordable and predictable, with infrastructure that merchants, farmers, transporters and customers can rely on every day.",
            },
            {
              label: "Our vision",
              body: "To become the logistics backbone of African commerce: a connected network of lockers, cold storage and collection that powers economic growth for businesses of every size.",
            },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 100}>
              <div className="card-surface h-full p-8 md:p-12">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">{item.label}</span>
                <p className="mt-6 text-2xl font-light leading-snug tracking-[-0.02em] text-white md:text-3xl">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we build */}
      <section className="border-t border-ink-800 py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                One network. <Accent className="text-ink-300">Three products.</Accent>
              </>
            }
          />
          <div className="mt-14 divide-y divide-ink-700 border-y border-ink-700">
            {products.map((product, i) => {
              const content = (
                <>
                  <span className="font-mono text-sm text-ink-400">0{i + 1}</span>
                  <span className="flex items-center gap-3">
                    <span className={cn("h-2 w-2 rounded-full", productDots[product.id])} />
                    <span className="display text-3xl md:text-5xl">{product.name}</span>
                  </span>
                  <span className="text-ink-300 md:max-w-md">{product.tagline}</span>
                  <span className="ml-auto flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-400">
                    {product.statusLabel}
                    {product.external ? (
                      <ArrowUpRight className="h-5 w-5 text-ink-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    ) : (
                      <ArrowRight className="h-5 w-5 text-ink-300 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
                    )}
                  </span>
                </>
              );
              const className =
                "group flex flex-col gap-4 py-8 transition-colors hover:bg-white/[0.02] md:flex-row md:items-center md:gap-10 md:px-4";
              return (
                <Reveal key={product.id} delay={i * 80}>
                  {product.external ? (
                    <a href={product.href} className={className}>{content}</a>
                  ) : (
                    <Link to={product.href} className={className}>{content}</Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="border-t border-ink-800 bg-ink-900/40 py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="The challenge we're solving"
            title={
              <>
                Goods move slowly, and <Accent className="text-ink-300">value leaks out.</Accent>
              </>
            }
            description="Post-harvest losses and inefficient transport hold back East African trade. We're building the infrastructure to change that."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
            {industryStats.map((stat, i) => (
              <Reveal key={stat.label} delay={(i % 3) * 80} className="bg-ink-950 p-8">
                <p className="display text-5xl">{stat.number}</p>
                <p className="mt-4 text-white">{stat.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-400">{stat.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="Leadership"
            title={
              <>
                Operators and engineers who've <Accent className="text-ink-300">lived the problem.</Accent>
              </>
            }
          />
          <Reveal className="mt-14">
            <PersonCard person={team[0]} featured />
          </Reveal>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.slice(1).map((member, i) => (
              <Reveal key={member.name} delay={i * 80}>
                <PersonCard person={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="border-t border-ink-800 py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            eyebrow="Board of advisors"
            title={
              <>
                Guided by <Accent className="text-ink-300">experience.</Accent>
              </>
            }
            description="Experienced operators and specialists guiding TRUKFLOW's growth across markets, technology and agriculture."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {advisors.map((advisor, i) => (
              <Reveal key={advisor.name} delay={i * 80}>
                <PersonCard person={advisor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-ink-800 py-24 md:py-32">
        <div className="site-container">
          <SectionHeading eyebrow="Our values" title="What we stand for." />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <div className="card-surface h-full p-8">
                  <span className="display text-gradient-flame text-6xl">{value.title[0]}</span>
                  <h3 className="mt-6 text-xl font-normal tracking-[-0.02em] text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border border-ink-700 bg-ink-900">
          <div className="absolute -bottom-40 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-flame-500/20 blur-[120px]" />
          <div className="relative px-6 py-20 text-center md:px-16 md:py-24">
            <h2 className="display mx-auto max-w-3xl text-[clamp(2.25rem,1.4rem+3vw,4rem)]">
              Join our <Accent className="text-gradient-flame pr-1">mission.</Accent>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink-300">
              Start with Smartdrop: join the Nairobi merchant pilot or host a locker at your property.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={SMARTDROP_URL} className="btn-light h-12 px-6">
                Join the pilot <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link to="/#contact" className="btn-ghost h-12 px-6">
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
};

export default About;
