"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        yPercent: 110, opacity: 0, duration: 1.2, stagger: 0.15,
        ease: "power4.out", delay: 0.3,
      });
      gsap.from(".hero-sub", { opacity: 0, y: 20, duration: 0.8, delay: 1, ease: "power3.out" });
      gsap.from(".hero-cta", { opacity: 0, y: 16, duration: 0.7, stagger: 0.1, delay: 1.2, ease: "power3.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950" />
        <div className="absolute inset-0 fabric-overlay opacity-60" />
        {/* Fabric texture lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(160deg, transparent 0px, transparent 60px, rgba(201,169,110,0.04) 60px, rgba(201,169,110,0.04) 61px)"
        }} />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-charcoal/20" />
      </motion.div>

      {/* Gold accent line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent"
        style={{ height: "40%", opacity }}
      />

      {/* Content */}
      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 w-full" style={{ opacity }}>
        <div className="max-w-4xl">
          <div className="overflow-hidden mb-2">
            <p className="hero-line section-label text-gold/80">— Est. Since Excellence</p>
          </div>

          <div className="overflow-hidden mb-1">
            <h1 className="hero-line serif text-7xl md:text-9xl lg:text-[10rem] font-light text-cream leading-none tracking-tight">
              THE ART
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-line serif text-7xl md:text-9xl lg:text-[10rem] font-light leading-none tracking-tight gold-text">
              OF BESPOKE
            </h1>
          </div>

          <p className="hero-sub text-cream/60 text-lg md:text-xl font-light max-w-lg leading-relaxed mb-12">
            Every Rovani suit begins with a conversation and ends with a masterpiece.
            Crafted exclusively for you — no two alike.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/collections" className="hero-cta inline-flex items-center gap-3 px-8 py-4 border border-gold/50 text-gold font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-400 group">
              <span>Explore Collection</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link href="/bespoke" className="hero-cta inline-flex items-center gap-3 px-8 py-4 bg-gold text-charcoal font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-dark transition-all duration-400 group">
              <span>Begin Bespoke</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="flex items-center gap-12 mt-20 pt-12 border-t border-cream/10">
          {[["50K+", "Suits Crafted"], ["25+", "Years Mastery"], ["100%", "Hand-Stitched"], ["48hr", "Consultation"]].map(([v, l]) => (
            <div key={l} className="hidden md:block">
              <p className="serif text-2xl font-light gold-text">{v}</p>
              <p className="text-cream/40 text-xs tracking-widest uppercase mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        style={{ opacity }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-cream/30 text-xs tracking-[0.2em] uppercase [writing-mode:vertical-lr]">Scroll</p>
        <div className="w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
}
