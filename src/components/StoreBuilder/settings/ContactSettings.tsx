import React from 'react';
import { StoreSettings } from '../../../types/store';

interface ContactSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function ContactSettings({ settings, onUpdateSettings }: ContactSettingsProps) {
  const handleContactInfoChange = (field: string, value: string) => {
    onUpdateSettings({
      ...settings,
      contactInfo: {
        ...settings.contactInfo,
        [field]: value,
      },
    });
  };

  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
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
            value={settings.contactInfo.email}
            onChange={(e) => handleContactInfoChange('email', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="example@store.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
          <input
            type="tel"
            value={settings.contactInfo.phone}
            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+966 50 123 4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">العنوان</label>
          <textarea
            value={settings.contactInfo.address}
            onChange={(e) => handleContactInfoChange('address', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder="الرياض، المملكة العربية السعودية"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">نص التذييل</label>
          <input
            type="text"
            value={settings.footerText}
            onChange={(e) => handleChange('footerText', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="جميع الحقوق محفوظة 2024"
          />
        </div>
      </div>
    </div>
  );
}