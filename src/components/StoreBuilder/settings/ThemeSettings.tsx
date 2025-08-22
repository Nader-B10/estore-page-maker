import React from 'react';
import { StoreSettings, PREDEFINED_THEMES } from '../../../types/store';

interface ThemeSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function ThemeSettings({ settings, onUpdateSettings }: ThemeSettingsProps) {
  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">الثيمات والألوان</h3>
      
      {/* Predefined Themes */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">الثيمات المعدة مسبقاً</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PREDEFINED_THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                const newSettings = {
                  ...settings,
                  themeId: theme.id,
                  primaryColor: theme.palette.primary,
                  secondaryColor: theme.palette.secondary,
                  accentColor: theme.palette.accent,
                };
                onUpdateSettings(newSettings);
              }}
              className={`relative p-3 rounded-lg border-2 transition-all ${
                settings.themeId === theme.id
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className="w-full h-12 rounded-md mb-2"
                style={{ background: theme.preview }}
              ></div>
              <p className="text-sm font-medium text-center">{theme.nameAr}</p>
              {settings.themeId === theme.id && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Colors */}
      <div className="border-t pt-4">
        <h4 className="text-md font-medium mb-3">تخصيص الألوان والخطوط</h4>
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
      </div>
    </div>
  );
}