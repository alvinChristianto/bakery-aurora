// Static catalog. To add a product: append to `products` with a unique slug and a
// valid `categorySlug`. Swap the gradient placeholders for real photos by adding an
// `image` field and rendering it with next/image (see CLAUDE.md).

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  emoji: string;
  accent: string; // hex, drives the gradient placeholder
};

export type Variant = {
  name: string; // e.g. size or flavor
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  basePrice: number;
  emoji: string;
  accent: string; // hex, drives the gradient placeholder
  tags: string[];
  variants: Variant[];
  featured?: boolean;
};

export const categories: Category[] = [
  {
    id: "c1",
    slug: "breads",
    name: "Breads",
    description: "Naturally leavened sourdoughs with a 36-hour cold ferment.",
    emoji: "🍞",
    accent: "#d98a3d",
  },
  {
    id: "c2",
    slug: "pastries",
    name: "Pastries",
    description: "Hand-laminated, 27 buttery layers, baked to a glassy shatter.",
    emoji: "🥐",
    accent: "#e0a73e",
  },
  {
    id: "c3",
    slug: "cakes",
    name: "Cakes",
    description: "Architectural celebration cakes engineered to delight.",
    emoji: "🎂",
    accent: "#ff5e8a",
  },
  {
    id: "c4",
    slug: "signature",
    name: "Signature",
    description: "Limited futuristic creations from the Aurora lab.",
    emoji: "✨",
    accent: "#ff3333",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "aurora-sourdough",
    name: "Aurora Sourdough",
    description:
      "Our flagship loaf — blistered crust, open crumb, and a deep tang from a wild starter we’ve kept alive since day one.",
    categorySlug: "breads",
    basePrice: 8,
    emoji: "🍞",
    accent: "#d98a3d",
    tags: ["Bestseller", "Vegan"],
    variants: [
      { name: "Classic", price: 8 },
      { name: "Seeded", price: 9 },
      { name: "Whole Grain", price: 9.5 },
    ],
    featured: true,
  },
  {
    id: "p2",
    slug: "midnight-rye",
    name: "Midnight Rye",
    description:
      "Dark, dense, and faintly sweet with molasses and toasted caraway — a loaf with serious gravity.",
    categorySlug: "breads",
    basePrice: 9,
    emoji: "🥖",
    accent: "#7a4a2b",
    tags: ["Vegan"],
    variants: [
      { name: "Whole", price: 9 },
      { name: "Half", price: 5 },
    ],
  },
  {
    id: "p3",
    slug: "cloud-focaccia",
    name: "Cloud Focaccia",
    description:
      "Pillowy, olive-oil-drenched and dimpled, finished with flaky salt and rosemary from the rooftop garden.",
    categorySlug: "breads",
    basePrice: 7,
    emoji: "🫓",
    accent: "#c7a14a",
    tags: ["New"],
    variants: [
      { name: "Rosemary", price: 7 },
      { name: "Tomato & Basil", price: 8 },
    ],
  },
  {
    id: "p4",
    slug: "halo-croissant",
    name: "Halo Croissant",
    description:
      "Twenty-seven hand-folded layers of cultured French butter, baked to a lacquered, shattering finish.",
    categorySlug: "pastries",
    basePrice: 5,
    emoji: "🥐",
    accent: "#e0a73e",
    tags: ["Bestseller"],
    variants: [
      { name: "Plain", price: 5 },
      { name: "Almond", price: 6.5 },
      { name: "Dark Chocolate", price: 6.5 },
    ],
    featured: true,
  },
  {
    id: "p5",
    slug: "ruby-danish",
    name: "Ruby Danish",
    description:
      "Flaky pinwheel cradling vanilla custard and a glossy ruby raspberry center.",
    categorySlug: "pastries",
    basePrice: 6,
    emoji: "🍓",
    accent: "#ff3d5e",
    tags: ["Seasonal"],
    variants: [
      { name: "Raspberry", price: 6 },
      { name: "Pistachio", price: 6.5 },
    ],
  },
  {
    id: "p6",
    slug: "cinnamon-supernova",
    name: "Cinnamon Supernova",
    description:
      "An oversized swirl of Saigon cinnamon and brown butter, finished with a cream-cheese glaze.",
    categorySlug: "pastries",
    basePrice: 6,
    emoji: "🌀",
    accent: "#c87a3a",
    tags: ["Bestseller"],
    variants: [
      { name: "Classic", price: 6 },
      { name: "Biscoff", price: 7 },
    ],
    featured: true,
  },
  {
    id: "p7",
    slug: "velvet-eclipse-cake",
    name: "Velvet Eclipse Cake",
    description:
      "Four layers of red-velvet sponge under a mirror-glaze dome that catches the light like polished obsidian.",
    categorySlug: "cakes",
    basePrice: 42,
    emoji: "🎂",
    accent: "#ff3333",
    tags: ["Bestseller", "Celebration"],
    variants: [
      { name: '6" (serves 8)', price: 42 },
      { name: '8" (serves 14)', price: 64 },
      { name: '10" (serves 24)', price: 92 },
    ],
    featured: true,
  },
  {
    id: "p8",
    slug: "citrus-prism-tart",
    name: "Citrus Prism Tart",
    description:
      "A sablé shell holding torched meditteranean lemon curd, sharp, bright, and impossibly smooth.",
    categorySlug: "cakes",
    basePrice: 28,
    emoji: "🍋",
    accent: "#f4c430",
    tags: ["Vegetarian"],
    variants: [
      { name: "Individual", price: 7 },
      { name: "Share (serves 6)", price: 28 },
    ],
  },
  {
    id: "p9",
    slug: "matcha-nebula-roll",
    name: "Matcha Nebula Roll",
    description:
      "Cloud-soft ceremonial-matcha sponge rolled around vanilla-bean cream with a swirl of dark ganache.",
    categorySlug: "cakes",
    basePrice: 24,
    emoji: "🍵",
    accent: "#5fa463",
    tags: ["New"],
    variants: [
      { name: "Roll (serves 6)", price: 24 },
      { name: "Slice", price: 5 },
    ],
  },
  {
    id: "p10",
    slug: "neon-cruffin",
    name: "Neon Cruffin",
    description:
      "Our lab’s croissant–muffin hybrid, injected with raspberry-yuzu jam and dusted in glowing red sugar.",
    categorySlug: "signature",
    basePrice: 7,
    emoji: "✨",
    accent: "#ff3333",
    tags: ["Limited", "Bestseller"],
    variants: [
      { name: "Raspberry-Yuzu", price: 7 },
      { name: "Cosmic Cookie", price: 7.5 },
    ],
    featured: true,
  },
  {
    id: "p11",
    slug: "galaxy-canele",
    name: "Galaxy Canelé",
    description:
      "A caramelised, custardy core inside a dark, crackling shell — small, intense, and a little otherworldly.",
    categorySlug: "signature",
    basePrice: 4,
    emoji: "🌌",
    accent: "#3a2b66",
    tags: ["Limited"],
    variants: [
      { name: "Single", price: 4 },
      { name: "Box of 6", price: 22 },
    ],
  },
  {
    id: "p12",
    slug: "solar-flare-brownie",
    name: "Solar Flare Brownie",
    description:
      "Molten 72% chocolate brownie with a chili-spiked caramel core and a flash of flaky salt.",
    categorySlug: "signature",
    basePrice: 5,
    emoji: "🔥",
    accent: "#ff5a1f",
    tags: ["New", "Spicy"],
    variants: [
      { name: "Single", price: 5 },
      { name: "Box of 4", price: 18 },
    ],
  },
];

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function formatPrice(value: number): string {
  return `$${value.toFixed(2).replace(/\.00$/, "")}`;
}
