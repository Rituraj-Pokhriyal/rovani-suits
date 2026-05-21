"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  { number: "01", title: "Consultation", desc: "We begin with a private consultation at your preferred location — understanding your lifestyle, occasions, and aesthetic sensibility." },
  { number: "02", title: "Craftsmanship", desc: "Your chosen fabrics are cut by hand, stitched by our master tailors, and shaped through multiple fittings over 6–8 weeks." },
  { number: "03", title: "Perfection", desc: "Every detail — from the last button to the label — is completed to your exact specification. The suit arrives ready to wear forever." },
];

export function TheProcess() {
  return (
    <section className="py-32 bg-cream-2">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left text */}
          <div>
            <motion.p className="section-label mb-4" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              — 02 Process
            </motion.p>
            <motion.h2 className="serif text-5xl md:text-6xl font-light text-charcoal leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              Three steps to<br />an extraordinary suit
            </motion.h2>
            <motion.p className="text-text-secondary leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              Our bespoke process is unhurried, precise, and entirely personal. From first measurement to final fitting, you are involved at every stage.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <Link href="/bespoke" className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300 group">
                <span>Start Your Journey</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right steps */}
          <div className="space-y-0 relative">
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative pl-20 pb-12 last:pb-0"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Dot */}
                <div className="absolute left-5 top-1 w-6 h-6 rounded-full border border-gold/60 bg-cream-2 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <p className="section-label text-gold/60 mb-2">{step.number}</p>
                <h3 className="serif text-2xl font-light text-charcoal mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
