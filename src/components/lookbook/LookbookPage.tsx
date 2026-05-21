"use client";
import { motion } from "framer-motion";

const editorials = [
  { title: "The Midnight Edit", season: "Autumn / Winter", items: 8, gradient: "from-slate-900 to-stone-800", tall: true },
  { title: "The Riviera", season: "Summer Resort", items: 6, gradient: "from-amber-100 to-stone-300", tall: false },
  { title: "The Heritage", season: "Harris Tweed Edition", items: 5, gradient: "from-stone-700 to-stone-900", tall: false },
  { title: "The Monaco", season: "Black Tie", items: 4, gradient: "from-gray-900 to-zinc-800", tall: true },
  { title: "The Chalk-Stripe", season: "Business Formal", items: 7, gradient: "from-blue-950 to-slate-900", tall: false },
  { title: "The Cashmere", season: "Winter Luxe", items: 5, gradient: "from-amber-800 to-stone-700", tall: false },
];

const crafts = [
  { label: "Hand-Canvassed", desc: "Every Rovani jacket is constructed on a full floating canvas — no fusing, ever. The suit breathes and molds to your body over decades." },
  { label: "Surgeon's Cuffs", desc: "Real working buttonholes on every sleeve cuff. A mark of true bespoke that distinguishes the craft from the copy." },
  { label: "Bespoke Lining", desc: "Every suit is finished with our signature champagne gold silk lining, or your choice of bespoke printed monogram fabric." },
];

export function LookbookPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <div className="bg-charcoal py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 fabric-overlay" />
        <p className="section-label text-gold/60 mb-3">— The Editorials</p>
        <h1 className="serif text-6xl md:text-7xl font-light text-cream mb-4">Lookbook</h1>
        <p className="text-cream/40 max-w-md mx-auto text-sm">Where fabric meets light and tailoring becomes art.</p>
      </div>

      {/* Editorial grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {editorials.map((e, i) => (
            <motion.div
              key={e.title}
              className={`break-inside-avoid relative overflow-hidden group cursor-pointer ${e.tall ? "aspect-[3/4]" : "aspect-square"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              data-cursor
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${e.gradient} transition-transform duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 fabric-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="section-label text-gold/70 mb-1">{e.season} · {e.items} Looks</p>
                <h3 className="serif text-xl font-light text-cream">{e.title}</h3>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="gold-divider max-w-7xl mx-auto px-6 mb-24" />

      {/* Craftsmanship */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="section-label mb-4">— The Craft</p>
            <h2 className="serif text-5xl font-light text-charcoal leading-tight mb-6">
              Tailoring is not<br />a trade. It is an art.
            </h2>
            <p className="text-text-secondary leading-relaxed max-w-md">
              At Rovani, every suit passes through the hands of a single master tailor from start to finish. No assembly lines. No shortcuts. Just mastery, stitch by stitch.
            </p>
          </div>
          <div className="aspect-[4/3] bg-gradient-to-br from-stone-200 to-stone-400 relative overflow-hidden">
            <div className="absolute inset-0 fabric-overlay" />
            <div className="absolute inset-0" style={{
              backgroundImage: "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 6px)"
            }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="serif text-6xl text-stone-600/30 font-light">R</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {crafts.map((c, i) => (
            <motion.div key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}>
              <div className="w-8 h-px bg-gold mb-5" />
              <h3 className="serif text-xl font-light text-charcoal mb-3">{c.label}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
