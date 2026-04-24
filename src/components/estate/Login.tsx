import { useState, type FormEvent } from "react";
import { Building2, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { heroLoginImage } from "@/lib/mock-data";

interface LoginProps {
  onSuccess: () => void;
}

const VALID_EMAIL = "Admin@gmail.com";
const VALID_PASSWORD = "GMI@0312";

export function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      if (email.trim() === VALID_EMAIL && password === VALID_PASSWORD) {
        onSuccess();
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      {/* LEFT */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src={heroLoginImage}
          alt="Modern luxury home interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-foreground/15 backdrop-blur">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">EstateFlow</span>
          </div>

          <div className="max-w-lg space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              Trusted by 2,400+ agencies worldwide
            </div>
            <h1 className="font-display text-4xl xl:text-5xl font-bold leading-[1.05] tracking-tight">
              Manage Properties, Leads & Deals in One Platform
            </h1>
            <p className="text-base text-primary-foreground/85 leading-relaxed">
              The modern CRM for real estate agencies and brokers.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { v: "12K+", l: "Listings" },
                { v: "$4.8B", l: "Closed" },
                { v: "98%", l: "Retention" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur">
                  <div className="font-display text-2xl font-bold">{s.v}</div>
                  <div className="text-xs text-primary-foreground/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <ShieldCheck className="h-4 w-4" />
            Enterprise-grade security · SOC 2 Type II
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex items-center justify-center p-6 sm:p-12">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary/40 via-background to-accent/10" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald/20 blur-3xl" />

        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">EstateFlow</span>
          </div>

          <div className="glass rounded-3xl p-8 shadow-glow">
            <h2 className="font-display text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to continue managing your portfolio.
            </p>

            <form onSubmit={submit} className="mt-7 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground/80">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-input bg-background/80 pl-10 pr-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground/80">Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-input bg-background/80 pl-10 pr-10 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded border-input" />
                  Remember me
                </label>
                <button type="button" className="font-medium text-accent hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary/90 disabled:opacity-70"
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>

            <div className="mt-6 rounded-xl bg-secondary/60 px-3 py-2.5 text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">Demo credentials:</span> Admin@gmail.com / GMI@0312
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © 2025 EstateFlow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
