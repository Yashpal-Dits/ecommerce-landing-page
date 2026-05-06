import { useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Testimonials from "../components/Testimonials/Testimonials";
import MemberSection from "../components/MemberSection/MemberSection";

export default function Home({ products, onAddToCart }) {
  
  
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

  return (
    <main>
      <Hero />
      <Categories />
      <ProductGrid products={products} onAddToCart={onAddToCart} />
      <Testimonials />
      <MemberSection />
    </main>
  );
}