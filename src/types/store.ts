export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // السعر الأصلي قبل الخصم
  image: string;
  category: string;
  isFeatured: boolean; // منتج مميز
  isBestSeller: boolean; // الأعلى مبيعاً
  isOnSale: boolean; // عليه عرض/تخفيض
  discountPercentage?: number; // نسبة الخصم
  tags: string[]; // علامات إضافية
}

export interface HeroSection {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export interface WhyChooseUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSection {
  enabled: boolean;
  title: string;
  subtitle: string;
  items: WhyChooseUsItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSection {
  enabled: boolean;
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface ProductSection {
  featured: {
    enabled: boolean;
    title: string;
    subtitle: string;
    limit: number;
  };
  bestSellers: {
    enabled: boolean;
    title: string;
    subtitle: string;
    limit: number;
  };
  onSale: {
    enabled: boolean;
    title: string;
    subtitle: string;
    limit: number;
  };
}

export interface StoreSettings {
  storeName: string;
  description: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  layout: 'grid' | 'list' | 'masonry';
  headerTemplate: string;
  footerTemplate: string;
  footerText: string;
  headerLinks: LinkItem[];
  footerLinks: LinkItem[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  whatsappSettings: {
    enabled: boolean;
    phoneNumber: string;
    messageTemplate: string;
    includeProductName: boolean;
    includeProductDescription: boolean;
    includeProductPrice: boolean;
    includeStoreInfo: boolean;
  };
  heroSection: HeroSection;
  productSections: ProductSection;
  whyChooseUs: WhyChooseUsSection;
  faq: FAQSection;
}

export interface LinkItem {
  id: string;
  text: string;
  url: string;
  type: 'internal' | 'external' | 'category' | 'page';
  isVisible: boolean;
  order: number;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface StoreData {
  settings: StoreSettings;
  products: Product[];
  customPages: CustomPage[];
}