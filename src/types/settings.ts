import { LinkItem } from './common';

export interface StoreSettings {
  storeName: string;
  description: string;
  logo: string;
  favicon: string;
  themeId: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  layout: 'grid' | 'list' | 'masonry';
  headerTemplate: string;
  heroTemplate: string;
  footerTemplate: string;
  aboutTemplate: string;
  featuresTemplate: string;
  faqTemplate: string;
  footerText: string;
  headerLinks: LinkItem[];
  footerLinks: LinkItem[];
  sectionsOrder: string[];
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
  productDetailSettings: ProductDetailSettings;
  aboutSection: AboutSection;
  whyChooseUs: WhyChooseUsSection;
  faq: FAQSection;
}

export interface ProductDetailSettings {
  showRating: boolean;
  showReviewsCount: boolean;
  showOriginalPrice: boolean;
  showSavingsAmount: boolean;
  showProductTags: boolean;
  showProductFeatures: boolean;
  showRelatedProducts: boolean;
  showShareButton: boolean;
  showFavoriteButton: boolean;
  showProductBadges: boolean;
  showProductCategory: boolean;
  showDiscountBadge: boolean;
  relatedProductsLimit: number;
  enableImageZoom: boolean;
  showProductDescription: boolean;
}

export interface HeroSection {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
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

export interface AboutSection {
  enabled: boolean;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  stats: AboutStat[];
  team: TeamMember[];
}

export interface AboutStat {
  id: string;
  number: string;
  label: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
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