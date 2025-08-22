import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { StoreSettings } from '../../../types';
import { getAvailableFeatures } from '../../../registry';

interface WhyChooseUsSectionManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function WhyChooseUsSectionManager({ settings, onUpdateSettings }: WhyChooseUsSectionManagerProps) {
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [itemFormData, setItemFormData] = useState({
    title: '',
    description: '',
    icon: 'star'
  });

  const availableFeatures = getAvailableFeatures();

  const handleWhyChooseUsChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      whyChooseUs: {
        ...settings.whyChooseUs,
        [field]: value,
      },
    });
  };

  const handleTemplateChange = (templateId: string) => {
    onUpdateSettings({
      ...settings,
      featuresTemplate: templateId,
    });
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setItemFormData({ title: '', description: '', icon: 'star' });
    setIsItemModalOpen(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setItemFormData({ title: item.title, description: item.description, icon: item.icon });
    setIsItemModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!itemFormData.title || !itemFormData.description) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const newItem = {
      id: editingItem?.id || Date.now().toString(),
      title: itemFormData.title,
      description: itemFormData.description,
      icon: itemFormData.icon,
    };

    const updatedItems = editingItem
      ? settings.whyChooseUs.items.map(item => item.id === editingItem.id ? newItem : item)
      : [...settings.whyChooseUs.items, newItem];

    handleWhyChooseUsChange('items', updatedItems);
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedItems = settings.whyChooseUs.items.filter(item => item.id !== itemId);
    handleWhyChooseUsChange('items', updatedItems);
  };

  const iconOptions = [
    { value: 'truck', label: 'شحن' },
    { value: 'shield', label: 'حماية' },
    { value: 'headphones', label: 'دعم' },
    { value: 'star', label: 'نجمة' },
    { value: 'heart', label: 'قلب' },
    { value: 'check', label: 'صح' },
    { value: 'gift', label: 'هدية' },
    { value: 'clock', label: 'وقت' },
    { value: 'zap', label: 'سرعة' },
    { value: 'award', label: 'جائزة' },
  ];

  return (
    <div className="space-y-6">
      {/* Section Settings */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">إعدادات قسم لماذا تختارنا</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={settings.whyChooseUs.enabled}
                onChange={(e) => handleWhyChooseUsChange('enabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">تفعيل قسم لماذا تختارنا</span>
            </label>
          </div>

          {settings.whyChooseUs.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                <input
                  type="text"
                  value={settings.whyChooseUs.title}
                  onChange={(e) => handleWhyChooseUsChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="لماذا تختارنا؟"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <input
                  type="text"
                  value={settings.whyChooseUs.subtitle}
                  onChange={(e) => handleWhyChooseUsChange('subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="نحن نقدم أفضل تجربة تسوق"
                />
              </div>

              {/* Items Management */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">الميزات</h4>
                  <button
                    onClick={handleAddItem}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
                  >
                    <Plus size={16} />
                    إضافة ميزة
                  </button>
                </div>

                <div className="space-y-3">
                  {settings.whyChooseUs.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 text-sm">🎯</span>
                        </div>
                        <div>
                          <h5 className="font-medium">{item.title}</h5>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Template Selection */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">قوالب الميزات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableFeatures.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className={`p-4 rounded-lg border-2 transition-all text-right ${
                settings.featuresTemplate === template.id
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="mb-2">
                <h4 className="font-semibold text-red-700">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {template.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Item Modal */}
      {isItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingItem ? 'تعديل الميزة' : 'إضافة ميزة جديدة'}
              </h3>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان الميزة</label>
                <input
                  type="text"
                  value={itemFormData.title}
                  onChange={(e) => setItemFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: شحن سريع"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف الميزة</label>
                <textarea
                  value={itemFormData.description}
                  onChange={(e) => setItemFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="توصيل مجاني خلال 24 ساعة"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الأيقونة</label>
                <select
                  value={itemFormData.icon}
                  onChange={(e) => setItemFormData(prev => ({ ...prev, icon: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={handleSaveItem}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                {editingItem ? 'حفظ التغييرات' : 'إضافة الميزة'}
              </button>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}