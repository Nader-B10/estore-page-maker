import React, { useState } from 'react';
import { Settings, Eye, Download, Palette, Layout, FileText, MessageCircle, Globe } from 'lucide-react';
import { StoreData } from './types/store';
import StorePreview from './components/StoreBuilder/StorePreview';
import SettingsPanel from './components/StoreBuilder/SettingsPanel';
import ProductManager from './components/StoreBuilder/ProductManager';
import SectionsManager from './components/StoreBuilder/SectionsManager';
import ThemeSelector from './components/StoreBuilder/ThemeSelector';
import HeaderSettings from './components/StoreBuilder/HeaderSettings';
import FooterSettings from './components/StoreBuilder/FooterSettings';
import WhatsAppSettings from './components/StoreBuilder/WhatsAppSettings';
import PageManager from './components/StoreBuilder/PageManager';
import { exportStore } from './utils/fileExporter';

interface AppProps {
  storeData: StoreData;
}

export default function App({ storeData: initialStoreData }: AppProps) {
  const [storeData, setStoreData] = useState<StoreData>(initialStoreData);
  const [activeTab, setActiveTab] = useState('preview');
  const [isExporting, setIsExporting] = useState(false);

  const handleUpdateSettings = (newSettings: any) => {
    setStoreData(prev => ({
      ...prev,
      settings: newSettings
    }));
  };

  const handleAddProduct = (product: any) => {
    setStoreData(prev => ({
      ...prev,
      products: [...prev.products, product]
    }));
  };

  const handleEditProduct = (id: string, product: any) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? product : p)
    }));
  };

  const handleDeleteProduct = (id: string) => {
    setStoreData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const handleAddPage = (page: any) => {
    setStoreData(prev => ({
      ...prev,
      pages: [...prev.pages, page]
    }));
  };

  const handleEditPage = (id: string, page: any) => {
    setStoreData(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === id ? page : p)
    }));
  };

  const handleDeletePage = (id: string) => {
    setStoreData(prev => ({
      ...prev,
      pages: prev.pages.filter(p => p.id !== id)
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const success = await exportStore(storeData);
      if (success) {
        alert('تم تصدير المتجر بنجاح!');
      } else {
        alert('حدث خطأ أثناء تصدير المتجر');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('حدث خطأ أثناء تصدير المتجر');
    } finally {
      setIsExporting(false);
    }
  };

  const tabs = [
    { id: 'preview', label: 'معاينة المتجر', icon: Eye },
    { id: 'settings', label: 'الإعدادات العامة', icon: Settings },
    { id: 'themes', label: 'الثيمات والألوان', icon: Palette },
    { id: 'header', label: 'إعدادات الهيدر', icon: Layout },
    { id: 'footer', label: 'إعدادات الفوتر', icon: Globe },
    { id: 'products', label: 'إدارة المنتجات', icon: Layout },
    { id: 'sections', label: 'إدارة الأقسام', icon: Layout },
    { id: 'whatsapp', label: 'إعدادات الواتساب', icon: MessageCircle },
    { id: 'pages', label: 'إدارة الصفحات', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">أداة بناء المتاجر الإلكترونية</h1>
                <p className="text-sm text-gray-600">أنشئ متجرك الإلكتروني بسهولة</p>
              </div>
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Download size={20} />
              {isExporting ? 'جاري التصدير...' : 'تصدير المتجر'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-semibold mb-4">أدوات التحكم</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-right transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Store Info */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold mb-2">معلومات المتجر</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">اسم المتجر:</span>
                  <span className="font-medium">{storeData.settings.storeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد المنتجات:</span>
                  <span className="font-medium">{storeData.products.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">عدد الصفحات:</span>
                  <span className="font-medium">{storeData.pages.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              {activeTab === 'preview' && (
                <div className="h-[800px] overflow-hidden rounded-lg">
                  <StorePreview storeData={storeData} />
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="p-6">
                  <SettingsPanel
                    settings={storeData.settings}
                    onUpdateSettings={handleUpdateSettings}
                  />
                </div>
              )}

              {activeTab === 'themes' && (
                <div className="p-6">
                  <ThemeSelector
                    settings={storeData.settings}
                    onUpdateSettings={handleUpdateSettings}
                  />
                </div>
              )}

              {activeTab === 'header' && (
                <div className="p-6">
                  <HeaderSettings
                    settings={storeData.settings}
                    onUpdateSettings={handleUpdateSettings}
                  />
                </div>
              )}

              {activeTab === 'footer' && (
                <div className="p-6">
                  <FooterSettings
                    settings={storeData.settings}
                    onUpdateSettings={handleUpdateSettings}
                  />
                </div>
              )}

              {activeTab === 'products' && (
                <div className="p-6">
                  <ProductManager
                    products={storeData.products}
                    settings={storeData.settings}
                    onAddProduct={handleAddProduct}
                    onEditProduct={handleEditProduct}
                    onDeleteProduct={handleDeleteProduct}
                  />
                </div>
              )}

              {activeTab === 'sections' && (
                <div className="p-6">
                  <SectionsManager
                    settings={storeData.settings}
                    onUpdateSettings={handleUpdateSettings}
                  />
                </div>
              )}

              {activeTab === 'whatsapp' && (
                <div className="p-6">
                  <WhatsAppSettings
                    settings={storeData.settings}
                    onUpdateSettings={handleUpdateSettings}
                  />
                </div>
              )}

              {activeTab === 'pages' && (
                <div className="p-6">
                  <PageManager
                    pages={storeData.pages}
                    settings={storeData.settings}
                    onAddPage={handleAddPage}
                    onEditPage={handleEditPage}
                    onDeletePage={handleDeletePage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}