import React, { useState } from 'react';
import { Settings, Package, Eye, Loader, Download, HelpCircle } from 'lucide-react';
import { StoreData, StoreSettings, Product } from './types/store';
import SettingsPanel from './components/StoreBuilder/SettingsPanel';
import ProductManager from './components/StoreBuilder/ProductManager';
import PageManager from './components/StoreBuilder/PageManager';
import StorePreview from './components/StoreBuilder/StorePreview';
import SectionsManager from './components/StoreBuilder/SectionsManager';
import DocumentationViewer from './components/Documentation/DocumentationViewer';
import { exportStore } from './utils/fileExporter';

const defaultSettings: StoreSettings = {
  storeName: 'متجري الإلكتروني',
  description: 'أفضل المنتجات بأسعار منافسة',
  logo: '',
  favicon: '',
  themeId: 'blue-modern',
  primaryColor: '#3b82f6',
  secondaryColor: '#1e40af',
  accentColor: '#f59e0b',
  fontFamily: 'Cairo',
  layout: 'grid',
  headerTemplate: 'modern',
  heroTemplate: 'hero-variant-a',
  footerTemplate: 'default',
  aboutTemplate: 'modern-about',
  featuresTemplate: 'grid-features',
  faqTemplate: 'accordion-faq',
  footerText: '',
  sectionsOrder: ['hero', 'featured', 'bestSellers', 'onSale', 'about', 'whyChooseUs', 'faq'],
  headerLinks: [
    { id: '1', text: 'الرئيسية', url: '#home', type: 'internal', isVisible: true, order: 1 },
    { id: '2', text: 'المنتجات', url: '#products', type: 'internal', isVisible: true, order: 2 },
    { id: '3', text: 'من نحن', url: '#about', type: 'internal', isVisible: true, order: 3 },
    { id: '4', text: 'اتصل بنا', url: '#contact', type: 'internal', isVisible: true, order: 4 }
  ],
  footerLinks: [
    { id: '1', text: 'سياسة الخصوصية', url: '#privacy', type: 'page', isVisible: true, order: 1 },
    { id: '2', text: 'شروط الاستخدام', url: '#terms', type: 'page', isVisible: true, order: 2 },
    { id: '3', text: 'الأسئلة الشائعة', url: '#faq', type: 'internal', isVisible: true, order: 3 }
  ],
  contactInfo: {
    email: '',
    phone: '',
    address: ''
  },
  whatsappSettings: {
    enabled: true,
    phoneNumber: '',
    messageTemplate: 'مرحباً، أريد شراء هذا المنتج:\n\n📦 *{productName}*\n💰 السعر: {productPrice}\n\n{productDescription}\n\nشكراً لكم',
    includeProductName: true,
    includeProductDescription: true,
    includeProductPrice: true,
    includeStoreInfo: true,
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
  aboutSection: {
    enabled: true,
    title: 'من نحن',
    subtitle: 'تعرف على قصتنا ورؤيتنا',
    content: 'نحن فريق متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأت رحلتنا من شغفنا بالجودة والتميز، ونسعى دائماً لتحقيق رضا عملائنا وتجاوز توقعاتهم.',
    image: '',
    stats: [
      {
        id: '1',
        number: '1000+',
        label: 'عميل سعيد',
        icon: 'users'
      },
      {
        id: '2',
        number: '5+',
        label: 'سنوات خبرة',
        icon: 'calendar'
      },
      {
        id: '3',
        number: '500+',
        label: 'منتج متميز',
        icon: 'package'
      },
      {
        id: '4',
        number: '24/7',
        label: 'دعم العملاء',
        icon: 'headphones'
      }
    ],
    team: [
      {
        id: '1',
        name: 'أحمد محمد',
        position: 'المدير التنفيذي',
        image: '',
        bio: 'خبرة 10 سنوات في إدارة الأعمال والتجارة الإلكترونية'
      },
      {
        id: '2',
        name: 'فاطمة أحمد',
        position: 'مديرة التسويق',
        image: '',
        bio: 'متخصصة في التسويق الرقمي ووسائل التواصل الاجتماعي'
      }
    ]
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
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
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
    { id: 'pages', label: 'الصفحات', icon: Package },
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
            
            <button
              onClick={() => setIsDocumentationOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <HelpCircle className="w-5 h-5" />
              دليل المطور
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
                customPages={storeData.customPages}
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
            
            {activeTab === 'pages' && (
              <PageManager
                pages={storeData.customPages}
                onAddPage={handleAddPage}
                onEditPage={handleEditPage}
                onDeletePage={handleDeletePage}
              />
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 h-full">
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

      {/* Documentation Viewer */}
      <DocumentationViewer 
        isOpen={isDocumentationOpen} 
        onClose={() => setIsDocumentationOpen(false)} 
      />
    </div>
  );
}

export default App;