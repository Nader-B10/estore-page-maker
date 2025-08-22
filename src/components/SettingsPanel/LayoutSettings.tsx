import React from 'react';
import { useStore } from '../../contexts/StoreContext';

export default function LayoutSettings() {
  const { storeData, updateSettings } = useStore();
  const { settings } = storeData;

  const handleChange = (field: string, value: any) => {
    updateSettings({ [field]: value });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">التخطيط والمظهر</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">نوع الخط</label>
          <select value={settings.fontFamily} onChange={(e) => handleChange('fontFamily', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="Cairo">Cairo</option>
            <option value="Tajawal">Tajawal</option>
            <option value="Almarai">Almarai</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">نمط التخطيط</label>
          <select value={settings.layout} onChange={(e) => handleChange('layout', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="grid">شبكة</option>
            <option value="list">قائمة</option>
            <option value="masonry">بناء حجري</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">نمط الرأس</label>
          <select value={settings.headerStyle} onChange={(e) => handleChange('headerStyle', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="classic">كلاسيكي</option>
            <option value="modern">عصري</option>
            <option value="minimal">بسيط</option>
          </select>
        </div>
      </div>
    </div>
  );
}
