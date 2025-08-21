import React, { useState } from 'react';
import { Plus, Edit, Trash2, Move, Eye, EyeOff, Settings, Layout, Smartphone, Monitor } from 'lucide-react';
import { HeaderSettings, NavigationItem, StoreSettings } from '../../types/store';

interface HeaderSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function HeaderSettingsComponent({ settings, onUpdateSettings }: HeaderSettingsProps) {
  const [activeTab, setActiveTab] = useState('style');
  const [editingNavItem, setEditingNavItem] = useState<NavigationItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeaderChange = (field: keyof HeaderSettings, value: any) => {
    onUpdateSettings({
      ...settings,
      header: {
        ...settings.header,
        [field]: value,
      },
    });
  };

  const handleTopBarChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      header: {
        ...settings.header,
        topBar: {
          ...settings.header.topBar,
          [field]: value,
        },
      },
    });
  };

  const handleAnnouncementChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      header: {
        ...settings.header,
        announcement: {
          ...settings.header.announcement,
          [field]: value,
        },
      },
    });
  };

  const addNavigationItem = (item: Omit<NavigationItem, 'id' | 'order'>) => {
    const newItem: NavigationItem = {
      ...item,
      id: Date.now().toString(),
      order: settings.header.navigation.length,
    };
    
    handleHeaderChange('navigation', [...settings.header.navigation, newItem]);
    setIsModalOpen(false);
    setEditingNavItem(null);
  };

  const updateNavigationItem = (id: string, item: Omit<NavigationItem, 'id' | 'order'>) => {
    const updatedItems = settings.header.navigation.map(navItem => 
      navItem.id === id ? { ...item, id, order: navItem.order } : navItem
    );
    handleHeaderChange('navigation', updatedItems);
    setIsModalOpen(false);
    setEditingNavItem(null);
  };

  const deleteNavigationItem = (id: string) => {
    const updatedItems = settings.header.navigation.filter(item => item.id !== id);
    handleHeaderChange('navigation', updatedItems);
  };

  const toggleNavigationItemVisibility = (id: string) => {
    const updatedItems = settings.header.navigation.map(item => 
      item.id === id ? { ...item, isVisible: !item.isVisible } : item
    );
    handleHeaderChange('navigation', updatedItems);
  };

  const headerStyles = [
    { 
      value: 'minimal', 
      label: 'بسيط', 
      description: 'تصميم نظيف وبسيط مع عناصر أساسية فقط',
      preview: '🔲'
    },
    { 
      value: 'classic', 
      label: 'كلاسيكي', 
      description: 'تصميم تقليدي أنيق مع شريط علوي',
      preview: '📋'
    },
    { 
      value: 'modern', 
      label: 'عصري', 
      description: 'تصميم حديث مع تأثيرات بصرية متطورة',
      preview: '🎨'
    },
    { 
      value: 'elegant', 
      label: 'أنيق', 
      description: 'تصميم راقي وفاخر مع تفاصيل دقيقة',
      preview: '💎'
    },
    { 
      value: 'bold', 
      label: 'جريء', 
      description: 'تصميم قوي وملفت مع ألوان زاهية',
      preview: '⚡'
    },
    { 
      value: 'creative', 
      label: 'إبداعي', 
      description: 'تصميم مبتكر ومميز مع عناصر فنية',
      preview: '🎭'
    },
    { 
      value: 'ecommerce', 
      label: 'تجاري', 
      description: 'مصمم خصيصاً للمتاجر الإلكترونية',
      preview: '🛒'
    },
    { 
      value: 'corporate', 
      label: 'مؤسسي', 
      description: 'تصميم مهني للشركات والمؤسسات',
      preview: '🏢'
    },
    { 
      value: 'fashion', 
      label: 'أزياء', 
      description: 'تصميم عصري مناسب لمتاجر الأزياء',
      preview: '👗'
    },
    { 
      value: 'tech', 
      label: 'تقني', 
      description: 'تصميم حديث للشركات التقنية',
      preview: '💻'
    }
  ];

  const layoutOptions = [
    { value: 'horizontal', label: 'أفقي', description: 'تخطيط تقليدي أفقي' },
    { value: 'centered', label: 'وسط', description: 'الشعار في الوسط والقوائم على الجانبين' },
    { value: 'split', label: 'منقسم', description: 'الشعار على جانب والقوائم على الجانب الآخر' },
    { value: 'stacked', label: 'مكدس', description: 'الشعار فوق القوائم' },
    { value: 'sidebar', label: 'شريط جانبي', description: 'قائمة جانبية قابلة للطي' }
  ];

  const positionOptions = [
    { value: 'static', label: 'ثابت', description: 'يتحرك مع الصفحة' },
    { value: 'sticky', label: 'لاصق', description: 'يلتصق بأعلى الصفحة عند التمرير' },
    { value: 'fixed', label: 'مثبت', description: 'مثبت في أعلى الصفحة دائماً' },
    { value: 'transparent', label: 'شفاف', description: 'خلفية شفافة فوق المحتوى' }
  ];

  const tabs = [
    { id: 'style', label: 'النمط والتخطيط', icon: Layout },
    { id: 'navigation', label: 'القائمة والتنقل', icon: Settings },
    { id: 'mobile', label: 'الجوال', icon: Smartphone },
    { id: 'topbar', label: 'الشريط العلوي', icon: Monitor },
    { id: 'announcement', label: 'شريط الإعلانات', icon: Eye },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Style and Layout Tab */}
      {activeTab === 'style' && (
        <div className="space-y-6">
          {/* Header Styles */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">نمط الهيدر</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {headerStyles.map((style) => (
                <div
                  key={style.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    settings.header.style === style.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleHeaderChange('style', style.value)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{style.preview}</span>
                    <h4 className="font-medium">{style.label}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{style.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Layout Options */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">تخطيط الهيدر</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layoutOptions.map((layout) => (
                <div
                  key={layout.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.header.layout === layout.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleHeaderChange('layout', layout.value)}
                >
                  <h4 className="font-medium mb-1">{layout.label}</h4>
                  <p className="text-sm text-gray-600">{layout.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Position Options */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">موضع الهيدر</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {positionOptions.map((position) => (
                <div
                  key={position.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.header.position === position.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleHeaderChange('position', position.value)}
                >
                  <h4 className="font-medium mb-1">{position.label}</h4>
                  <p className="text-sm text-gray-600">{position.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Logo Settings */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">إعدادات الشعار</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">موضع الشعار</label>
                <select
                  value={settings.header.logoPosition}
                  onChange={(e) => handleHeaderChange('logoPosition', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="left">يسار</option>
                  <option value="center">وسط</option>
                  <option value="right">يمين</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">حجم الشعار</label>
                <select
                  value={settings.header.logoSize}
                  onChange={(e) => handleHeaderChange('logoSize', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="small">صغير (32px)</option>
                  <option value="medium">متوسط (48px)</option>
                  <option value="large">كبير (64px)</option>
                  <option value="custom">مخصص</option>
                </select>
              </div>

              {settings.header.logoSize === 'custom' && (
                <div>
                  <label className="block text-sm font-medium mb-2">الحجم المخصص (px)</label>
                  <input
                    type="number"
                    min="20"
                    max="200"
                    value={settings.header.customLogoSize || 48}
                    onChange={(e) => handleHeaderChange('customLogoSize', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Colors and Styling */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">الألوان والتصميم</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">لون الخلفية</label>
                <input
                  type="color"
                  value={settings.header.backgroundColor}
                  onChange={(e) => handleHeaderChange('backgroundColor', e.target.value)}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">لون النص</label>
                <input
                  type="color"
                  value={settings.header.textColor}
                  onChange={(e) => handleHeaderChange('textColor', e.target.value)}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2">الظل</label>
                <select
                  value={settings.header.shadow}
                  onChange={(e) => handleHeaderChange('shadow', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">بدون ظل</option>
                  <option value="small">ظل صغير</option>
                  <option value="medium">ظل متوسط</option>
                  <option value="large">ظل كبير</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.header.borderBottom}
                    onChange={(e) => handleHeaderChange('borderBottom', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">حد سفلي</span>
                </label>
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">الميزات الإضافية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.header.showSearch}
                  onChange={(e) => handleHeaderChange('showSearch', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">إظهار البحث</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.header.showLanguage}
                  onChange={(e) => handleHeaderChange('showLanguage', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">اختيار اللغة</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.header.showCurrency}
                  onChange={(e) => handleHeaderChange('showCurrency', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">اختيار العملة</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.header.showAccount}
                  onChange={(e) => handleHeaderChange('showAccount', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">حساب المستخدم</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.header.showWishlist}
                  onChange={(e) => handleHeaderChange('showWishlist', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">قائمة الأمنيات</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.header.showBreadcrumbs}
                  onChange={(e) => handleHeaderChange('showBreadcrumbs', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">مسار التنقل</span>
              </label>
            </div>

            {settings.header.showSearch && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">نمط البحث</label>
                <select
                  value={settings.header.searchStyle}
                  onChange={(e) => handleHeaderChange('searchStyle', e.target.value)}
                  className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="simple">بسيط</option>
                  <option value="expanded">موسع</option>
                  <option value="overlay">طبقة علوية</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Tab */}
      {activeTab === 'navigation' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">قائمة التنقل</h3>
            <button
              onClick={() => {
                setEditingNavItem(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={20} />
              إضافة عنصر
            </button>
          </div>

          <div className="space-y-3">
            {settings.header.navigation.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Move className="w-4 h-4 text-gray-400 cursor-move" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{item.label}</h4>
                      {item.badge && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.type === 'link' && 'رابط مخصص'}
                      {item.type === 'page' && 'صفحة'}
                      {item.type === 'category' && 'فئة منتجات'}
                      {item.type === 'dropdown' && 'قائمة منسدلة'}
                      {item.type === 'megamenu' && 'قائمة كبيرة'}
                      {item.url && ` - ${item.url}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleNavigationItemVisibility(item.id)}
                    className={`p-2 rounded ${
                      item.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {item.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => {
                      setEditingNavItem(item);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteNavigationItem(item.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Tab */}
      {activeTab === 'mobile' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-6">إعدادات الجوال</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">نمط القائمة في الجوال</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'slide', label: 'انزلاق', description: 'تنزلق من الجانب' },
                  { value: 'overlay', label: 'طبقة علوية', description: 'تظهر فوق المحتوى' },
                  { value: 'push', label: 'دفع', description: 'تدفع المحتوى للجانب' },
                  { value: 'dropdown', label: 'منسدلة', description: 'تنسدل من الأعلى' }
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      settings.header.mobileMenuStyle === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleHeaderChange('mobileMenuStyle', option.value)}
                  >
                    <h4 className="font-medium mb-1">{option.label}</h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar Tab */}
      {activeTab === 'topbar' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">الشريط العلوي</h3>
            <button
              onClick={() => handleTopBarChange('enabled', !settings.header.topBar.enabled)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                settings.header.topBar.enabled
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {settings.header.topBar.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.header.topBar.enabled ? 'مفعل' : 'غير مفعل'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">النص</label>
              <input
                type="text"
                value={settings.header.topBar.text}
                onChange={(e) => handleTopBarChange('text', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="شحن مجاني للطلبات فوق 100 ريال"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">لون الخلفية</label>
                <input
                  type="color"
                  value={settings.header.topBar.backgroundColor}
                  onChange={(e) => handleTopBarChange('backgroundColor', e.target.value)}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">لون النص</label>
                <input
                  type="color"
                  value={settings.header.topBar.textColor}
                  onChange={(e) => handleTopBarChange('textColor', e.target.value)}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.header.topBar.showSocial}
                  onChange={(e) => handleTopBarChange('showSocial', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">إظهار وسائل التواصل</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.header.topBar.showContact}
                  onChange={(e) => handleTopBarChange('showContact', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">إظهار معلومات الاتصال</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Announcement Tab */}
      {activeTab === 'announcement' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">شريط الإعلانات</h3>
            <button
              onClick={() => handleAnnouncementChange('enabled', !settings.header.announcement.enabled)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                settings.header.announcement.enabled
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {settings.header.announcement.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.header.announcement.enabled ? 'مفعل' : 'غير مفعل'}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">نص الإعلان</label>
              <textarea
                value={settings.header.announcement.text}
                onChange={(e) => handleAnnouncementChange('text', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="🎉 عرض خاص: خصم 50% على جميع المنتجات لفترة محدودة!"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">لون الخلفية</label>
                <input
                  type="color"
                  value={settings.header.announcement.backgroundColor}
                  onChange={(e) => handleAnnouncementChange('backgroundColor', e.target.value)}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">لون النص</label>
                <input
                  type="color"
                  value={settings.header.announcement.textColor}
                  onChange={(e) => handleAnnouncementChange('textColor', e.target.value)}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">الموضع</label>
                <select
                  value={settings.header.announcement.position}
                  onChange={(e) => handleAnnouncementChange('position', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="top">أعلى الصفحة</option>
                  <option value="bottom">أسفل الصفحة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الحركة</label>
                <select
                  value={settings.header.announcement.animation}
                  onChange={(e) => handleAnnouncementChange('animation', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="none">بدون حركة</option>
                  <option value="slide">انزلاق</option>
                  <option value="fade">تلاشي</option>
                  <option value="bounce">ارتداد</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.header.announcement.dismissible}
                    onChange={(e) => handleAnnouncementChange('dismissible', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">قابل للإغلاق</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Item Modal */}
      {isModalOpen && (
        <NavigationItemModal
          item={editingNavItem}
          pages={[]} // You can pass pages here if needed
          categories={[]} // You can pass categories here if needed
          onSave={editingNavItem ? 
            (item) => updateNavigationItem(editingNavItem.id, item) : 
            addNavigationItem
          }
          onClose={() => {
            setIsModalOpen(false);
            setEditingNavItem(null);
          }}
        />
      )}
    </div>
  );
}

// Navigation Item Modal Component
function NavigationItemModal({ 
  item, 
  pages,
  categories,
  onSave, 
  onClose 
}: { 
  item: NavigationItem | null;
  pages: any[];
  categories: any[];
  onSave: (item: Omit<NavigationItem, 'id' | 'order'>) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    label: item?.label || '',
    type: item?.type || 'link' as NavigationItem['type'],
    url: item?.url || '',
    pageId: item?.pageId || '',
    categoryId: item?.categoryId || '',
    isVisible: item?.isVisible ?? true,
    children: item?.children || [],
    icon: item?.icon || '',
    badge: item?.badge || '',
    target: item?.target || '_self' as NavigationItem['target'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label) {
      alert('يرجى إدخال تسمية العنصر');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {item ? 'تعديل عنصر التنقل' : 'إضافة عنصر تنقل'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">التسمية</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">النوع</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as NavigationItem['type'] }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="link">رابط مخصص</option>
              <option value="page">صفحة</option>
              <option value="category">فئة منتجات</option>
              <option value="dropdown">قائمة منسدلة</option>
              <option value="megamenu">قائمة كبيرة</option>
            </select>
          </div>

          {formData.type === 'link' && (
            <div>
              <label className="block text-sm font-medium mb-2">الرابط</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">أيقونة (اختياري)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="home, user, shopping-cart"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">شارة (اختياري)</label>
              <input
                type="text"
                value={formData.badge}
                onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="جديد، عرض"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">فتح الرابط في</label>
            <select
              value={formData.target}
              onChange={(e) => setFormData(prev => ({ ...prev, target: e.target.value as NavigationItem['target'] }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="_self">نفس النافذة</option>
              <option value="_blank">نافذة جديدة</option>
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isVisible}
              onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">مرئي في القائمة</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {item ? 'حفظ التغييرات' : 'إضافة العنصر'}
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