import React, { useState } from 'react';
import { Plus, Edit, Trash2, Upload, X, Eye, EyeOff, Palette } from 'lucide-react';
import { StoreSettings, WhyChooseUsItem, FAQItem } from '../../types/store';
import { getAvailableHeros, getAvailableAbouts, getAvailableFeatures, getAvailableFAQs } from '../../utils/componentRegistry';

interface SectionsManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function SectionsManager({ settings, onUpdateSettings }: SectionsManagerProps) {
  const [activeSection, setActiveSection] = useState('hero');
  const [editingWhyItem, setEditingWhyItem] = useState<WhyChooseUsItem | null>(null);
  const [editingFAQItem, setEditingFAQItem] = useState<FAQItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableHeros = getAvailableHeros();
  const availableAbouts = getAvailableAbouts();
  const availableFeatures = getAvailableFeatures();
  const availableFAQs = getAvailableFAQs();

  const handleHeroChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      heroSection: {
        ...settings.heroSection,
        [field]: value,
      },
    });
  };

  const handleProductSectionChange = (section: string, field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      productSections: {
        ...settings.productSections,
        [section]: {
          ...settings.productSections[section as keyof typeof settings.productSections],
          [field]: value,
        },
      },
    });
  };

  const handleWhyChooseUsChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      whyChooseUs: {
        ...settings.whyChooseUs,
        [field]: value,
      },
    });
  };

  const handleFAQChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      faq: {
        ...settings.faq,
        [field]: value,
      },
    });
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleHeroChange('backgroundImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addWhyChooseUsItem = (item: Omit<WhyChooseUsItem, 'id'>) => {
    const newItem: WhyChooseUsItem = {
      ...item,
      id: Date.now().toString(),
    };
    
    handleWhyChooseUsChange('items', [...settings.whyChooseUs.items, newItem]);
    setIsModalOpen(false);
    setEditingWhyItem(null);
  };

  const updateWhyChooseUsItem = (id: string, item: Omit<WhyChooseUsItem, 'id'>) => {
    const updatedItems = settings.whyChooseUs.items.map(i => 
      i.id === id ? { ...item, id } : i
    );
    handleWhyChooseUsChange('items', updatedItems);
    setIsModalOpen(false);
    setEditingWhyItem(null);
  };

  const deleteWhyChooseUsItem = (id: string) => {
    const updatedItems = settings.whyChooseUs.items.filter(i => i.id !== id);
    handleWhyChooseUsChange('items', updatedItems);
  };

  const addFAQItem = (item: Omit<FAQItem, 'id'>) => {
    const newItem: FAQItem = {
      ...item,
      id: Date.now().toString(),
    };
    
    handleFAQChange('items', [...settings.faq.items, newItem]);
    setIsModalOpen(false);
    setEditingFAQItem(null);
  };

  const updateFAQItem = (id: string, item: Omit<FAQItem, 'id'>) => {
    const updatedItems = settings.faq.items.map(i => 
      i.id === id ? { ...item, id } : i
    );
    handleFAQChange('items', updatedItems);
    setIsModalOpen(false);
    setEditingFAQItem(null);
  };

  const deleteFAQItem = (id: string) => {
    const updatedItems = settings.faq.items.filter(i => i.id !== id);
    handleFAQChange('items', updatedItems);
  };

  const sections = [
    { id: 'hero', label: 'قسم البطل (Hero)' },
    { id: 'products', label: 'أقسام المنتجات' },
    { id: 'about', label: 'قسم من نحن' },
    { id: 'why-choose-us', label: 'لماذا تختارنا' },
    { id: 'faq', label: 'الأسئلة الشائعة' },
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Selection */}

      {/* Hero Section */}
      {activeSection === 'hero' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {/* Template Selection */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-600" />
              اختيار قالب الهيرو
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {availableHeros.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleChange('heroTemplate', template.id)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    settings.heroTemplate === template.id
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {settings.heroTemplate === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <div 
                      className="w-full h-20 rounded-md mb-2"
                      style={{ 
                        background: `linear-gradient(135deg, ${settings.primaryColor}40, ${settings.secondaryColor}40)` 
                      }}
                    ></div>
                  </div>
                  
                  <h5 className="font-semibold text-gray-800 mb-2">{template.name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">قسم البطل (Hero Section)</h3>
            <button
              onClick={() => handleHeroChange('enabled', !settings.heroSection.enabled)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                settings.heroSection.enabled
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {settings.heroSection.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.heroSection.enabled ? 'مفعل' : 'غير مفعل'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">العنوان الرئيسي</label>
              <input
                type="text"
                value={settings.heroSection.title}
                onChange={(e) => handleHeroChange('title', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="العنوان الرئيسي"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
              <textarea
                value={settings.heroSection.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="العنوان الفرعي"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">صورة الخلفية</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  className="hidden"
                  id="hero-image-upload"
                />
                <label
                  htmlFor="hero-image-upload"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  <Upload size={20} />
                  رفع صورة
                </label>
                {settings.heroSection.backgroundImage && (
                  <img 
                    src={settings.heroSection.backgroundImage} 
                    alt="Hero Background" 
                    className="w-16 h-16 object-cover rounded" 
                  />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">نص الزر</label>
                <input
                  type="text"
                  value={settings.heroSection.ctaText}
                  onChange={(e) => handleHeroChange('ctaText', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="تسوق الآن"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">رابط الزر</label>
                <input
                  type="text"
                  value={settings.heroSection.ctaLink}
                  onChange={(e) => handleHeroChange('ctaLink', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="#products"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-orange-600" />
              اختيار قالب من نحن
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {availableAbouts.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleChange('aboutTemplate', template.id)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    settings.aboutTemplate === template.id
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  {settings.aboutTemplate === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <div 
                      className="w-full h-16 rounded-md mb-2"
                      style={{ 
                        background: `linear-gradient(135deg, ${settings.primaryColor}30, ${settings.accentColor}30)` 
                      }}
                    ></div>
                  </div>
                  
                  <h5 className="font-semibold text-gray-800 mb-2">{template.name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <AboutSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
        </div>
      )}

      {/* Product Sections */}
      {activeSection === 'products' && (
        <div className="space-y-6">
          {/* Featured Products */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">المنتجات المميزة</h3>
              <button
                onClick={() => handleProductSectionChange('featured', 'enabled', !settings.productSections.featured.enabled)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  settings.productSections.featured.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {settings.productSections.featured.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                {settings.productSections.featured.enabled ? 'مفعل' : 'غير مفعل'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">العنوان</label>
                <input
                  type="text"
                  value={settings.productSections.featured.title}
                  onChange={(e) => handleProductSectionChange('featured', 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.productSections.featured.subtitle}
                  onChange={(e) => handleProductSectionChange('featured', 'subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">عدد المنتجات</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.productSections.featured.limit}
                  onChange={(e) => handleProductSectionChange('featured', 'limit', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Best Sellers */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">الأعلى مبيعاً</h3>
              <button
                onClick={() => handleProductSectionChange('bestSellers', 'enabled', !settings.productSections.bestSellers.enabled)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  settings.productSections.bestSellers.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {settings.productSections.bestSellers.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                {settings.productSections.bestSellers.enabled ? 'مفعل' : 'غير مفعل'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">العنوان</label>
                <input
                  type="text"
                  value={settings.productSections.bestSellers.title}
                  onChange={(e) => handleProductSectionChange('bestSellers', 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.productSections.bestSellers.subtitle}
                  onChange={(e) => handleProductSectionChange('bestSellers', 'subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">عدد المنتجات</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.productSections.bestSellers.limit}
                  onChange={(e) => handleProductSectionChange('bestSellers', 'limit', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* On Sale */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">عروض وتخفيضات</h3>
              <button
                onClick={() => handleProductSectionChange('onSale', 'enabled', !settings.productSections.onSale.enabled)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  settings.productSections.onSale.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {settings.productSections.onSale.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                {settings.productSections.onSale.enabled ? 'مفعل' : 'غير مفعل'}
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">العنوان</label>
                <input
                  type="text"
                  value={settings.productSections.onSale.title}
                  onChange={(e) => handleProductSectionChange('onSale', 'title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.productSections.onSale.subtitle}
                  onChange={(e) => handleProductSectionChange('onSale', 'subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">عدد المنتجات</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={settings.productSections.onSale.limit}
                  onChange={(e) => handleProductSectionChange('onSale', 'limit', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      {activeSection === 'why-choose-us' && (
        <div className="space-y-6">
          {/* Template Selection */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-red-600" />
              اختيار قالب الميزات
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {availableFeatures.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleChange('featuresTemplate', template.id)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    settings.featuresTemplate === template.id
                      ? 'border-red-500 bg-red-50 shadow-lg'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  {settings.featuresTemplate === template.id && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: `${settings.primaryColor}40` }}></div>
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: `${settings.accentColor}40` }}></div>
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: `${settings.secondaryColor}40` }}></div>
                    </div>
                  </div>
                  
                  <h5 className="font-semibold text-gray-800 mb-2">{template.name}</h5>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">لماذا تختارنا</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditingWhyItem(null);
                  setIsModalOpen(true);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700"
              >
                <Plus size={16} />
                إضافة ميزة
              </button>
              <button
                onClick={() => handleWhyChooseUsChange('enabled', !settings.whyChooseUs.enabled)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  settings.whyChooseUs.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {settings.whyChooseUs.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                {settings.whyChooseUs.enabled ? 'مفعل' : 'غير مفعل'}
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">العنوان</label>
                <input
                  type="text"
                  value={settings.whyChooseUs.title}
                  onChange={(e) => handleWhyChooseUsChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.whyChooseUs.subtitle}
                  onChange={(e) => handleWhyChooseUsChange('subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {settings.whyChooseUs.items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.title}</h4>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingWhyItem(item);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => deleteWhyChooseUsItem(item.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="text-xs text-gray-500 mt-1">أيقونة: {item.icon}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {activeSection === 'faq' && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">الأسئلة الشائعة</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setEditingFAQItem(null);
                  setIsModalOpen(true);
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700"
              >
                <Plus size={16} />
                إضافة سؤال
              </button>
              <button
                onClick={() => handleFAQChange('enabled', !settings.faq.enabled)}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                  settings.faq.enabled
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {settings.faq.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
                {settings.faq.enabled ? 'مفعل' : 'غير مفعل'}
              </button>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">العنوان</label>
                <input
                  type="text"
                  value={settings.faq.title}
                  onChange={(e) => handleFAQChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.faq.subtitle}
                  onChange={(e) => handleFAQChange('subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {settings.faq.items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{item.question}</h4>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setEditingFAQItem(item);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => deleteFAQItem(item.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Why Choose Us */}
      {isModalOpen && activeSection === 'why-choose-us' && (
        <WhyChooseUsModal
          item={editingWhyItem}
          onSave={editingWhyItem ? 
            (item) => updateWhyChooseUsItem(editingWhyItem.id, item) : 
            addWhyChooseUsItem
          }
          onClose={() => {
            setIsModalOpen(false);
            setEditingWhyItem(null);
          }}
        />
      )}

      {/* Modal for FAQ */}
      {isModalOpen && activeSection === 'faq' && (
        <FAQModal
          item={editingFAQItem}
          onSave={editingFAQItem ? 
            (item) => updateFAQItem(editingFAQItem.id, item) : 
            addFAQItem
          }
          onClose={() => {
            setIsModalOpen(false);
            setEditingFAQItem(null);
          }}
        />
      )}
    </div>
  );
}
}

// About Section Manager Component
function AboutSectionManager({ 
  settings, 
  onUpdateSettings 
}: { 
  settings: StoreSettings; 
  onUpdateSettings: (settings: StoreSettings) => void; 
}) {
  const handleAboutChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      aboutSection: {
        ...settings.aboutSection,
        [field]: value,
      },
    });
  };

  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleAboutChange('image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">قسم من نحن</h3>
        <button
          onClick={() => handleAboutChange('enabled', !settings.aboutSection.enabled)}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
            settings.aboutSection.enabled
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {settings.aboutSection.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          {settings.aboutSection.enabled ? 'مفعل' : 'غير مفعل'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">العنوان</label>
          <input
            type="text"
            value={settings.aboutSection.title}
            onChange={(e) => handleAboutChange('title', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="من نحن"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
          <input
            type="text"
            value={settings.aboutSection.subtitle}
            onChange={(e) => handleAboutChange('subtitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="تعرف على قصتنا ورؤيتنا"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">المحتوى</label>
          <textarea
            value={settings.aboutSection.content}
            onChange={(e) => handleAboutChange('content', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="اكتب نبذة عن متجرك وقصة نجاحك..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">صورة القسم</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleAboutImageUpload}
              className="hidden"
              id="about-image-upload"
            />
            <label
              htmlFor="about-image-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Upload size={20} />
              رفع صورة
            </label>
            {settings.aboutSection.image && (
              <img 
                src={settings.aboutSection.image} 
                alt="About" 
                className="w-16 h-16 object-cover rounded" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Why Choose Us Modal Component
function WhyChooseUsModal({ 
  item, 
  onSave, 
  onClose 
}: { 
  item: WhyChooseUsItem | null; 
  onSave: (item: Omit<WhyChooseUsItem, 'id'>) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    icon: item?.icon || 'star',
    title: item?.title || '',
    description: item?.description || '',
  });

  const iconOptions = [
    { value: 'truck', label: 'شحن' },
    { value: 'shield', label: 'حماية' },
    { value: 'headphones', label: 'دعم' },
    { value: 'star', label: 'نجمة' },
    { value: 'heart', label: 'قلب' },
    { value: 'check', label: 'صح' },
    { value: 'gift', label: 'هدية' },
    { value: 'clock', label: 'وقت' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {item ? 'تعديل الميزة' : 'إضافة ميزة جديدة'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الأيقونة</label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {iconOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">العنوان</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {item ? 'حفظ التغييرات' : 'إضافة الميزة'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// FAQ Modal Component
function FAQModal({ 
  item, 
  onSave, 
  onClose 
}: { 
  item: FAQItem | null; 
  onSave: (item: Omit<FAQItem, 'id'>) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    question: item?.question || '',
    answer: item?.answer || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {item ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">السؤال</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الإجابة</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {item ? 'حفظ التغييرات' : 'إضافة السؤال'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}