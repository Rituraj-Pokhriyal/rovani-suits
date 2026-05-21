"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { quote: "The Midnight wool suit from Rovani is the finest garment I have ever worn. Three years later, it still looks immaculate.", author: "Arjun Mehta", title: "Managing Director, Mumbai", initial: "A" },
  { quote: "I have worn Brioni and Kiton. Rovani stands among them — but with a sensibility that is unmistakably its own.", author: "Vikram Nair", title: "Founder, Bengaluru", initial: "V" },
  { quote: "My wedding suit was a Rovani three-piece. Every guest asked about it. Every photo is timeless.", author: "Rahul Sharma", title: "Groom, Delhi", initial: "R" },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-32 bg-charcoal">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="section-label text-gold/60 mb-4">— 04 Words</p>
        <h2 className="serif text-5xl font-light text-cream mb-16">Our Clients Speak</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <blockquote className="serif text-2xl md:text-3xl font-light text-cream/85 leading-relaxed mb-8 italic">
              "{testimonials[active].quote}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center serif text-gold font-light">
                {testimonials[active].initial}
              </div>
              <div className="text-left">
                <p className="text-cream text-sm font-medium">{testimonials[active].author}</p>
                <p className="text-cream/40 text-xs tracking-wider">{testimonials[active].title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-px transition-all duration-300 ${i === active ? "w-8 bg-gold" : "w-4 bg-cream/20"}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
