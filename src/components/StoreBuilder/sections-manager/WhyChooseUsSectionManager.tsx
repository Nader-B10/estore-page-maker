import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Eye, EyeOff, Palette } from 'lucide-react';
import { StoreSettings, WhyChooseUsItem } from '../../../types/store';
import { getAvailableFeatures } from '../../../utils/componentRegistry';

interface WhyChooseUsSectionManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function WhyChooseUsSectionManager({ settings, onUpdateSettings }: WhyChooseUsSectionManagerProps) {
  const [editingWhyItem, setEditingWhyItem] = useState<WhyChooseUsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availableFeatures = getAvailableFeatures();

  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
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

  return (
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

      {/* Modal for Why Choose Us */}
      {isModalOpen && (
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