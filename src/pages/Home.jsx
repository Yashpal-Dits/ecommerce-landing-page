import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Testimonials from "../components/Testimonials/Testimonials";
import MemberSection from "../components/MemberSection/MemberSection";

export default function Home({ products, onAddToCart }) {
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