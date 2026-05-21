import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ThreatBadge } from "@/components/threat-badge";
import heroImg from "@/assets/cyber-hero.jpg";
import { Shield, Brain, MapPin, Bot, Activity, Lock, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberShield AI — AI-powered Cyber Crime Reporting & Threat Intelligence" },
      { name: "description", content: "Report cybercrime, analyze scams with AI, and visualize global threats in real time." },
      { property: "og:title", content: "CyberShield AI" },
      { property: "og:description", content: "AI-powered cyber crime reporting and threat intelligence." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
        <div className="absolute inset-0 -z-10 grid-bg opacity-30" />

        <div className="container mx-auto px-4 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Real-time threat intelligence · Powered by AI
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
              Defend the digital frontier with{" "}
              <span className="text-gradient">CyberShield AI</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Report cybercrime, analyze scams with AI, and track global threat hotspots in a single,
              futuristic Security Operations dashboard.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-3 font-medium text-primary-foreground glow hover:opacity-90">
                Launch Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/analyzer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 font-medium backdrop-blur hover:bg-card">
                Try AI Analyzer
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 max-w-xl mx-auto gap-3">
              {[
                { k: "12.4K", v: "Reports" },
                { k: "98.2%", v: "Detection" },
                { k: "180+", v: "Regions" },
              ].map((s) => (
                <div key={s.v} className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-gradient">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">A complete cyber defense toolkit</h2>
          <p className="mt-2 text-muted-foreground">Everything analysts, victims and admins need in one place.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { Icon: Brain, title: "AI Crime Analyzer", desc: "Classify scams, score phishing probability and surface prevention tips instantly." },
            { Icon: Shield, title: "Crime Reporting", desc: "File phishing, scams, fake sites, identity theft and social fraud reports in seconds." },
            { Icon: MapPin, title: "Interactive Threat Map", desc: "Visualize global hotspots and trending attack vectors in real time." },
            { Icon: Bot, title: "AI Safety Chatbot", desc: "24/7 conversational guidance on cyber hygiene and scam prevention." },
            { Icon: Activity, title: "Live Threat Feed", desc: "Streaming alerts, severity badges and analytics for your SOC team." },
            { Icon: Lock, title: "Role-based Access", desc: "Secure JWT auth with admin controls, PDF exports and audit-ready logs." },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="group glass rounded-2xl p-6 transition hover:-translate-y-1 hover:glow">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-gradient-primary glow">
                <Icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE FEED */}
      <section className="container mx-auto px-4 py-16">
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold">Recent scam alerts</h3>
              <p className="text-sm text-muted-foreground">Live from the global CyberShield network.</p>
            </div>
            <Link to="/reports" className="text-sm text-primary hover:underline">View all →</Link>
          </div>
          <div className="grid gap-3">
            {[
              { sev: "critical" as const, t: "Fake banking app on Play Store mimicking ICICI", loc: "Mumbai · 4 min ago" },
              { sev: "high" as const, t: "Phishing wave targeting Microsoft 365 admins", loc: "London · 22 min ago" },
              { sev: "medium" as const, t: "Counterfeit Shopify storefront flagged", loc: "Berlin · 1 hr ago" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-border/60 bg-background/40 px-4 py-3">
                <div className="flex items-center gap-3">
                  <ThreatBadge level={a.sev} />
                  <span className="font-medium">{a.t}</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{a.loc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
