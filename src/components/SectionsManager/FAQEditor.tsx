import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { FAQItem } from '../../types/store';
import FAQModal from './FAQModal';

export default function FAQEditor() {
  const { storeData, updateSection } = useStore();
  const { faq } = storeData.settings.sections;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);

  const handleChange = (field: string, value: any) => {
    updateSection('faq', { data: { [field]: value } });
  };

  const handleToggleEnabled = () => {
    updateSection('faq', { enabled: !faq.enabled });
  };

  const handleSaveItem = (itemData: Omit<FAQItem, 'id'>) => {
    if (editingItem) {
      const updatedItems = faq.data.items.map(i => i.id === editingItem.id ? { ...i, ...itemData } : i);
      handleChange('items', updatedItems);
    } else {
      const newItem: FAQItem = { ...itemData, id: Date.now().toString() };
      handleChange('items', [...faq.data.items, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    handleChange('items', faq.data.items.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">الأسئلة الشائعة</h3>
        <div className="flex items-center gap-3">
          <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700">
            <Plus size={16} /> إضافة سؤال
          </button>
          <button onClick={handleToggleEnabled} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${faq.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
            {faq.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            {faq.enabled ? 'مفعل' : 'غير مفعل'}
          </button>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">العنوان</label>
          <input type="text" value={faq.data.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
          <input type="text" value={faq.data.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
      </div>
      <div className="space-y-3">
        {faq.data.items.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{item.question}</h4>
              <div className="flex gap-1">
                <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={14} /></button>
                <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
      {isModalOpen && <FAQModal item={editingItem} onSave={handleSaveItem} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
