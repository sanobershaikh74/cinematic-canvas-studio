import { Reveal } from "@/components/Reveal";

/**
 * Aurora content sections — grouped for editability.
 * The cinematic background persists behind all of them; each section uses
 * translucent glass surfaces to preserve the film-like environment.
 */

export function Story() {
  return (
    <section id="story" className="relative z-10 px-6 py-40 text-ivory">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-5">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">Chapter I</p>
          <h2 className="font-display text-5xl leading-[1.02] text-balance md:text-6xl">
            A quiet return to the <em className="text-gold">wild garden.</em>
          </h2>
        </Reveal>
        <Reveal className="space-y-6 text-lg leading-relaxed text-ivory/85 md:col-span-6 md:col-start-7">
          <p>
            Aurora began at the edge of a mountain valley, where light
            filters through pine and mist settles on wild rosemary. We
            gather what nature offers, in season, by hand.
          </p>
          <p>
            Every formula is composed slowly — a small-batch alchemy of
            cold-pressed oils, herbal infusions, and pure minerals — so
            each drop carries the calm of its origin.
          </p>
          <a href="#philosophy" className="story-link mt-4 inline-block text-sm uppercase tracking-[0.28em] text-gold">
            Read the philosophy →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    n: "01",
    title: "Wild-harvested",
    body: "Every botanical is gathered in season from small, regenerative growers.",
  },
  {
    n: "02",
    title: "Cold-pressed",
    body: "Low-temperature extraction preserves the living intelligence of each plant.",
  },
  {
    n: "03",
    title: "Uncompromised",
    body: "No fillers, no synthetics, no shortcuts. Just what your skin recognizes.",
  },
  {
    n: "04",
    title: "Traceable",
    body: "From soil to bottle, every ingredient is named, dated, and honored.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative z-10 px-6 py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">Chapter II · Philosophy</p>
          <h2 className="font-display text-5xl text-ivory text-balance md:text-6xl">
            Four principles, one ritual.
          </h2>
        </Reveal>

        <Reveal
          stagger
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLARS.map((p) => (
            <article
              key={p.n}
              className="group glass relative overflow-hidden rounded-3xl p-8 transition-all duration-700 hover:-translate-y-2 hover:shadow-lift"
            >
              <div className="absolute right-6 top-6 font-display text-4xl text-gold/60">
                {p.n}
              </div>
              <h3 className="mt-16 font-display text-2xl text-forest-deep">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-forest-deep/70">{p.body}</p>
              <span className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const INGREDIENTS = [
  {
    name: "Wild Rose",
    latin: "Rosa rubiginosa",
    note: "Rich in retinoic acid — softens, repairs, luminates.",
  },
  {
    name: "Alpine Yarrow",
    latin: "Achillea millefolium",
    note: "Ancient balm for calming, soothing, and quieting redness.",
  },
  {
    name: "Golden Chamomile",
    latin: "Matricaria chamomilla",
    note: "Anti-inflammatory bloom that carries the warmth of dusk light.",
  },
  {
    name: "Cedar Resin",
    latin: "Cedrus atlantica",
    note: "Grounding aromatic — restores balance to overworked skin.",
  },
  {
    name: "Sea Fennel",
    latin: "Crithmum maritimum",
    note: "Coastal mineral bloom that firms and revitalizes.",
  },
  {
    name: "Blue Lotus",
    latin: "Nymphaea caerulea",
    note: "Ceremonial flower long revered for its stilling elegance.",
  },
];

export function Ingredients() {
  return (
    <section id="ingredients" className="relative z-10 px-6 py-40 text-ivory">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-end justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
              Chapter III · Ingredients
            </p>
            <h2 className="font-display text-5xl leading-[1.02] text-balance md:text-6xl">
              A herbarium, <em className="text-gold">alive.</em>
            </h2>
          </div>
          <p className="max-w-sm text-ivory/75">
            Six sovereign botanicals form the heart of every Aurora formula.
            Each one earns its place through provenance, potency, and poetry.
          </p>
        </Reveal>

        <Reveal
          stagger
          className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {INGREDIENTS.map((ing, i) => (
            <article
              key={ing.name}
              className="glass-dark group relative overflow-hidden rounded-3xl p-8 transition-all duration-700 hover:-translate-y-1"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-xs text-gold">
                  0{i + 1}
                </span>
                <span className="text-[0.65rem] uppercase tracking-[0.3em] text-ivory/50">
                  Botanical
                </span>
              </div>
              <h3 className="mt-10 font-display text-3xl italic">{ing.name}</h3>
              <p className="mt-1 font-sans text-xs uppercase tracking-[0.28em] text-gold/80">
                {ing.latin}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-ivory/80">{ing.note}</p>
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const PRODUCTS = [
  {
    name: "Morning Dew Serum",
    tagline: "Luminous hydration · 30ml",
    price: "€ 84",
    hue: "from-gold/40 via-gold-soft/20 to-transparent",
  },
  {
    name: "Forest Balm",
    tagline: "Restorative night salve · 50ml",
    price: "€ 72",
    hue: "from-forest/60 via-olive/30 to-transparent",
  },
  {
    name: "Ritual Oil No. 3",
    tagline: "Golden botanical elixir · 100ml",
    price: "€ 118",
    hue: "from-gold/60 via-sand/30 to-transparent",
  },
  {
    name: "Herbal Mist",
    tagline: "Alpine tonic essence · 120ml",
    price: "€ 54",
    hue: "from-olive/50 via-ivory/20 to-transparent",
  },
];

export function Products() {
  return (
    <section id="products" className="relative z-10 px-6 py-40 text-ivory">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
            Chapter IV · Collection
          </p>
          <h2 className="font-display text-5xl text-balance md:text-6xl">
            The Aurora <em className="text-gold">collection.</em>
          </h2>
          <p className="mt-6 text-ivory/75">
            Four objects. One ritual. Composed to be layered, morning and evening.
          </p>
        </Reveal>

        <Reveal
          stagger
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PRODUCTS.map((p, i) => (
            <article
              key={p.name}
              className="group relative flex h-[440px] flex-col justify-end overflow-hidden rounded-[2rem] border border-ivory/15 bg-forest-deep/30 p-6 backdrop-blur-xl transition-all duration-700 hover:-translate-y-3 hover:border-gold/40"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${p.hue} opacity-70 transition-opacity duration-700 group-hover:opacity-100`}
              />
              <BottleSVG index={i} />
              <div className="relative">
                <p className="font-display text-xs text-gold">0{i + 1}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight">{p.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-ivory/70">
                  {p.tagline}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-display text-lg text-gold">{p.price}</span>
                  <button className="rounded-full border border-ivory/30 px-4 py-2 text-[0.65rem] uppercase tracking-[0.28em] transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-forest-deep">
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function BottleSVG({ index }: { index: number }) {
  const tones = ["#e8c470", "#5a7856", "#d9a94a", "#8fa47a"];
  const c = tones[index % tones.length];
  return (
    <svg
      viewBox="0 0 120 220"
      className="absolute left-1/2 top-8 h-56 w-auto -translate-x-1/2 drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)] transition-transform duration-700 group-hover:-translate-y-3"
      aria-hidden="true"
    >
      <rect x="50" y="6" width="20" height="24" rx="3" fill="#2a2a24" />
      <path
        d="M40 40 h40 v20 c0 10 12 18 12 40 v90 c0 12 -10 22 -22 22 h-20 c-12 0 -22 -10 -22 -22 v-90 c0 -22 12 -30 12 -40 z"
        fill={c}
        opacity="0.85"
      />
      <rect x="42" y="120" width="36" height="46" rx="3" fill="rgba(255,255,255,0.85)" />
      <text
        x="60"
        y="140"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="8"
        fill="#3a4a34"
        letterSpacing="1.5"
      >
        AURORA
      </text>
      <text
        x="60"
        y="155"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="5"
        fill="#3a4a34"
      >
        N° 0{index + 1}
      </text>
    </svg>
  );
}

const BENEFITS = [
  { stat: "97%", label: "reported softer skin after 14 days" },
  { stat: "100%", label: "wild-harvested botanicals" },
  { stat: "0", label: "synthetic fragrance, silicones, or fillers" },
  { stat: "12", label: "months of hand-crafted maceration" },
];

export function Benefits() {
  return (
    <section className="relative z-10 px-6 py-32 text-ivory">
      <Reveal
        stagger
        className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4"
      >
        {BENEFITS.map((b) => (
          <div
            key={b.label}
            className="glass-dark rounded-3xl p-8 text-center"
          >
            <p className="font-display text-5xl text-gold md:text-6xl">{b.stat}</p>
            <p className="mt-3 text-xs uppercase leading-relaxed tracking-[0.2em] text-ivory/75">
              {b.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Aurora feels less like skincare and more like a meditation. My skin has never looked more alive.",
    name: "Léa M.",
    role: "Editor, Paris",
  },
  {
    quote:
      "The Ritual Oil transformed my evenings. It smells of forest floor and something quietly luxurious.",
    name: "Kenji T.",
    role: "Perfumer, Kyoto",
  },
  {
    quote:
      "Every bottle feels considered. Aurora is the rare brand where craft and calm live in the same jar.",
    name: "Isabela R.",
    role: "Botanist, Lisbon",
  },
];

export function Testimonials() {
  return (
    <section className="relative z-10 px-6 py-40 text-ivory">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">Voices</p>
          <h2 className="font-display text-5xl text-balance md:text-6xl">
            Read like <em className="text-gold">letters</em>, worn like light.
          </h2>
        </Reveal>
        <Reveal stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="glass rounded-3xl p-8 text-forest-deep transition-all duration-700 hover:-translate-y-1"
            >
              <svg width="32" height="24" viewBox="0 0 32 24" className="text-gold" aria-hidden="true">
                <path
                  d="M0 24V14C0 6 5 1 12 0v4c-4 1-7 4-7 10h7v10H0zm20 0V14c0-8 5-13 12-14v4c-4 1-7 4-7 10h7v10H20z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="mt-6 font-display text-xl italic leading-snug">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.24em] text-forest/70">
                {t.name} · {t.role}
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const ROUTINE = [
  {
    step: "01 · Dawn",
    title: "Cleanse & Mist",
    body: "Awaken the skin with Herbal Mist. Two mindful breaths, one gentle press.",
  },
  {
    step: "02 · Day",
    title: "Serum & Seal",
    body: "Three drops of Morning Dew Serum, followed by Ritual Oil No. 3.",
  },
  {
    step: "03 · Dusk",
    title: "Restore",
    body: "Massage Forest Balm across cheeks and jaw. Rest into the herbal quiet.",
  },
];

export function Routine() {
  return (
    <section id="routine" className="relative z-10 px-6 py-40 text-ivory">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
            Chapter V · Ritual
          </p>
          <h2 className="font-display text-5xl text-balance md:text-6xl">
            A three-step <em className="text-gold">beauty ritual.</em>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          {ROUTINE.map((r, i) => (
            <Reveal key={r.step} delay={i * 0.1} className="relative">
              <div className="glass-dark relative overflow-hidden rounded-3xl p-8">
                <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
                  {r.step}
                </p>
                <h3 className="mt-6 font-display text-3xl italic">{r.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/80">{r.body}</p>
                <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                <p className="mt-4 text-[0.65rem] uppercase tracking-[0.35em] text-ivory/50">
                  Step 0{i + 1} of 03
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  {
    q: "Where are Aurora products made?",
    a: "Every bottle is hand-composed in our atelier at the foot of the Vercors mountains, using botanicals from regenerative farms across France and the Mediterranean.",
  },
  {
    q: "Are the formulas suitable for sensitive skin?",
    a: "Yes. Aurora is fragrance-synthetic-free and dermatologically tested. The Alpine Yarrow in our formulas is specifically chosen to calm reactive skin.",
  },
  {
    q: "How long does one bottle last?",
    a: "Used as directed within the Aurora ritual, a bottle of Ritual Oil No. 3 lasts approximately 8–10 weeks.",
  },
  {
    q: "What about packaging?",
    a: "All glass, all refillable. Return three empty bottles and receive your fourth complimentary.",
  },
];

export function FaqAndJournal() {
  return (
    <section id="journal" className="relative z-10 px-6 py-40 text-ivory">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-gold">
            Journal · Questions
          </p>
          <h2 className="font-display text-5xl leading-[1.05] text-balance md:text-6xl">
            Quiet answers, honestly kept.
          </h2>
          <p className="mt-6 text-ivory/75">
            A few of the things people ask most often. If yours isn't
            here, write to us — we answer every letter by hand.
          </p>
        </Reveal>

        <Reveal stagger className="md:col-span-7">
          <div className="divide-y divide-ivory/15">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="group py-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-display italic text-ivory transition-colors hover:text-gold">
                  <span>{f.q}</span>
                  <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border border-ivory/30 text-gold transition-transform duration-500 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-4 max-w-prose text-sm leading-relaxed text-ivory/75">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Newsletter() {
  return (
    <section id="newsletter" className="relative z-10 px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="glass overflow-hidden rounded-[2.5rem] p-10 text-center md:p-16">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold">
            The Ritual Letter
          </p>
          <h2 className="font-display text-4xl text-forest-deep text-balance md:text-5xl">
            A slow letter, once a season.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-forest-deep/70">
            Poems, harvest notes, and a small ritual for the coming
            month. No noise. No selling. Just weather.
          </p>
          <form
            className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              form.reset();
              const btn = form.querySelector("button");
              if (btn) {
                btn.textContent = "Thank you ✽";
                setTimeout(() => (btn.textContent = "Subscribe"), 2400);
              }
            }}
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-forest/20 bg-white/70 px-6 py-4 text-forest-deep placeholder:text-forest-deep/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="rounded-full bg-forest-deep px-8 py-4 text-xs uppercase tracking-[0.28em] text-ivory transition-all duration-500 hover:bg-gold hover:text-forest-deep"
            >
              Subscribe
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 px-6 pb-16 pt-24 text-ivory">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-t border-ivory/15 pt-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
                <path
                  d="M4 28C4 15 15 4 28 4c0 13-11 24-24 24z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  className="text-gold"
                />
              </svg>
              <span className="font-display text-3xl tracking-[0.12em]">AURORA</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
              A slow-crafted herbal beauty house, distilled from wild
              botanicals and finished under golden hour.
            </p>
            <p className="mt-8 text-[0.7rem] uppercase tracking-[0.32em] text-ivory/40">
              Vercors · France
            </p>
          </div>

          <FooterCol
            title="Shop"
            links={["Morning Dew Serum", "Forest Balm", "Ritual Oil No. 3", "Herbal Mist", "Refill Program"]}
          />
          <FooterCol
            title="House"
            links={["Our Story", "Philosophy", "Ingredients", "Journal", "Ateliers"]}
          />
          <FooterCol
            title="Care"
            links={["Contact", "Shipping", "Returns", "Ingredient Index", "Press"]}
          />
        </div>

        <div id="contact" className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-ivory/10 pt-8 text-xs uppercase tracking-[0.28em] text-ivory/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Aurora Herbal · All rights reserved</p>
          <div className="flex gap-6">
            <a href="#" className="story-link">Instagram</a>
            <a href="#" className="story-link">Journal</a>
            <a href="mailto:hello@aurora.co" className="story-link">hello@aurora.co</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="md:col-span-2">
      <p className="mb-5 text-[0.7rem] uppercase tracking-[0.32em] text-gold">
        {title}
      </p>
      <ul className="space-y-3 text-sm text-ivory/75">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="story-link transition-colors hover:text-ivory">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
