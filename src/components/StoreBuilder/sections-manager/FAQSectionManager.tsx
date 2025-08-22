import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Eye, EyeOff, Palette } from 'lucide-react';
import { StoreSettings, FAQItem } from '../../../types/store';
import { getAvailableFAQs } from '../../../utils/componentRegistry';

interface FAQSectionManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function FAQSectionManager({ settings, onUpdateSettings }: FAQSectionManagerProps) {
  const [editingFAQItem, setEditingFAQItem] = useState<FAQItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const availableFAQs = getAvailableFAQs();

  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
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

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-indigo-600" />
          اختيار قالب الأسئلة الشائعة
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {availableFAQs.map((template) => (
            <div
              key={template.id}
              onClick={() => handleChange('faqTemplate', template.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                settings.faqTemplate === template.id
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
            >
              {settings.faqTemplate === template.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              
              <div className="mb-3">
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                  <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              <h5 className="font-semibold text-gray-800 mb-2">{template.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
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

      {/* Modal for FAQ */}
      {isModalOpen && (
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