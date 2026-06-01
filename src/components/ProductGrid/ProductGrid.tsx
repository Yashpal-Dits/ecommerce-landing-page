import { useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../Pagination/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import type { ProductGridProps } from '@/types';

const ProductGrid = ({
  products,
  onAddToCart,
  itemsPerPage = 4,
  mode = 'pagination',
}: ProductGridProps) => {
  const isPagination = mode === 'pagination' && products.length > itemsPerPage;
  const isInfinite = mode === 'infinite' && products.length > itemsPerPage;

  // Pagination
  const { page, skip, limit, totalPages, hasNext, hasPrev, goToPage, nextPage, prevPage } =
    usePagination({ totalItems: products.length, limit: isPagination ? itemsPerPage : products.length });

  // Infinite scroll
  const { visibleCount, hasMore, isLoading } =
    useInfiniteScroll({ totalItems: products.length, batchSize: itemsPerPage });

  // Visible products based on mode
  const visibleProducts = useMemo(() => {
    if (isPagination) return products.slice(skip, skip + limit);
    if (isInfinite) return products.slice(0, visibleCount);
    return products;
  }, [products, isPagination, isInfinite, skip, limit, visibleCount]);

  return (
    <div>
     
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

  
      {visibleProducts.length === 0 && (
        <p className="text-center text-gray-500 py-12 text-lg">No products found.</p>
      )}

      
      {isPagination && (
        <Pagination
          page={page}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          summary={`Showing ${skip + 1}–${Math.min(skip + limit, products.length)} of ${products.length} products`}
        />
      )}

      {/* Infinite scroll status */}
      {isInfinite && (
        <div className="text-center mt-10">
          {isLoading && <p className="text-sm text-gray-500 animate-pulse">Loading more products…</p>}
          {!hasMore && <p className="text-xs text-gray-400">All {products.length} products loaded</p>}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
