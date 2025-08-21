import React, { useState } from 'react';
import { Settings, Package, Eye, Download, Loader } from 'lucide-react';
import { StoreData, StoreSettings, Product } from './types/store';
import SettingsPanel from './components/StoreBuilder/SettingsPanel';
import ProductManager from './components/StoreBuilder/ProductManager';
import StorePreview from './components/StoreBuilder/StorePreview';
import SectionsManager from './components/StoreBuilder/SectionsManager';
import { exportStore } from './utils/fileExporter';

const defaultSettings: StoreSettings = {
  storeName: 'متجري الإلكتروني',
  description: 'أفضل المنتجات بأسعار منافسة',
  logo: '',
  favicon: '',
  primaryColor: '#3b82f6',
  secondaryColor: '#1e40af',
  accentColor: '#f59e0b',
  fontFamily: 'Cairo',
  layout: 'grid',
  headerStyle: 'modern',
  footerText: '',
  contactInfo: {
    email: '',
    phone: '',
    address: ''
  },
  heroSection: {
    enabled: true,
    title: 'مرحباً بك في متجرنا',
    subtitle: 'اكتشف أفضل المنتجات بأسعار منافسة',
    backgroundImage: '',
    ctaText: 'تسوق الآن',
    ctaLink: '#products'
  },
  productSections: {
    featured: {
      enabled: true,
      title: 'المنتجات المميزة',
      subtitle: 'اختيارنا الأفضل لك',
      limit: 4
    },
    bestSellers: {
      enabled: true,
      title: 'الأعلى مبيعاً',
      subtitle: 'المنتجات الأكثر طلباً',
      limit: 4
    },
    onSale: {
      enabled: true,
      title: 'عروض وتخفيضات',
      subtitle: 'وفر أكثر مع عروضنا الخاصة',
      limit: 4
    }
  },
  whyChooseUs: {
    enabled: true,
    title: 'لماذا تختارنا؟',
    subtitle: 'نحن نقدم أفضل تجربة تسوق',
    items: [
      {
        id: '1',
        icon: 'truck',
        title: 'شحن سريع',
        description: 'توصيل مجاني خلال 24 ساعة'
      },
      {
        id: '2',
        icon: 'shield',
        title: 'ضمان الجودة',
        description: 'منتجات أصلية مع ضمان شامل'
      },
      {
        id: '3',
        icon: 'headphones',
        title: 'دعم 24/7',
        description: 'خدمة عملاء متاحة على مدار الساعة'
      }
    ]
  },
  faq: {
    enabled: true,
    title: 'الأسئلة الشائعة',
    subtitle: 'إجابات على أكثر الأسئلة شيوعاً',
    items: [
      {
        id: '1',
        question: 'كيف يمكنني تتبع طلبي؟',
        answer: 'يمكنك تتبع طلبك من خلال رقم الطلب المرسل إليك عبر البريد الإلكتروني'
      },
      {
        id: '2',
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل جميع بطاقات الائتمان والدفع عند الاستلام'
      }
    ]
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [isExporting, setIsExporting] = useState(false);
  const [storeData, setStoreData] = useState<StoreData>({
    settings: defaultSettings,
    products: []
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
    { id: 'settings', label: 'الإعدادات', icon: Settings },
    { id: 'sections', label: 'الأقسام', icon: Package },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'preview', label: 'معاينة', icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">أداة بناء المتاجر</h1>
                <p className="text-sm text-gray-600">اصنع متجرك الإلكتروني في دقائق</p>
              </div>
            </div>
            
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  جاري التحضير...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  تحميل المتجر
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
          {/* Tab Navigation */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col gap-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-2 border-transparent'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'settings' && (
              <SettingsPanel
                settings={storeData.settings}
                onUpdateSettings={handleUpdateSettings}
              />
            )}
            
            {activeTab === 'sections' && (
              <SectionsManager
                settings={storeData.settings}
                onUpdateSettings={handleUpdateSettings}
              />
            )}
            
            {activeTab === 'products' && (
              <ProductManager
                products={storeData.products}
                settings={storeData.settings}
                onAddProduct={handleAddProduct}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100">
          {activeTab === 'preview' ? (
            <div className="h-full">
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">معاينة المتجر</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye size={16} />
                    معاينة مباشرة
                  </div>
                </div>
              </div>
              <StorePreview storeData={storeData} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye size={48} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">معاينة المتجر</h3>
                <p className="text-gray-600 mb-4">انقر على تبويب "معاينة" لرؤية متجرك</p>
                <button
                  onClick={() => setActiveTab('preview')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  عرض المعاينة
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Export Status */}
      {isExporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">جاري تحضير المتجر...</h3>
            <p className="text-gray-600">يتم الآن تجهيز وضغط ملفات متجرك</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;