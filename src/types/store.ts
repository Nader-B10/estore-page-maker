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
  aboutSection: AboutSection;
  whyChooseUs: WhyChooseUsSection;
  faq: FAQSection;
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

export interface ThemePalette {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  background: string;
  surface: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface PredefinedTheme {
  id: string;
  name: string;
  nameAr: string;
  palette: ThemePalette;
  preview: string; // CSS gradient for preview
}

export const PREDEFINED_THEMES: PredefinedTheme[] = [
  {
    id: 'blue-modern',
    name: 'Blue Modern',
    nameAr: 'الأزرق العصري',
    palette: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#f59e0b',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#f8fafc',
      surface: '#ffffff',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    preview: 'linear-gradient(135deg, #3b82f6, #1e40af)'
  },
  {
    id: 'green-nature',
    name: 'Green Nature',
    nameAr: 'الأخضر الطبيعي',
    palette: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#f59e0b',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#f0fdf4',
      surface: '#ffffff',
      border: '#d1fae5',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    preview: 'linear-gradient(135deg, #059669, #047857)'
  },
  {
    id: 'purple-luxury',
    name: 'Purple Luxury',
    nameAr: 'البنفسجي الفاخر',
    palette: {
      primary: '#7c3aed',
      secondary: '#5b21b6',
      accent: '#f59e0b',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#faf5ff',
      surface: '#ffffff',
      border: '#e9d5ff',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    preview: 'linear-gradient(135deg, #7c3aed, #5b21b6)'
  },
  {
    id: 'orange-warm',
    name: 'Orange Warm',
    nameAr: 'البرتقالي الدافئ',
    palette: {
      primary: '#ea580c',
      secondary: '#c2410c',
      accent: '#fbbf24',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#fff7ed',
      surface: '#ffffff',
      border: '#fed7aa',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    preview: 'linear-gradient(135deg, #ea580c, #c2410c)'
  },
  {
    id: 'pink-elegant',
    name: 'Pink Elegant',
    nameAr: 'الوردي الأنيق',
    palette: {
      primary: '#ec4899',
      secondary: '#be185d',
      accent: '#f59e0b',
      text: '#1f2937',
      textSecondary: '#6b7280',
      background: '#fdf2f8',
      surface: '#ffffff',
      border: '#fce7f3',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    preview: 'linear-gradient(135deg, #ec4899, #be185d)'
  },
  {
    id: 'dark-professional',
    name: 'Dark Professional',
    nameAr: 'الداكن المهني',
    palette: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      accent: '#fbbf24',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      background: '#111827',
      surface: '#1f2937',
      border: '#374151',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    preview: 'linear-gradient(135deg, #111827, #1f2937)'
  }
];

export const getThemeById = (themeId: string): PredefinedTheme => {
  return PREDEFINED_THEMES.find(theme => theme.id === themeId) || PREDEFINED_THEMES[0];
};