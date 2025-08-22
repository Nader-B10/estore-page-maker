import React from 'react';
import { Upload, Eye, EyeOff, Palette } from 'lucide-react';
import { StoreSettings } from '../../../types/store';
import { getAvailableAbouts } from '../../../utils/componentRegistry';

interface AboutSectionManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function AboutSectionManager({ settings, onUpdateSettings }: AboutSectionManagerProps) {
  const availableAbouts = getAvailableAbouts();

  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleAboutChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      aboutSection: {
        ...settings.aboutSection,
        [field]: value,
      },
    });
  };

  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleAboutChange('image', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-orange-600" />
          اختيار قالب من نحن
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {availableAbouts.map((template) => (
            <div
              key={template.id}
              onClick={() => handleChange('aboutTemplate', template.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                settings.aboutTemplate === template.id
                  ? 'border-orange-500 bg-orange-50 shadow-lg'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              {settings.aboutTemplate === template.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              
              <div className="mb-3">
                <div 
                  className="w-full h-16 rounded-md mb-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${settings.primaryColor}30, ${settings.accentColor}30)` 
                  }}
                ></div>
              </div>
              
              <h5 className="font-semibold text-gray-800 mb-2">{template.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">قسم من نحن</h3>
          <button
            onClick={() => handleAboutChange('enabled', !settings.aboutSection.enabled)}
            className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
              settings.aboutSection.enabled
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {settings.aboutSection.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            {settings.aboutSection.enabled ? 'مفعل' : 'غير مفعل'}
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">العنوان</label>
            <input
              type="text"
              value={settings.aboutSection.title}
              onChange={(e) => handleAboutChange('title', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="من نحن"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
            <input
              type="text"
              value={settings.aboutSection.subtitle}
              onChange={(e) => handleAboutChange('subtitle', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="تعرف على قصتنا ورؤيتنا"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">المحتوى</label>
            <textarea
              value={settings.aboutSection.content}
              onChange={(e) => handleAboutChange('content', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="اكتب نبذة عن متجرك وقصة نجاحك..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">صورة القسم</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleAboutImageUpload}
                className="hidden"
                id="about-image-upload"
              />
              <label
                htmlFor="about-image-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Upload size={20} />
                رفع صورة
              </label>
              {settings.aboutSection.image && (
                <img 
                  src={settings.aboutSection.image} 
                  alt="About" 
                  className="w-16 h-16 object-cover rounded" 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}