import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { ThreatBadge } from "@/components/threat-badge";
import { useState } from "react";
import { Brain, Sparkles, ShieldAlert, Upload, Loader2 } from "lucide-react";

export const Route = createFileRoute("/analyzer")({
  head: () => ({
    meta: [
      { title: "AI Crime Analyzer — CyberShield AI" },
      { name: "description", content: "Submit suspicious messages or incidents and let AI classify scam type, phishing probability and threat level." },
    ],
  }),
  component: Analyzer,
});

type Result = {
  scamType: string;
  phishingProbability: number;
  threatLevel: "critical" | "high" | "medium" | "low";
  patterns: string[];
  tips: string[];
};

function analyzeText(text: string): Result {
  const t = text.toLowerCase();
  let score = 10;
  const patterns: string[] = [];
  const has = (kw: string[], label: string, pts: number) => {
    if (kw.some((k) => t.includes(k))) { score += pts; patterns.push(label); }
  };
  has(["otp", "one-time password", "verify your account", "verification code"], "Requests OTP / verification code", 25);
  has(["urgent", "immediately", "within 24", "account suspended", "blocked"], "Urgency / fear pressure", 18);
  has(["click here", "http://", "bit.ly", "tinyurl", "login to"], "Suspicious link or shortener", 18);
  has(["bank", "kyc", "card", "upi", "wire transfer"], "Financial / banking topic", 12);
  has(["crypto", "bitcoin", "investment", "guaranteed returns", "double your"], "Investment scam signals", 22);
  has(["lottery", "winner", "prize", "claim your"], "Lottery / prize bait", 20);
  has(["dear customer", "dear user"], "Generic greeting", 6);

  score = Math.min(99, score);
  let level: Result["threatLevel"] = "low";
  if (score >= 75) level = "critical";
  else if (score >= 55) level = "high";
  else if (score >= 30) level = "medium";

  const scamType =
    patterns.includes("Investment scam signals") ? "Investment / Crypto Scam"
    : patterns.includes("Lottery / prize bait") ? "Lottery Scam"
    : patterns.includes("Requests OTP / verification code") ? "Phishing (OTP Theft)"
    : patterns.includes("Suspicious link or shortener") ? "Phishing / Credential Harvest"
    : "Possible Social Engineering";

  return {
    scamType,
    phishingProbability: score,
    threatLevel: level,
    patterns: patterns.length ? patterns : ["No strong signals detected"],
    tips: [
      "Never share OTPs, passwords or card details with anyone.",
      "Hover over links before clicking — verify the real domain.",
      "Contact the organization through official channels to confirm.",
      "Report the incident on CyberShield to protect others.",
    ],
  };
}

function Analyzer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const run = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 900));
    setResult(analyzeText(text));
    setLoading(false);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> AI-assisted threat triage
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-bold">AI Crime Analyzer</h1>
            <p className="mt-2 text-muted-foreground">Paste a suspicious message, email or incident description below.</p>
          </div>

          <div className="glass rounded-2xl p-6">
            <label className="block text-sm font-medium mb-2">Incident description</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Example: I got an SMS saying my bank account will be blocked unless I verify my OTP at http://bit.ly/xyz..."
              className="w-full rounded-xl border border-border bg-background/40 p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="mt-4 flex flex-wrap items-center gap-3 justify-between">
              <button className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-3 py-2 text-sm hover:bg-card">
                <Upload className="h-4 w-4" /> Attach evidence
              </button>
              <button
                onClick={run}
                disabled={loading || !text.trim()}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-5 py-2.5 text-sm font-medium text-primary-foreground glow disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                {loading ? "Analyzing…" : "Analyze with AI"}
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">AI Verdict</h3>
                  <ThreatBadge level={result.threatLevel} />
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wide">Scam type</div>
                    <div className="font-medium text-base">{result.scamType}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Phishing probability</div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-primary" style={{ width: `${result.phishingProbability}%` }} />
                    </div>
                    <div className="mt-1 text-right text-xs font-mono text-primary">{result.phishingProbability}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Detected patterns</div>
                    <ul className="list-disc pl-5 space-y-1">
                      {result.patterns.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Prevention & next steps</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  {result.tips.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
