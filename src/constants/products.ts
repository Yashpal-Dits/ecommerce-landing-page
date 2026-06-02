import { Product } from '@/types';

export const products: Product[] = [
  // ── Streetwear (8) ──────────────────────────────
  { id: 1, name: "Tokyo Oversized Tee", category: "Streetwear", price: 2199, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Indie Crop Hoodie", category: "Streetwear", price: 2499, image: "https://images.pexels.com/photos/28040595/pexels-photo-28040595.jpeg" },
  { id: 6, name: "Monsoon Co-ord Set", category: "Streetwear", price: 3199, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80" },
  { id: 9, name: "Neon Graphic Tee", category: "Streetwear", price: 1899, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80" },
  { id: 10, name: "Acid Wash Joggers", category: "Streetwear", price: 2799, image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=900&q=80" },
  { id: 11, name: "Oversized Utility Vest", category: "Streetwear", price: 3499, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80" },
  { id: 12, name: "Graffiti Print Hoodie", category: "Streetwear", price: 2999, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80" },
  { id: 13, name: "Camo Cargo Shorts", category: "Streetwear", price: 2399, image: "https://images.pexels.com/photos/29142478/pexels-photo-29142478.jpeg" },

  // ── Denim (5) ───────────────────────────────────
  { id: 2, name: "Seoul Cargo Pants", category: "Denim", price: 2899, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80" },
  { id: 14, name: "Slim Fit Ripped Jeans", category: "Denim", price: 3199, image: "https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg"},
  { id: 15, name: "Wide Leg Denim Trousers", category: "Denim", price: 3599, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80" },
  { id: 16, name: "Vintage Wash Denim Shorts", category: "Denim", price: 2199, image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=900&q=80" },
  { id: 17, name: "Denim Trucker Jacket", category: "Denim", price: 4199, image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=900&q=80" },

  // ── Sneakers (5) ────────────────────────────────
  { id: 4, name: "Orbit Chunky Sneakers", category: "Sneakers", price: 4999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80" },
  { id: 18, name: "Retro Runner 90s", category: "Sneakers", price: 5499, image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80" },
  { id: 19, name: "Platform Canvas Kicks", category: "Sneakers", price: 3799, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80" },
  { id: 20, name: "High Top Leather Sneakers", category: "Sneakers", price: 5999, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80" },
  { id: 21, name: "Minimalist White Trainers", category: "Sneakers", price: 4299, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80" },

  // ── Outerwear (5) ──────────────────────────────
  { id: 5, name: "Urban Denim Jacket", category: "Outerwear", price: 3599, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80" },
  { id: 7, name: "Retro Varsity Jacket", category: "Outerwear", price: 4299, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80" },
  { id: 22, name: "Puffer Down Jacket", category: "Outerwear", price: 5999, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80" },
  { id: 23, name: "Windbreaker Shell", category: "Outerwear", price: 3999, image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=80" },
  { id: 24, name: "Corduroy Overshirt", category: "Outerwear", price: 3299, image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=900&q=80" },

  // ── Accessories (7) ────────────────────────────
  { id: 8, name: "Layered Chain + Ring Set", category: "Accessories", price: 1499, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80" },
  { id: 25, name: "Bucket Hat — Corduroy", category: "Accessories", price: 999, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=80" },
  { id: 26, name: "Retro Round Sunglasses", category: "Accessories", price: 1799, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80" },
  { id: 27, name: "Canvas Crossbody Bag", category: "Accessories", price: 2499, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80" },
  { id: 28, name: "Beanie — Ribbed Knit", category: "Accessories", price: 899, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80" },
  { id: 29, name: "Digital Sport Watch", category: "Accessories", price: 3299, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80" },
  { id: 30, name: "Leather Braided Bracelet", category: "Accessories", price: 699, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80" },
];

export const categoryCards = [
  { id: 'sneakers', name: 'Sneakers', description: 'Latest drops and classic kicks', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', path: '/categories/sneakers' },
  { id: 'denim', name: 'Denim', description: 'Premium jeans and denim jackets', image: 'https://images.unsplash.com/photo-1541099649105-f69ad29bc747?auto=format&fit=crop&w=600&q=80', path: '/categories/denim' },
  { id: 'streetwear', name: 'Streetwear', description: 'Urban fashion essentials', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80', path: '/categories/streetwear' },
  { id: 'accessories', name: 'Accessories', description: 'Complete your look', image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80', path: '/categories/accessories' },
  { id: 'outerwear', name: 'Outerwear', description: 'Jackets and coats for all seasons', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80', path: '/categories/outerwear' },
];

export const PRODUCTS_BY_CATEGORY = {
  Sneakers: products.filter((p) => p.category === 'Sneakers'),
  Denim: products.filter((p) => p.category === 'Denim'),
  Streetwear: products.filter((p) => p.category === 'Streetwear'),
  Accessories: products.filter((p) => p.category === 'Accessories'),
  Outerwear: products.filter((p) => p.category === 'Outerwear'),
  Trending: products,
};