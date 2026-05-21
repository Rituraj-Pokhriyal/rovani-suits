"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";

const links = [
  { label: "Collections", href: "/collections" },
  { label: "Bespoke", href: "/bespoke" },
  { label: "Lookbook", href: "/lookbook" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useCartStore((s) => s.count());
  const openCart = useCartStore((s) => s.openCart);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 60));
    return unsub;
  }, [scrollY]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{ background: scrolled ? "rgba(250,250,248,0.96)" : "transparent" }}
    >
      {scrolled && <div className="gold-divider absolute bottom-0 left-0 right-0" />}
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="serif text-2xl font-light tracking-[0.2em] text-charcoal hover:text-gold transition-colors duration-300">
          ROVANI
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="font-sans text-xs tracking-[0.15em] uppercase text-text-secondary hover:text-gold underline-reveal transition-colors duration-300">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-6">
          <button onClick={openCart} className="relative p-1" aria-label="Cart" data-cursor>
            <ShoppingBag size={18} className="text-text-secondary hover:text-gold transition-colors" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-cream text-[10px] font-medium flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <Link href="/bespoke" className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal text-cream font-sans text-xs tracking-[0.15em] uppercase hover:bg-gold transition-all duration-300">
            Begin Bespoke
          </Link>
          <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden bg-cream border-t border-border overflow-hidden"
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-6 py-6 flex flex-col gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="font-sans text-sm tracking-[0.15em] uppercase text-text-secondary hover:text-gold transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/bespoke" onClick={() => setOpen(false)}
            className="inline-flex justify-center py-3 bg-charcoal text-cream font-sans text-xs tracking-[0.15em] uppercase hover:bg-gold transition-all duration-300">
            Begin Bespoke
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}
