import { useMemo } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Pagination from '../Pagination/Pagination';
import { usePagination } from '@/hooks/usePagination';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import type { ProductGridProps } from '@/types';

const ProductGrid = ({
  products,
  onAddToCart,
  itemsPerPage = 4,
  mode = 'pagination',
  draggable = false,
}: ProductGridProps) => {
  // Drag & drop
  const drag = useDragAndDrop(products);
  const allProducts = draggable ? drag.products : products;

  const isPagination = mode === 'pagination' && allProducts.length > itemsPerPage;
  const isInfinite = mode === 'infinite' && allProducts.length > itemsPerPage;

  // Pagination
  const { page, skip, limit, totalPages, hasNext, hasPrev, goToPage, nextPage, prevPage } =
    usePagination({ totalItems: allProducts.length, limit: isPagination ? itemsPerPage : allProducts.length });

  // Infinite scroll
  const { visibleCount, hasMore, isLoading } =
    useInfiniteScroll({ totalItems: allProducts.length, batchSize: itemsPerPage });

  // Visible products based on mode
  const visibleProducts = useMemo(() => {
    if (isPagination) return allProducts.slice(skip, skip + limit);
    if (isInfinite) return allProducts.slice(0, visibleCount);
    return allProducts;
  }, [allProducts, isPagination, isInfinite, skip, limit, visibleCount]);

  return (
    <div>
     
      {draggable && (
        <p className="text-xs text-gray-400 mb-4 text-center">
          ↕ Drag and drop products to reorder
        </p>
      )}

     
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {visibleProducts.map((product, index : number) => {
          // Calculate actual index in the full array for drag & drop
          const actualIndex = isPagination ? skip + index : index;

          return (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              // Only pass drag props when draggable is enabled
              {...(draggable && {
                isDragging: drag.dragIndex === actualIndex,
                isDragOver: drag.overIndex === actualIndex,
                onDragStart: () => drag.handleDragStart(actualIndex),
                onDragOver: (e: React.DragEvent) => drag.handleDragOver(e, actualIndex),
                onDrop: () => drag.handleDrop(actualIndex),
                onDragEnd: drag.handleDragEnd,
              })}
            />
          );
        })}
      </div>

      {/* Empty state */}
      {visibleProducts.length === 0 && (
        <p className="text-center text-gray-500 py-12 text-lg">No products found.</p>
      )}

      {/* Pagination controls */}
      {isPagination && (
        <Pagination
          page={page}
          totalPages={totalPages}
          hasNext={hasNext}
          hasPrev={hasPrev}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          summary={`Showing ${skip + 1}–${Math.min(skip + limit, allProducts.length)} of ${allProducts.length} products`}
        />
      )}

      {/* Infinite scroll status */}
      {isInfinite && (
        <div className="text-center mt-10">
          {isLoading && <p className="text-sm text-gray-500 animate-pulse">Loading more products…</p>}
          {!hasMore && <p className="text-xs text-gray-400">All {allProducts.length} products loaded</p>}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
