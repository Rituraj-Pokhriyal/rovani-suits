"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { fabrics, styles, buttonOptions, ventOptions, liningOptions } from "@/lib/data/fabrics";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";

const BASE_PRICE = 125000;

const STEPS = ["Style", "Fabric", "Details", "Measurements", "Summary"] as const;
type Step = 0 | 1 | 2 | 3 | 4;

interface BuildState {
  style: string;
  fabric: string;
  color: string;
  buttons: string;
  vents: string;
  lining: string;
  measurements: { chest: string; waist: string; hips: string; shoulder: string; sleeve: string; height: string; };
}

const defaultState: BuildState = {
  style: "", fabric: "", color: "", buttons: "2-button", vents: "double-vent", lining: "full-gold",
  measurements: { chest: "", waist: "", hips: "", shoulder: "", sleeve: "", height: "" },
};

export function BespokePage() {
  const [step, setStep] = useState<Step>(0);
  const [build, setBuild] = useState<BuildState>(defaultState);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const selectedFabric = fabrics.find((f) => f.id === build.fabric);
  const totalPrice = BASE_PRICE + (selectedFabric?.priceAddon ?? 0);
  const canNext = (
    (step === 0 && build.style) ||
    (step === 1 && build.fabric && build.color) ||
    (step === 2 && build.buttons && build.vents && build.lining) ||
    (step === 3) ||
    (step === 4)
  );

  const handleAddToCart = () => {
    const details = `${styles.find(s => s.id === build.style)?.name} · ${selectedFabric?.name} — ${build.color}`;
    addItem({ id: `bespoke-${Date.now()}`, name: "Bespoke Rovani Suit", price: totalPrice, type: "bespoke", details });
    setAdded(true);
  };

  return (
    <main className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <div className="bg-charcoal py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 fabric-overlay" />
        <p className="section-label text-gold/60 mb-3">— Your Suit, Your Rules</p>
        <h1 className="serif text-6xl font-light text-cream mb-4">Begin Bespoke</h1>
        <p className="text-cream/50 max-w-md mx-auto text-sm leading-relaxed">
          Configure every detail of your Rovani suit. Our tailors will refine and perfect it across multiple fittings.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Progress */}
        <div className="flex items-center gap-0 mb-16 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => i < step ? setStep(i as Step) : undefined}
                className={`flex items-center gap-2 px-4 py-2 font-sans text-xs tracking-[0.1em] uppercase transition-all duration-300 ${i === step ? "text-gold" : i < step ? "text-charcoal cursor-pointer" : "text-text-muted cursor-default"}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border transition-all ${i === step ? "border-gold bg-gold/10 text-gold" : i < step ? "border-charcoal bg-charcoal text-cream" : "border-border text-text-muted"}`}>
                  {i < step ? <Check size={10} /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </button>
              {i < STEPS.length - 1 && <div className={`w-8 h-px transition-colors ${i < step ? "bg-charcoal" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>

            {/* Step 0: Style */}
            {step === 0 && (
              <div>
                <h2 className="serif text-3xl font-light mb-2">Choose your style</h2>
                <p className="text-text-muted text-sm mb-8">The silhouette that defines the suit.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {styles.map((s) => (
                    <button key={s.id} onClick={() => setBuild({ ...build, style: s.id })}
                      className={`text-left p-6 border transition-all duration-300 ${build.style === s.id ? "step-active border-gold" : "border-border hover:border-gold/40"}`}>
                      <span className="text-2xl mb-3 block text-gold/60">{s.icon}</span>
                      <h3 className="serif text-lg font-light mb-1">{s.name}</h3>
                      <p className="text-sm text-text-muted">{s.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Fabric */}
            {step === 1 && (
              <div>
                <h2 className="serif text-3xl font-light mb-2">Choose your fabric</h2>
                <p className="text-text-muted text-sm mb-8">The foundation of every great suit.</p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {fabrics.map((f) => (
                    <button key={f.id} onClick={() => setBuild({ ...build, fabric: f.id, color: "" })}
                      className={`text-left border transition-all duration-300 overflow-hidden ${build.fabric === f.id ? "step-active border-gold" : "border-border hover:border-gold/40"}`}>
                      <div className={`h-16 bg-gradient-to-r ${f.gradient} fabric-overlay`} />
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="serif text-base font-light">{f.name}</h3>
                          <span className={`text-xs font-sans ${f.priceAddon > 0 ? "text-gold" : f.priceAddon < 0 ? "text-green-600" : "text-text-muted"}`}>
                            {f.priceAddon > 0 ? `+${formatINR(f.priceAddon)}` : f.priceAddon < 0 ? formatINR(f.priceAddon) : "Included"}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mb-2">{f.origin}</p>
                        <p className="text-xs text-text-secondary">{f.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {selectedFabric && (
                  <div>
                    <h3 className="serif text-lg font-light mb-4">Choose colour</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedFabric.colors.map((c) => (
                        <button key={c.name} onClick={() => setBuild({ ...build, color: c.name })}
                          className={`flex items-center gap-3 px-4 py-2.5 border text-sm transition-all duration-300 ${build.color === c.name ? "step-active border-gold" : "border-border hover:border-gold/40"}`}>
                          <span className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0" style={{ background: c.hex }} />
                          <span className="font-sans text-xs tracking-wider">{c.name}</span>
                          {build.color === c.name && <Check size={12} className="text-gold" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="grid md:grid-cols-3 gap-10">
                {[
                  { label: "Buttons", options: buttonOptions, key: "buttons" as const },
                  { label: "Vents", options: ventOptions, key: "vents" as const },
                  { label: "Lining", options: liningOptions, key: "lining" as const },
                ].map((group) => (
                  <div key={group.label}>
                    <h3 className="serif text-xl font-light mb-4">{group.label}</h3>
                    <div className="space-y-3">
                      {group.options.map((o) => (
                        <button key={o.id} onClick={() => setBuild({ ...build, [group.key]: o.id })}
                          className={`w-full text-left p-4 border transition-all duration-300 ${build[group.key] === o.id ? "step-active border-gold" : "border-border hover:border-gold/40"}`}>
                          <div className="flex justify-between items-start">
                            <span className="font-sans text-sm">{o.name}</span>
                            {build[group.key] === o.id && <Check size={14} className="text-gold flex-shrink-0" />}
                          </div>
                          <span className="text-xs text-text-muted">{o.description}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Measurements */}
            {step === 3 && (
              <div>
                <h2 className="serif text-3xl font-light mb-2">Your measurements</h2>
                <p className="text-text-muted text-sm mb-8">All measurements in centimetres. Our master tailor will verify these in person.</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {(Object.keys(build.measurements) as (keyof BuildState["measurements"])[]).map((key) => (
                    <div key={key}>
                      <label className="section-label text-text-muted block mb-2 capitalize">{key} (cm)</label>
                      <input
                        type="number"
                        value={build.measurements[key]}
                        onChange={(e) => setBuild({ ...build, measurements: { ...build.measurements, [key]: e.target.value } })}
                        placeholder="0"
                        className="w-full border border-border bg-cream-2 px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors placeholder-text-muted/40"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-6">* Measurements are optional at this stage. A Rovani consultant will confirm all measurements during your in-person consultation.</p>
              </div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <div className="max-w-lg">
                <h2 className="serif text-3xl font-light mb-2">Your Rovani Suit</h2>
                <p className="text-text-muted text-sm mb-8">Review your configuration before adding to your order.</p>
                <div className="space-y-4 mb-8">
                  {[
                    ["Style", styles.find(s => s.id === build.style)?.name],
                    ["Fabric", selectedFabric?.name],
                    ["Origin", selectedFabric?.origin],
                    ["Colour", build.color],
                    ["Buttons", buttonOptions.find(b => b.id === build.buttons)?.name],
                    ["Vents", ventOptions.find(v => v.id === build.vents)?.name],
                    ["Lining", liningOptions.find(l => l.id === build.lining)?.name],
                  ].map(([label, value]) => value && (
                    <div key={label} className="flex justify-between py-3 border-b border-border">
                      <span className="text-xs tracking-widest uppercase text-text-muted">{label}</span>
                      <span className="serif text-base font-light">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-4 border-t-2 border-charcoal mt-2">
                    <span className="font-sans text-sm tracking-widest uppercase">Estimated Price</span>
                    <span className="serif text-2xl gold-text">{formatINR(totalPrice)}</span>
                  </div>
                </div>
                {added ? (
                  <div className="flex items-center gap-3 py-4 px-6 bg-cream-3 border border-gold/30">
                    <Check size={16} className="text-gold" />
                    <span className="font-sans text-sm tracking-wider">Added to your selection</span>
                  </div>
                ) : (
                  <button onClick={handleAddToCart}
                    className="w-full py-5 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300">
                    Add to Order
                  </button>
                )}
                <p className="text-xs text-text-muted mt-4 text-center">Final price confirmed post-consultation. No payment required now.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-16 pt-8 border-t border-border">
          <button onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
            disabled={step === 0}
            className="font-sans text-xs tracking-[0.2em] uppercase text-text-muted hover:text-charcoal transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2">
            ← Previous
          </button>
          {step < 4 ? (
            <button onClick={() => canNext && setStep((s) => (s + 1) as Step)}
              disabled={!canNext}
              className="px-8 py-3 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
              Continue →
            </button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
