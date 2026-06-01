export enum UserRole {
  Customer = 'customer',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
}

export enum SortOption {
  PriceLowToHigh = 'price_asc',
  PriceHighToLow = 'price_desc',
  NameAZ = 'name_asc',
  NameZA = 'name_desc',
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  role: UserRole;
  image: string;
  tokenVerified?: boolean;
}

export interface NewUser extends Omit<User, 'id' | 'tokenVerified'> {}

export interface ToastItem {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}
