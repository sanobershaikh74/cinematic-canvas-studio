import { useEffect, useState } from "react";
import { CinematicBackground } from "@/components/CinematicBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { AnimatedTextController } from "@/components/AnimatedText";
import {
  Story,
  Philosophy,
  Ingredients,
  Products,
  Benefits,
  Testimonials,
  Routine,
  FaqAndJournal,
  Newsletter,
  Footer,
} from "@/components/sections/Sections";

/**
 * Aurora — cinematic herbal beauty landing page.
 * One global scroll engine (Lenis + GSAP) drives every animation.
 * The uploaded film sits on a fixed z:0 layer and remains persistent
 * from first pixel to footer.
 */
export function AuroraExperience() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <SmoothScroll>
      <LoadingVeil hidden={ready} />

      <CinematicBackground />

      <Navigation />

      <main className="relative z-10">
        <Hero />
        <Story />
        <Philosophy />
        <Ingredients />
        <Products />
        <Benefits />
        <Testimonials />
        <Routine />
        <FaqAndJournal />
        <Newsletter />
      </main>

      <Footer />

      <ScrollProgress />
    </SmoothScroll>
  );
}

function LoadingVeil({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-forest-deep transition-all duration-1000 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <div className="flex flex-col items-center gap-8 text-ivory">
        <svg width="56" height="56" viewBox="0 0 32 32" className="animate-[spin_6s_linear_infinite] text-gold">
          <path
            d="M4 28C4 15 15 4 28 4c0 13-11 24-24 24z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <p className="font-display text-3xl tracking-[0.35em]">AURORA</p>
        <p className="text-[0.65rem] uppercase tracking-[0.5em] text-ivory/60">
          Preparing the scene…
        </p>
      </div>
    </div>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gold/80"
      style={{ transform: `scaleX(${p})` }}
      aria-hidden="true"
    />
  );
}
