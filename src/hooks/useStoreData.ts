import { useState } from 'react';
import { StoreData, StoreSettings, Product, CustomPage } from '../types/store';
import { defaultSettings } from '../utils/defaultSettings';

export function useStoreData() {
  const [storeData, setStoreData] = useState<StoreData>({
    settings: defaultSettings,
    products: [],
    customPages: [
      {
        id: '1',
        title: 'سياسة الخصوصية',
        slug: 'privacy-policy',
        content: 'نحن نحترم خصوصيتك ونلتزم بحماية معلوماتك الشخصية...',
        metaTitle: 'سياسة الخصوصية',
        metaDescription: 'تعرف على سياسة الخصوصية الخاصة بمتجرنا',
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'شروط الاستخدام',
        slug: 'terms-of-service',
        content: 'شروط وأحكام استخدام متجرنا الإلكتروني...',
        metaTitle: 'شروط الاستخدام',
        metaDescription: 'اطلع على شروط وأحكام استخدام متجرنا',
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
  });

  const handleUpdateSettings = (newSettings: StoreSettings) => {
    setStoreData(prev => ({
      ...prev,
      settings: newSettings
    }));
  };

  const handleAddProduct = (product: Product) => {
    setStoreData(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
  };

  const handleEditProduct = (id: string, updatedProduct: Product) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? updatedProduct : p)
    }));
  };

  const handleDeleteProduct = (id: string) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const handleAddPage = (page: CustomPage) => {
    setStoreData(prev => ({
      ...prev,
      customPages: [...prev.customPages, page]
    }));
  };

  const handleEditPage = (id: string, updatedPage: CustomPage) => {
    setStoreData(prev => ({
      ...prev,
      customPages: prev.customPages.map(p => p.id === id ? updatedPage : p)
    }));
  };

  const handleDeletePage = (id: string) => {
    setStoreData(prev => ({
      ...prev,
      customPages: prev.customPages.filter(p => p.id !== id)
    }));
  };

  return {
    storeData,
    handleUpdateSettings,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleAddPage,
    handleEditPage,
    handleDeletePage
  };
}