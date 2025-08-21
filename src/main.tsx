import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StoreData } from './types/store';

const initialStoreData: StoreData = {
  settings: {
    storeName: 'متجري الإلكتروني',
    storeDescription: 'أفضل المنتجات بأسعار منافسة',
    logo: '',
    favicon: '',
    currency: 'ريال',
    language: 'ar',
    theme: 'blue',
    customColors: {
      primary: '#3B82F6',
      secondary: '#64748B',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937'
    },
    whatsapp: {
      number: '+966501234567',
      message: 'مرحباً، أريد الاستفسار عن المنتج: {productName}',
      includeProductName: true,
      includeProductPrice: true,
      includeProductDescription: false,
      includeProductImage: false,
      buttonStyle: 'primary',
      buttonSize: 'medium',
      position: 'product',
      showFloating: true,
      animation: 'pulse',
      showOnMobile: true,
      showOnDesktop: true
    },
    seo: {
      title: 'متجري الإلكتروني',
      description: 'أفضل المنتجات بأسعار منافسة',
      keywords: 'متجر, إلكتروني, منتجات',
      ogImage: ''
    },
    analytics: {
      googleAnalytics: '',
      facebookPixel: '',
      tiktokPixel: ''
    },
    social: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      tiktok: '',
      snapchat: ''
    }
  },
  header: {
    style: 'modern',
    layout: 'horizontal',
    position: 'sticky',
    showLogo: true,
    showSearch: true,
    showLanguage: false,
    showCurrency: false,
    navigation: [],
    customization: {
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      logoHeight: 40,
      showShadow: true,
      showBorder: false,
      borderColor: '#E5E7EB'
    }
  },
  footer: {
    style: 'modern',
    showNewsletter: true,
    showSocial: true,
    columns: [],
    customization: {
      backgroundColor: '#1F2937',
      textColor: '#FFFFFF',
      linkColor: '#60A5FA'
    },
    newsletter: {
      title: 'اشترك في النشرة الإخبارية',
      description: 'احصل على آخر العروض والمنتجات الجديدة',
      placeholder: 'أدخل بريدك الإلكتروني',
      buttonText: 'اشتراك'
    }
  },
  products: [],
  pages: [],
  sections: {
    hero: {
      enabled: true,
      style: 'modern',
      title: 'مرحباً بك في متجرنا',
      subtitle: 'اكتشف أفضل المنتجات بأسعار منافسة',
      buttonText: 'تسوق الآن',
      buttonLink: '#products',
      backgroundType: 'color',
      backgroundColor: '#F3F4F6',
      backgroundImage: '',
      showScrollIndicator: true,
      animation: 'fadeIn'
    },
    features: {
      enabled: true,
      style: 'grid',
      title: 'لماذا تختارنا؟',
      items: []
    },
    testimonials: {
      enabled: true,
      style: 'carousel',
      title: 'آراء العملاء',
      items: []
    },
    faq: {
      enabled: true,
      style: 'accordion',
      title: 'الأسئلة الشائعة',
      items: []
    }
  }
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App storeData={initialStoreData} />
  </StrictMode>
);
