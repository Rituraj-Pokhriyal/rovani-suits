"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/data/products";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";

type CatFilter = "All" | "suit" | "blazer" | "trouser" | "accessory";
type FabFilter = "All" | "wool" | "cashmere" | "linen" | "cotton" | "tweed";

export function CollectionsPage() {
  const [cat, setCat] = useState<CatFilter>("All");
  const [fab, setFab] = useState<FabFilter>("All");
  const addItem = useCartStore((s) => s.addItem);

  const filtered = products.filter((p) =>
    (cat === "All" || p.category === cat) && (fab === "All" || p.fabric === fab)
  );

  return (
    <main className="pt-20">
      {/* Hero bar */}
      <div className="bg-charcoal py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 fabric-overlay" />
        <p className="section-label text-gold/60 mb-3">— The Collection</p>
        <h1 className="serif text-6xl md:text-7xl font-light text-cream">Our Pieces</h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-14">
          <div>
            <p className="section-label mb-3 text-text-muted">Category</p>
            <div className="flex flex-wrap gap-2">
              {(["All", "suit", "blazer", "trouser"] as CatFilter[]).map((c) => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-4 py-2 font-sans text-xs tracking-[0.1em] uppercase border transition-all duration-300 ${cat === c ? "bg-charcoal text-cream border-charcoal" : "border-border text-text-muted hover:border-gold hover:text-gold"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="md:ml-12">
            <p className="section-label mb-3 text-text-muted">Fabric</p>
            <div className="flex flex-wrap gap-2">
              {(["All", "wool", "cashmere", "linen", "tweed"] as FabFilter[]).map((f) => (
                <button key={f} onClick={() => setFab(f)}
                  className={`px-4 py-2 font-sans text-xs tracking-[0.1em] uppercase border transition-all duration-300 ${fab === f ? "bg-gold text-cream border-gold" : "border-border text-text-muted hover:border-gold hover:text-gold"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-text-muted tracking-wider mb-8">{filtered.length} PIECES</p>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div key={product.id} layout exit={{ opacity: 0, scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group card-lift cursor-pointer" data-cursor>
                {/* Image */}
                <div className={`relative aspect-[3/4] bg-gradient-to-br ${product.gradient} mb-5 overflow-hidden`}>
                  <div className="absolute inset-0 fabric-overlay" />
                  <div className="absolute inset-0" style={{
                    backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 24px)"
                  }} />
                  {product.new && <span className="absolute top-3 left-3 bg-gold text-cream text-[10px] tracking-widest uppercase px-3 py-1">New</span>}
                  {product.originalPrice && <span className="absolute top-3 right-3 bg-charcoal text-cream text-[10px] tracking-widest uppercase px-3 py-1">Sale</span>}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-charcoal/25 flex items-end justify-center pb-6">
                    <button
                      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, type: "ready-to-wear" })}
                      className="bg-cream text-charcoal text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-gold transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
                {/* Meta */}
                <h3 className="serif text-lg font-light mb-1">{product.name}</h3>
                <p className="text-xs text-text-muted tracking-wider capitalize mb-2">{product.fabric} · {product.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {product.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] tracking-widest uppercase border border-border text-text-muted px-2 py-0.5">{t}</span>
                    ))}
                  </div>
                  <div className="text-right">
                    {product.originalPrice && <p className="serif text-sm text-text-muted line-through">{formatINR(product.originalPrice)}</p>}
                    <p className="serif text-base gold-text">{formatINR(product.price)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
