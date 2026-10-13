"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { OurStory } from "@/components/OurStory";
import { RSVP } from "@/components/RSVP";
import { EventGuide } from "@/components/EventGuide";
import { Travel } from "@/components/Travel";
import { Schedule } from "@/components/Schedule";
import { Gifts } from "@/components/Gifts";
import { QA } from "@/components/QA";
import { FloralDivider } from "@/components/Florals";
import { AccessProvider, useAccess } from "@/components/AccessProvider";
import { PasswordGate } from "@/components/PasswordGate";
import { AdminDashboard } from "@/components/AdminDashboard";

function SiteContent() {
  const { role, lock } = useAccess();

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return (
    <div className="relative min-h-screen bg-bg font-body antialiased">
      <Navigation />
      <div className="fixed right-4 top-24 z-40 md:right-6">
        <button type="button" onClick={lock} className="btn-secondary bg-bg/80 px-4 py-2 backdrop-blur-sm">
          Lock
        </button>
      </div>
      <main className="pt-0">
        <Hero />
        <OurStory />
        <RSVP />
        <EventGuide />
        <Travel />
        <Schedule />
        <Gifts />
        <QA />
      </main>
      <footer className="relative overflow-hidden border-t border-rose/15 bg-bg-dark px-6 py-16 text-center md:py-20">
        <FloralDivider className="mx-auto h-5 w-48 text-rose/40" />
        <p className="mt-8 select-none font-display text-5xl font-light tracking-[0.08em] text-text-light/10 md:text-7xl">
          06&nbsp;13&nbsp;2027
        </p>
        <p className="mt-6 font-display text-3xl italic text-rose md:text-4xl">Naya &amp; Josh</p>
        <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-text-light/45">
          Together with their families
        </p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <AccessProvider>
      <PasswordGate>
        <SiteContent />
      </PasswordGate>
    </AccessProvider>
  );
}
