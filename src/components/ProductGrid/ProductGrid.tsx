import ProductCard from "../ProductCard/ProductCard";
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
      {products && products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
