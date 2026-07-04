import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ensureGsap } from "@/lib/gsap-setup";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: boolean;
};

/**
 * Scroll-driven fade + blur + rise reveal, synchronized with the master ScrollTrigger.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  as: Tag = "div",
  stagger = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = stagger ? Array.from(el.children) : [el];
    gsap.set(targets, { opacity: 0, y, filter: "blur(8px)" });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          delay,
          stagger: stagger ? 0.12 : 0,
        });
      },
    });
    return () => st.kill();
  }, [delay, y, stagger]);

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}
