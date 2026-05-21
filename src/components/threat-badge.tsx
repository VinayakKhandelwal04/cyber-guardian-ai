import { cn } from "@/lib/utils";

const tones = {
  critical: "bg-destructive/15 text-destructive border-destructive/40",
  high: "bg-warning/15 text-warning border-warning/40",
  medium: "bg-primary/15 text-primary border-primary/40",
  low: "bg-success/15 text-success border-success/40",
} as const;

export function ThreatBadge({ level }: { level: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
        tones[level],
      )}
    >
      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-current pulse-ring" />
      {level}
    </span>
  );
}
