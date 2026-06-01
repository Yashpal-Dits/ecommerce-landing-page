import { useState, useCallback, useEffect } from 'react';
import type { UsePaginationOptions, UsePaginationReturn } from '@/types';


export function usePagination({
  totalItems,
  limit = 8,
  initialPage = 1,
}: UsePaginationOptions): UsePaginationReturn {
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const [page, setPage] = useState(() => Math.min(Math.max(1, initialPage), totalPages));

 
  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const goToPage = useCallback(
    (p: number) => setPage(Math.min(Math.max(1, p), totalPages)),
    [totalPages],
  );
  const nextPage = useCallback(() => goToPage(page + 1), [page, goToPage]);
  const prevPage = useCallback(() => goToPage(page - 1), [page, goToPage]);

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    goToPage,
    nextPage,
    prevPage,
  };
}
