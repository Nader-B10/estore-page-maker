import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Layout, Link, Mail, Phone, MapPin } from 'lucide-react';
import { FooterSettings, FooterColumn, FooterItem, SocialMediaLink, StoreSettings } from '../../types/store';

interface FooterSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function FooterSettingsComponent({ settings, onUpdateSettings }: FooterSettingsProps) {
  const [activeTab, setActiveTab] = useState('style');
  const [editingColumn, setEditingColumn] = useState<FooterColumn | null>(null);
  const [editingItem, setEditingItem] = useState<FooterItem | null>(null);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const handleFooterChange = (field: keyof FooterSettings, value: any) => {
    onUpdateSettings({
      ...settings,
      footer: {
        ...settings.footer,
        [field]: value,
      },
    });
  };

  const addFooterColumn = (column: Omit<FooterColumn, 'id' | 'order'>) => {
    const newColumn: FooterColumn = {
      ...column,
      id: Date.now().toString(),
      order: settings.footer.columns.length,
    };
    
    handleFooterChange('columns', [...settings.footer.columns, newColumn]);
    setIsColumnModalOpen(false);
    setEditingColumn(null);
  };

  const updateFooterColumn = (id: string, column: Omit<FooterColumn, 'id' | 'order'>) => {
    const updatedColumns = settings.footer.columns.map(col => 
      col.id === id ? { ...column, id, order: col.order } : col
    );
    handleFooterChange('columns', updatedColumns);
    setIsColumnModalOpen(false);
    setEditingColumn(null);
  };

  const deleteFooterColumn = (id: string) => {
    const updatedColumns = settings.footer.columns.filter(col => col.id !== id);
    handleFooterChange('columns', updatedColumns);
  };

