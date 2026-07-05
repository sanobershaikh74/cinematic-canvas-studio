# Aurora Template — Editing Guide

Aurora is a scroll-driven cinematic landing page. Everything a template
user typically wants to change lives in **two files** — no component
internals required.

## 1. Swap the cinematic video

The background is **not** a `<video>` — it's a canvas that paints a
sequence of `.webp` frames tied to scroll position. To use your own clip:

1. Drop your video at `public/aurora-source.mp4` (or any path).
2. Extract frames:

   ```bash
   bash scripts/extract-frames.sh public/aurora-source.mp4 20
   ```

   The `20` is fps. Higher = smoother scrub, more files. 18–24 is a
   good range for a ~8 second clip.

3. Note the frame count printed at the end, then update
   `src/config/aurora.config.ts`:

   ```ts
   frames: {
     total: 156,            // ← set to your new count
     path: (i) => `/frames/f_${String(i).padStart(3, "0")}.webp`,
     scrub: 0.35,           // 0 = snappy, 1 = buttery
   }
   ```

That's it — reload and the new film drives the scroll.

## 2. Tune text animations

All headline reveals read from `auroraConfig.text` in
`src/config/aurora.config.ts`:

```ts
text: {
  split: "word",       // "word" | "char"
  from: {
    opacity: 0,
    y: 40,              // rise from below (px)
    blur: 12,           // initial blur (px)
    rotate: 0,          // initial rotation (deg)
  },
  stagger: 0.06,        // delay between tokens (s)
  duration: 1.1,
  ease: "power3.out",   // any GSAP ease
  trigger: "top 82%",   // ScrollTrigger start
}
```

### Animate any element

Add `data-animate="text"` to any element in your markup:

```tsx
<h2 data-animate="text">Your headline</h2>
<p data-animate="text" data-split="char">Character-by-character</p>
```

Or import the component directly:

```tsx
import { AnimatedText } from "@/components/AnimatedText";

<AnimatedText as="h2" className="font-display text-6xl" split="char">
  Hello world
</AnimatedText>
```

## 3. Tune scroll feel

`auroraConfig.scroll` controls Lenis smooth scrolling:

```ts
scroll: {
  duration: 1.2,            // smoothing duration
  wheelMultiplier: 1,       // trackpad/wheel sensitivity
  touchMultiplier: 1.2,     // touch sensitivity
}
```

## 4. Colors, fonts, spacing

Design tokens live in `src/styles.css` (`--forest-deep`, `--gold`,
`--ivory`, …). Change them there and every section updates.

Fonts are loaded in `src/routes/__root.tsx` — swap the Google Fonts
`<link>` and the CSS font-family tokens together.
