import type { ProductCardProps } from '@/types';

const inrCurrency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const ProductCard = ({
  product,
  onAddToCart,
  isDragging = false,
  isDragOver = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: ProductCardProps) => (
  <article
    className={`flex flex-col bg-white transition-all duration-300 ease-in-out hover:-translate-y-1 rounded-lg
      ${onDragStart ? 'cursor-grab active:cursor-grabbing' : ''}
      ${isDragging ? 'opacity-40 scale-95' : ''}
      ${isDragOver ? 'ring-2 ring-black ring-offset-2 scale-[1.02]' : ''}
    `}
    draggable={!!onDragStart}
    onDragStart={onDragStart}
    onDragOver={onDragOver}
    onDrop={onDrop}
    onDragEnd={onDragEnd}
  >
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
          className="px-4 py-2 md:px-4 md:py-2 bg-black text-white text-xs md:text-xs font-black uppercase rounded transition-colors duration-200 hover:bg-gray-800 active:scale-95 cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  </article>
);

export default ProductCard;
