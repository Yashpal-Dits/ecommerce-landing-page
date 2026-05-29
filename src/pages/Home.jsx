import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Testimonials from "../components/Testimonials/Testimonials";
import MemberSection from "../components/MemberSection/MemberSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "../context/AuthContext";
import { products } from "../constants/products";

const SkeletonDemo = () => (
  <div className="flex items-center gap-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { handleAddToCart } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="space-y-10 p-6">
        <Skeleton className="h-[400px] w-full rounded-2xl" />
        <SkeletonDemo />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
          <Skeleton className="h-[300px] w-full rounded-xl" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Hero />
      <Categories />
      
      {/* Trending Section moved from ProductGrid to Home for specific control */}
      <section className="py-14 md:py-16 lg:py-20 bg-white" id="products">
        <div className="w-11/12 max-w-5xl mx-auto">
          <p className="uppercase text-red-500 font-black text-xs md:text-sm mb-3">
            Trending Drop
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-3 md:mb-4 leading-tight">
            Built for bold fashion moods
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mb-12 md:mb-14 leading-relaxed">
            Shop new outfits, sneakers, and accessories curated for Gen-Z street style.
          </p>
          <ProductGrid products={products} onAddToCart={handleAddToCart} />
        </div>
      </section>

      <Testimonials />
      <MemberSection />
    </main>
  );
};

export default Home;
