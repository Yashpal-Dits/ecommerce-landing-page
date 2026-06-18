import axios from 'axios';
import { NewUser, User, Product, CategoryCard, AdminAnalyticsConfig, SuperAdminAnalyticsConfig } from '@/types';

import {
  fetchAllUsersGraphql,
  fetchProductByIdGraphql,
  fetchProductsByCategoryGraphql,
  fetchProductsGraphql,
  fetchUserByEmailGraphql,
  fetchUserByIdGraphql,
  fetchUsersByRoleGraphql,
} from './graphqlApi';


const API_URL = (import.meta.env.VITE_API_URL as string | undefined) || '';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
   
    if (!error.response) {
      return 'Unable to connect to server. Please ensure json-server is running: npm run dev:all';
    }
    return error.response
      ? `Server error (${error.response.status}): ${error.response.statusText}`
      : error.message;
  }

  return error instanceof Error ? error.message : 'Unknown error';
};

// ── User APIs ──────────────────────────────────────────

export const fetchUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const { data: users } = await apiClient.get<User[]>('/users', {
      params: { email },
    });

    return users.length ? users[0] : null;
  } catch (error) {
    console.error('Fetch user error:', error);
    throw new Error(`Failed to fetch user: ${getErrorMessage(error)}`);
  }
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  try {
    const { data } = await apiClient.get<User>(`/users/${id}`);
    return data || null;
  } catch (error) {
    console.error('Fetch user by id error:', error);
    return null;
  }
};

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const { data } = await apiClient.get<User[]>('/users');
    return data;
  } catch (error) {
    console.error('Fetch all users error:', error);
    throw new Error(`Failed to fetch users: ${getErrorMessage(error)}`);
  }
};

export const createUser = async (newUser: NewUser): Promise<User> => {
  try {
    const { data: user } = await apiClient.post<User>('/users', newUser);
    return user;
  } catch (error) {
    console.error('Create user error:', error);
    throw new Error(`Failed to create user: ${getErrorMessage(error)}`);
  }
};

export const fetchUsersByRole = async (role: string): Promise<User[]> => {
  const endpoint = role === 'admin' ? 'admins' : role === 'super_admin' ? 'super_admins' : 'customers';

  try {
    const { data: users } = await apiClient.get<User[]>(`/${endpoint}`);
    return users;
  } catch (error) {
    console.error('Fetch users by role error:', error);
    throw new Error(`Failed to fetch users by role: ${getErrorMessage(error)}`);
  }
};

export const updateUser = async (user: User): Promise<User> => {
  try {
    const { data: updatedUser } = await apiClient.patch<User>(`/users/${user.id}`, user);
    return updatedUser;
  } catch (error) {
    console.error('Update user error:', error);
    throw new Error(`Failed to update user: ${getErrorMessage(error)}`);
  }
};


//----- user graphql api-------

// export const fetchUserByEmail = async (
//   email: string
// ): Promise<User | null> => {
//   try {
//     return await fetchUserByEmailGraphql(email);
//   } catch (error) {
//     console.error('GraphQL fetch user by email error:', error);
//     throw new Error(
//       `Failed to fetch user: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`
//     );
//   }
// };

// export const fetchUserById = async (id: string): Promise<User | null> => {
//   try {
//     return await fetchUserByIdGraphql(id);
//   } catch (error) {
//     console.error('GraphQL fetch user by id error:', error);
//     return null;
//   }
// };

// export const fetchAllUsers = async (): Promise<User[]> => {
//   try {
//     return await fetchAllUsersGraphql();
//   } catch (error) {
//     console.error('GraphQL fetch all users error:', error);
//     throw new Error(
//       `Failed to fetch users: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`
//     );
//   }
// };

// export const fetchUsersByRole = async (role: string): Promise<User[]> => {
//   try {
//     return await fetchUsersByRoleGraphql(role);
//   } catch (error) {
//     console.error('GraphQL fetch users by role error:', error);
//     throw new Error(
//       `Failed to fetch users by role: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`
//     );
//   }
// };
// ── Product APIs ───────────────────────────────────────

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await apiClient.get<Product[]>('/products');
    return data;
  } catch (error) {
    console.error('Fetch products error:', error);
    throw new Error(`Failed to fetch products: ${getErrorMessage(error)}`);
  }
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const { data } = await apiClient.get<Product[]>('/products', {
      params: { category },
    });
    return data;
  } catch (error) {
    console.error(`Fetch products by category (${category}) error:`, error);
    throw new Error(`Failed to fetch products by category: ${getErrorMessage(error)}`);
  }
};

export const fetchProductById = async (id: number): Promise<Product | undefined> => {
  try {
    const { data } = await apiClient.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    console.error(`Fetch product by id (${id}) error:`, error);
    throw new Error(`Failed to fetch product: ${getErrorMessage(error)}`);
  }
};
  
// --------- product graphQL api----------

// export const fetchProducts = async (): Promise<Product[]> => {
//   try {
//     return await fetchProductsGraphql();
//   } catch (error) {
//     console.error('GraphQL fetch products error:', error);
//     throw new Error(
//       `Failed to fetch products: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`
//     );
//   }
// };

// export const fetchProductsByCategory = async (
//   category: string
// ): Promise<Product[]> => {
//   try {
//     return await fetchProductsByCategoryGraphql(category);
//   } catch (error) {
//     console.error(
//       `GraphQL fetch products by category (${category}) error:`,
//       error
//     );
//     throw new Error(
//       `Failed to fetch products by category: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`
//     );
//   }
// };

// export const fetchProductById = async (
//   id: number
// ): Promise<Product | undefined> => {
//   try {
//     return await fetchProductByIdGraphql(id);
//   } catch (error) {
//     console.error(`GraphQL fetch product by id (${id}) error:`, error);
//     throw new Error(
//       `Failed to fetch product: ${
//         error instanceof Error ? error.message : 'Unknown error'
//       }`
//     );
//   }
// };

// ── Category APIs ──────────────────────────────────────




export const fetchCategories = async (): Promise<CategoryCard[]> => {
  try {
    const { data } = await apiClient.get<CategoryCard[]>('/categories');
    return data;
  } catch (error) {
    console.error('Fetch categories error:', error);
    throw new Error(`Failed to fetch categories: ${getErrorMessage(error)}`);
  }
};

// ── Analytics Config APIs ─────────────────────────

export const fetchAdminAnalytics = async (): Promise<AdminAnalyticsConfig> => {
  try {
    const { data } = await apiClient.get<AdminAnalyticsConfig>('/adminAnalytics');
    return data;
  } catch (error) {
    console.error('Fetch admin analytics error:', error);
    throw new Error(`Failed to fetch admin analytics: ${getErrorMessage(error)}`);
  }
};

export const fetchSuperAdminAnalytics = async (): Promise<SuperAdminAnalyticsConfig> => {
  try {
    const { data } = await apiClient.get<SuperAdminAnalyticsConfig>('/superAdminAnalytics');
    return data;
  } catch (error) {
    console.error('Fetch super admin analytics error:', error);
    throw new Error(`Failed to fetch super admin analytics: ${getErrorMessage(error)}`);
  }
};
