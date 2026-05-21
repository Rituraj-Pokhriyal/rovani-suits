"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ChevronRight, RotateCcw } from "lucide-react";
import { BodyDiagram } from "./BodyDiagram";
import { MeasurementGuide } from "./MeasurementGuide";
import { useMeasurementStore } from "@/lib/store/measurementStore";
import { MEASUREMENTS } from "@/lib/data/measurements";

const FIT_OPTIONS = [
  { id: "slim", label: "Slim", desc: "Close to the body. Contemporary silhouette." },
  { id: "regular", label: "Regular", desc: "The classic balanced fit. Works for all body types." },
  { id: "relaxed", label: "Relaxed", desc: "Generous, comfortable. Easy movement." },
  { id: "classic", label: "Classic", desc: "Traditional English cut. Full chest, suppressed waist." },
] as const;

export function MeasurePage() {
  const { measurements, fitPreference, setMeasurement, setFitPreference, clearAll, completedCount } =
    useMeasurementStore();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const filledIds = useMemo(
    () => MEASUREMENTS.filter((m) => measurements[m.id] && measurements[m.id] !== "").map((m) => m.id),
    [measurements]
  );

  const handleHotspotClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
    setSaved(false);
  };

  const handleChange = (id: string, value: string) => {
    setMeasurement(id, value);
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClear = () => {
    clearAll();
    setActiveId(null);
    setSaved(false);
  };

  const progressPct = Math.round((completedCount / MEASUREMENTS.length) * 100);

  return (
    <main className="min-h-screen bg-cream pt-20">
      {/* Hero */}
      <div className="bg-charcoal py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 fabric-overlay" />
        <p className="section-label text-gold/60 mb-3">— The Art of the Fit</p>
        <h1 className="serif text-5xl md:text-6xl font-light text-cream mb-4">
          Measure Yourself
        </h1>
        <p className="text-cream/50 max-w-md mx-auto text-sm leading-relaxed mb-6">
          A perfectly cut suit starts with perfect measurements. This guide takes 15 minutes with a helper.
          Your measurements are saved to your browser and auto-fill the bespoke builder.
        </p>
        {/* Progress bar */}
        <div className="max-w-xs mx-auto">
          <div className="flex justify-between mb-2">
            <span className="font-sans text-[10px] tracking-widest uppercase text-cream/40">Progress</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-gold/70">
              {completedCount} / {MEASUREMENTS.length}
            </span>
          </div>
          <div className="h-px bg-cream/10 w-full">
            <motion.div
              className="h-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* What you'll need strip */}
      <div className="bg-cream-2 border-b border-border py-5 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {["A soft measuring tape", "A helper (recommended)", "Fitted shirt + trousers", "15 minutes"].map(
            (item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span className="font-sans text-xs tracking-wider text-text-secondary">{item}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Main two-column layout */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-[300px_1fr] gap-10 xl:gap-16">
          {/* Left: sticky body diagram */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
            <BodyDiagram
              activeId={activeId}
              onHotspotClick={handleHotspotClick}
              filledIds={filledIds}
            />

            {/* Fit preference */}
            <div className="pt-4 border-t border-border">
              <h3 className="serif text-base font-light mb-3 text-charcoal">Fit Preference</h3>
              <div className="grid grid-cols-2 gap-2">
                {FIT_OPTIONS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFitPreference(f.id)}
                    className={`text-left p-3 border transition-all duration-200 ${
                      fitPreference === f.id
                        ? "border-gold bg-gold/5"
                        : "border-border hover:border-gold/40"
                    }`}
                  >
                    <p className="font-sans text-xs font-medium tracking-wider text-charcoal">{f.label}</p>
                    <p className="font-sans text-[10px] text-text-muted mt-0.5 leading-tight">{f.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleSave}
                className="w-full py-3.5 bg-charcoal text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-300 flex items-center justify-center gap-2"
              >
                {saved ? (
                  <>
                    <Check size={14} />
                    Measurements Saved
                  </>
                ) : (
                  "Save My Measurements"
                )}
              </button>

              <Link
                href="/bespoke"
                className="w-full py-3.5 border border-charcoal/30 text-charcoal font-sans text-xs tracking-[0.2em] uppercase hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Use in Bespoke Builder
                <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {completedCount > 0 && (
                <button
                  onClick={handleClear}
                  className="w-full flex items-center justify-center gap-2 py-2 font-sans text-[10px] tracking-widest uppercase text-text-muted hover:text-charcoal transition-colors"
                >
                  <RotateCcw size={11} />
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Right: instruction cards */}
          <div>
            <div className="mb-8">
              <p className="section-label mb-2">— Instructions</p>
              <h2 className="serif text-3xl font-light text-charcoal mb-3">
                Click a number on the diagram<br />or expand any card below
              </h2>
              <p className="text-text-muted text-sm">
                Each card has step-by-step instructions, common mistakes to avoid, and a field to enter your measurement.
                All values are saved automatically to your browser.
              </p>
            </div>

            <MeasurementGuide
              activeId={activeId}
              filledIds={filledIds}
              values={measurements}
              onCardClick={handleHotspotClick}
              onChange={handleChange}
            />

            {/* Bottom CTA once most fields are filled */}
            {completedCount >= 10 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 p-8 bg-charcoal relative overflow-hidden"
              >
                <div className="absolute inset-0 fabric-overlay" />
                <div className="relative">
                  <p className="section-label text-gold/60 mb-3">— {completedCount} of {MEASUREMENTS.length} complete</p>
                  <h3 className="serif text-2xl font-light text-cream mb-3">
                    {completedCount === MEASUREMENTS.length
                      ? "All measurements saved. Ready to build your suit."
                      : "Looking good. You can continue in the builder now."}
                  </h3>
                  <p className="text-cream/50 text-sm mb-6">
                    Your tailor will confirm all measurements during the in-person consultation. Nothing is final until then.
                  </p>
                  <Link
                    href="/bespoke"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-cream font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-dark transition-all duration-300 group"
                  >
                    Begin Bespoke
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
