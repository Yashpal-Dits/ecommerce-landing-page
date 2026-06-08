import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types';


const fetchProducts = async (): Promise<Product[]> => {
  
  const { products } = await import('@/constants/products');
  return products;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 10, 
  });
};
