import { Link } from "@tanstack/react-router";
import { Shield, Bell } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary glow">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Cyber<span className="text-gradient">Shield</span>
            <span className="ml-1 text-xs font-mono text-muted-foreground">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/dashboard", label: "Dashboard" },
            { to: "/analyzer", label: "AI Analyzer" },
            { to: "/reports", label: "Reports" },
            { to: "/threat-map", label: "Threat Map" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-md text-foreground bg-muted/60" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button className="relative grid h-9 w-9 place-items-center rounded-md hover:bg-muted/50 transition">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted/40"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center rounded-md bg-gradient-primary px-3 py-1.5 text-sm font-medium text-primary-foreground glow hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="container mx-auto px-4 py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} CyberShield AI — Defending the digital frontier.</p>
        <p className="font-mono text-xs">v0.1 · Threat Intelligence Platform</p>
      </div>
    </footer>
  );
}
