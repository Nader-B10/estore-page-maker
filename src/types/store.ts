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

export interface HeroSectionData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export interface ProductSectionData {
  title: string;
  subtitle: string;
  limit: number;
}

export interface WhyChooseUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSectionData {
  title: string;
  subtitle: string;
  items: WhyChooseUsItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionData {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface SectionConfig<T> {
  template: string;
  enabled: boolean;
  data: T;
}

export interface StoreSettings {
  theme: string;
  storeName: string;
  description: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  layout: 'grid' | 'list' | 'masonry';
  headerStyle: 'classic' | 'modern' | 'minimal';
  footerText: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  sections: {
    hero: SectionConfig<HeroSectionData>;
    featuredProducts: SectionConfig<ProductSectionData>;
    bestSellers: SectionConfig<ProductSectionData>;
    onSale: SectionConfig<ProductSectionData>;
    allProducts: SectionConfig<Omit<ProductSectionData, 'limit'>>;
    whyChooseUs: SectionConfig<WhyChooseUsSectionData>;
    faq: SectionConfig<FAQSectionData>;
  };
}

export interface StoreData {
  settings: StoreSettings;
  products: Product[];
}
