import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Reveal from "@/components/site/Reveal";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export const SectionHeading = ({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) => (
  <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2 className="display mt-5 text-[clamp(2.2rem,1.4rem+3vw,4rem)]">{title}</h2>
    {description && (
      <p className={cn("mt-5 text-base leading-relaxed text-ink-300 md:text-lg", align === "center" && "mx-auto")}>
        {description}
      </p>
    )}
  </Reveal>
);

/** Italic serif accent used inside display headings. */
export const Accent = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("font-serif italic tracking-[-0.02em]", className)}>{children}</span>
);

/** Scrolls to the location hash after route changes (e.g. /#faqs from another page). */
export const useHashScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 80);
    return () => clearTimeout(timer);
  }, [hash, pathname]);
};

export const Marquee = ({ items, className }: { items: string[]; className?: string }) => (
  <div
    className={cn(
      "relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
      className
    )}
  >
    <div className="flex w-max animate-marquee gap-3 pr-3 motion-reduce:animate-none">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          aria-hidden={i >= items.length}
          className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-ink-200 backdrop-blur"
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);
