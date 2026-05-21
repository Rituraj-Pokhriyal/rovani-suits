"use client";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Ruler, AlertCircle } from "lucide-react";
import { MEASUREMENTS, JACKET_MEASUREMENTS, TROUSER_MEASUREMENTS } from "@/lib/data/measurements";

interface Props {
  activeId: string | null;
  filledIds: string[];
  values: Record<string, string>;
  onCardClick: (id: string) => void;
  onChange: (id: string, value: string) => void;
}

function MeasurementCard({
  measurement,
  index,
  isActive,
  isFilled,
  value,
  onCardClick,
  onChange,
}: {
  measurement: (typeof MEASUREMENTS)[0];
  index: number;
  isActive: boolean;
  isFilled: boolean;
  value: string;
  onCardClick: () => void;
  onChange: (val: string) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const num = parseFloat(value);
  const outOfRange = value !== "" && !isNaN(num) && (num < measurement.range[0] || num > measurement.range[1]);

  // Auto-scroll card into view when activated
  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      className={`border transition-all duration-300 ${isActive ? "border-gold bg-cream-3" : isFilled ? "border-charcoal/20 bg-cream-2" : "border-border bg-cream"}`}
    >
      {/* Card header — always visible */}
      <button
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
        onClick={onCardClick}
      >
        {/* Number badge */}
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center font-sans text-xs font-semibold flex-shrink-0 transition-colors ${
            isActive ? "bg-gold text-cream" : isFilled ? "bg-charcoal text-cream" : "bg-border text-text-muted"
          }`}
        >
          {index + 1}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="serif text-base font-light text-charcoal">{measurement.label}</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              {isFilled && !outOfRange && (
                <span className="font-sans text-xs text-gold font-medium">{value} cm</span>
              )}
              {outOfRange && (
                <span className="flex items-center gap-1 text-[10px] text-amber-600 font-sans">
                  <AlertCircle size={11} /> Check
                </span>
              )}
              <ChevronDown
                size={14}
                className={`text-text-muted transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
              />
            </div>
          </div>
          <p className="font-sans text-[10px] tracking-widest uppercase text-text-muted mt-0.5">
            {measurement.range[0]}–{measurement.range[1]} cm
          </p>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-0 space-y-4">
              {/* Tip */}
              <div className="flex gap-3">
                <Ruler size={14} className="text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary leading-relaxed">{measurement.tip}</p>
              </div>

              {/* Common mistake */}
              <div className="flex gap-3 bg-amber-50/60 border border-amber-100 px-3 py-2.5 rounded">
                <AlertCircle size={13} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed">{measurement.mistake}</p>
              </div>

              {/* Input */}
              <div>
                <label className="section-label text-text-muted block mb-2">
                  {measurement.label} (cm)
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={`${measurement.range[0]}–${measurement.range[1]}`}
                  className={`w-full border px-4 py-3 bg-cream font-sans text-sm focus:outline-none transition-colors placeholder-text-muted/40 ${
                    outOfRange
                      ? "border-amber-400 focus:border-amber-500"
                      : "border-border focus:border-gold"
                  }`}
                />
                {outOfRange && (
                  <p className="text-xs text-amber-600 mt-1.5">
                    Typical range is {measurement.range[0]}–{measurement.range[1]} cm — double check this measurement.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MeasurementGuide({ activeId, filledIds, values, onCardClick, onChange }: Props) {
  return (
    <div className="space-y-8">
      {/* Jacket section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-gold" />
          <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-text-muted">Jacket Measurements</h3>
          <div className="flex-1 h-px bg-border" />
          <span className="font-sans text-[10px] text-text-muted">
            {JACKET_MEASUREMENTS.filter((m) => filledIds.includes(m.id)).length}/{JACKET_MEASUREMENTS.length}
          </span>
        </div>
        <div className="space-y-2">
          {JACKET_MEASUREMENTS.map((m) => {
            const globalIndex = MEASUREMENTS.findIndex((x) => x.id === m.id);
            return (
              <MeasurementCard
                key={m.id}
                measurement={m}
                index={globalIndex}
                isActive={activeId === m.id}
                isFilled={filledIds.includes(m.id)}
                value={values[m.id] ?? ""}
                onCardClick={() => onCardClick(m.id)}
                onChange={(val) => onChange(m.id, val)}
              />
            );
          })}
        </div>
      </div>

      {/* Trouser section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-gold" />
          <h3 className="font-sans text-xs tracking-[0.15em] uppercase text-text-muted">Trouser Measurements</h3>
          <div className="flex-1 h-px bg-border" />
          <span className="font-sans text-[10px] text-text-muted">
            {TROUSER_MEASUREMENTS.filter((m) => filledIds.includes(m.id)).length}/{TROUSER_MEASUREMENTS.length}
          </span>
        </div>
        <div className="space-y-2">
          {TROUSER_MEASUREMENTS.map((m) => {
            const globalIndex = MEASUREMENTS.findIndex((x) => x.id === m.id);
            return (
              <MeasurementCard
                key={m.id}
                measurement={m}
                index={globalIndex}
                isActive={activeId === m.id}
                isFilled={filledIds.includes(m.id)}
                value={values[m.id] ?? ""}
                onCardClick={() => onCardClick(m.id)}
                onChange={(val) => onChange(m.id, val)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