  const addFooterItem = (columnId: string, item: Omit<FooterItem, 'id'>) => {
    const newItem: FooterItem = {
      ...item,
      id: Date.now().toString(),
    };
    
    const updatedColumns = settings.footer.columns.map(col => 
      col.id === columnId 
        ? { ...col, items: [...col.items, newItem] }
        : col
    );
    handleFooterChange('columns', updatedColumns);
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const updateFooterItem = (columnId: string, itemId: string, item: Omit<FooterItem, 'id'>) => {
    const updatedColumns = settings.footer.columns.map(col => 
      col.id === columnId 
        ? { 
            ...col, 
            items: col.items.map(i => i.id === itemId ? { ...item, id: itemId } : i)
          }
        : col
    );
    handleFooterChange('columns', updatedColumns);
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const deleteFooterItem = (columnId: string, itemId: string) => {
    const updatedColumns = settings.footer.columns.map(col => 
      col.id === columnId 
        ? { ...col, items: col.items.filter(i => i.id !== itemId) }
        : col
    );
    handleFooterChange('columns', updatedColumns);
  };

  const addSocialMedia = (social: Omit<SocialMediaLink, 'id'>) => {
    const newSocial: SocialMediaLink = {
      ...social,
      id: Date.now().toString(),
    };
    
    handleFooterChange('socialMedia', [...settings.footer.socialMedia, newSocial]);
  };

  const footerStyles = [
    { 
      value: 'minimal', 
      label: 'بسيط', 
      description: 'تصميم نظيف مع معلومات أساسية فقط',
      preview: '▬'
    },
    { 
      value: 'classic', 
      label: 'كلاسيكي', 
      description: 'تصميم تقليدي مع أعمدة متعددة',
      preview: '▦'
    },
    { 
      value: 'modern', 
      label: 'عصري', 
      description: 'تصميم حديث مع تأثيرات بصرية',
      preview: '▣'
    },
    { 
      value: 'detailed', 
      label: 'مفصل', 
      description: 'تصميم شامل مع جميع المعلومات',
      preview: '▤'
    },
    { 
      value: 'corporate', 
      label: 'مؤسسي', 
      description: 'تصميم مهني للشركات',
      preview: '▥'
    },
    { 
      value: 'creative', 
      label: 'إبداعي', 
      description: 'تصميم مبتكر ومميز',
      preview: '▨'
    }
  ];

  const layoutOptions = [
    { value: 'columns', label: 'أعمدة', description: 'تخطيط بأعمدة متعددة' },
    { value: 'centered', label: 'وسط', description: 'محتوى في الوسط' },
    { value: 'split', label: 'منقسم', description: 'قسمين رئيسيين' }
  ];

  const tabs = [
    { id: 'style', label: 'النمط والتخطيط', icon: Layout },
    { id: 'columns', label: 'الأعمدة والمحتوى', icon: Plus },
    { id: 'social', label: 'وسائل التواصل', icon: Link },
    { id: 'newsletter', label: 'النشرة الإخبارية', icon: Mail },
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

      {/* Style Tab */}
      {activeTab === 'style' && (
        <div className="space-y-6">
          {/* Footer Styles */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">نمط الفوتر</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {footerStyles.map((style) => (
                <div
                  key={style.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    settings.footer.style === style.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleFooterChange('style', style.value)}
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
            <h3 className="text-lg font-semibold mb-6">تخطيط الفوتر</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {layoutOptions.map((layout) => (
                <div
                  key={layout.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    settings.footer.layout === layout.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleFooterChange('layout', layout.value)}
                >
                  <h4 className="font-medium mb-1">{layout.label}</h4>
                  <p className="text-sm text-gray-600">{layout.description}</p>
                </div>
              ))}
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
                  value={settings.footer.backgroundColor}
                  onChange={(e) => handleFooterChange('backgroundColor', e.target.value)}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">لون النص</label>
                <input
                  type="color"
                  value={settings.footer.textColor}
                  onChange={(e) => handleFooterChange('textColor', e.target.value)}
                  className="w-full h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">العرض الأقصى</label>
              <select
                value={settings.footer.maxWidth}
                onChange={(e) => handleFooterChange('maxWidth', e.target.value)}
                className="w-full md:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="small">صغير (768px)</option>
                <option value="medium">متوسط (1024px)</option>
                <option value="large">كبير (1280px)</option>
                <option value="full">كامل العرض</option>
              </select>
            </div>
          </div>

          {/* Additional Options */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">خيارات إضافية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.footer.showBackToTop}
                  onChange={(e) => handleFooterChange('showBackToTop', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">زر العودة للأعلى</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.footer.showCopyright}
                  onChange={(e) => handleFooterChange('showCopyright', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">نص حقوق الطبع</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={settings.footer.showPaymentMethods}
                  onChange={(e) => handleFooterChange('showPaymentMethods', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">طرق الدفع</span>
              </label>
            </div>

            {settings.footer.showCopyright && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">نص حقوق الطبع</label>
                <input
                  type="text"
                  value={settings.footer.copyrightText}
                  onChange={(e) => handleFooterChange('copyrightText', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="© 2024 اسم المتجر. جميع الحقوق محفوظة."
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Columns Tab */}
      {activeTab === 'columns' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">أعمدة الفوتر</h3>
            <button
              onClick={() => {
                setEditingColumn(null);
                setIsColumnModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus size={20} />
              إضافة عمود
            </button>
          </div>

          <div className="space-y-4">
            {settings.footer.columns.map((column) => (
              <div key={column.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">{column.title}</h4>
                    <p className="text-sm text-gray-600">
                      {column.type === 'links' && 'روابط'}
                      {column.type === 'contact' && 'معلومات الاتصال'}
                      {column.type === 'text' && 'نص'}
                      {column.type === 'custom' && 'مخصص'}
                      {column.type === 'newsletter' && 'نشرة إخبارية'}
                      {column.type === 'social' && 'وسائل التواصل'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const updatedColumns = settings.footer.columns.map(col => 
                          col.id === column.id ? { ...col, isVisible: !col.isVisible } : col
                        );
                        handleFooterChange('columns', updatedColumns);
                      }}
                      className={`p-2 rounded ${
                        column.isVisible ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      {column.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => {
                        setEditingColumn(column);
                        setIsColumnModalOpen(true);
                      }}
                      className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteFooterColumn(column.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Column Items */}
                <div className="space-y-2">
                  {column.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        {item.type === 'email' && <Mail size={14} />}
                        {item.type === 'phone' && <Phone size={14} />}
                        {item.type === 'address' && <MapPin size={14} />}
                        {item.type === 'link' && <Link size={14} />}
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setIsItemModalOpen(true);
                          }}
                          className="text-blue-600 hover:bg-blue-100 p-1 rounded text-xs"
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          onClick={() => deleteFooterItem(column.id, item.id)}
                          className="text-red-600 hover:bg-red-100 p-1 rounded text-xs"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setIsItemModalOpen(true);
                    }}
                    className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600"
                  >
                    + إضافة عنصر
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Media Tab */}
      {activeTab === 'social' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">وسائل التواصل الاجتماعي</h3>
            <button
              onClick={() => handleFooterChange('showSocialMedia', !settings.footer.showSocialMedia)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                settings.footer.showSocialMedia
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {settings.footer.showSocialMedia ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.footer.showSocialMedia ? 'مفعل' : 'غير مفعل'}
            </button>
          </div>

          {settings.footer.showSocialMedia && (
            <SocialMediaManager
              socialMedia={settings.footer.socialMedia}
              onUpdate={(socialMedia) => handleFooterChange('socialMedia', socialMedia)}
            />
          )}
        </div>
      )}

      {/* Newsletter Tab */}
      {activeTab === 'newsletter' && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">النشرة الإخبارية</h3>
            <button
              onClick={() => handleFooterChange('showNewsletter', !settings.footer.showNewsletter)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
                settings.footer.showNewsletter
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {settings.footer.showNewsletter ? <Eye size={16} /> : <EyeOff size={16} />}
              {settings.footer.showNewsletter ? 'مفعل' : 'غير مفعل'}
            </button>
          </div>

          {settings.footer.showNewsletter && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان النشرة</label>
                <input
                  type="text"
                  value={settings.footer.newsletterTitle}
                  onChange={(e) => handleFooterChange('newsletterTitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="اشترك في النشرة الإخبارية"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف النشرة</label>
                <textarea
                  value={settings.footer.newsletterDescription}
                  onChange={(e) => handleFooterChange('newsletterDescription', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="احصل على آخر العروض والأخبار مباشرة في بريدك الإلكتروني"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {isColumnModalOpen && (
        <FooterColumnModal
          column={editingColumn}
          onSave={editingColumn ? 
            (column) => updateFooterColumn(editingColumn.id, column) : 
            addFooterColumn
          }
          onClose={() => {
            setIsColumnModalOpen(false);
            setEditingColumn(null);
          }}
        />
      )}

      {isItemModalOpen && (
        <FooterItemModal
          item={editingItem}
          onSave={(item) => {
            // You'll need to pass the column ID here
            const columnId = editingColumn?.id || settings.footer.columns[0]?.id;
            if (columnId) {
              if (editingItem) {
                updateFooterItem(columnId, editingItem.id, item);
              } else {
                addFooterItem(columnId, item);
              }
            }
          }}
          onClose={() => {
            setIsItemModalOpen(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

// Footer Column Modal Component
function FooterColumnModal({ 
  column, 
  onSave, 
  onClose 
}: { 
  column: FooterColumn | null; 
  onSave: (column: Omit<FooterColumn, 'id' | 'order'>) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: column?.title || '',
    type: column?.type || 'links' as FooterColumn['type'],
    isVisible: column?.isVisible ?? true,
    width: column?.width || 'auto' as FooterColumn['width'],
    items: column?.items || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert('يرجى إدخال عنوان العمود');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {column ? 'تعديل العمود' : 'إضافة عمود جديد'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">عنوان العمود</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نوع العمود</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as FooterColumn['type'] }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="links">روابط</option>
              <option value="contact">معلومات الاتصال</option>
              <option value="text">نص</option>
              <option value="custom">مخصص</option>
              <option value="newsletter">نشرة إخبارية</option>
              <option value="social">وسائل التواصل</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">عرض العمود</label>
            <select
              value={formData.width}
              onChange={(e) => setFormData(prev => ({ ...prev, width: e.target.value as FooterColumn['width'] }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="auto">تلقائي</option>
              <option value="small">صغير</option>
              <option value="medium">متوسط</option>
              <option value="large">كبير</option>
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isVisible}
              onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">مرئي في الفوتر</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {column ? 'حفظ التغييرات' : 'إضافة العمود'}
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

// Footer Item Modal Component
function FooterItemModal({ 
  item, 
  onSave, 
  onClose 
}: { 
  item: FooterItem | null; 
  onSave: (item: Omit<FooterItem, 'id'>) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    label: item?.label || '',
    type: item?.type || 'link' as FooterItem['type'],
    value: item?.value || '',
    pageId: item?.pageId || '',
    icon: item?.icon || '',
    target: item?.target || '_self' as FooterItem['target'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label || !formData.value) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {item ? 'تعديل العنصر' : 'إضافة عنصر جديد'}
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
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as FooterItem['type'] }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="link">رابط</option>
              <option value="page">صفحة</option>
              <option value="email">بريد إلكتروني</option>
              <option value="phone">هاتف</option>
              <option value="address">عنوان</option>
              <option value="text">نص</option>
              <option value="social">وسائل التواصل</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {formData.type === 'email' && 'البريد الإلكتروني'}
              {formData.type === 'phone' && 'رقم الهاتف'}
              {formData.type === 'address' && 'العنوان'}
              {formData.type === 'link' && 'الرابط'}
              {formData.type === 'text' && 'النص'}
              {formData.type === 'social' && 'رابط وسائل التواصل'}
              {formData.type === 'page' && 'رابط الصفحة'}
            </label>
            <input
              type={formData.type === 'email' ? 'email' : formData.type === 'phone' ? 'tel' : 'text'}
              value={formData.value}
              onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {(formData.type === 'link' || formData.type === 'social') && (
            <div>
              <label className="block text-sm font-medium mb-2">فتح في</label>
              <select
                value={formData.target}
                onChange={(e) => setFormData(prev => ({ ...prev, target: e.target.value as FooterItem['target'] }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="_self">نفس النافذة</option>
                <option value="_blank">نافذة جديدة</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">أيقونة (اختياري)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="mail, phone, map-pin"
            />
          </div>

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

// Social Media Manager Component
function SocialMediaManager({ 
  socialMedia, 
  onUpdate 
}: { 
  socialMedia: SocialMediaLink[]; 
  onUpdate: (socialMedia: SocialMediaLink[]) => void; 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialMediaLink | null>(null);

  const platforms = [
    { id: 'facebook', name: 'فيسبوك', icon: 'facebook', color: '#1877f2' },
    { id: 'twitter', name: 'تويتر', icon: 'twitter', color: '#1da1f2' },
    { id: 'instagram', name: 'إنستغرام', icon: 'instagram', color: '#e4405f' },
    { id: 'linkedin', name: 'لينكد إن', icon: 'linkedin', color: '#0077b5' },
    { id: 'youtube', name: 'يوتيوب', icon: 'youtube', color: '#ff0000' },
    { id: 'tiktok', name: 'تيك توك', icon: 'tiktok', color: '#000000' },
    { id: 'snapchat', name: 'سناب شات', icon: 'snapchat', color: '#fffc00' },
    { id: 'whatsapp', name: 'واتساب', icon: 'whatsapp', color: '#25d366' },
  ];

  const addSocialMedia = (social: Omit<SocialMediaLink, 'id'>) => {
    const newSocial: SocialMediaLink = {
      ...social,
      id: Date.now().toString(),
    };
    onUpdate([...socialMedia, newSocial]);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const updateSocialMedia = (id: string, social: Omit<SocialMediaLink, 'id'>) => {
    const updated = socialMedia.map(item => 
      item.id === id ? { ...social, id } : item
    );
    onUpdate(updated);
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const deleteSocialMedia = (id: string) => {
    onUpdate(socialMedia.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">حسابات وسائل التواصل</h4>
        <button
          onClick={() => {
            setEditingItem(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          <Plus size={16} className="inline mr-1" />
          إضافة حساب
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {socialMedia.map((item) => {
          const platform = platforms.find(p => p.id === item.platform);
          return (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{ backgroundColor: platform?.color || '#666' }}
                >
                  {platform?.name.charAt(0) || '?'}
                </div>
                <div>
                  <p className="font-medium text-sm">{platform?.name || item.platform}</p>
                  <p className="text-xs text-gray-600 truncate max-w-32">{item.url}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => deleteSocialMedia(item.id)}
                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <SocialMediaModal
          item={editingItem}
          platforms={platforms}
          onSave={editingItem ? 
            (social) => updateSocialMedia(editingItem.id, social) : 
            addSocialMedia
          }
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

// Social Media Modal Component
function SocialMediaModal({ 
  item, 
  platforms,
  onSave, 
  onClose 
}: { 
  item: SocialMediaLink | null;
  platforms: any[];
  onSave: (item: Omit<SocialMediaLink, 'id'>) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    platform: item?.platform || '',
    url: item?.url || '',
    icon: item?.icon || '',
    color: item?.color || '',
  });

  const selectedPlatform = platforms.find(p => p.id === formData.platform);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform || !formData.url) {
      alert('يرجى اختيار المنصة وإدخال الرابط');
      return;
    }
    onSave({
      ...formData,
      icon: selectedPlatform?.icon || formData.icon,
      color: selectedPlatform?.color || formData.color,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {item ? 'تعديل الحساب' : 'إضافة حساب جديد'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">المنصة</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">اختر المنصة</option>
              {platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">رابط الحساب</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://facebook.com/yourpage"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {item ? 'حفظ التغييرات' : 'إضافة الحساب'}
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