import { Link } from 'react-router-dom';

const categories = [
  { name: 'Streetwear', path: '/categories/streetwear' },
  { name: 'Sneakers', path: '/categories/sneakers' },
  { name: 'Denim', path: '/categories/denim' },
  { name: 'Outerwear', path: '/categories/outerwear' },
  { name: 'Accessories', path: '/categories/accessories' },
];

export default function Categories() {
  return (
    <section className="py-14 md:py-16 lg:py-20" id="categories">
      <div className="w-11/12 max-w-5xl mx-auto">
        <p className="uppercase font-bold text-xs md:text-sm text-red-500 tracking-widest mb-3 md:mb-4">
          Style Focus
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 md:mb-10 lg:mb-12">
          Discover your fashion lane
        </h2>

        <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4" role="list">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              role="listitem"
              className="inline-block px-4 sm:px-6 md:px-7 py-2 sm:py-3 bg-gray-100 text-black text-xs sm:text-sm md:text-base font-medium rounded-full transition-all duration-200 ease-out hover:bg-black hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
