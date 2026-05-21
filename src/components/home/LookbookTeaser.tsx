"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const panels = [
  { label: "The Midnight Edit", sub: "Autumn / Winter", gradient: "from-slate-900 to-stone-800", accent: "from-slate-700 to-slate-900" },
  { label: "The Riviera", sub: "Resort Collection", gradient: "from-amber-100 to-stone-300", accent: "from-amber-200 to-stone-200" },
  { label: "The Heritage", sub: "Tweed & Tartan", gradient: "from-stone-700 to-stone-900", accent: "from-stone-600 to-stone-800" },
];

export function LookbookTeaser() {
  return (
    <section className="py-32 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label mb-3">— 03 Lookbook</p>
            <h2 className="serif text-5xl md:text-6xl font-light text-charcoal">The Editorials</h2>
          </div>
          <Link href="/lookbook" className="font-sans text-xs tracking-[0.2em] uppercase text-text-muted underline-reveal hover:text-gold transition-colors self-end">
            View Lookbook →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.label}
              className={`relative overflow-hidden cursor-pointer group ${i === 0 ? "md:row-span-1 aspect-[4/5]" : "aspect-[4/5]"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              data-cursor
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${panel.gradient} transition-transform duration-700 group-hover:scale-105`} />
              <div className="absolute inset-0 fabric-overlay" />
              {/* Weave lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 8px)"
              }} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="section-label text-gold/80 mb-1">{panel.sub}</p>
                <h3 className="serif text-xl font-light text-cream">{panel.label}</h3>
              </div>
              {/* Hover arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-gold text-xl">↗</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
