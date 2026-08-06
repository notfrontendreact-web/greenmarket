export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  iconName?: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  itemCount: number;
  bgGradient: string;
  subCategories: SubCategory[];
  featuredProduct?: {
    id: string;
    title: string;
    image: string;
    discount: number;
    price: number;
  };
}

export interface NutritionInfo {
  calories: string; // e.g., "52 کیلوکالری"
  fat: string; // e.g., "0.2 گرم"
  protein: string; // e.g., "0.3 گرم"
  carbs: string; // e.g., "14 گرم"
  fiber: string; // e.g., "2.4 گرم"
}

export interface Product {
  id: string;
  title: string;
  englishTitle: string;
  slug: string;
  category: string;
  categorySlug: string;
  subCategory: string;
  subCategorySlug: string;
  price: number; // Toman
  originalPrice: number; // Toman
  discount: number; // percentage (0-100)
  unit: string; // e.g., "کیلوگرم", "بسته 4 عددی", "بطری 1 لیتری"
  weight: string;
  rating: number; // 1-5
  reviewsCount: number;
  stock: number;
  image: string;
  gallery: string[];
  isOrganic: boolean;
  isSpecialOffer: boolean;
  isBestSeller: boolean;
  isFresh: boolean;
  sku: string;
  brand: string;
  description: string;
  tags: string[];
  nutrition?: NutritionInfo;
  storageCondition?: string; // e.g., "در یخچال نگه داری شود (۲ الی ۵ درجه)"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  discountTag: string;
  bgGradient: string;
  image: string;
  buttonText: string;
  linkCategory: string;
  timerMinutes?: number;
}

export interface Brand {
  id: string;
  name: string;
  englishName: string;
  logo: string;
  productCount: number;
}

export interface FilterState {
  category: string; // 'all' or category slug
  subCategory: string; // 'all' or subcategory slug
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  organicOnly: boolean;
  specialOfferOnly: boolean;
  inStockOnly: boolean;
  brand: string;
  sortBy: 'popular' | 'cheapest' | 'expensive' | 'newest' | 'discount';
  densityPerPage: number; // 12, 24, 48
  currentPage: number;
}

export interface SeoMetaData {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  keywords: string[];
  h1Text: string;
  schemaType: string;
  schemaJson: string;
}
