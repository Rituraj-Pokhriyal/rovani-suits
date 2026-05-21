export interface FabricOption {
  id: string;
  name: string;
  origin: string;
  description: string;
  priceAddon: number;
  colors: { name: string; hex: string }[];
  gradient: string;
}

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface DetailOption {
  id: string;
  name: string;
  description: string;
}

export const fabrics: FabricOption[] = [
  {
    id: "super150-wool",
    name: "Super 150s Wool",
    origin: "Biella, Italy",
    description: "Exceptional fineness, lustrous sheen, year-round weight. The benchmark of bespoke.",
    priceAddon: 0,
    colors: [
      { name: "Midnight Navy", hex: "#1a2744" },
      { name: "Charcoal", hex: "#3c3c3c" },
      { name: "Onyx", hex: "#0f0f0f" },
      { name: "Dove Grey", hex: "#9a9a9a" },
    ],
    gradient: "from-slate-600 to-slate-800",
  },
  {
    id: "cashmere",
    name: "Pure Cashmere",
    origin: "Scotland / Mongolia",
    description: "Incomparably soft, lightweight warmth. The pinnacle of natural luxury.",
    priceAddon: 75000,
    colors: [
      { name: "Stone", hex: "#b8a99a" },
      { name: "Camel", hex: "#c89f6e" },
      { name: "Deep Plum", hex: "#4a1c40" },
      { name: "Midnight", hex: "#1c1c2e" },
    ],
    gradient: "from-stone-400 to-amber-700",
  },
  {
    id: "linen",
    name: "Italian Linen",
    origin: "Emilia-Romagna, Italy",
    description: "Breathable, elegant, effortlessly relaxed. Perfect for warm climates and resort wear.",
    priceAddon: -20000,
    colors: [
      { name: "Ivory", hex: "#f5f0e8" },
      { name: "Sand", hex: "#d4c5a9" },
      { name: "Sky Blue", hex: "#8ba7c4" },
      { name: "Sage", hex: "#8fa68a" },
    ],
    gradient: "from-amber-100 to-yellow-200",
  },
  {
    id: "harris-tweed",
    name: "Harris Tweed",
    origin: "Outer Hebrides, Scotland",
    description: "Handwoven in the Scottish isles. Robust, textural, heritage in every thread.",
    priceAddon: 15000,
    colors: [
      { name: "Charcoal Herringbone", hex: "#4a4a4a" },
      { name: "Rust & Brown", hex: "#7a4b2a" },
      { name: "Forest Green", hex: "#2d4a35" },
      { name: "Navy Windowpane", hex: "#1e3a5f" },
    ],
    gradient: "from-stone-600 to-stone-800",
  },
];

export const styles: StyleOption[] = [
  { id: "single-notch", name: "Single Breasted — Notch Lapel", description: "Versatile, modern, most popular. Works for every occasion.", icon: "◇" },
  { id: "single-peak", name: "Single Breasted — Peak Lapel", description: "Commanding presence, suits formal and business environments.", icon: "◈" },
  { id: "double-peak", name: "Double Breasted — Peak Lapel", description: "Bold, architectural, for the connoisseur. Unmistakably powerful.", icon: "◆" },
  { id: "three-piece", name: "Three-Piece with Waistcoat", description: "The complete suit. Timeless formality with a vintage edge.", icon: "▣" },
];

export const buttonOptions: DetailOption[] = [
  { id: "2-button", name: "2 Buttons", description: "Modern standard" },
  { id: "3-button", name: "3 Buttons", description: "Classic British" },
  { id: "4-cuff", name: "4 Working Cuff Buttons", description: "Surgeon's cuffs" },
];

export const ventOptions: DetailOption[] = [
  { id: "no-vent", name: "No Vent", description: "Continental style" },
  { id: "single-vent", name: "Single Vent", description: "American classic" },
  { id: "double-vent", name: "Double Vents", description: "British tradition" },
];

export const liningOptions: DetailOption[] = [
  { id: "full-gold", name: "Full Gold Silk", description: "Rovani signature — champagne gold" },
  { id: "half-cream", name: "Half-Lined Cream", description: "Lighter, summer-weight" },
  { id: "bespoke-lining", name: "Bespoke Printed Lining", description: "Your monogram or pattern" },
];
