// ── Enums ─────────────────────────────────────────

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

// ── Product ───────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface CategoryCard {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
}

// ── Analytics ─────────────────────────────────────

export type AnalyticsColor = 'green' | 'blue' | 'purple' | 'amber' | 'pink';

export type AnalyticsIconName =
  | 'users'
  | 'package'
  | 'dollar'
  | 'shoppingBag'
  | 'shield'
  | 'check'
  | 'activity';

export interface AnalyticsSummaryCard {
  id: string;
  label: string;
  metric: string;
  icon: AnalyticsIconName;
  color: AnalyticsColor;
  change?: string;
  changeMetric?: string;
}

export interface AdminAnalyticsCategoryConfig {
  name: string;
  color: AnalyticsColor;
}

export interface AdminAnalyticsUserBreakdownConfig {
  id: string;
  label: string;
  metric: string;
  color: AnalyticsColor;
}

export interface AdminAnalyticsConfig {
  summaryCards: AnalyticsSummaryCard[];
  productCategories: AdminAnalyticsCategoryConfig[];
  userBreakdown: AdminAnalyticsUserBreakdownConfig[];
  recentProductsLimit: number;
}

export interface SuperAdminRoleBreakdownConfig {
  id: string;
  label: string;
  role: UserRole;
  color: AnalyticsColor;
}

export interface SuperAdminActivityItem {
  id: string;
  action: string;
  user: string;
  time: string;
  icon: AnalyticsIconName;
}

export interface SuperAdminAnalyticsConfig {
  summaryCards: AnalyticsSummaryCard[];
  roleBreakdown: SuperAdminRoleBreakdownConfig[];
  recentActivity: SuperAdminActivityItem[];
}

// ── User ──────────────────────────────────────────

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

// ── Toast ─────────────────────────────────────────

export interface ToastItem {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

// ── Pagination ────────────────────────────────────

export interface UsePaginationOptions {
  totalItems: number;
  limit?: number;
  initialPage?: number;
}

//-----------authContext Value--------

 export interface AppState {
  currentUser: User | null;
  impersonatedAdmin: User | null;

  cartCount: number;
  cartItems: any[]; 

  
  toasts: ToastItem[];

  setCurrentUser: (user: User | null) => void;
  setImpersonatedAdmin: (admin: User | null) => void;

  
  addToCart: (product?: any) => void;
  clearCart: () => void;

  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: number) => void;

  logout: () => void;
  isLoggedIn: () => boolean;
  getEffectiveRole: () => string;
}

export interface UsePaginationReturn {
  page: number;
  limit: number;
  skip: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  summary?: string;
}

//--------------Infinite Scroll ----------------

export interface UseInfiniteScrollOptions {
  totalItems: number;
  batchSize?: number;
}

export interface UseInfiniteScrollReturn {
  visibleCount: number;
  hasMore: boolean;
  isLoading: boolean;
}

//-------------- Drag & Drop -----------------

export interface DragAndDropReturn {
  products: Product[];
  dragIndex: number | null;
  overIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
  handleDrop: (index: number) => void;
  handleDragEnd: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

// --------------- ProductCard-------------------

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isDragging?: boolean;
  isDragOver?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  onDragEnd?: () => void;
}

//------------ProductGrid-----------------------

export interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  itemsPerPage?: number;
  mode?: 'pagination' | 'infinite';
  draggable?: boolean;
}


//--------------FILE UPLAOD INTERFACE--------

export interface FileUploadProps {
  onFileSelect: (base64Url: string) => void;
  maxSizeMB?: number;
  allowedTypes?: string[];
  initialPreviewUrl?: string;
  className?: string;
}

