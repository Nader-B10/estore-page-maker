import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { StoreData, StoreSettings, Product, CustomPage, WhatsAppSettings } from '../types/store';
import useLocalStorage from '../hooks/useLocalStorage';

const defaultSettings: StoreSettings = {
  theme: 'oceanic-blue',
  currentTemplate: 'default',
  storeName: 'متجري الإلكتروني',
  description: 'أفضل المنتجات بأسعار منافسة',
  logo: '',
  favicon: '',
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  accentColor: '#F59E0B',
  fontFamily: 'Cairo',
  layout: 'grid',
  headerStyle: 'classic',
  sectionOrder: ['hero', 'featuredProducts', 'bestSellers', 'onSale', 'whyChooseUs', 'faq', 'allProducts'],
  contactInfo: {
    email: 'contact@example.com',
    phone: '+966 12 345 6789',
    address: 'الرياض، المملكة العربية السعودية'
  },
  sections: {
    header: {
      enabled: true,
      data: {
        links: [
          { id: '1', text: 'المنتجات', link: '#all-products' },
          { id: '2', text: 'لماذا نحن', link: '#why-us' },
          { id: '3', text: 'الأسئلة الشائعة', link: '#faq' },
        ]
      }
    },
    footer: {
      enabled: true,
      data: {
        linksTitle: 'روابط سريعة',
        contactTitle: 'تواصل معنا',
        contactInfo: {
          email: 'contact@example.com',
          phone: '+966 12 345 6789',
          address: 'الرياض، المملكة العربية السعودية'
        },
        socialLinks: [],
        copyrightText: `© ${new Date().getFullYear()} متجري. جميع الحقوق محفوظة.`
      }
    },
    hero: {
      enabled: true,
      data: {
        title: 'مرحباً بك في متجرنا',
        subtitle: 'اكتشف أفضل المنتجات بأسعار منافسة',
        backgroundImage: '',
        ctaText: 'تسوق الآن',
        ctaLink: '#all-products'
      }
    },
    featuredProducts: {
      enabled: true,
      data: {
        title: 'المنتجات المميزة',
        subtitle: 'اختيارنا الأفضل لك',
        limit: 4
      }
    },
    bestSellers: {
      enabled: true,
      data: {
        title: 'الأعلى مبيعاً',
        subtitle: 'المنتجات الأكثر طلباً',
        limit: 4
      }
    },
    onSale: {
      enabled: true,
      data: {
        title: 'عروض وتخفيضات',
        subtitle: 'وفر أكثر مع عروضنا الخاصة',
        limit: 4
      }
    },
    allProducts: {
      enabled: true,
      data: {
        title: 'جميع المنتجات',
        subtitle: 'تصفح مجموعتنا الكاملة'
      }
    },
    whyChooseUs: {
      enabled: true,
      data: {
        title: 'لماذا تختارنا؟',
        subtitle: 'نحن نقدم أفضل تجربة تسوق',
        items: [
          { id: '1', icon: 'truck', title: 'شحن سريع', description: 'توصيل مجاني خلال 24 ساعة' },
          { id: '2', icon: 'shield', title: 'ضمان الجودة', description: 'منتجات أصلية مع ضمان شامل' },
          { id: '3', icon: 'headphones', title: 'دعم 24/7', description: 'خدمة عملاء متاحة على مدار الساعة' }
        ]
      }
    },
    faq: {
      enabled: true,
      data: {
        title: 'الأسئلة الشائعة',
        subtitle: 'إجابات على أكثر الأسئلة شيوعاً',
        items: [
          { id: '1', question: 'كيف يمكنني تتبع طلبي؟', answer: 'يمكنك تتبع طلبك من خلال رقم الطلب المرسل إليك عبر البريد الإلكتروني' },
          { id: '2', question: 'ما هي طرق الدفع المتاحة؟', answer: 'نقبل جميع بطاقات الائتمان والدفع عند الاستلام' }
        ]
      }
    }
  }
};

