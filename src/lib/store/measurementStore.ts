import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MEASUREMENTS } from "@/lib/data/measurements";

interface MeasurementStore {
  measurements: Record<string, string>;
  fitPreference: "slim" | "regular" | "relaxed" | "classic";
  setMeasurement: (id: string, value: string) => void;
  setFitPreference: (pref: MeasurementStore["fitPreference"]) => void;
  setAll: (measurements: Record<string, string>) => void;
  clearAll: () => void;
  isComplete: boolean;
  completedCount: number;
}

const emptyMeasurements = Object.fromEntries(MEASUREMENTS.map((m) => [m.id, ""]));

export const useMeasurementStore = create<MeasurementStore>()(
  persist(
    (set, get) => ({
      measurements: { ...emptyMeasurements },
      fitPreference: "regular",

      setMeasurement: (id, value) =>
        set((s) => {
          const updated = { ...s.measurements, [id]: value };
          const filled = Object.values(updated).filter(Boolean).length;
          return {
            measurements: updated,
            isComplete: filled === MEASUREMENTS.length,
            completedCount: filled,
          };
        }),

      setFitPreference: (pref) => set({ fitPreference: pref }),

      setAll: (measurements) => {
        const filled = Object.values(measurements).filter(Boolean).length;
        set({
          measurements: { ...emptyMeasurements, ...measurements },
          isComplete: filled === MEASUREMENTS.length,
          completedCount: filled,
        });
      },

      clearAll: () =>
        set({ measurements: { ...emptyMeasurements }, isComplete: false, completedCount: 0 }),

      isComplete: false,
      completedCount: 0,
    }),
    {
      name: "rovani-measurements",
    }
  )
);
