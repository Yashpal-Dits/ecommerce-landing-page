import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationProps } from '@/types';

const Pagination = ({
  page,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange,
  onNext,
  onPrev,
  summary,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Build simple page number array: [1, 2, 3, …, totalPages]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex flex-col items-center gap-3 mt-10">
      {/* Summary */}
      {summary && (
        <p className="text-sm text-gray-500 font-medium">{summary}</p>
      )}

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Previous page"
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page numbers */}
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
            aria-label={`Page ${p}`}
            className={`
              min-w-[36px] h-9 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer
              ${
                p === page
                  ? 'bg-black text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-black'
              }
            `}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next page"
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Page X of Y */}
      <p className="text-xs text-gray-400">
        Page {page} of {totalPages}
      </p>
    </nav>
  );
};

export default Pagination;
