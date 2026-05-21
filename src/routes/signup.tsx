import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — CyberShield AI" }, { name: "description", content: "Create your CyberShield AI account." }] }),
  component: Signup,
});

function Signup() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 grid place-items-center px-4 py-12">
        <div className="w-full max-w-md glass rounded-2xl p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary glow">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground">Join the CyberShield defender network.</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-1">Full name</label>
              <input className="w-full rounded-md border border-border bg-background/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-1">Email</label>
              <input type="email" className="w-full rounded-md border border-border bg-background/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-1">Password</label>
              <input type="password" className="w-full rounded-md border border-border bg-background/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="At least 8 characters" />
            </div>
            <button type="button" className="w-full rounded-md bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground glow">Create account</button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already a member? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
