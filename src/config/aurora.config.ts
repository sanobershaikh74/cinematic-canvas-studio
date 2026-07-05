/**
 * Aurora — Template Configuration
 * ------------------------------------------------------------
 * Central knob for editing the cinematic background + text
 * animations without touching component internals.
 *
 * To swap in your own video:
 *   1. Drop your video at `public/aurora-source.mp4`
 *   2. Run:   bash scripts/extract-frames.sh
 *      (or manually with ffmpeg — see TEMPLATE.md)
 *   3. Update `frames.total` below to match the new count.
 */

export const auroraConfig = {
  /**
   * Scroll-driven frame sequence.
   * Frames must live in `public/frames/` named `f_001.webp` … `f_NNN.webp`.
   */
  frames: {
    total: 156,
    // Return the public URL for frame index `i` (1-based).
    path: (i: number) => `/frames/f_${String(i).padStart(3, "0")}.webp`,
    // Higher = smoother easing when scrolling, lower = snappier.
    scrub: 0.35,
  },

  /**
   * Text reveal animation.
   * Applied automatically to any element marked with
   *   <h2 data-animate="text">…</h2>
   * or explicitly through <AnimatedText />.
   */
  text: {
    // "word" splits by whitespace, "char" splits by character.
    split: "word" as "word" | "char",
    // Initial state of each token before it animates in.
    from: {
      opacity: 0,
      y: 40,
      blur: 12, // px
      rotate: 0, // degrees
    },
    // Per-token stagger (seconds).
    stagger: 0.06,
    duration: 1.1,
    ease: "power3.out",
    // Scroll position where the reveal fires.
    trigger: "top 82%",
  },

  /**
   * Global scroll feel (Lenis).
   */
  scroll: {
    duration: 1.2,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  },
} as const;

export type AuroraConfig = typeof auroraConfig;
