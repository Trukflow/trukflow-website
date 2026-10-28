import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Translates its child as the section scrolls through the viewport.
 * Uses transforms rather than `background-attachment: fixed`, so it also works on mobile.
 */
export const useParallax = <T extends HTMLElement>(speed = 0.2) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    const target = targetRef.current;
    const container = target?.closest<HTMLElement>("[data-parallax]") ?? target?.parentElement;
    if (!target || !container || prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = container.getBoundingClientRect();
      const viewport = window.innerHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;
      // -1 when the section enters from below, 1 when it leaves at the top
      const progress = (viewport / 2 - (rect.top + rect.height / 2)) / (viewport / 2 + rect.height / 2);
      target.style.transform = `translate3d(0, ${progress * speed * rect.height}px, 0) scale(1.02)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return targetRef;
};

// Photos in /images/ have WebP versions at these widths (see public/images)
const SCENE_WIDTHS = [640, 1280, 1920];

export const sceneSrcSet = (src: string) => {
  const match = src.match(/^\/images\/([a-z0-9-]+)\.jpg$/);
  return match ? SCENE_WIDTHS.map((w) => `/images/${match[1]}-${w}.webp ${w}w`).join(", ") : undefined;
};

type ParallaxImageProps = {
  src: string;
  alt?: string;
  speed?: number;
  className?: string;
  imgClassName?: string;
  overlay?: ReactNode;
  priority?: boolean;
  /** How wide the image renders, so the browser can pick the smallest file */
  sizes?: string;
};

export const ParallaxImage = ({
  src,
  alt = "",
  speed = 0.2,
  className,
  imgClassName,
  overlay,
  priority,
  sizes = "100vw",
}: ParallaxImageProps) => {
  const imgRef = useParallax<HTMLImageElement>(speed);
  const srcSet = sceneSrcSet(src);

  return (
    <div data-parallax className={cn("relative overflow-hidden", className)}>
      <picture>
        {srcSet && <source type="image/webp" srcSet={srcSet} sizes={sizes} />}
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          className={cn(
            "absolute inset-x-0 -top-[20%] h-[140%] w-full object-cover will-change-transform",
            imgClassName
          )}
        />
      </picture>
      {overlay}
    </div>
  );
};
