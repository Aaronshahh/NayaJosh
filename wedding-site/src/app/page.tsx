"use client";

import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { OurStory } from "@/components/OurStory";
import { RSVP } from "@/components/RSVP";
import { Travel } from "@/components/Travel";
import { Schedule } from "@/components/Schedule";
import { QA } from "@/components/QA";
import { BackToTop } from "@/components/BackToTop";
import { FloralDivider } from "@/components/Florals";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg font-body antialiased">
      <Navigation />
      <main className="pt-0">
        <Hero />
        <OurStory />
        <RSVP />
        <Travel />
        <Schedule />
        <QA />
      </main>
      <BackToTop />
      <footer className="relative overflow-hidden border-t border-rose/15 bg-bg-dark px-6 py-16 text-center md:py-20">
        <FloralDivider className="mx-auto h-5 w-48 text-rose/40" />
        <p className="mt-8 select-none font-display text-5xl font-light tracking-[0.08em] text-text-light/10 md:text-7xl">
          10&nbsp;26&nbsp;2026
        </p>
        <p className="mt-6 font-display text-3xl italic text-rose md:text-4xl">Naya &amp; Josh</p>
        <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-text-light/45">
          Together with their families
        </p>
      </footer>
    </div>
  );
}