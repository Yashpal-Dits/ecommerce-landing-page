import { Link } from 'react-router-dom';
import { useCategories } from '../queries/useProducts';
import { Skeleton } from '@/components/ui/skeleton';

const CategoriesHome = () => {
  const { data: categoryCards = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div>
        <div className="mb-8">
          <Skeleton className="h-10 w-72 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="w-full aspect-square rounded-sm mb-4" />
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-4 w-56 mb-3" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Failed to load categories. Please try again later.</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-black mb-2">
          Browse All Categories
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Click on any category to explore products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryCards.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="group relative overflow-hidden bg-white transition-transform duration-300 ease-in-out hover:-translate-y-1"
          >
            <div className="w-full aspect-square overflow-hidden bg-gray-100 rounded-sm mb-4">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg md:text-xl font-black text-black leading-snug">
                {category.name}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">
                {category.description}
              </p>

              <div className="mt-3 text-black font-black text-sm uppercase group-hover:gap-2 transition-all">
                Explore Collection
                <svg className="w-4 h-4 inline ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesHome;