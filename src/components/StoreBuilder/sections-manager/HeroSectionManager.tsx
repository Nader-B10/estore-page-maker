import React from 'react';
import { Upload, Eye, EyeOff, Palette } from 'lucide-react';
import { StoreSettings } from '../../../types/store';
import { getAvailableHeros } from '../../../utils/componentRegistry';

interface HeroSectionManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function HeroSectionManager({ settings, onUpdateSettings }: HeroSectionManagerProps) {
  const availableHeros = getAvailableHeros();

  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleHeroChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      heroSection: {
        ...settings.heroSection,
        [field]: value,
      },
    });
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleHeroChange('backgroundImage', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Template Selection */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5 text-purple-600" />
          اختيار قالب الهيرو
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {availableHeros.map((template) => (
            <div
              key={template.id}
              onClick={() => handleChange('heroTemplate', template.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                settings.heroTemplate === template.id
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              {settings.heroTemplate === template.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              
              <div className="mb-3">
                <div 
                  className="w-full h-20 rounded-md mb-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${settings.primaryColor}40, ${settings.secondaryColor}40)` 
                  }}
                ></div>
              </div>
              
              <h5 className="font-semibold text-gray-800 mb-2">{template.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {template.features.slice(0, 2).map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">قسم البطل (Hero Section)</h3>
        <button
          onClick={() => handleHeroChange('enabled', !settings.heroSection.enabled)}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${
            settings.heroSection.enabled
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {settings.heroSection.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          {settings.heroSection.enabled ? 'مفعل' : 'غير مفعل'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">العنوان الرئيسي</label>
          <input
            type="text"
            value={settings.heroSection.title}
            onChange={(e) => handleHeroChange('title', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="العنوان الرئيسي"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
          <textarea
            value={settings.heroSection.subtitle}
            onChange={(e) => handleHeroChange('subtitle', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            placeholder="العنوان الفرعي"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">صورة الخلفية</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleHeroImageUpload}
              className="hidden"
              id="hero-image-upload"
            />
            <label
              htmlFor="hero-image-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <Upload size={20} />
              رفع صورة
            </label>
            {settings.heroSection.backgroundImage && (
              <img 
                src={settings.heroSection.backgroundImage} 
                alt="Hero Background" 
                className="w-16 h-16 object-cover rounded" 
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">نص الزر</label>
            <input
              type="text"
              value={settings.heroSection.ctaText}
              onChange={(e) => handleHeroChange('ctaText', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="تسوق الآن"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">رابط الزر</label>
            <input
              type="text"
              value={settings.heroSection.ctaLink}
              onChange={(e) => handleHeroChange('ctaLink', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="#products"
            />
          </div>
        </div>
      </div>
    </div>
  );
}