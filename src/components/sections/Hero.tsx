import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap } from "@/lib/gsap-setup";

ensureGsap();
import { scrollToId } from "@/components/SmoothScroll";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-kicker", { opacity: 0, y: 20, duration: 1, delay: 0.4 })
        .from(
          ".hero-title span",
          { opacity: 0, y: 80, filter: "blur(14px)", duration: 1.4, stagger: 0.08 },
          "-=0.6",
        )
        .from(".hero-sub", { opacity: 0, y: 24, duration: 1 }, "-=0.9")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.9, stagger: 0.1 }, "-=0.7")
        .from(".hero-scroll", { opacity: 0, duration: 0.8 }, "-=0.4");

      // Parallax exit
      gsap.to(el, {
        yPercent: -12,
        opacity: 0.15,
        filter: "blur(6px)",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-32 text-center text-ivory"
    >
      <p className="hero-kicker mb-8 text-xs uppercase tracking-[0.5em] text-gold">
        — Herbal Beauty · Est. Wilderness —
      </p>
      <h1 className="hero-title font-display text-5xl leading-[0.95] text-balance drop-shadow-[0_4px_30px_rgba(0,0,0,0.35)] sm:text-7xl md:text-[7.5rem]">
        <span className="block italic">Grown</span>
        <span className="block">in <span className="text-gold">stillness.</span></span>
        <span className="block italic">Bottled</span>
        <span className="block">in <span className="text-gold">light.</span></span>
      </h1>
      <p className="hero-sub mt-10 max-w-xl text-balance text-lg text-ivory/85 sm:text-xl">
        Aurora is a slow-crafted herbal skincare ritual, distilled from
        wild botanicals and finished under golden hour.
      </p>
      <div className="hero-cta mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <button
          onClick={() => scrollToId("products")}
          className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-forest-deep transition-transform duration-500 hover:scale-[1.02]"
        >
          <span className="relative z-10">Discover the Collection</span>
          <span className="absolute inset-0 -translate-x-full bg-ivory transition-transform duration-700 ease-out group-hover:translate-x-0" />
          <span className="relative z-10" />
        </button>
        <button
          onClick={() => scrollToId("story")}
          className="rounded-full border border-ivory/40 px-8 py-4 text-xs uppercase tracking-[0.25em] text-ivory backdrop-blur-md transition-all duration-500 hover:border-gold hover:text-gold"
        >
          Enter the Story
        </button>
      </div>

      <div className="hero-scroll pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.4em] text-ivory/70">
        <span>Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/20">
          <span className="absolute left-0 top-0 h-6 w-full animate-[scrollHint_2.2s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>
      <style>{`
        @keyframes scrollHint {
          0% { transform: translateY(-100%); }
          60% { transform: translateY(120%); }
          100% { transform: translateY(120%); }
        }
      `}</style>
    </section>
  );
}
