import React from 'react';
import { StoreSettings } from '../../../types/store';

interface AboutSectionManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function AboutSectionManager({ settings, onUpdateSettings }: AboutSectionManagerProps) {
  const updateAboutSection = (updates: any) => {
    onUpdateSettings({
      ...settings,
      sections: {
        ...settings.sections,
        about: {
          ...settings.sections.about,
          ...updates
        }
      }
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات قسم من نحن</h3>
      
      {/* Enable/Disable Section */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.sections.about?.enabled || false}
            onChange={(e) => updateAboutSection({ enabled: e.target.checked })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="mr-2 text-sm font-medium text-gray-700">تفعيل قسم من نحن</span>
        </label>
      </div>

      {settings.sections.about?.enabled && (
        <div className="space-y-6">
          {/* Section Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              عنوان القسم
            </label>
            <input
              type="text"
              value={settings.sections.about?.title || 'من نحن'}
              onChange={(e) => updateAboutSection({ title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="من نحن"
            />
          </div>

          {/* Section Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              العنوان الفرعي
            </label>
            <input
              type="text"
              value={settings.sections.about?.subtitle || ''}
              onChange={(e) => updateAboutSection({ subtitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="نبذة مختصرة عن الشركة"
            />
          </div>

          {/* About Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              محتوى القسم
            </label>
            <textarea
              value={settings.sections.about?.content || ''}
              onChange={(e) => updateAboutSection({ content: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="اكتب نبذة تفصيلية عن شركتك أو متجرك..."
            />
          </div>

          {/* About Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              صورة القسم
            </label>
            <input
              type="url"
              value={settings.sections.about?.image || ''}
              onChange={(e) => updateAboutSection({ image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/about-image.jpg"
            />
            {settings.sections.about?.image && (
              <div className="mt-2">
                <img
                  src={settings.sections.about.image}
                  alt="About preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              اختر قالب القسم
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'simple', name: 'بسيط', color: 'bg-orange-100 border-orange-300' },
                { id: 'modern', name: 'عصري', color: 'bg-orange-100 border-orange-300' }
              ].map(template => (
                <div
                  key={template.id}
                  onClick={() => updateAboutSection({ template: template.id })}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    settings.sections.about?.template === template.id
                      ? 'border-orange-500 bg-orange-50'
                      : template.color
                  }`}
                >
                  <div className="text-center">
                    <div className="w-full h-20 bg-orange-200 rounded mb-2 flex items-center justify-center">
                      <span className="text-orange-600 text-sm">معاينة {template.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{template.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}