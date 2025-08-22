export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  isVisible: boolean;
  order: number;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategorySettings {
  showCategoryImages: boolean;
  showCategoryDescription: boolean;
  showProductCount: boolean;
  categoriesPerRow: number;
  enableCategoryFilter: boolean;
}