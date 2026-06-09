import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { useProducts } from "../queries/useProducts";
import { SortOption } from "../types";
import ProductGrid from "../components/ProductGrid/ProductGrid";

const Hero = lazy(() => import("../components/Hero/Hero"));
const Categories = lazy(() => import("../components/Categories/Categories"));
const Testimonials = lazy(() => import("../components/Testimonials/Testimonials"));
const MemberSection = lazy(() => import("../components/MemberSection/MemberSection"));

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
    <p className="text-sm text-gray-500 font-medium animate-pulse">Loading...</p>
  </div>
);

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.PriceLowToHigh);
  const { addToCart: handleAddToCart } = useAppStore();

  const { data: productsData = [], isLoading: isProductsLoading } = useProducts();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filtered = productsData.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch)
      );
    });

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case SortOption.PriceLowToHigh:
          return a.price - b.price;
        case SortOption.PriceHighToLow:
          return b.price - a.price;
        case SortOption.NameAZ:
          return a.name.localeCompare(b.name);
        case SortOption.NameZA:
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [searchTerm, sortOption, productsData]);

  if (loading || isProductsLoading) {
    return <PageLoader />;
  }

  return (
    <main>
      <Suspense fallback={<div className="min-h-[420px] flex items-center justify-center">Loading hero section…</div>}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center">Loading categories…</div>}>
        <Categories />
      </Suspense>

      <section className="py-14 md:py-16 lg:py-20 bg-white" id="products">
        <div className="w-11/12 max-w-5xl mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <p className="uppercase text-red-500 font-black text-xs md:text-sm mb-3">
                Trending Drop
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-3 md:mb-4 leading-tight">
                Built for bold fashion moods
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
                Shop new outfits, sneakers, and accessories curated for Gen-Z street style.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-[220px_200px] w-full">
              <input
                type="search"
                aria-label="Search products"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-black focus:outline-none"
              />
              <select
                value={sortOption}
                onChange={(event) => setSortOption(event.target.value as SortOption)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-black focus:outline-none"
              >
                <option value={SortOption.PriceLowToHigh}>Price: Low to High</option>
                <option value={SortOption.PriceHighToLow}>Price: High to Low</option>
                <option value={SortOption.NameAZ}>Name: A - Z</option>
                <option value={SortOption.NameZA}>Name: Z - A</option>
              </select>
            </div>
          </div>

          <Suspense fallback={<div className="min-h-[320px] flex items-center justify-center">Loading products…</div>}>
            <ProductGrid
              key={searchTerm + sortOption}
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              itemsPerPage={4}
              draggable
            />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center">Loading customer testimonials…</div>}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<div className="min-h-[280px] flex items-center justify-center">Loading members section…</div>}>
        <MemberSection />
      </Suspense>
    </main>
  );
};

export default Home;
