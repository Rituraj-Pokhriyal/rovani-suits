"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function BespokeCTA() {
  return (
    <section className="py-40 bg-cream-2 relative overflow-hidden">
      <div className="absolute inset-0 fabric-overlay" />
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,169,110,0.06), transparent)"
      }} />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.p className="section-label mb-5"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          — Begin Your Journey
        </motion.p>
        <motion.h2 className="serif text-5xl md:text-7xl font-light text-charcoal leading-tight mb-8"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Your suit awaits.<br />
          <span className="gold-text">Shall we begin?</span>
        </motion.h2>
        <motion.p className="text-text-secondary leading-relaxed mb-12 max-w-md mx-auto"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          A private consultation with no obligation. We come to you, wherever you are in India.
        </motion.p>
        <motion.div className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <Link href="/bespoke" className="inline-flex items-center gap-3 px-10 py-5 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300 group">
            <span>Configure Your Suit</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <a href="tel:+919820000000" className="inline-flex items-center gap-3 px-10 py-5 border border-charcoal/30 text-charcoal font-sans text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-300">
            Call the Atelier
          </a>
        </motion.div>
      </div>
    </section>
  );
}
