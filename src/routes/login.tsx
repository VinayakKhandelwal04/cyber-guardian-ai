import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — CyberShield AI" }, { name: "description", content: "Sign in to your CyberShield AI account." }] }),
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 grid place-items-center px-4 py-12">
        <div className="w-full max-w-md glass rounded-2xl p-8">
          <div className="mb-6 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary glow">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Sign in to access the SOC dashboard.</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-muted-foreground mb-1">Email</label>
              <input type="email" className="w-full rounded-md border border-border bg-background/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="analyst@example.com" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs uppercase tracking-wide text-muted-foreground">Password</label>
                <a className="text-xs text-primary hover:underline" href="#">Forgot?</a>
              </div>
              <input type="password" className="w-full rounded-md border border-border bg-background/40 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="••••••••" />
            </div>
            <button type="button" className="w-full rounded-md bg-gradient-primary py-2.5 text-sm font-medium text-primary-foreground glow">Sign in</button>
          </form>
          <p className="mt-5 text-center text-sm text-muted-foreground">
            No account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
