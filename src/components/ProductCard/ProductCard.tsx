import { Product } from '@/types';

const inrCurrency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => (
  <article className="flex flex-col bg-white transition-transform duration-300 ease-in-out hover:-translate-y-1">
    <div className="w-full aspect-video sm:aspect-square md:aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
        loading="lazy"
      />
    </div>

    <div className="flex flex-col gap-1">
      <p className="text-xs md:text-xs uppercase text-gray-500 font-semibold tracking-wide">
        {product.category}
      </p>

      <h3 className="text-sm md:text-base font-black text-black leading-snug">
        {product.name}
      </h3>

      <div className="flex justify-between items-center mt-2.5">
        <p className="text-sm md:text-base font-black text-black">
          {inrCurrency.format(product.price)}
        </p>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="px-4 py-2 md:px-4 md:py-2 bg-black text-white text-xs md:text-xs font-black uppercase rounded transition-colors duration-200 hover:bg-gray-800 active:scale-95"
        >
          Add
        </button>
      </div>
    </div>
  </article>
);

export default ProductCard;
