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

export interface HeaderLink {
  id: string;
  text: string;
  link: string;
}

export interface SocialLink {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube';
  url: string;
}

export interface FooterData {
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  linksTitle: string;
  contactTitle: string;
  socialLinks: SocialLink[];
  copyrightText: string;
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
  enabled: boolean;
  data: T;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface StoreSettings {
  theme: string;
  currentTemplate: string;
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
  contactInfo: ContactInfo;
  sectionOrder: string[];
  sections: {
    header: SectionConfig<{ links: HeaderLink[] }>;
    footer: SectionConfig<FooterData>;
    hero: SectionConfig<HeroSectionData>;
    featuredProducts: SectionConfig<ProductSectionData>;
    bestSellers: SectionConfig<ProductSectionData>;
    onSale: SectionConfig<ProductSectionData>;
    allProducts: SectionConfig<Omit<ProductSectionData, 'limit'>>;
    whyChooseUs: SectionConfig<WhyChooseUsSectionData>;
    faq: SectionConfig<FAQSectionData>;
  };
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  isDefault: boolean;
  showAllProducts: boolean;
  metaDescription?: string;
  pageType: 'products' | 'content';
}

export interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  messageTemplate: string;
  buttonText: string;
}

export interface StoreData {
  settings: StoreSettings;
  products: Product[];
  pages: CustomPage[];
  whatsappSettings: WhatsAppSettings;
}