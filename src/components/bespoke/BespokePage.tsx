"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, ChevronRight } from "lucide-react";
import { fabrics, styles, buttonOptions, ventOptions, liningOptions } from "@/lib/data/fabrics";
import { MEASUREMENTS } from "@/lib/data/measurements";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";
import { useMeasurementStore } from "@/lib/store/measurementStore";

// Dynamically import Three.js configurator (SSR-incompatible)
const SuitConfigurator = dynamic(
  () => import("@/components/three/SuitConfigurator").then((m) => m.SuitConfigurator),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-cream-3">
        <div className="text-center">
          <div className="w-8 h-8 border border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-3" />
          <p className="font-sans text-xs tracking-widest uppercase text-text-muted">Loading preview…</p>
        </div>
      </div>
    ),
  }
);

const BASE_PRICE = 125000;

const STEPS = ["Style", "Fabric", "Details", "Measurements", "Summary"] as const;
type Step = 0 | 1 | 2 | 3 | 4;

interface BuildState {
  style: string;
  fabric: string;
  color: string;
  colorHex: string;
  buttons: string;
  vents: string;
  lining: string;
  measurements: Record<string, string>;
  fitPreference: string;
}

const defaultState: BuildState = {
  style: "",
  fabric: "",
  color: "",
  colorHex: "#3c3c3c",
  buttons: "2-button",
  vents: "double-vent",
  lining: "full-gold",
  measurements: {},
  fitPreference: "regular",
};

const FIT_LABELS: Record<string, string> = {
  slim: "Slim",
  regular: "Regular",
  relaxed: "Relaxed",
  classic: "Classic",
};

