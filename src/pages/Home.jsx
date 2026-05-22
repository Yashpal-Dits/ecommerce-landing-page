import { useEffect, useState } from "react";

import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Testimonials from "../components/Testimonials/Testimonials";
import MemberSection from "../components/MemberSection/MemberSection";
import { Skeleton } from "../components/ui/Skeleton"

export default function Home({ products, onAddToCart }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="space-y-10 p-6">

        {/* Hero Skeleton */}
        <Skeleton className="h-[400px] w-full rounded-2xl" />

        {/* Categories Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>

        {/* Product Cards Skeleton */}
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
      <ProductGrid
        products={products}
        onAddToCart={onAddToCart}
      />
      <Testimonials />
      <MemberSection />
    </main>
  );
}