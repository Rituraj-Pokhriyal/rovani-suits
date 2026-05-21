export interface Product {
  id: string;
  name: string;
  category: "suit" | "blazer" | "trouser" | "accessory";
  fabric: "wool" | "cashmere" | "linen" | "cotton" | "tweed";
  price: number;
  originalPrice?: number;
  description: string;
  colors: string[];
  tags: string[];
  featured: boolean;
  new: boolean;
  gradient: string;
}

export const products: Product[] = [
  {
    id: "midnight-wool-suit",
    name: "The Midnight — Wool Two-Piece",
    category: "suit",
    fabric: "wool",
    price: 125000,
    description: "Super 150s merino wool in midnight navy. Single-breasted, peak lapel, hand-stitched throughout. Canvassed construction.",
    colors: ["Midnight Navy", "Charcoal", "Onyx"],
    tags: ["Formal", "Business", "Wedding"],
    featured: true,
    new: false,
    gradient: "from-slate-900 to-slate-700",
  },
  {
    id: "ivory-linen-suit",
    name: "The Riviera — Linen Summer Suit",
    category: "suit",
    fabric: "linen",
    price: 95000,
    description: "Italian linen in ivory cream. Unstructured shoulders, relaxed silhouette for warm-weather elegance.",
    colors: ["Ivory", "Sand", "Sky Blue"],
    tags: ["Summer", "Resort", "Casual Formal"],
    featured: true,
    new: true,
    gradient: "from-amber-100 to-stone-200",
  },
  {
    id: "cashmere-blazer",
    name: "The Mayfair — Cashmere Blazer",
    category: "blazer",
    fabric: "cashmere",
    price: 185000,
    description: "Pure Scottish cashmere in stone grey. Double-breasted, notch lapel, contrast lining in Rovani's signature gold.",
    colors: ["Stone Grey", "Camel", "Deep Plum"],
    tags: ["Smart Casual", "Evening", "Signature"],
    featured: true,
    new: false,
    gradient: "from-stone-400 to-stone-600",
  },
  {
    id: "charcoal-tweed",
    name: "The Highland — Tweed Three-Piece",
    category: "suit",
    fabric: "tweed",
    price: 145000,
    originalPrice: 165000,
    description: "Harris Tweed in charcoal herringbone with a copper windowpane. Includes waistcoat with welted pockets.",
    colors: ["Charcoal Herringbone", "Brown Glen Plaid"],
    tags: ["Heritage", "Country", "Three-Piece"],
    featured: false,
    new: false,
    gradient: "from-stone-700 to-stone-900",
  },
  {
    id: "white-dinner-jacket",
    name: "The Monaco — Ivory Dinner Jacket",
    category: "blazer",
    fabric: "wool",
    price: 110000,
    description: "Pure wool in ivory with silk-faced peak lapels. Worn with or without the matching trouser.",
    colors: ["Ivory", "Champagne"],
    tags: ["Black Tie", "Gala", "Evening"],
    featured: false,
    new: true,
    gradient: "from-yellow-50 to-stone-100",
  },
  {
    id: "navy-chalkstripe",
    name: "The Savile — Chalk-Stripe Suit",
    category: "suit",
    fabric: "wool",
    price: 135000,
    description: "Super 130s wool in deep navy with classic chalk-stripe. The boardroom suit, perfected.",
    colors: ["Navy Chalk", "Charcoal Chalk"],
    tags: ["Business", "Formal", "Classic"],
    featured: false,
    new: false,
    gradient: "from-blue-900 to-blue-950",
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const categories = ["All", "suit", "blazer", "trouser", "accessory"] as const;
export const fabrics = ["All", "wool", "cashmere", "linen", "cotton", "tweed"] as const;
