import { Lock, Snowflake, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

type LockerVisualProps = {
  variant?: "drop" | "cold";
  className?: string;
};

// Door heights in grid rows: small, medium and large compartments
const columns = [
  [1, 1, 2, 1, 1],
  [2, 1, 1, 2],
  [1, 1, 1, 1, 2],
];

/** Illustrated smart-locker cabinet, used where no product photography exists yet. */
const LockerVisual = ({ variant = "drop", className }: LockerVisualProps) => {
  const isCold = variant === "cold";
  const accent = isCold ? "frost" : "flame";

  return (
    <div className={cn("relative", className)}>
      {/* Glow */}
      <div
        className={cn(
          "absolute -inset-10 rounded-full blur-3xl animate-glow-pulse",
          isCold ? "bg-frost-400/20" : "bg-flame-500/20"
        )}
      />

      <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-ink-800 to-ink-900 p-3 shadow-2xl shadow-black/60">
        {/* Header / screen */}
        <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/5 bg-black/60 px-4 py-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-400">
              {isCold ? "Smartcold · CBD-02" : "Smartdrop · CBD-01"}
            </p>
            <p className="mt-1 text-sm text-white">
              {isCold ? "Holding at 2°C" : "Enter your pickup code"}
            </p>
          </div>
          <div
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full",
              isCold ? "bg-frost-400/15 text-frost-200" : "bg-flame-500/15 text-flame-200"
            )}
          >
            {isCold ? <Snowflake className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
          </div>
        </div>

        {/* Doors */}
        <div className="grid grid-cols-3 gap-2">
          {columns.map((doors, col) => (
            <div key={col} className="grid grid-rows-6 gap-2" style={{ height: 300 }}>
              {doors.map((span, row) => {
                const active = col === 1 && row === 1;
                const label = `${String.fromCharCode(65 + col)}${row + 1}`;
                return (
                  <div
                    key={row}
                    style={{ gridRow: `span ${span}` }}
                    className={cn(
                      "relative rounded-xl border p-2 transition-colors",
                      active
                        ? isCold
                          ? "border-frost-400/60 bg-frost-400/10"
                          : "border-flame-400/60 bg-flame-500/10"
                        : isCold
                          ? "border-white/5 bg-gradient-to-br from-sky-950/40 to-ink-850"
                          : "border-white/5 bg-ink-850"
                    )}
                  >
                    <span className="font-mono text-[10px] text-ink-400">{label}</span>
                    <span
                      className={cn(
                        "absolute right-2 top-1/2 h-4 w-1 -translate-y-1/2 rounded-full",
                        active ? (isCold ? "bg-frost-400" : "bg-flame-400") : "bg-white/10"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Floating status chip */}
      <div className="absolute -bottom-5 -left-4 sm:-left-8 animate-float rounded-2xl border border-white/10 bg-ink-900/90 px-4 py-3 shadow-xl backdrop-blur">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              accent === "frost" ? "bg-frost-400 text-black" : "bg-flame-500 text-black"
            )}
          >
            {isCold ? <Snowflake className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
          </div>
          <div>
            <p className="text-xs text-ink-300">{isCold ? "Door B2 · fresh fish" : "Door B2 · OTP verified"}</p>
            <p className="font-mono text-sm text-white">{isCold ? "2.0°C steady" : "Parcel collected"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockerVisual;
