import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Categories from "./components/Categories/Categories";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import Testimonials from "./components/Testimonials/Testimonials";
import MemberSection from "./components/MemberSection/MemberSection";
import Footer from "./components/Footer/Footer";

const products = [
  {
    id: 1,
    name: "Tokyo Oversized Tee",
    category: "Streetwear",
    price: 2199,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Seoul Cargo Pants",
    category: "Bottomwear",
    price: 2899,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Indie Crop Hoodie",
    category: "Women",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Orbit Chunky Sneakers",
    category: "Sneakers",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Urban Denim Jacket",
    category: "Outerwear",
    price: 3599,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Monsoon Co-ord Set",
    category: "Ethnic Fusion",
    price: 3199,
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    name: "Retro Varsity Jacket",
    category: "Streetwear",
    price: 4299,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    name: "Layered Chain + Ring Set",
    category: "Accessories",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80",
  },
];

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const featuredProducts = useMemo(() => products, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => setCartCount((count) => count + 1);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Hero />
      <Categories />
      <ProductGrid products={featuredProducts} onAddToCart={handleAddToCart} />
      <Testimonials />
      <MemberSection />
      <Footer />
    </>
  );
}
