"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cartStore";
import { formatINR } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQty, total, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-charcoal/30 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-border">
              <div>
                <p className="section-label">Your Selection</p>
                <h2 className="serif text-2xl font-light mt-0.5">{items.length} {items.length === 1 ? "Item" : "Items"}</h2>
              </div>
              <button onClick={closeCart} className="p-2 hover:text-gold transition-colors" data-cursor>
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="text-border" />
                  <p className="serif text-xl font-light text-text-muted">Your cart is empty</p>
                  <button onClick={closeCart} className="text-xs tracking-widest uppercase text-gold underline-reveal">
                    Explore Collection
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-border last:border-0">
                      {/* Swatch */}
                      <div className="w-16 h-20 bg-cream-3 fabric-overlay rounded flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="serif text-base font-light leading-snug pr-2">{item.name}</h3>
                          <button onClick={() => removeItem(item.id)} className="text-text-muted hover:text-charcoal transition-colors flex-shrink-0">
                            <X size={14} />
                          </button>
                        </div>
                        {item.details && <p className="text-xs text-text-muted mb-3">{item.details}</p>}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-border">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-cream-3 transition-colors">
                              <Minus size={12} />
                            </button>
                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-cream-3 transition-colors">
                              <Plus size={12} />
                            </button>
                          </div>
                          <p className="serif text-base gold-text">{formatINR(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-widest uppercase text-text-muted">Subtotal</span>
                  <span className="serif text-2xl font-light gold-text">{formatINR(total())}</span>
                </div>
                <p className="text-xs text-text-muted">GST and alterations included. Final price confirmed at consultation.</p>
                <Link href="/bespoke" onClick={closeCart}
                  className="block w-full py-4 bg-charcoal text-cream text-center font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300">
                  Proceed to Checkout
                </Link>
                <button onClick={clearCart} className="w-full text-xs text-text-muted tracking-widest uppercase hover:text-charcoal transition-colors py-1">
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
