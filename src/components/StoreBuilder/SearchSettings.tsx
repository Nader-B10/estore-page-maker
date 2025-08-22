import React from 'react';
import { StoreSettings } from '../../types';

interface SearchSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function SearchSettings({ settings, onUpdateSettings }: SearchSettingsProps) {
  const handleSearchChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      searchSettings: {
        ...settings.searchSettings,
        [field]: value,
      },
    });
  };

  const handleSearchFieldChange = (fieldName: string, property: string, value: any) => {
    const updatedFields = settings.searchSettings.searchFields.map(field =>
      field.field === fieldName ? { ...field, [property]: value } : field
    );
    
    handleSearchChange('searchFields', updatedFields);
  };

  return (
    <div className="space-y-6">
      {/* Basic Search Settings */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">إعدادات البحث الأساسية</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={settings.searchSettings.enabled}
                onChange={(e) => handleSearchChange('enabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">تفعيل البحث</span>
            </label>
          </div>

          {settings.searchSettings.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">نص البحث التوضيحي</label>
                <input
                  type="text"
                  value={settings.searchSettings.placeholder}
                  onChange={(e) => handleSearchChange('placeholder', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ابحث عن المنتجات..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عدد النتائج في الصفحة</label>
                  <input
                    type="number"
                    min="6"
                    max="50"
                    value={settings.searchSettings.resultsPerPage}
                    onChange={(e) => handleSearchChange('resultsPerPage', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.searchSettings.showSuggestions}
                      onChange={(e) => handleSearchChange('showSuggestions', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">إظهار اقتراحات البحث</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.searchSettings.enableFilters}
                      onChange={(e) => handleSearchChange('enableFilters', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">تفعيل الفلاتر</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.searchSettings.enableSorting}
                      onChange={(e) => handleSearchChange('enableSorting', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">تفعيل الترتيب</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.searchSettings.enableVoiceSearch}
                      onChange={(e) => handleSearchChange('enableVoiceSearch', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">البحث الصوتي (قريباً)</span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Search Fields Configuration */}
      {settings.searchSettings.enabled && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">حقول البحث</h3>
          <p className="text-sm text-gray-600 mb-4">حدد الحقول التي يتم البحث فيها ووزن كل حقل</p>
          
          <div className="space-y-4">
            {settings.searchSettings.searchFields.map((field) => (
              <div key={field.field} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.enabled}
                    onChange={(e) => handleSearchFieldChange(field.field, 'enabled', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium">
                    {field.field === 'name' && 'اسم المنتج'}
                    {field.field === 'description' && 'وصف المنتج'}
                    {field.field === 'category' && 'الفئة'}
                    {field.field === 'tags' && 'العلامات'}
                  </span>
                </label>
                
                {field.enabled && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">الوزن:</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={field.weight}
                      onChange={(e) => handleSearchFieldChange(field.field, 'weight', parseInt(e.target.value))}
                      className="w-16 p-2 border border-gray-300 rounded text-center"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              💡 <strong>الوزن:</strong> كلما زاد الوزن، كلما ظهرت النتائج المطابقة لهذا الحقل في المقدمة
            </p>
          </div>
        </div>
      )}
    </div>
  );
}