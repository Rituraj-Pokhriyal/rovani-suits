"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { featuredProducts } from "@/lib/data/products";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";

export function FeaturedCollection() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="section-label mb-3">— 01 Collection</p>
            <h2 className="serif text-5xl md:text-6xl font-light text-charcoal leading-tight">
              The Signature<br />Collection
            </h2>
          </div>
          <Link href="/collections" className="font-sans text-xs tracking-[0.2em] uppercase text-text-muted underline-reveal hover:text-gold transition-colors self-end">
            View All Pieces →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              className="group card-lift cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              data-cursor
            >
              {/* Image area */}
              <div className={`relative aspect-[3/4] bg-gradient-to-br ${product.gradient} overflow-hidden mb-4`}>
                <div className="absolute inset-0 fabric-overlay" />
                {/* Woven pattern */}
                <div className="absolute inset-0" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 20px)"
                }} />
                {product.new && (
                  <span className="absolute top-4 left-4 bg-gold text-cream text-[10px] tracking-widest uppercase px-3 py-1 font-sans">New</span>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, type: "ready-to-wear" })}
                    className="bg-cream text-charcoal font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-gold transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="serif text-lg font-light leading-snug">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-muted tracking-wider capitalize">{product.fabric} · {product.category}</p>
                  <p className="serif text-base gold-text">{formatINR(product.price)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
