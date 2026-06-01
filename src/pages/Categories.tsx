import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Categories() {
  const location = useLocation();

  const categories = [
    { id: 'sneakers', name: 'Sneakers', path: '/categories/sneakers' },
    { id: 'denim', name: 'Denim', path: '/categories/denim' },
    { id: 'streetwear', name: 'Streetwear', path: '/categories/streetwear' },
    { id: 'accessories', name: 'Accessories', path: '/categories/accessories' },
    { id: 'outerwear', name: 'Outerwear', path: '/categories/outerwear' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white pb-8">
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-gray-200 mb-6">
          <Link
            to="/categories"
            className={`px-4 md:px-6 py-2.5 text-sm md:text-base font-black whitespace-nowrap transition-all duration-200 ${
              location.pathname === '/categories'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className={`px-4 md:px-6 py-2.5 text-sm md:text-base font-black whitespace-nowrap transition-all duration-200 ${
                isActive(category.path)
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}