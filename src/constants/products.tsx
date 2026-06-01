import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Tokyo Oversized Tee",
    category: "Streetwear",
    price: 2199,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Seoul Cargo Pants",
    category: "Denim",
    price: 2899,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Indie Crop Hoodie",
    category: "Streetwear",
    price: 2499,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Orbit Chunky Sneakers",
    category: "Sneakers",
    price: 4999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Urban Denim Jacket",
    category: "Outerwear",
    price: 3599,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Monsoon Co-ord Set",
    category: "Streetwear",
    price: 3199,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Retro Varsity Jacket",
    category: "Outerwear",
    price: 4299,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Layered Chain + Ring Set",
    category: "Accessories",
    price: 1499,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
  },
];

export const categoryCards = [
  {
    id: 'sneakers',
    name: 'Sneakers',
    description: 'Latest drops and classic kicks',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    path: '/categories/sneakers',
  },
  {
    id: 'denim',
    name: 'Denim',
    description: 'Premium jeans and denim jackets',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad29bc747?auto=format&fit=crop&w=600&q=80',
    path: '/categories/denim',
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    description: 'Urban fashion essentials',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    path: '/categories/streetwear',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Complete your look',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80',
    path: '/categories/accessories',
  },
  {
    id: 'outerwear',
    name: 'Outerwear',
    description: 'Jackets and coats for all seasons',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    path: '/categories/outerwear',
  },
];

export const PRODUCTS_BY_CATEGORY = {
  Sneakers: products.filter((p) => p.category === 'Sneakers'),
  Denim: products.filter((p) => p.category === 'Denim'),
  Streetwear: products.filter((p) => p.category === 'Streetwear'),
  Accessories: products.filter((p) => p.category === 'Accessories'),
  Outerwear: products.filter((p) => p.category === 'Outerwear'),
  Trending: products,
};
