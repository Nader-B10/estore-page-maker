import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { WhyChooseUsItem } from '../../types/store';

interface WhyChooseUsModalProps {
  item: WhyChooseUsItem | null;
  onSave: (item: Omit<WhyChooseUsItem, 'id'>) => void;
  onClose: () => void;
}

export default function WhyChooseUsModal({ item, onSave, onClose }: WhyChooseUsModalProps) {
  const [formData, setFormData] = useState({ icon: 'star', title: '', description: '' });

  useEffect(() => {
    if (item) {
      setFormData({ icon: item.icon, title: item.title, description: item.description });
    } else {
      setFormData({ icon: 'star', title: '', description: '' });
    }
  }, [item]);

  const iconOptions = [
    { value: 'truck', label: 'شحن' }, { value: 'shield', label: 'حماية' }, { value: 'headphones', label: 'دعم' },
    { value: 'star', label: 'نجمة' }, { value: 'heart', label: 'قلب' }, { value: 'check', label: 'صح' },
    { value: 'gift', label: 'هدية' }, { value: 'clock', label: 'وقت' },
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
          <h3 className="text-lg font-semibold">{item ? 'تعديل الميزة' : 'إضافة ميزة جديدة'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">الأيقونة</label>
            <select value={formData.icon} onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg">
              {iconOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">العنوان</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الوصف</label>
            <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg" rows={3} required />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">{item ? 'حفظ التغييرات' : 'إضافة الميزة'}</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
