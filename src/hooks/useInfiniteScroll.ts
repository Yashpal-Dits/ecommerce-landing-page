import { useState, useEffect, useCallback } from 'react';
import type { UseInfiniteScrollOptions, UseInfiniteScrollReturn } from '@/types';

export function useInfiniteScroll({
  totalItems,
  batchSize = 4,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const [visibleCount, setVisibleCount] = useState(Math.min(batchSize, totalItems));
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = visibleCount < totalItems;

  useEffect(() => {
    setVisibleCount(Math.min(batchSize, totalItems));
  }, [totalItems, batchSize]);

  // Load next batch
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + batchSize, totalItems));
      setIsLoading(false);
    }, 400);
  }, [isLoading, hasMore, batchSize, totalItems]);

  useEffect(() => {
    const checkAndLoad = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom) loadMore();
    };

    // Check on scroll
    window.addEventListener('scroll', checkAndLoad);
    const timer = setTimeout(checkAndLoad, 100);

    return () => {
      window.removeEventListener('scroll', checkAndLoad);
      clearTimeout(timer);
    };
  }, [loadMore]);

  return { visibleCount, hasMore, isLoading };
}
