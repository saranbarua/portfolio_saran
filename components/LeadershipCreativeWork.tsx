import React from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Mic,
  Music2,
  ArrowUpRight,
  Sparkles,
  Camera,
} from "lucide-react";
import { IMAGES } from "./assets/Images";

type LinkItem = { label: string; href: string };
type CardItem = {
  title: string;
  subtitle: string;
  points: string[];
  icon: React.ElementType;
  accent: string;
  image: string; // 👈 NEW
  gallery?: string[];
  links?: LinkItem[];
};

const CARDS: CardItem[] = [
  {
    title: "Leadership",
    subtitle: "Build clarity, align people, ship outcomes",
    points: [
      "Own delivery: scope → roadmap → release",
      "Mentor devs, review PRs, improve standards",
      "Communicate with clients and stakeholders clearly",
    ],
    icon: Crown,
    image: IMAGES.leadershipImg,
    accent: "from-brand-purple/35 via-brand-pink/25 to-brand-cyan/25",
  },
  {
    title: "Anchoring",
    subtitle: "Stage confidence with structured storytelling",
    points: [
      "Host events, manage flow, engage audience",
      "Present products and ideas with clarity",
      "Strong voice + presence for professional delivery",
    ],
    icon: Mic,
    image: IMAGES.anchoringImg,
    accent: "from-brand-cyan/35 via-brand-purple/20 to-white/10",
  },
  {
    title: "Singing",
    subtitle: "Performance mindset, discipline, emotion",
    points: [
      "Practice-driven improvement and consistency",
      "Comfortable performing live and under pressure",
      "Adds creativity and balance to problem-solving",
    ],
    icon: Music2,
    image: IMAGES.singingImg,
    accent: "from-brand-pink/35 via-brand-purple/20 to-white/10",
  },
  {
    title: "Photography",
    subtitle: "Visual storytelling through the lens",
    points: [],
    icon: Camera,
    image: IMAGES.photoHero,
    gallery: [
      IMAGES.p1,
      IMAGES.p2,
      IMAGES.p3,
      IMAGES.p4,
      IMAGES.p5,
      IMAGES.p6,
      IMAGES.p7,
      IMAGES.p8,
    ],
    accent: "from-brand-pink/35 via-brand-purple/20 to-white/10",
  },
];

