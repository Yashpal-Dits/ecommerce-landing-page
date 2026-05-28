import ProductCard from '../components/ProductCard/ProductCard';

export default function Outerwear({ products, onAddToCart }) {
  const outerwearProducts = [
    {
      id: 301,
      name: "Urban Denim Jacket",
      category: "Outerwear",
      price: 3599,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 302,
      name: "Retro Varsity Jacket",
      category: "Outerwear",
      price: 4299,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 303,
      name: "Puffer Jacket Black",
      category: "Outerwear",
      price: 5499,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 304,
      name: "Leather Biker Jacket",
      category: "Outerwear",
      price: 6999,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 305,
      name: "Wool Overcoat Beige",
      category: "Outerwear",
      price: 7999,
      image: "https://images.unsplash.com/photo-1539533057440-7814a3d883de?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 306,
      name: "Bomber Jacket Navy",
      category: "Outerwear",
      price: 3299,
      image: "https://images.unsplash.com/photo-1611312503408-0573e4275235?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-black mb-2">
          Outerwear Collection
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Stay warm and stylish with our jacket collection
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {outerwearProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}