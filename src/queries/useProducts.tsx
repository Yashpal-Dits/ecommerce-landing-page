import { useQuery } from '@tanstack/react-query';
import { Product, CategoryCard, User } from '@/types';
import { fetchProducts, fetchProductsByCategory, fetchCategories, fetchUserById, fetchAllUsers } from '@/api';

// ── Product Hooks ─────────────────────

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductsByCategory = (category: string) => {
  return useQuery<Product[]>({
    queryKey: ['products', category],
    queryFn: () => fetchProductsByCategory(category),
    staleTime: 1000 * 60 * 5,
    enabled: !!category,
  });
};

// ── Category Hooks ─────────────────────

export const useCategories = () => {
  return useQuery<CategoryCard[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });
};

// ── User Hooks ────────────────────────

export const useUser = (userId: string | null | undefined) => {
  return useQuery<User | null>({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId!),
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
};

export const useAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchAllUsers,
    staleTime: 1000 * 60 * 2,
  });
};
