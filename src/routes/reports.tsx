import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ThreatBadge } from "@/components/threat-badge";
import { reports, type Report } from "@/lib/mock-data";
import { useMemo, useState } from "react";
import { Search, Plus, Download } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — CyberShield AI" },
      { name: "description", content: "Search, filter and review cybercrime reports submitted to CyberShield." },
    ],
  }),
  component: Reports,
});

const TYPES: Array<Report["type"] | "All"> = ["All", "Phishing", "Online Scam", "Fake Website", "Identity Theft", "Social Media Fraud"];

function Reports() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(
    () => reports.filter(r =>
      (type === "All" || r.type === type) &&
      (q === "" || r.title.toLowerCase().includes(q.toLowerCase()) || r.region.toLowerCase().includes(q.toLowerCase()))
    ),
    [q, type],
  );

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Cyber Crime Reports</h1>
            <p className="text-muted-foreground mt-1">{filtered.length} of {reports.length} reports shown</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-3 py-2 text-sm hover:bg-card">
              <Download className="h-4 w-4" /> Export PDF
            </button>
            <button onClick={() => setShowForm(s => !s)} className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground glow">
              <Plus className="h-4 w-4" /> New report
            </button>
          </div>
        </div>

        {showForm && (
          <div className="glass rounded-2xl p-6 mb-6">
            <h3 className="font-semibold mb-4">File a new report</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <input className="rounded-md border border-border bg-background/40 px-3 py-2 text-sm" placeholder="Title (e.g. Fake bank SMS)" />
              <select className="rounded-md border border-border bg-background/40 px-3 py-2 text-sm">
                {TYPES.filter(t => t !== "All").map(t => <option key={t}>{t}</option>)}
              </select>
              <input className="rounded-md border border-border bg-background/40 px-3 py-2 text-sm md:col-span-2" placeholder="Region / City" />
              <textarea rows={3} className="rounded-md border border-border bg-background/40 px-3 py-2 text-sm md:col-span-2" placeholder="Describe what happened…" />
              <div className="md:col-span-2 flex justify-end">
                <button onClick={() => setShowForm(false)} className="rounded-md bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground glow">Submit report</button>
              </div>
            </div>
          </div>
        )}

        <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search reports, regions…"
              className="w-full rounded-md border border-border bg-background/40 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-1 flex-wrap">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`rounded-full px-3 py-1.5 text-xs border ${type === t ? "bg-gradient-primary text-primary-foreground border-transparent glow" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">ID</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">Type</th>
                <th className="text-left px-4 py-3 hidden lg:table-cell">Region</th>
                <th className="text-left px-4 py-3">Severity</th>
                <th className="text-left px-4 py-3 hidden sm:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-border/40 hover:bg-muted/20 transition">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                  <td className="px-4 py-3 font-medium">{r.title}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{r.type}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground">{r.region}</td>
                  <td className="px-4 py-3"><ThreatBadge level={r.severity} /></td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="rounded-full bg-muted/60 px-2 py-0.5 text-xs">{r.status}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">No reports match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
