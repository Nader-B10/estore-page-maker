import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SocialLink } from '../../types/store';

interface SocialLinkModalProps {
  item: SocialLink | null;
  onSave: (item: Omit<SocialLink, 'id'>) => void;
  onClose: () => void;
}

const socialPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'] as const;

export default function SocialLinkModal({ item, onSave, onClose }: SocialLinkModalProps) {
  const [formData, setFormData] = useState<{ platform: typeof socialPlatforms[number], url: string }>({ platform: 'facebook', url: '' });

  useEffect(() => {
    if (item) {
      setFormData({ platform: item.platform, url: item.url });
    } else {
      setFormData({ platform: 'facebook', url: '' });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) {
      alert('يرجى إدخال رابط URL');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{item ? 'تعديل رابط التواصل' : 'إضافة رابط تواصل جديد'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">المنصة</label>
            <select value={formData.platform} onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value as typeof socialPlatforms[number] }))} className="w-full p-3 border border-gray-300 rounded-lg">
              {socialPlatforms.map(p => <option key={p} value={p} className="capitalize">{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">رابط URL الكامل</label>
            <input type="url" value={formData.url} onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg" required placeholder="https://www.facebook.com/username" />
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
