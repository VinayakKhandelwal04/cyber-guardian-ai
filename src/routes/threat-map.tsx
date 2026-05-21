import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ThreatBadge } from "@/components/threat-badge";
import { hotspots } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/threat-map")({
  head: () => ({
    meta: [
      { title: "Global Threat Map — CyberShield AI" },
      { name: "description", content: "Interactive global map of cybercrime hotspots and threat density." },
    ],
  }),
  component: ThreatMap,
});

const sevColor: Record<string, string> = {
  critical: "oklch(0.65 0.24 25)",
  high: "oklch(0.8 0.18 75)",
  medium: "oklch(0.78 0.18 200)",
  low: "oklch(0.72 0.18 155)",
};

function ThreatMap() {
  const [active, setActive] = useState<string | null>(null);
  const total = hotspots.reduce((s, h) => s + h.count, 0);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-10">
        <div className="mb-6">
          <p className="text-xs font-mono uppercase text-primary tracking-widest">Global Intelligence</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1">Interactive Threat Map</h1>
          <p className="text-muted-foreground mt-1">{total.toLocaleString()} active reports across {hotspots.length} monitored regions.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="glass rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            <div className="relative aspect-[2/1] w-full">
              {/* Stylized world dot map */}
              <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full opacity-40">
                {Array.from({ length: 700 }).map((_, i) => {
                  const x = (i * 13) % 100;
                  const y = ((i * 7) % 50);
                  return <circle key={i} cx={x} cy={y} r="0.18" fill="oklch(0.78 0.18 200)" />;
                })}
              </svg>

              {hotspots.map((h) => (
                <button
                  key={h.city}
                  onMouseEnter={() => setActive(h.city)}
                  onMouseLeave={() => setActive(null)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, color: sevColor[h.severity] }}
                >
                  <span className="block relative h-3 w-3 rounded-full pulse-ring" style={{ background: sevColor[h.severity], boxShadow: `0 0 14px ${sevColor[h.severity]}` }} />
                  <span className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs ${active === h.city ? "opacity-100" : "opacity-0"} transition`}>
                    <span className="font-medium">{h.city}</span> · {h.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {(["critical","high","medium","low"] as const).map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: sevColor[s] }} />
                  <span className="uppercase tracking-wide">{s}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="glass rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Regional breakdown</h3>
            <ul className="space-y-2 max-h-[520px] overflow-auto pr-1">
              {[...hotspots].sort((a,b) => b.count - a.count).map((h) => (
                <li
                  key={h.city}
                  onMouseEnter={() => setActive(h.city)}
                  onMouseLeave={() => setActive(null)}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2.5 transition ${active === h.city ? "border-primary bg-primary/5" : "border-border/50"}`}
                >
                  <div>
                    <div className="font-medium">{h.city}</div>
                    <div className="text-xs text-muted-foreground">{h.count} reports</div>
                  </div>
                  <ThreatBadge level={h.severity} />
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
