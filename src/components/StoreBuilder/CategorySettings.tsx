import React from 'react';
import { StoreSettings } from '../../types';

interface CategorySettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function CategorySettings({ settings, onUpdateSettings }: CategorySettingsProps) {
  const handleCategorySettingsChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      categorySettings: {
        ...settings.categorySettings,
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">إعدادات عرض الفئات</h3>
      
      <div className="space-y-6">
        {/* Display Options */}
        <div>
          <h4 className="font-medium mb-4 text-gray-800">خيارات العرض</h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={settings.categorySettings.showCategoryImages}
                onChange={(e) => handleCategorySettingsChange('showCategoryImages', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">🖼️ صور الفئات</span>
                <p className="text-xs text-gray-600">عرض صور الفئات في المتجر</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={settings.categorySettings.showCategoryDescription}
                onChange={(e) => handleCategorySettingsChange('showCategoryDescription', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">📝 وصف الفئات</span>
                <p className="text-xs text-gray-600">عرض وصف كل فئة</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={settings.categorySettings.showProductCount}
                onChange={(e) => handleCategorySettingsChange('showProductCount', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">🔢 عدد المنتجات</span>
                <p className="text-xs text-gray-600">عرض عدد المنتجات في كل فئة</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={settings.categorySettings.enableCategoryFilter}
                onChange={(e) => handleCategorySettingsChange('enableCategoryFilter', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">🔍 فلتر الفئات</span>
                <p className="text-xs text-gray-600">إمكانية الفلترة حسب الفئة</p>
              </div>
            </label>
          </div>
        </div>

        {/* Layout Options */}
        <div>
          <h4 className="font-medium mb-4 text-gray-800">تخطيط العرض</h4>
          <div>
            <label className="block text-sm font-medium mb-2">عدد الفئات في الصف</label>
            <select
              value={settings.categorySettings.categoriesPerRow}
              onChange={(e) => handleCategorySettingsChange('categoriesPerRow', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={2}>2 فئات</option>
              <option value={3}>3 فئات</option>
              <option value={4}>4 فئات</option>
              <option value={6}>6 فئات</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}