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

export interface HeroSection {
  enabled: boolean;
  title: string;
  subtitle: string;
  backgroundImage: string;
  backgroundType: 'image' | 'gradient' | 'video' | 'pattern';
  backgroundVideo?: string;
  ctaText: string;
  ctaLink: string;
  ctaStyle: 'primary' | 'secondary' | 'outline' | 'ghost';
  textAlignment: 'left' | 'center' | 'right';
  overlayOpacity: number;
  height: 'small' | 'medium' | 'large' | 'fullscreen' | 'custom';
  customHeight?: number;
  animation: 'none' | 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'zoom';
  parallax: boolean;
  showScrollIndicator: boolean;
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
  layout: 'grid' | 'horizontal' | 'vertical' | 'carousel';
  columns: number;
  backgroundColor: string;
  textColor: string;
  showBackground: boolean;
  backgroundPattern: 'none' | 'dots' | 'lines' | 'waves';
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
  style: 'accordion' | 'tabs' | 'cards' | 'list';
  backgroundColor: string;
  maxWidth: 'small' | 'medium' | 'large' | 'full';
}

export interface ProductSection {
  featured: {
    enabled: boolean;
    title: string;
    subtitle: string;
    limit: number;
    layout: 'grid' | 'carousel' | 'masonry';
    showViewAll: boolean;
  };
  bestSellers: {
    enabled: boolean;
    title: string;
    subtitle: string;
    limit: number;
    layout: 'grid' | 'carousel' | 'masonry';
    showViewAll: boolean;
  };
  onSale: {
    enabled: boolean;
    title: string;
    subtitle: string;
    limit: number;
    layout: 'grid' | 'carousel' | 'masonry';
    showViewAll: boolean;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  type: 'link' | 'page' | 'category' | 'dropdown' | 'megamenu';
  url?: string;
  pageId?: string;
  categoryId?: string;
  children?: NavigationItem[];
  isVisible: boolean;
  order: number;
  icon?: string;
  badge?: string;
  target?: '_self' | '_blank';
}

export interface HeaderSettings {
  style: 'minimal' | 'classic' | 'modern' | 'elegant' | 'bold' | 'creative' | 'ecommerce' | 'corporate' | 'fashion' | 'tech';
  layout: 'horizontal' | 'centered' | 'split' | 'stacked' | 'sidebar';
  position: 'static' | 'sticky' | 'fixed' | 'transparent';
  backgroundColor: string;
  textColor: string;
  logoPosition: 'left' | 'center' | 'right';
  logoSize: 'small' | 'medium' | 'large' | 'custom';
  customLogoSize?: number;
  showSearch: boolean;
  searchStyle: 'simple' | 'expanded' | 'overlay';
  showLanguage: boolean;
  showCurrency: boolean;
  showAccount: boolean;
  showWishlist: boolean;
  navigation: NavigationItem[];
  mobileMenuStyle: 'slide' | 'overlay' | 'push' | 'dropdown';
  showBreadcrumbs: boolean;
  topBar: {
    enabled: boolean;
    text: string;
    backgroundColor: string;
    textColor: string;
    showSocial: boolean;
    showContact: boolean;
  };
  announcement: {
    enabled: boolean;
    text: string;
    backgroundColor: string;
    textColor: string;
    dismissible: boolean;
    animation: 'none' | 'slide' | 'fade' | 'bounce';
    position: 'top' | 'bottom';
  };
  shadow: 'none' | 'small' | 'medium' | 'large';
  borderBottom: boolean;
}

export interface FooterSettings {
  style: 'minimal' | 'classic' | 'modern' | 'detailed' | 'corporate' | 'creative';
  backgroundColor: string;
  textColor: string;
  columns: FooterColumn[];
  bottomText: string;
  showSocialMedia: boolean;
  socialMedia: SocialMediaLink[];
  showNewsletter: boolean;
  newsletterTitle: string;
  newsletterDescription: string;
  showPaymentMethods: boolean;
  paymentMethods: string[];
  showBackToTop: boolean;
  showCopyright: boolean;
  copyrightText: string;
  layout: 'columns' | 'centered' | 'split';
  maxWidth: 'small' | 'medium' | 'large' | 'full';
}

export interface FooterColumn {
  id: string;
  title: string;
  type: 'links' | 'contact' | 'text' | 'custom' | 'newsletter' | 'social';
  items: FooterItem[];
  isVisible: boolean;
  order: number;
  width: 'auto' | 'small' | 'medium' | 'large';
}

export interface FooterItem {
  id: string;
  label: string;
  type: 'link' | 'page' | 'email' | 'phone' | 'address' | 'text' | 'social';
  value: string;
  pageId?: string;
  icon?: string;
  target?: '_self' | '_blank';
}

export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  color?: string;
}

export interface WhatsAppSettings {
  enabled: boolean;
  phoneNumber: string;
  countryCode: string;
  includeProductName: boolean;
  includeProductDescription: boolean;
  includeProductPrice: boolean;
  includeProductImage: boolean;
  includeStoreInfo: boolean;
  customMessage: string;
  buttonText: string;
  buttonStyle: 'primary' | 'secondary' | 'success' | 'whatsapp' | 'outline';
  buttonSize: 'small' | 'medium' | 'large';
  position: 'product' | 'floating' | 'both';
  floatingPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnMobile: boolean;
  showOnDesktop: boolean;
  animation: 'none' | 'pulse' | 'bounce' | 'shake';
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  metaKeywords: string;
  isPublished: boolean;
  showInNavigation: boolean;
  showInFooter: boolean;
  template: 'default' | 'full-width' | 'sidebar' | 'landing' | 'contact';
  createdAt: string;
  updatedAt: string;
  featuredImage?: string;
  excerpt?: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  category: 'business' | 'creative' | 'minimal' | 'bold' | 'nature' | 'luxury';
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  gradient?: {
    from: string;
    to: string;
    direction: string;
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
  
  // Theme settings
  currentTheme: string;
  customThemes: ColorTheme[];
  
  // Header settings
  header: HeaderSettings;
  
  // Footer settings
  footer: FooterSettings;
  
  // WhatsApp settings
  whatsapp: WhatsAppSettings;
  
  contactInfo: {
    email: string;
    phone: string;
    address: string;
    workingHours: string;
    socialMedia: SocialMediaLink[];
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  
  heroSection: HeroSection;
  productSections: ProductSection;
  whyChooseUs: WhyChooseUsSection;
  faq: FAQSection;
  
  // SEO settings
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
    googleAnalytics: string;
    facebookPixel: string;
    structuredData: boolean;
  };
  
  // Advanced settings
  advanced: {
    customCSS: string;
    customJS: string;
    enableRTL: boolean;
    enableMultiLanguage: boolean;
    defaultLanguage: string;
    currencies: string[];
    defaultCurrency: string;
    enableLazyLoading: boolean;
    enableCompression: boolean;
    enableCaching: boolean;
  };
  
  // Performance settings
  performance: {
    enableImageOptimization: boolean;
    enableMinification: boolean;
    enableGzip: boolean;
    cacheExpiry: number;
  };
}

export interface StoreData {
  settings: StoreSettings;
  products: Product[];
  pages: CustomPage[];
  categories: ProductCategory[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  parentId?: string;
  isVisible: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}