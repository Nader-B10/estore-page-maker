import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { SocialLink } from '../../types/store';
import SocialLinkModal from './SocialLinkModal';

export default function FooterEditor() {
  const { storeData, updateSection } = useStore();
  const { footer } = storeData.settings.sections;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialLink | null>(null);

  const handleChange = (field: string, value: any) => {
    updateSection('footer', { data: { [field]: value } });
  };
  
  const handleContactChange = (field: string, value: string) => {
    updateSection('footer', { data: { contactInfo: { ...footer.data.contactInfo, [field]: value } } });
  };

  const handleToggleEnabled = () => {
    updateSection('footer', { enabled: !footer.enabled });
  };

  const handleSaveSocialLink = (itemData: Omit<SocialLink, 'id'>) => {
    if (editingItem) {
      const updatedItems = footer.data.socialLinks.map(i => i.id === editingItem.id ? { ...i, ...itemData } : i);
      handleChange('socialLinks', updatedItems);
    } else {
      const newItem: SocialLink = { ...itemData, id: Date.now().toString() };
      handleChange('socialLinks', [...footer.data.socialLinks, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteSocialLink = (id: string) => {
    handleChange('socialLinks', footer.data.socialLinks.filter(i => i.id !== id));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">محرر الفوتر (التذييل)</h3>
        <button onClick={handleToggleEnabled} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${footer.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {footer.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          {footer.enabled ? 'مفعل' : 'غير مفعل'}
        </button>
      </div>

      {/* Column Titles */}
      <div>
        <h4 className="font-semibold mb-3 text-md">عناوين الأعمدة</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">عنوان عمود الروابط</label>
            <input type="text" value={footer.data.linksTitle} onChange={(e) => handleChange('linksTitle', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">عنوان عمود التواصل</label>
            <input type="text" value={footer.data.contactTitle} onChange={(e) => handleChange('contactTitle', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="font-semibold mb-3 text-md">معلومات الاتصال</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
            <input type="email" value={footer.data.contactInfo.email} onChange={(e) => handleContactChange('email', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
            <input type="tel" value={footer.data.contactInfo.phone} onChange={(e) => handleContactChange('phone', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">العنوان</label>
            <textarea value={footer.data.contactInfo.address} onChange={(e) => handleContactChange('address', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" rows={2} />
          </div>
        </div>
      </div>
      
      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-md">روابط التواصل الاجتماعي</h4>
          <button onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700">
            <Plus size={16} /> إضافة رابط
          </button>
        </div>
        <div className="space-y-2">
          {footer.data.socialLinks.map((link) => (
            <div key={link.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex justify-between items-center">
              <div>
                <p className="font-medium capitalize">{link.platform}</p>
                <p className="text-xs text-gray-500 truncate">{link.url}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditingItem(link); setIsModalOpen(true); }} className="text-blue-600 hover:bg-blue-50 p-1 rounded"><Edit size={14} /></button>
                <button onClick={() => handleDeleteSocialLink(link.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright Text */}
      <div>
        <label className="block text-sm font-medium mb-2">نص حقوق النشر</label>
        <input type="text" value={footer.data.copyrightText} onChange={(e) => handleChange('copyrightText', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
      </div>

      {isModalOpen && <SocialLinkModal item={editingItem} onSave={handleSaveSocialLink} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
