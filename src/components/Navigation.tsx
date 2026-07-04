import { useEffect, useState } from "react";
import { scrollToId } from "./SmoothScroll";

const LINKS = [
  { id: "story", label: "Story" },
  { id: "philosophy", label: "Philosophy" },
  { id: "ingredients", label: "Ingredients" },
  { id: "products", label: "Products" },
  { id: "routine", label: "Routine" },
  { id: "journal", label: "Journal" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = "hero";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-6 rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass mx-4 md:mx-auto" : ""
        }`}
        aria-label="Primary"
      >
        <button
          onClick={() => go("hero")}
          className="group flex items-center gap-2 text-ivory"
          aria-label="Aurora — home"
        >
          <LeafMark />
          <span className="font-display text-xl tracking-[0.14em] text-ivory drop-shadow-md">
            AURORA
          </span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`story-link relative text-sm uppercase tracking-[0.18em] transition-colors ${
                  active === l.id ? "text-gold" : "text-ivory/85 hover:text-ivory"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            onClick={() => go("newsletter")}
            className="rounded-full border border-ivory/30 bg-ivory/10 px-5 py-2 text-xs uppercase tracking-[0.2em] text-ivory backdrop-blur-md transition-all duration-500 hover:border-gold/70 hover:bg-gold/20 hover:text-ivory"
          >
            Join the Ritual
          </button>
        </div>

        <button
          className="text-ivory md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="flex h-8 w-8 flex-col items-center justify-center gap-1.5">
            <span
              className={`h-px w-6 bg-ivory transition ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span className={`h-px w-6 bg-ivory transition ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-6 bg-ivory transition ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`glass-dark mx-4 mt-2 overflow-hidden rounded-3xl transition-all duration-500 md:hidden ${
          open ? "max-h-[70vh] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`w-full rounded-2xl px-4 py-3 text-left font-display text-2xl transition-colors ${
                  active === l.id ? "text-gold" : "text-ivory"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => go("newsletter")}
              className="mt-2 w-full rounded-full bg-gold px-4 py-3 text-sm uppercase tracking-[0.2em] text-forest-deep"
            >
              Join the Ritual
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

function LeafMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M4 28C4 15 15 4 28 4c0 13-11 24-24 24z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="text-gold"
      />
      <path
        d="M6 26C14 18 22 10 26 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold/70"
      />
    </svg>
  );
}
