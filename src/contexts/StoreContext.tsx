import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { StoreData, StoreSettings, Product } from '../types/store';

const defaultSettings: StoreSettings = {
  theme: 'oceanic-blue',
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

interface StoreContextType {
  storeData: StoreData;
  updateSettings: (newSettings: Partial<Omit<StoreSettings, 'sections'>>) => void;
  updateSection: (sectionKey: keyof StoreSettings['sections'], newConfig: any) => void;
  addProduct: (product: Product) => void;
  editProduct: (id: string, updatedProduct: Product) => void;
  deleteProduct: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [storeData, setStoreData] = useState<StoreData>({
    settings: defaultSettings,
    products: []
  });

  const updateSettings = useCallback((newSettings: Partial<Omit<StoreSettings, 'sections'>>) => {
    setStoreData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, []);

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
  }, []);

  const addProduct = useCallback((product: Product) => {
    setStoreData(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
  }, []);

  const editProduct = useCallback((id: string, updatedProduct: Product) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? updatedProduct : p)
    }));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  }, []);

  const value = {
    storeData,
    updateSettings,
    updateSection,
    addProduct,
    editProduct,
    deleteProduct,
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
