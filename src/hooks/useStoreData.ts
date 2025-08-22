import { useState } from 'react';
import { StoreData, StoreSettings, Product, CustomPage } from '../types/store';
import { defaultSettings } from '../utils/defaultSettings';
import { useErrorHandler } from './useErrorHandler';
import { useLocalStorage } from './useLocalStorage';
import { useAutoSave } from './useAutoSave';

export function useStoreData() {
  const { handleError, withErrorHandling } = useErrorHandler();
  
  const initialStoreData: StoreData = {
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
  };

  const [storeData, setStoreData, clearStoreData] = useLocalStorage<StoreData>('estore-builder-data', initialStoreData);
  
  // Auto-save functionality
  const { saveNow } = useAutoSave(
    storeData,
    (data) => {
      // Data is automatically saved to localStorage by useLocalStorage
      console.log('Store data auto-saved');
    },
    {
      delay: 1000, // Save after 1 second of inactivity
      onSave: () => console.log('✅ تم حفظ البيانات تلقائياً'),
      onError: (error) => console.error('❌ خطأ في الحفظ التلقائي:', error)
    }
  );

  const handleUpdateSettings = withErrorHandling((newSettings: StoreSettings) => {
    setStoreData(prev => ({
      ...prev,
      settings: newSettings
    }));
  }, 'handleUpdateSettings');

  const handleAddProduct = withErrorHandling((product: Product) => {
    setStoreData(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
  }, 'handleAddProduct');

  const handleEditProduct = withErrorHandling((id: string, updatedProduct: Product) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? updatedProduct : p)
    }));
  }, 'handleEditProduct');

  const handleDeleteProduct = withErrorHandling((id: string) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  }, 'handleDeleteProduct');

  const handleAddPage = withErrorHandling((page: CustomPage) => {
    setStoreData(prev => ({
      ...prev,
      customPages: [...prev.customPages, page]
    }));
  }, 'handleAddPage');

  const handleEditPage = withErrorHandling((id: string, updatedPage: CustomPage) => {
    setStoreData(prev => ({
      ...prev,
      customPages: prev.customPages.map(p => p.id === id ? updatedPage : p)
    }));
  }, 'handleEditPage');

  const handleDeletePage = withErrorHandling((id: string) => {
    setStoreData(prev => ({
      ...prev,
      customPages: prev.customPages.filter(p => p.id !== id)
    }));
  }, 'handleDeletePage');

  const resetStoreData = withErrorHandling(() => {
    setStoreData(initialStoreData);
  }, 'resetStoreData');

  const exportStoreData = withErrorHandling(() => {
    const dataStr = JSON.stringify(storeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${storeData.settings.storeName}_backup.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, 'exportStoreData');

  const importStoreData = withErrorHandling((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);
        setStoreData(importedData);
      } catch (error) {
        throw new Error('ملف غير صالح');
      }
    };
    reader.readAsText(file);
  }, 'importStoreData');
  return {
    storeData,
    handleUpdateSettings,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleAddPage,
    handleEditPage,
    handleDeletePage,
    resetStoreData,
    exportStoreData,
    importStoreData,
    saveNow
  };
}