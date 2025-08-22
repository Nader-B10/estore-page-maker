import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FAQItem } from '../../types/store';

interface FAQModalProps {
  item: FAQItem | null;
  onSave: (item: Omit<FAQItem, 'id'>) => void;
  onClose: () => void;
}

export default function FAQModal({ item, onSave, onClose }: FAQModalProps) {
  const [formData, setFormData] = useState({ question: '', answer: '' });

  useEffect(() => {
    if (item) {
      setFormData({ question: item.question, answer: item.answer });
    } else {
      setFormData({ question: '', answer: '' });
    }
  }, [item]);

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
          <h3 className="text-lg font-semibold">{item ? 'تعديل السؤال' : 'إضافة سؤال جديد'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">السؤال</label>
            <input type="text" value={formData.question} onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الإجابة</label>
            <textarea value={formData.answer} onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg" rows={4} required />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">{item ? 'حفظ التغييرات' : 'إضافة السؤال'}</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
