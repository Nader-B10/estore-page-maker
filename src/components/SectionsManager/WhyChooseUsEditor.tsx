import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { WhyChooseUsItem } from '../../types/store';
import WhyChooseUsModal from './WhyChooseUsModal';

export default function WhyChooseUsEditor() {
  const { storeData, updateSection } = useStore();
  const { whyChooseUs } = storeData.settings.sections;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WhyChooseUsItem | null>(null);

  const handleChange = (field: string, value: any) => {
    updateSection('whyChooseUs', { data: { [field]: value } });
  };

  const handleToggleEnabled = () => {
    updateSection('whyChooseUs', { enabled: !whyChooseUs.enabled });
  };

  const handleSaveItem = (itemData: Omit<WhyChooseUsItem, 'id'>) => {
    if (editingItem) {
      const updatedItems = whyChooseUs.data.items.map(i => i.id === editingItem.id ? { ...i, ...itemData } : i);
      handleChange('items', updatedItems);
    } else {
      const newItem: WhyChooseUsItem = { ...itemData, id: Date.now().toString() };
      handleChange('items', [...whyChooseUs.data.items, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    handleChange('items', whyChooseUs.data.items.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">لماذا تختارنا</h3>
        <div className="flex items-center gap-3">
          <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700">
            <Plus size={16} /> إضافة ميزة
          </button>
          <button onClick={handleToggleEnabled} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${whyChooseUs.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
            {whyChooseUs.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            {whyChooseUs.enabled ? 'مفعل' : 'غير مفعل'}
          </button>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">العنوان</label>
          <input type="text" value={whyChooseUs.data.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
          <input type="text" value={whyChooseUs.data.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {whyChooseUs.data.items.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">{item.title}</h4>
              <div className="flex gap-1">
                <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={14} /></button>
                <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-xs text-gray-500 mt-1">أيقونة: {item.icon}</p>
          </div>
        ))}
      </div>
      {isModalOpen && <WhyChooseUsModal item={editingItem} onSave={handleSaveItem} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
