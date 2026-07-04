import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import videoAsset from "@/assets/aurora-cinematic.mp4.asset.json";
import posterAsset from "@/assets/aurora-poster.jpg.asset.json";

/**
 * Fixed fullscreen cinematic environment.
 * The single visual world behind every section — scroll-synchronized playback,
 * subtle scale/parallax breathing, and atmospheric overlays.
 */
export function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!video || !wrap) return;

    // Try to autoplay muted looped for continuous ambient motion,
    // then bind scroll progress to a subtle parallax + zoom.
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise) playPromise.catch(() => {/* ignore autoplay block */});

    const ctx = gsap.context(() => {
      // Subtle cinematic push-in tied to global scroll progress.
      gsap.fromTo(
        video,
        { scale: 1.05, yPercent: 0, filter: "brightness(1) saturate(1.05)" },
        {
          scale: 1.18,
          yPercent: -4,
          filter: "brightness(0.85) saturate(1.15)",
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        },
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={wrapRef} className="aurora-bg" aria-hidden="true">
        <video
          ref={videoRef}
          poster={posterAsset.url}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
        >
          <source src={videoAsset.url} type="video/mp4" />
        </video>
      </div>
      <div className="aurora-vignette" aria-hidden="true" />
      <div className="aurora-grain" aria-hidden="true" />
      <FloatingParticles />
    </>
  );
}

function FloatingParticles() {
  // Deterministic botanical motes drifting upward — enhances immersion.
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
              boxShadow: "0 0 8px color-mix(in oklab, var(--gold) 60%, transparent)",
            }}
          />
        );
      })}
    </div>
  );
}