export function BespokePage() {
  const [step, setStep] = useState<Step>(0);
  const [build, setBuild] = useState<BuildState>(defaultState);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { measurements: savedMeasurements, fitPreference: savedFit, completedCount } = useMeasurementStore();

  const selectedFabric = fabrics.find((f) => f.id === build.fabric);
  const totalPrice = BASE_PRICE + (selectedFabric?.priceAddon ?? 0);

  // Load saved measurements on step 3
  const hasSavedMeasurements = completedCount > 0;

  // On entering step 3, pre-fill from store if available
  const handleStepChange = (newStep: Step) => {
    if (newStep === 3 && hasSavedMeasurements) {
      setBuild((prev) => ({
        ...prev,
        measurements: { ...savedMeasurements },
        fitPreference: savedFit,
      }));
    }
    setStep(newStep);
  };

  const canNext =
    (step === 0 && !!build.style) ||
    (step === 1 && !!build.fabric && !!build.color) ||
    (step === 2 && !!build.buttons && !!build.vents && !!build.lining) ||
    step === 3 ||
    step === 4;

  const handleAddToCart = () => {
    const details = `${styles.find((s) => s.id === build.style)?.name} · ${selectedFabric?.name} — ${build.color}`;
    addItem({
      id: `bespoke-${Date.now()}`,
      name: "Bespoke Rovani Suit",
      price: totalPrice,
      type: "bespoke",
      details,
    });
    setAdded(true);
  };

  // Inline measurement handling for step 3
  const setMeasurement = (id: string, val: string) => {
    setBuild((prev) => ({ ...prev, measurements: { ...prev.measurements, [id]: val } }));
  };

  const filledCount = useMemo(
    () => MEASUREMENTS.filter((m) => build.measurements[m.id] && build.measurements[m.id] !== "").length,
    [build.measurements]
  );

  // Configurator props derived from build state
  const configuratorProps = {
    style: build.style || "single-notch",
    fabricId: build.fabric,
    color: build.colorHex || "#3c3c3c",
    colorName: build.color || undefined,
    fabricName: selectedFabric?.name,
    buttons: build.buttons,
    lining: build.lining,
    fabricRoughness: selectedFabric?.threeRoughness ?? 0.85,
    fabricPattern: selectedFabric?.threePattern ?? "twill",
  } as const;

  return (
    <main className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <div className="bg-charcoal py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 fabric-overlay" />
        <p className="section-label text-gold/60 mb-3">— Your Suit, Your Rules</p>
        <h1 className="serif text-5xl md:text-6xl font-light text-cream mb-3">Begin Bespoke</h1>
        <p className="text-cream/50 max-w-md mx-auto text-sm leading-relaxed">
          Configure every detail of your Rovani suit. See it live in 3D. Our tailors refine and perfect it across multiple fittings.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] min-h-[700px]">

          {/* ── LEFT: Config panel ────────────────────────────── */}
          <div className="py-12 pr-0 lg:pr-10 border-r-0 lg:border-r border-border">
            {/* Progress stepper */}
            <div className="flex items-center gap-0 mb-12 overflow-x-auto pb-2">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center">
                  <button
                    onClick={() => i < step ? handleStepChange(i as Step) : undefined}
                    className={`flex items-center gap-2 px-3 py-2 font-sans text-xs tracking-[0.1em] uppercase transition-all duration-300 ${
                      i === step ? "text-gold" : i < step ? "text-charcoal cursor-pointer" : "text-text-muted cursor-default"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border transition-all ${
                        i === step
                          ? "border-gold bg-gold/10 text-gold"
                          : i < step
                          ? "border-charcoal bg-charcoal text-cream"
                          : "border-border text-text-muted"
                      }`}
                    >
                      {i < step ? <Check size={10} /> : i + 1}
                    </span>
                    <span className="hidden sm:inline">{s}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`w-6 h-px transition-colors ${i < step ? "bg-charcoal" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* ── Step 0: Style ─────────────────────────────── */}
                {step === 0 && (
                  <div>
                    <h2 className="serif text-3xl font-light mb-2">Choose your style</h2>
                    <p className="text-text-muted text-sm mb-8">The silhouette that defines the suit.</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {styles.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setBuild({ ...build, style: s.id })}
                          className={`text-left p-5 border transition-all duration-300 ${
                            build.style === s.id ? "step-active border-gold" : "border-border hover:border-gold/40"
                          }`}
                        >
                          <span className="text-2xl mb-3 block text-gold/60">{s.icon}</span>
                          <h3 className="serif text-base font-light mb-1">{s.name}</h3>
                          <p className="text-xs text-text-muted">{s.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 1: Fabric ────────────────────────────── */}
                {step === 1 && (
                  <div>
                    <h2 className="serif text-3xl font-light mb-2">Choose your fabric</h2>
                    <p className="text-text-muted text-sm mb-6">The foundation of every great suit.</p>
                    <div className="grid sm:grid-cols-2 gap-3 mb-7">
                      {fabrics.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => setBuild({ ...build, fabric: f.id, color: "", colorHex: "#3c3c3c" })}
                          className={`text-left border transition-all duration-300 overflow-hidden ${
                            build.fabric === f.id ? "step-active border-gold" : "border-border hover:border-gold/40"
                          }`}
                        >
                          <div className={`h-14 bg-gradient-to-r ${f.gradient} fabric-overlay`} />
                          <div className="p-3">
                            <div className="flex justify-between items-start mb-0.5">
                              <h3 className="serif text-sm font-light">{f.name}</h3>
                              <span
                                className={`text-xs font-sans ${
                                  f.priceAddon > 0 ? "text-gold" : f.priceAddon < 0 ? "text-green-600" : "text-text-muted"
                                }`}
                              >
                                {f.priceAddon > 0
                                  ? `+${formatINR(f.priceAddon)}`
                                  : f.priceAddon < 0
                                  ? formatINR(f.priceAddon)
                                  : "Included"}
                              </span>
                            </div>
                            <p className="text-[10px] text-text-muted mb-1">{f.origin}</p>
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
                            <button
                              key={c.name}
                              onClick={() => setBuild({ ...build, color: c.name, colorHex: c.hex })}
                              className={`flex items-center gap-3 px-4 py-2.5 border text-sm transition-all duration-300 ${
                                build.color === c.name ? "step-active border-gold" : "border-border hover:border-gold/40"
                              }`}
                            >
                              <span
                                className="w-5 h-5 rounded-full border border-white/20 flex-shrink-0"
                                style={{ background: c.hex }}
                              />
                              <span className="font-sans text-xs tracking-wider">{c.name}</span>
                              {build.color === c.name && <Check size={12} className="text-gold" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Step 2: Details ───────────────────────────── */}
                {step === 2 && (
                  <div>
                    <h2 className="serif text-3xl font-light mb-2">Finishing details</h2>
                    <p className="text-text-muted text-sm mb-8">The small things that make the suit.</p>
                    <div className="grid md:grid-cols-3 gap-7">
                      {[
                        { label: "Buttons", options: buttonOptions, key: "buttons" as const },
                        { label: "Vents", options: ventOptions, key: "vents" as const },
                        { label: "Lining", options: liningOptions, key: "lining" as const },
                      ].map((group) => (
                        <div key={group.label}>
                          <h3 className="serif text-lg font-light mb-4">{group.label}</h3>
                          <div className="space-y-2.5">
                            {group.options.map((o) => (
                              <button
                                key={o.id}
                                onClick={() => setBuild({ ...build, [group.key]: o.id })}
                                className={`w-full text-left p-3.5 border transition-all duration-300 ${
                                  build[group.key] === o.id
                                    ? "step-active border-gold"
                                    : "border-border hover:border-gold/40"
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <span className="font-sans text-sm">{o.name}</span>
                                  {build[group.key] === o.id && (
                                    <Check size={13} className="text-gold flex-shrink-0" />
                                  )}
                                </div>
                                <span className="text-xs text-text-muted">{o.description}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Step 3: Measurements ──────────────────────── */}
                {step === 3 && (
                  <div>
                    <h2 className="serif text-3xl font-light mb-2">Your measurements</h2>
                    <p className="text-text-muted text-sm mb-2">
                      All measurements in centimetres. Our master tailor confirms everything in person.
                    </p>

                    {/* Saved measurements banner */}
                    {hasSavedMeasurements && (
                      <div className="flex items-center gap-3 px-4 py-3 bg-gold/8 border border-gold/25 mb-6">
                        <Check size={14} className="text-gold flex-shrink-0" />
                        <div>
                          <p className="font-sans text-xs font-medium text-charcoal">
                            {completedCount} measurements loaded from your profile
                          </p>
                          <p className="font-sans text-[10px] text-text-muted mt-0.5">
                            Saved from the{" "}
                            <Link href="/measure" className="underline hover:text-gold transition-colors">
                              Measure page
                            </Link>
                            . Edit any field below.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Fit preference */}
                    <div className="mb-6">
                      <h3 className="serif text-lg font-light mb-3">Fit Preference</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(FIT_LABELS).map(([id, label]) => (
                          <button
                            key={id}
                            onClick={() => setBuild({ ...build, fitPreference: id })}
                            className={`px-5 py-2 border font-sans text-xs tracking-widest uppercase transition-all duration-200 ${
                              build.fitPreference === id
                                ? "bg-charcoal text-cream border-charcoal"
                                : "border-border text-text-muted hover:border-gold hover:text-gold"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Jacket measurements */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-5 h-px bg-gold" />
                        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-text-muted">
                          Jacket
                        </span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {MEASUREMENTS.filter((m) => m.bodyZone !== "lower").map((m) => {
                          const val = build.measurements[m.id] ?? "";
                          const num = parseFloat(val);
                          const warn = val !== "" && !isNaN(num) && (num < m.range[0] || num > m.range[1]);
                          return (
                            <div key={m.id}>
                              <label className="section-label text-text-muted block mb-1.5 capitalize">
                                {m.label} (cm)
                              </label>
                              <input
                                type="number"
                                value={val}
                                onChange={(e) => setMeasurement(m.id, e.target.value)}
                                placeholder={`${m.range[0]}–${m.range[1]}`}
                                title={m.tip}
                                className={`w-full border bg-cream-2 px-3 py-2.5 font-sans text-sm focus:outline-none transition-colors placeholder-text-muted/40 ${
                                  warn
                                    ? "border-amber-400 focus:border-amber-500"
                                    : "border-border focus:border-gold"
                                }`}
                              />
                              {warn && (
                                <p className="flex items-center gap-1 text-[10px] text-amber-600 mt-1">
                                  <AlertCircle size={10} /> Seems off — double check
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Trouser measurements */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-5 h-px bg-gold" />
                        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-text-muted">
                          Trousers
                        </span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {MEASUREMENTS.filter((m) => m.bodyZone === "lower").map((m) => {
                          const val = build.measurements[m.id] ?? "";
                          const num = parseFloat(val);
                          const warn = val !== "" && !isNaN(num) && (num < m.range[0] || num > m.range[1]);
                          return (
                            <div key={m.id}>
                              <label className="section-label text-text-muted block mb-1.5 capitalize">
                                {m.label} (cm)
                              </label>
                              <input
                                type="number"
                                value={val}
                                onChange={(e) => setMeasurement(m.id, e.target.value)}
                                placeholder={`${m.range[0]}–${m.range[1]}`}
                                title={m.tip}
                                className={`w-full border bg-cream-2 px-3 py-2.5 font-sans text-sm focus:outline-none transition-colors placeholder-text-muted/40 ${
                                  warn
                                    ? "border-amber-400 focus:border-amber-500"
                                    : "border-border focus:border-gold"
                                }`}
                              />
                              {warn && (
                                <p className="flex items-center gap-1 text-[10px] text-amber-600 mt-1">
                                  <AlertCircle size={10} /> Seems off — double check
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Filled count */}
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xs text-text-muted">
                        {filledCount} of {MEASUREMENTS.length} measurements entered
                      </p>
                      <Link
                        href="/measure"
                        className="flex items-center gap-1.5 font-sans text-xs tracking-wider text-gold hover:text-gold-dark transition-colors group"
                      >
                        Open illustrated guide
                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                    <p className="text-xs text-text-muted mt-3 italic">
                      * Measurements are optional at this stage. A Rovani consultant confirms everything during your in-person consultation.
                    </p>
                  </div>
                )}

                {/* ── Step 4: Summary ───────────────────────────── */}
                {step === 4 && (
                  <div className="max-w-lg">
                    <h2 className="serif text-3xl font-light mb-2">Your Rovani Suit</h2>
                    <p className="text-text-muted text-sm mb-8">Review your configuration before adding to your order.</p>
                    <div className="space-y-3 mb-8">
                      {[
                        ["Style", styles.find((s) => s.id === build.style)?.name],
                        ["Fabric", selectedFabric?.name],
                        ["Origin", selectedFabric?.origin],
                        ["Colour", build.color],
                        ["Fit", FIT_LABELS[build.fitPreference] ?? build.fitPreference],
                        ["Buttons", buttonOptions.find((b) => b.id === build.buttons)?.name],
                        ["Vents", ventOptions.find((v) => v.id === build.vents)?.name],
                        ["Lining", liningOptions.find((l) => l.id === build.lining)?.name],
                        filledCount > 0 ? ["Measurements", `${filledCount} / ${MEASUREMENTS.length} entered`] : null,
                      ]
                        .filter(Boolean)
                        .map((row) => {
                          const [label, value] = row as [string, string | undefined];
                          return (
                            value && (
                              <div key={label} className="flex justify-between py-3 border-b border-border">
                                <span className="text-xs tracking-widest uppercase text-text-muted">{label}</span>
                                <span className="serif text-base font-light">{value}</span>
                              </div>
                            )
                          );
                        })}
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
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-5 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300"
                      >
                        Add to Order
                      </button>
                    )}
                    <p className="text-xs text-text-muted mt-4 text-center">
                      Final price confirmed post-consultation. No payment required now.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-8 border-t border-border">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1) as Step)}
                disabled={step === 0}
                className="font-sans text-xs tracking-[0.2em] uppercase text-text-muted hover:text-charcoal transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2"
              >
                ← Previous
              </button>
              {step < 4 ? (
                <button
                  onClick={() => canNext && handleStepChange((step + 1) as Step)}
                  disabled={!canNext}
                  className="px-8 py-3 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Continue →
                </button>
              ) : null}
            </div>
          </div>

          {/* ── RIGHT: 3D preview panel ───────────────────────── */}
          <div className="hidden lg:flex flex-col">
            {/* Sticky 3D viewer */}
            <div className="sticky top-20 h-[calc(100vh-80px)] flex flex-col bg-cream-2">
              {/* Title bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <p className="font-sans text-[10px] tracking-widest uppercase text-text-muted">Live Preview</p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-gold/70">3D · Interactive</p>
              </div>

              {/* Canvas */}
              <div className="flex-1 relative">
                <SuitConfigurator {...configuratorProps} />
              </div>

              {/* Build summary bar */}
              <div className="border-t border-border px-6 py-4 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-text-muted">Est. Price</span>
                  <span className="serif text-lg gold-text">{formatINR(totalPrice)}</span>
                </div>
                {build.style && (
                  <p className="font-sans text-xs text-text-secondary truncate">
                    {styles.find((s) => s.id === build.style)?.name}
                    {build.color ? ` · ${build.color}` : ""}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile 3D preview (stacked above steps on small screens) */}
      <div className="lg:hidden sticky top-20 z-10 h-[38vh] bg-cream-2 border-b border-border">
        <SuitConfigurator {...configuratorProps} />
      </div>
    </main>
  );
}
