import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ThreatBadge } from "@/components/threat-badge";
import { reports, threatTrend, scamMix, hotspots } from "@/lib/mock-data";
import { Activity, AlertTriangle, ShieldCheck, Users, ArrowUpRight } from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "SOC Dashboard — CyberShield AI" },
      { name: "description", content: "Real-time threat intelligence dashboard with analytics and global hotspots." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { Icon: AlertTriangle, label: "Active threats", value: "1,284", delta: "+12.4%", tone: "text-warning" },
  { Icon: ShieldCheck, label: "Resolved (7d)", value: "842", delta: "+5.1%", tone: "text-success" },
  { Icon: Activity, label: "AI confidence", value: "98.2%", delta: "+0.3%", tone: "text-primary" },
  { Icon: Users, label: "Reporters", value: "12.4K", delta: "+318", tone: "text-secondary" },
];

const pieColors = ["oklch(0.78 0.18 200)", "oklch(0.65 0.22 305)", "oklch(0.72 0.18 155)", "oklch(0.8 0.18 75)", "oklch(0.65 0.24 25)"];

function Dashboard() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-xs font-mono uppercase text-primary tracking-widest">Security Operations Center</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-1">Threat Intelligence Overview</h1>
            <p className="text-muted-foreground mt-1">Live snapshot across all monitored regions and vectors.</p>
          </div>
          <Link to="/analyzer" className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground glow">
            Run AI Analyzer <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.Icon className={`h-4 w-4 ${s.tone}`} />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold">{s.value}</span>
                <span className={`text-xs ${s.tone}`}>{s.delta}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="glass rounded-2xl p-6 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Threat trend (last 7 days)</h3>
              <span className="text-xs text-muted-foreground font-mono">UTC</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={threatTrend}>
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.78 0.18 200)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="oklch(0.78 0.18 200)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.22 305)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="oklch(0.65 0.22 305)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 6%)" vertical={false} />
                  <XAxis dataKey="day" stroke="oklch(0.72 0.02 240)" fontSize={12} />
                  <YAxis stroke="oklch(0.72 0.02 240)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "oklch(0.2 0.03 255)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="phishing" stroke="oklch(0.78 0.18 200)" strokeWidth={2} fill="url(#g1)" />
                  <Area type="monotone" dataKey="scam" stroke="oklch(0.65 0.22 305)" strokeWidth={2} fill="url(#g2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Scam type mix</h3>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={scamMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                    {scamMix.map((_, i) => <Cell key={i} fill={pieColors[i]} stroke="transparent" />)}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "oklch(0.2 0.03 255)", border: "1px solid oklch(1 0 0 / 10%)", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Hotspots + Recent */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Top hotspots</h3>
            <ul className="space-y-3">
              {hotspots.slice(0, 6).sort((a,b) => b.count - a.count).map((h) => (
                <li key={h.city} className="flex items-center justify-between rounded-xl border border-border/50 px-4 py-3">
                  <div>
                    <div className="font-medium">{h.city}</div>
                    <div className="text-xs text-muted-foreground">{h.count} active reports</div>
                  </div>
                  <ThreatBadge level={h.severity} />
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Recent reports</h3>
              <Link to="/reports" className="text-sm text-primary hover:underline">All reports →</Link>
            </div>
            <ul className="space-y-3">
              {reports.slice(0, 6).map((r) => (
                <li key={r.id} className="flex items-center justify-between rounded-xl border border-border/50 px-4 py-3">
                  <div>
                    <div className="text-xs font-mono text-muted-foreground">{r.id} · {r.type}</div>
                    <div className="font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.region} · {r.date}</div>
                  </div>
                  <ThreatBadge level={r.severity} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
