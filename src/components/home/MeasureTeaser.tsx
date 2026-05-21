"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Read the guide", desc: "Detailed instructions for all 16 measurements, with common mistakes to avoid." },
  { num: "02", title: "Measure at home", desc: "Takes 15 minutes with a helper. A soft tape measure is all you need." },
  { num: "03", title: "Save your profile", desc: "Measurements saved to your browser — they auto-fill the bespoke builder." },
  { num: "04", title: "Tailor confirms", desc: "A Rovani master tailor verifies everything in person before a single stitch is cut." },
];

export function MeasureTeaser() {
  return (
    <section className="py-28 bg-cream relative overflow-hidden">
      {/* Subtle background weave */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 18px, rgba(201,169,110,0.06) 18px, rgba(201,169,110,0.06) 19px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <motion.p
              className="section-label mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              — The Right Fit Starts Here
            </motion.p>
            <motion.h2
              className="serif text-5xl md:text-6xl font-light text-charcoal leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Measure yourself<br />
              <span className="gold-text">before we meet.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-text-secondary leading-relaxed mb-8 max-w-md">
              A bespoke suit is only as precise as the measurements behind it. Our illustrated guide walks
              you through every measurement — jacket and trouser — with clear instructions and tips from
              our tailors. No guesswork.
            </p>
            <Link
              href="/measure"
              className="inline-flex items-center gap-3 px-8 py-4 border border-charcoal/30 text-charcoal font-sans text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-300 group"
            >
              Open Measurement Guide
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="serif text-4xl font-light text-gold/25 group-hover:text-gold/40 transition-colors duration-500 leading-none">
                  {s.num}
                </span>
                <div className="w-px h-10 bg-border mt-1" />
              </div>
              <h3 className="serif text-lg font-light text-charcoal mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Measurement count badge */}
        <motion.div
          className="mt-14 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-6 px-10 py-5 border border-gold/20 bg-cream-2">
            <span className="serif text-4xl font-light gold-text">16</span>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="font-sans text-xs tracking-[0.15em] uppercase text-charcoal">Measurements covered</p>
              <p className="font-sans text-xs text-text-muted mt-0.5">Jacket, sleeves, and full trouser spec</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <Link
              href="/measure"
              className="font-sans text-xs tracking-[0.15em] uppercase text-gold hover:text-gold-dark transition-colors flex items-center gap-2 group"
            >
              Begin
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
