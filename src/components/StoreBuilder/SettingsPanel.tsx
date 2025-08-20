import React from 'react';
import { Upload } from 'lucide-react';
import { StoreSettings } from '../../types/store';

interface SettingsPanelProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function SettingsPanel({ settings, onUpdateSettings }: SettingsPanelProps) {
  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleContactInfoChange = (field: string, value: string) => {
    onUpdateSettings({
      ...settings,
      contactInfo: {
        ...settings.contactInfo,
        [field]: value,
      },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('logo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">الإعدادات العامة</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم المتجر</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="اسم المتجر"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">وصف المتجر</label>
            <textarea
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="وصف قصير عن المتجر"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">شعار المتجر</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Upload size={20} />
                رفع الشعار
              </label>
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-12 h-12 object-cover rounded" />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">الألوان والمظهر</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">اللون الأساسي</label>
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">اللون الثانوي</label>
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">لون التأكيد</label>
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">نوع الخط</label>
          <select
            value={settings.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Cairo">Cairo</option>
            <option value="Tajawal">Tajawal</option>
            <option value="Almarai">Almarai</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">نمط التخطيط</label>
          <select
            value={settings.layout}
            onChange={(e) => handleChange('layout', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="grid">شبكة</option>
            <option value="list">قائمة</option>
            <option value="masonry">بناء حجري</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">نمط الرأس</label>
          <select
            value={settings.headerStyle}
            onChange={(e) => handleChange('headerStyle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="classic">كلاسيكي</option>
            <option value="modern">عصري</option>
            <option value="minimal">بسيط</option>
          </select>
        </div>
      </div>

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
    </div>
  );
}