const defaultPages: CustomPage[] = [
  {
    id: 'all-products',
    title: 'جميع المنتجات',
    slug: 'products',
    content: 'تصفح مجموعتنا الكاملة من المنتجات المتميزة',
    isDefault: true,
    showAllProducts: true,
    metaDescription: 'تصفح جميع منتجاتنا المتاحة بأفضل الأسعار',
    pageType: 'products'
  }
];

const defaultWhatsAppSettings: WhatsAppSettings = {
  enabled: true,
  phoneNumber: '+966501234567',
  messageTemplate: 'مرحباً، أريد شراء هذا المنتج:\n\n📦 *{productName}*\n💰 السعر: {price} ر.س\n📝 الوصف: {description}\n\n🔗 رابط المنتج: {productUrl}',
  buttonText: 'اشتري عبر الواتساب'
};

interface StoreContextType {
  storeData: StoreData;
  updateSettings: (newSettings: Partial<Omit<StoreSettings, 'sections'>>) => void;
  updateSection: (sectionKey: keyof StoreSettings['sections'], newConfig: any) => void;
  updateSectionOrder: (newOrder: string[]) => void;
  updateWhatsAppSettings: (settings: Partial<WhatsAppSettings>) => void;
  addProduct: (product: Product) => void;
  editProduct: (id: string, updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
  addPage: (page: CustomPage) => void;
  editPage: (id: string, updatedPage: CustomPage) => void;
  deletePage: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORE_DATA_KEY = 'store-builder-data-v1';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeData, setStoreData] = useLocalStorage<StoreData>(STORE_DATA_KEY, {
    settings: defaultSettings,
    products: [],
    pages: defaultPages,
    whatsappSettings: defaultWhatsAppSettings
  });

  const updateSettings = useCallback((newSettings: Partial<Omit<StoreSettings, 'sections'>>) => {
    setStoreData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, [setStoreData]);

  const updateSection = useCallback((sectionKey: keyof StoreSettings['sections'], newConfig: any) => {
    setStoreData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        sections: {
          ...prev.settings.sections,
          [sectionKey]: {
            ...prev.settings.sections[sectionKey],
            ...newConfig,
            data: {
              ...prev.settings.sections[sectionKey].data,
              ...(newConfig.data || {})
            }
          }
        }
      }
    }));
  }, [setStoreData]);

  const updateSectionOrder = useCallback((newOrder: string[]) => {
    setStoreData(prev => ({
      ...prev,
      settings: { ...prev.settings, sectionOrder: newOrder }
    }));
  }, [setStoreData]);

  const updateWhatsAppSettings = useCallback((newSettings: Partial<WhatsAppSettings>) => {
    setStoreData(prev => ({
      ...prev,
      whatsappSettings: { ...prev.whatsappSettings, ...newSettings }
    }));
  }, [setStoreData]);

  const addProduct = useCallback((product: Product) => {
    setStoreData(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
  }, [setStoreData]);

  const editProduct = useCallback((id: string, updatedProduct: Product) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? updatedProduct : p)
    }));
  }, [setStoreData]);

  const deleteProduct = useCallback((id: string) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  }, [setStoreData]);

  const addPage = useCallback((page: CustomPage) => {
    setStoreData(prev => ({
      ...prev,
      pages: [...prev.pages, page]
    }));
  }, [setStoreData]);

  const editPage = useCallback((id: string, updatedPage: CustomPage) => {
    setStoreData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === id ? updatedPage : p)
    }));
  }, [setStoreData]);

  const deletePage = useCallback((id: string) => {
    setStoreData(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p.id !== id)
    }));
  }, [setStoreData]);

  const value = {
    storeData,
    updateSettings,
    updateSection,
    updateSectionOrder,
    updateWhatsAppSettings,
    addProduct,
    editProduct,
    deleteProduct,
    addPage,
    editPage,
    deletePage,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};