import React from 'react';
import { Upload } from 'lucide-react';
import { StoreSettings } from '../../../types';
import { getAvailableHeros } from '../../../registry';

interface HeroSectionManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function HeroSectionManager({ settings, onUpdateSettings }: HeroSectionManagerProps) {
  const availableHeros = getAvailableHeros();

  const handleHeroChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      heroSection: {
        ...settings.heroSection,
        [field]: value,
      },
    });
  };

  const handleTemplateChange = (templateId: string) => {
    onUpdateSettings({
      ...settings,
      heroTemplate: templateId,
    });
  };

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">إعدادات قسم الهيرو</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={settings.heroSection.enabled}
                onChange={(e) => handleHeroChange('enabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">تفعيل قسم الهيرو</span>
            </label>
          </div>

          {settings.heroSection.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">العنوان الرئيسي</label>
                <input
                  type="text"
                  value={settings.heroSection.title}
                  onChange={(e) => handleHeroChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مرحباً بك في متجرنا"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
                <textarea
                  value={settings.heroSection.subtitle}
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="اكتشف أفضل المنتجات بأسعار منافسة"
                />
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

              <div>
                <label className="block text-sm font-medium mb-2">صورة الخلفية</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundImageUpload}
                    className="hidden"
                    id="hero-bg-upload"
                  />
                  <label
                    htmlFor="hero-bg-upload"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
                  >
                    <Upload size={20} />
                    رفع صورة الخلفية
                  </label>
                  {settings.heroSection.backgroundImage && (
                    <img 
                      src={settings.heroSection.backgroundImage} 
                      alt="Background" 
                      className="w-16 h-16 object-cover rounded" 
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Hero Templates */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">قوالب الهيرو</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableHeros.map((hero) => (
            <button
              key={hero.id}
              onClick={() => handleTemplateChange(hero.id)}
              className={`p-4 rounded-lg border-2 transition-all text-right ${
                settings.heroTemplate === hero.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="mb-2">
                <h4 className="font-semibold text-purple-700">{hero.name}</h4>
                <p className="text-sm text-gray-600">{hero.description}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {hero.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}