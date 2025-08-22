export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  discountPercentage?: number;
  tags: string[];
}