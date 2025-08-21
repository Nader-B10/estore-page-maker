import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StoreData } from './types/store';

const initialStoreData: StoreData = {
  settings: {
    storeName: 'متجري الإلكتروني',
    description: 'أفضل المنتجات بأسعار منافسة',
    logo: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#64748B',
    accentColor: '#F59E0B',
    fontFamily: 'Inter, sans-serif',
    layout: 'grid',
    headerStyle: 'classic',
    footerText: '',
    contactInfo: {
      email: '',
      phone: '',
      address: ''
    },
    productSections: {
      featured: {
        enabled: true,
        title: 'المنتجات المميزة',
        subtitle: 'اكتشف أفضل منتجاتنا',
        limit: 8
      },
      bestSellers: {
        enabled: true,
        title: 'الأكثر مبيعاً',
        subtitle: 'المنتجات الأكثر شعبية',
        limit: 8
      },
      onSale: {
        enabled: true,
        title: 'عروض خاصة',
        subtitle: 'منتجات بأسعار مخفضة',
        limit: 8
      }
    },
    heroSection: {
      enabled: true,
      title: 'مرحباً بك في متجرنا',
      subtitle: 'اكتشف أفضل المنتجات بأسعار منافسة',
      ctaText: 'تسوق الآن',
      ctaLink: '#products',
      backgroundType: 'gradient',
      backgroundImage: '',
      overlayOpacity: 50,
      textAlignment: 'center',
      height: 'medium',
      ctaStyle: 'primary',
      animation: 'fadeIn'
    },
    whyChooseUs: {
      enabled: true,
      title: 'لماذا تختارنا؟',
      subtitle: 'نقدم لك أفضل تجربة تسوق',
      backgroundColor: '#F9FAFB',
      textColor: '#1F2937',
      layout: 'grid',
      columns: 3,
      items: [
        {
          id: '1',
          title: 'شحن سريع',
          description: 'توصيل سريع وآمن لجميع المناطق',
          icon: 'truck'
        },
        {
          id: '2',
          title: 'ضمان الجودة',
          description: 'منتجات عالية الجودة مع ضمان شامل',
          icon: 'shield'
        },
        {
          id: '3',
          title: 'دعم 24/7',
          description: 'فريق دعم متاح على مدار الساعة',
          icon: 'headphones'
        }
      ]
    },
    faq: {
      enabled: true,
      title: 'الأسئلة الشائعة',
      subtitle: 'إجابات على أكثر الأسئلة شيوعاً',
      backgroundColor: '#FFFFFF',
      style: 'accordion',
      items: [
        {
          id: '1',
          question: 'كيف يمكنني تتبع طلبي؟',
          answer: 'يمكنك تتبع طلبك من خلال رقم التتبع الذي سيتم إرساله إليك عبر الواتساب'
        },
        {
          id: '2',
          question: 'ما هي طرق الدفع المتاحة؟',
          answer: 'نقبل الدفع عند الاستلام والتحويل البنكي'
        }
      ]
    },
    header: {
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      position: 'sticky',
      logoSize: 'medium',
      logoPosition: 'left',
      layout: 'horizontal',
      showSearch: true,
      showLanguage: false,
      showCurrency: false,
      navigation: [],
      topBar: {
        enabled: false,
        text: '',
        backgroundColor: '#1F2937',
        textColor: '#FFFFFF'
      },
      announcement: {
        enabled: false,
        text: '',
        backgroundColor: '#3B82F6',
        textColor: '#FFFFFF'
      }
    },
    whatsapp: {
      enabled: true,
      number: '+966501234567',
      message: 'مرحباً، أريد الاستفسار عن المنتج: {productName}',
      includeProductName: true,
      includeProductPrice: true,
      includeProductDescription: false,
      buttonText: 'اطلب عبر واتساب',
      buttonStyle: 'primary',
      buttonSize: 'medium',
      showFloating: false,
      animation: 'pulse',
      showOnMobile: true,
      showOnDesktop: true
    },
    customThemes: [],
    currentTheme: 'professional-blue'
  },
  products: [],
  pages: [],
  categories: []
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App storeData={initialStoreData} />
  </StrictMode>
);
