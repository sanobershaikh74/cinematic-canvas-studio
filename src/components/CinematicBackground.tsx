import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap } from "@/lib/gsap-setup";

import { auroraConfig } from "@/config/aurora.config";

ensureGsap();

const TOTAL_FRAMES = auroraConfig.frames.total;
const framePath = auroraConfig.frames.path;

/**
 * Scroll-driven cinematic frame sequence.
 * Each frame is pre-loaded into an off-screen Image cache, then painted onto
 * a single fullscreen <canvas>. The current frame index is derived from
 * scroll progress (Lenis-synced via GSAP ScrollTrigger), so the video only
 * advances as the user scrolls — never on a loop.
 */
export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const stateRef = useRef({ progress: 0 });
  const [loaded, setLoaded] = useState(0);

  // Preload all frames into an in-memory cache. We paint from these
  // images synchronously as scroll advances.
  useEffect(() => {
    let cancelled = false;
    let done = 0;
    const arr: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i + 1);
      img.onload = () => {
        if (cancelled) return;
        done += 1;
        setLoaded(done);
        // Paint the very first frame as soon as it's ready so the
        // background isn't blank while the rest download.
        if (i === 0) requestAnimationFrame(paint);
      };
      arr[i] = img;
    }
    imagesRef.current = arr;
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Paint the current frame to the canvas, sized to the viewport with
  // object-fit: cover semantics.
  const paint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const idx = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(stateRef.current.progress * (TOTAL_FRAMES - 1))),
    );
    currentFrameRef.current = idx;
    const img = imagesRef.current[idx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (canvas.width !== vw * dpr || canvas.height !== vh * dpr) {
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
    }

    // Cover fit
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const canvasRatio = (vw * dpr) / (vh * dpr);
    const imgRatio = iw / ih;
    let sx = 0,
      sy = 0,
      sw = iw,
      sh = ih;
    if (imgRatio > canvasRatio) {
      // image wider than canvas: crop sides
      sw = ih * canvasRatio;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / canvasRatio;
      sy = (ih - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  };

  // Bind scroll progress → frame index via GSAP ScrollTrigger (synced with Lenis).
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(stateRef.current, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: auroraConfig.frames.scrub,
          onUpdate: () => {
            // Only repaint if the target frame actually changed.
            const target = Math.round(
              stateRef.current.progress * (TOTAL_FRAMES - 1),
            );
            if (target !== currentFrameRef.current) paint();
          },
        },
      });
    });

    const onResize = () => paint();
    window.addEventListener("resize", onResize);
    // Initial paint attempt
    paint();

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className="aurora-bg" aria-hidden="true">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
      <div className="aurora-vignette" aria-hidden="true" />
      <div className="aurora-grain" aria-hidden="true" />
      <FloatingParticles />
      <LoadingReadout loaded={loaded} total={TOTAL_FRAMES} />
    </>
  );
}

function LoadingReadout({ loaded, total }: { loaded: number; total: number }) {
  // Subtle indicator during the initial cache — dissolves once ready.
  const ready = loaded >= total;
  return (
    <div
      className={`pointer-events-none fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-ivory/20 bg-forest-deep/40 px-4 py-2 text-[0.6rem] uppercase tracking-[0.32em] text-ivory/80 backdrop-blur-md transition-opacity duration-700 ${
        ready ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <span className="relative block h-1 w-24 overflow-hidden rounded-full bg-ivory/15">
        <span
          className="absolute inset-y-0 left-0 bg-gold"
          style={{ width: `${(loaded / total) * 100}%` }}
        />
      </span>
      <span>Preparing scene · {Math.round((loaded / total) * 100)}%</span>
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((i) => {
        const left = (i * 83) % 100;
        const size = 3 + ((i * 7) % 6);
        const delay = (i * 1.7) % 18;
        const duration = 22 + ((i * 5) % 18);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-gold-soft/40"
            style={{
              left: `${left}%`,
              bottom: `-10vh`,
              width: size,
              height: size,
              animation: `drift ${duration}s linear ${delay}s infinite`,
              filter: "blur(1px)",
              boxShadow:
                "0 0 8px color-mix(in oklab, var(--gold) 60%, transparent)",
            }}
          />
        );
      })}
    </div>
  );
}
