"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <p className="serif text-3xl font-light tracking-[0.2em] text-cream mb-4">ROVANI</p>
            <p className="text-sm leading-relaxed text-cream/50 max-w-xs">
              Crafted for those who understand that true luxury is not worn — it is inhabited.
              Every Rovani suit is a singular work of wearable artistry.
            </p>
            <div className="gold-divider w-24 mt-6" />
          </div>

          {/* Navigation */}
          <div>
            <p className="section-label text-cream/40 mb-5">Navigate</p>
            <ul className="space-y-3">
              {[["Collections", "/collections"], ["Bespoke", "/bespoke"], ["Lookbook", "/lookbook"]].map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-sm text-cream/50 hover:text-gold transition-colors underline-reveal">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="section-label text-cream/40 mb-5">Atelier</p>
            <ul className="space-y-3 text-sm text-cream/50">
              <li>By appointment only</li>
              <li className="hover:text-gold transition-colors cursor-pointer">hello@rovani.in</li>
              <li>+91 98200 00000</li>
              <li>Mumbai · Delhi · Bangalore</li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream/30 tracking-widest">
          <p>© {new Date().getFullYear()} ROVANI ATELIER. ALL RIGHTS RESERVED.</p>
          <p>CRAFTED WITH PRECISION.</p>
        </div>
      </div>
    </footer>
  );
}
