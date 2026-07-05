import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap } from "@/lib/gsap-setup";
import { auroraConfig } from "@/config/aurora.config";

ensureGsap();

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Override the split mode from config. */
  split?: "word" | "char";
  /** Override the per-token stagger. */
  stagger?: number;
  /** Extra delay before the reveal starts (s). */
  delay?: number;
};

/**
 * Scroll-triggered per-word (or per-char) headline reveal.
 *
 * Usage:
 *   <AnimatedText as="h2" className="font-display text-6xl">
 *     A quiet return to the wild garden.
 *   </AnimatedText>
 *
 * Or, opt-in on any existing element with `data-animate="text"` —
 * see <AnimatedTextController /> below.
 *
 * Tweak defaults in `src/config/aurora.config.ts` → `text`.
 */
export function AnimatedText({
  children,
  as: Tag = "span",
  className = "",
  split,
  stagger,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = animateElement(el, { split, stagger, delay });
    return () => st?.kill();
  }, [split, stagger, delay]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}

/**
 * Mount once (already included in AuroraExperience) — auto-animates
 * every element that carries `data-animate="text"`. Lets template
 * users trigger the effect from plain markup without importing a
 * component.
 */
export function AnimatedTextController() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-animate="text"]'),
    );
    const triggers = nodes
      .map((n) =>
        animateElement(n, {
          split: (n.dataset.split as "word" | "char" | undefined) ?? undefined,
        }),
      )
      .filter(Boolean) as ScrollTrigger[];
    return () => triggers.forEach((t) => t.kill());
  }, []);
  return null;
}

function animateElement(
  el: HTMLElement,
  opts: { split?: "word" | "char"; stagger?: number; delay?: number } = {},
) {
  if (el.dataset.animated === "true") return null;
  const cfg = auroraConfig.text;
  const mode = opts.split ?? cfg.split;

  // Split the text of the element (preserving child element tags like <em>).
  const tokens: HTMLElement[] = [];
  splitInto(el, mode, tokens);
  if (!tokens.length) return null;
  el.dataset.animated = "true";

  gsap.set(tokens, {
    opacity: cfg.from.opacity,
    y: cfg.from.y,
    filter: `blur(${cfg.from.blur}px)`,
    rotate: cfg.from.rotate,
    display: "inline-block",
    willChange: "transform, filter, opacity",
  });

  return ScrollTrigger.create({
    trigger: el,
    start: cfg.trigger,
    once: true,
    onEnter: () => {
      gsap.to(tokens, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotate: 0,
        duration: cfg.duration,
        ease: cfg.ease,
        stagger: opts.stagger ?? cfg.stagger,
        delay: opts.delay ?? 0,
      });
    },
  });
}

function splitInto(node: Node, mode: "word" | "char", out: HTMLElement[]) {
  const children = Array.from(node.childNodes);
  for (const child of children) {
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent ?? "";
      if (!text.trim()) continue;
      const frag = document.createDocumentFragment();
      const parts =
        mode === "word"
          ? text.split(/(\s+)/) // keep whitespace
          : Array.from(text);
      for (const part of parts) {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          continue;
        }
        if (part === "") continue;
        const span = document.createElement("span");
        span.className = "aurora-token";
        span.style.display = "inline-block";
        span.textContent = part;
        frag.appendChild(span);
        out.push(span);
      }
      child.parentNode?.replaceChild(frag, child);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      splitInto(child, mode, out);
    }
  }
}
