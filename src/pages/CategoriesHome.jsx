import { Link } from 'react-router-dom';

export default function CategoriesHome() {
  const categoryCards = [
    {
      id: 'sneakers',
      name: 'Sneakers',
      description: 'Latest drops and classic kicks',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      path: '/categories/sneakers',
    },
    {
      id: 'denim',
      name: 'Denim',
      description: 'Premium jeans and denim jackets',
      image: 'https://unsplash.com/photos/a-pile-of-jeans-laying-on-top-of-each-other-XdXk39Bj3B0',
      path: '/categories/denim',
    },
    {
      id: 'streetwear',
      name: 'Streetwear',
      description: 'Urban fashion essentials',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
      path: '/categories/streetwear',
    },
    {
      id: 'accessories',
      name: 'Accessories',
      description: 'Complete your look',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=80',
      path: '/categories/accessories',
    },
    {
      id: 'outerwear',
      name: 'Outerwear',
      description: 'Jackets and coats for all seasons',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
      path: '/categories/outerwear',
    },
  ];

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
}