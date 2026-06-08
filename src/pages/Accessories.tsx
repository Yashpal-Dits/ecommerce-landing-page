import ProductGrid from "../components/ProductGrid/ProductGrid";
import { useAppStore } from "../store/useAppStore";
import { PRODUCTS_BY_CATEGORY } from "../constants/products";

const Accessories = () => {
  const { addToCart: handleAddToCart } = useAppStore();
  const products = PRODUCTS_BY_CATEGORY.Accessories;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="py-10 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-black mb-2">Accessories</h1>
        <p className="text-gray-600 mb-8">The perfect finish for every look.</p>
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      </div>
    </div>
  );
};

export default Accessories;
