import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { HeaderLink } from '../../types/store';
import HeaderLinkModal from './HeaderLinkModal';

export default function HeaderEditor() {
  const { storeData, updateSection } = useStore();
  const { header } = storeData.settings.sections;
  const defaultProductsPage = storeData.pages.find(p => p.isDefault && p.showAllProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HeaderLink | null>(null);

  const handleToggleEnabled = () => {
    updateSection('header', { enabled: !header.enabled });
  };

  const handleSaveItem = (itemData: Omit<HeaderLink, 'id'>) => {
    if (editingItem) {
      const updatedItems = header.data.links.map(i => i.id === editingItem.id ? { ...i, ...itemData } : i);
      updateSection('header', { data: { links: updatedItems } });
    } else {
      const newItem: HeaderLink = { ...itemData, id: Date.now().toString() };
      updateSection('header', { data: { links: [...header.data.links, newItem] } });
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = header.data.links.filter(i => i.id !== id);
    updateSection('header', { data: { links: updatedItems } });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">محرر الهيدر (الرأس)</h3>
        <button onClick={handleToggleEnabled} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${header.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {header.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          {header.enabled ? 'مفعل' : 'غير مفعل'}
        </button>
      </div>

      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded-r-lg">
        <p className="font-medium">ملاحظة:</p>
        <p className="text-sm">يتم التحكم في "اسم المتجر" و "الشعار" من <b className="font-semibold">الإعدادات العامة</b>. 
        {defaultProductsPage && (
          <span> يمكنك ربط رابط "المنتجات" بصفحة <b>/{defaultProductsPage.slug}</b></span>
        )}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold">روابط التنقل</h4>
        <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700">
          <Plus size={16} /> إضافة رابط
        </button>
      </div>

      <div className="space-y-3">
        {header.data.links.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex justify-between items-center">
            <div>
              <p className="font-medium">{item.text}</p>
              <p className="text-xs text-gray-500">{item.link}</p>
            </div>
            <div className="flex gap-1">
              <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={14} /></button>
              <button onClick={() => handleDeleteItem(item.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && <HeaderLinkModal item={editingItem} onSave={handleSaveItem} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
