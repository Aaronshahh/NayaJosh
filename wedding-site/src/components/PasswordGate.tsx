"use client";

import { FormEvent, useState } from "react";
import { FloralDivider } from "./Florals";
import { useAccess } from "./AccessProvider";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const { ready, role, unlock } = useAccess();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg px-6">
        <p className="font-display text-2xl italic text-rose-deep">Loading…</p>
      </div>
    );
  }

  if (role) return <>{children}</>;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await unlock(password);
    if (result) setError(result);
    setSubmitting(false);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(227,209,203,0.55),transparent_60%)]" />
      <div className="relative z-10 w-full max-w-md text-center">
        <p className="section-eyebrow text-rose-deep">Naya &amp; Josh</p>
        <FloralDivider className="mx-auto mt-3 h-5 w-44 text-rose/60" />
        <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-text md:text-5xl">
          Private Invitation
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
          Enter the password from your invitation to continue.
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6 text-left" noValidate>
          <div>
            <label htmlFor="site-password" className="label-field">
              Password
            </label>
            <input
              id="site-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Invitation password"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-rose-deep" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="btn-primary w-full" disabled={submitting || !password.trim()}>
            {submitting ? "Checking…" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
