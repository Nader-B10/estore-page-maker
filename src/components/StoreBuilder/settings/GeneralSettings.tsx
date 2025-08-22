import React from 'react';
import { Upload } from 'lucide-react';
import { StoreSettings } from '../../../types/store';

interface GeneralSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function GeneralSettings({ settings, onUpdateSettings }: GeneralSettingsProps) {
  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
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

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('favicon', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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

        <div>
          <label className="block text-sm font-medium mb-2">أيقونة المتجر (Favicon)</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleFaviconUpload}
              className="hidden"
              id="favicon-upload"
            />
            <label
              htmlFor="favicon-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Upload size={20} />
              رفع الأيقونة
            </label>
            {settings.favicon && (
              <img src={settings.favicon} alt="Favicon" className="w-8 h-8 object-cover rounded" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">يفضل أن تكون الصورة مربعة (32x32 أو 64x64 بكسل)</p>
        </div>
      </div>
    </div>
  );
}