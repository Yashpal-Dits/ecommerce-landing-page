import ProductGrid from "../components/ProductGrid/ProductGrid";
import { useAppStore } from "../store/useAppStore";
import { useProducts} from "../queries/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

const Trending = () => {
  const { addToCart: handleAddToCart } = useAppStore();
  const { data: products = [], isLoading } = useProducts();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-white">
        <div className="py-10 px-4 max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-black mb-2">Trending Now</h1>
        <p className="text-gray-600 mb-8">The most loved pieces of the season.</p>
        <ProductGrid
          products={products}
          onAddToCart={handleAddToCart}
          itemsPerPage={4}
          mode="infinite"
        />
      </div>
    </div>
  );
};

export default Trending;
