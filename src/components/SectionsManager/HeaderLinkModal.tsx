import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { HeaderLink } from '../../types/store';
import { useStore } from '../../contexts/StoreContext';

interface HeaderLinkModalProps {
  item: HeaderLink | null;
  onSave: (item: Omit<HeaderLink, 'id'>) => void;
  onClose: () => void;
}

export default function HeaderLinkModal({ item, onSave, onClose }: HeaderLinkModalProps) {
  const { storeData } = useStore();
  const defaultProductsPage = storeData.pages.find(p => p.isDefault && p.showAllProducts);
  const [formData, setFormData] = useState({ text: '', link: '' });

  useEffect(() => {
    if (item) {
      setFormData({ text: item.text, link: item.link });
    } else {
      setFormData({ text: '', link: '' });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text || !formData.link) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{item ? 'تعديل الرابط' : 'إضافة رابط جديد'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">نص الرابط (مثال: المنتجات)</label>
            <input type="text" value={formData.text} onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الرابط (مثال: #products)</label>
            <select 
              value={formData.link} 
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))} 
              className="w-full p-3 border border-gray-300 rounded-lg mb-2"
            >
              <option value="">اختر رابط...</option>
              <option value="#all-products">قسم جميع المنتجات</option>
              {defaultProductsPage && (
                <option value={`/${defaultProductsPage.slug}`}>صفحة {defaultProductsPage.title}</option>
              )}
              <option value="#featured-products">المنتجات المميزة</option>
              <option value="#best-sellers">الأعلى مبيعاً</option>
              <option value="#on-sale">العروض والتخفيضات</option>
              <option value="#why-us">لماذا تختارنا</option>
              <option value="#faq">الأسئلة الشائعة</option>
            </select>
            <input 
              type="text" 
              value={formData.link} 
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))} 
              className="w-full p-3 border border-gray-300 rounded-lg" 
              placeholder="أو أدخل رابط مخصص"
              required 
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">{item ? 'حفظ التغييرات' : 'إضافة الرابط'}</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