const container = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.6 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function LeadershipCreativeWork() {
  const [lightbox, setLightbox] = React.useState<{
    open: boolean;
    items: string[];
    index: number;
  }>({ open: false, items: [], index: 0 });
  return (
    <section
      id="creative"
      className="py-24 relative bg-white/50 dark:bg-white/5 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <p className="inline-flex items-center px-4 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold tracking-wide border border-brand-purple/20 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Leadership & Creative Work
          </p>

          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
            More than code. I lead, perform, and communicate.
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            I build products with engineering discipline, then amplify them with
            leadership, stage confidence, and strong storytelling.
          </p>
        </motion.div>

        {/* 2 highlight lines (NEW DESIGN: feature strips) */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-6 mb-12"
        >
          {/* Strip 1 */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/15 dark:border-white/10 bg-gradient-to-br from-brand-purple/25 via-white/10 to-brand-cyan/20 dark:from-brand-purple/20 dark:via-white/5 dark:to-brand-cyan/15 p-[1px] shadow-2xl">
            <div className="relative rounded-3xl bg-white/60 dark:bg-gray-950/40 backdrop-blur-xl p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono tracking-[0.22em] uppercase text-gray-500 dark:text-gray-400">
                    Communication Advantage
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    Vision → roadmap → execution.
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    I translate founder goals into crisp priorities, clear
                    trade-offs, and an action plan the team can ship.
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      01
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Product Thinking", "Decision Clarity", "Delivery Focus"].map(
                  (t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-white/20 dark:border-white/10 text-gray-900 dark:text-white"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>

              {/* bottom line */}
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* subtle motion shine */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rotate-12 bg-white/10 blur-2xl" />
              </div>
            </div>
          </div>

          {/* Strip 2 */}
          <div className="group relative overflow-hidden rounded-3xl border border-white/15 dark:border-white/10 bg-gradient-to-br from-brand-pink/25 via-white/10 to-brand-purple/20 dark:from-brand-pink/20 dark:via-white/5 dark:to-brand-purple/15 p-[1px] shadow-2xl">
            <div className="relative rounded-3xl bg-white/60 dark:bg-gray-950/40 backdrop-blur-xl p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono tracking-[0.22em] uppercase text-gray-500 dark:text-gray-400">
                    Stage & Presence
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                    I keep the room engaged.
                  </h3>
                  <p className="mt-3 text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    Anchoring + live speaking helps me run sharp demos,
                    confident client calls, and structured stakeholder updates.
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="h-12 w-12 rounded-2xl bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      02
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Anchoring", "Demo & Pitch", "Public Speaking"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-white/20 dark:border-white/10 text-gray-900 dark:text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rotate-12 bg-white/10 blur-2xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.title}
                variants={item}
                className="group relative"
              >
                {/* Gradient border wrapper */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-70 blur-[18px] transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/0 opacity-60 pointer-events-none" />

                <div className="relative rounded-3xl border border-white/20 dark:border-white/10 bg-white/75 dark:bg-gray-900/60 shadow-xl backdrop-blur-xl p-6 h-full overflow-hidden">
                  {/* Accent wash */}
                  <div
                    className={`absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${c.accent} blur-[40px] opacity-80 group-hover:opacity-100 transition-opacity`}
                  />
                  {/* Image header */}
                  <div className="relative mb-5 h-40 w-full overflow-hidden rounded-2xl">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* soft overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/60 dark:bg-white/10 border border-white/20 dark:border-white/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-gray-900 dark:text-white" />
                      </div>

                      <div className="text-xs font-mono tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400">
                        {c.title}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {c.subtitle}
                    </h3>

                    <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {c.points.map((p, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-[7px] h-1 w-3 rounded-full bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-pink" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Optional links */}
                    {!!c.links?.length && (
                      <div className="mt-5 pt-4 border-t border-white/15 dark:border-white/10 flex flex-wrap gap-3">
                        {c.links.map((l) => (
                          <a
                            key={l.href}
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-brand-purple transition-colors"
                          >
                            {l.label}
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Gallery thumbnails (Photography only) */}
                  {c.gallery?.length ? (
                    <div className="mb-5 grid grid-cols-4 gap-2">
                      {c.gallery.slice(0, 8).map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() =>
                            setLightbox({
                              open: true,
                              items: c.gallery!,
                              index: idx,
                            })
                          }
                          className="group/thumb relative overflow-hidden rounded-xl"
                        >
                          <img
                            src={img}
                            alt={`${c.title} ${idx + 1}`}
                            className="h-14 w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  ) : null}

                  {/* Hover shine */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[220px] rotate-12 bg-white/10 blur-2xl" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
      {lightbox.open && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox((s) => ({ ...s, open: false }))}
        >
          <button
            className="absolute top-6 right-6 h-12 w-12 rounded-full bg-white/10 border border-white/20 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((s) => ({ ...s, open: false }));
            }}
          >
            ✕
          </button>

          <button
            className="absolute left-6 md:left-10 h-12 w-12 rounded-full bg-white/10 border border-white/20 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((s) => ({
                ...s,
                index: (s.index - 1 + s.items.length) % s.items.length,
              }));
            }}
          >
            ‹
          </button>

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.items[lightbox.index]}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>

          <button
            className="absolute right-6 md:right-10 h-12 w-12 rounded-full bg-white/10 border border-white/20 text-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((s) => ({
                ...s,
                index: (s.index + 1) % s.items.length,
              }));
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
