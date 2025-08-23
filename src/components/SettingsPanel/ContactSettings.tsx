import React from 'react';
import { useStore } from '../../contexts/StoreContext';

export default function ContactSettings() {
  const { storeData, updateSettings } = useStore();
  const { settings } = storeData;

  const handleContactInfoChange = (field: string, value: string) => {
    updateSettings({
      contactInfo: {
        ...settings.contactInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
          <input 
            type="email" 
            value={settings.contactInfo?.email || ''} 
            onChange={(e) => handleContactInfoChange('email', e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg" 
            placeholder="example@store.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
          <input 
            type="tel" 
            value={settings.contactInfo?.phone || ''} 
            onChange={(e) => handleContactInfoChange('phone', e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg" 
            placeholder="+966 50 123 4567" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">العنوان</label>
          <textarea 
            value={settings.contactInfo?.address || ''} 
            onChange={(e) => handleContactInfoChange('address', e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg" 
            rows={2} 
            placeholder="الرياض، المملكة العربية السعودية" 
          />
        </div>
      </div>
    </div>
  );
}