import { cn } from "@/lib/utils";

/**
 * TRUKFLOW wordmark for dark backgrounds. The source PNG has black "TRUK" lettering;
 * invert + hue-rotate turns it white while keeping the orange close to brand.
 */
const Logo = ({ className }: { className?: string }) => (
  <img
    src="/TRUKFLOW Logo Transparent.png"
    alt="TRUKFLOW"
    className={cn("h-11 w-auto [filter:invert(1)_hue-rotate(180deg)]", className)}
  />
);

export default Logo;
