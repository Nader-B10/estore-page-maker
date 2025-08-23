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
  autoplay?: boolean; // Option for carousel template
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
  sideImage?: string; // Option for sideBySide template
}

export interface FAQItem {
  id:string;
  question: string;
  answer: string;
}

export interface FAQSectionData {
  title: string;
  subtitle: string;
  items: FAQItem[];
}

export interface FooterSectionData {
  text: string;
}

export interface SectionConfig<T> {
  template: string;
  enabled: boolean;
  data: T;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  sections: (keyof StoreSettings['sections'])[];
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
  layout: 'grid' | 'list';
  headerStyle: 'classic' | 'modern' | 'minimal';
  pages: Page[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    socials?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    }
  };
  sections: {
    hero: SectionConfig<HeroSectionData>;
    featuredProducts: SectionConfig<ProductSectionData>;
    bestSellers: SectionConfig<ProductSectionData>;
    onSale: SectionConfig<ProductSectionData>;
    homeAllProducts: SectionConfig<ProductSectionData>; // New section for homepage
    allProducts: SectionConfig<Omit<ProductSectionData, 'limit' | 'autoplay'>>;
    whyChooseUs: SectionConfig<WhyChooseUsSectionData>;
    faq: SectionConfig<FAQSectionData>;
    footer: SectionConfig<FooterSectionData>;
  };
}

export interface StoreData {
  settings: StoreSettings;
  products: Product[];
}
