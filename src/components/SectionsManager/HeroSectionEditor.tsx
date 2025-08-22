import React from 'react';
import { Upload, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

export default function HeroSectionEditor() {
  const { storeData, updateSection } = useStore();
  const { hero } = storeData.settings.sections;

  const handleChange = (field: string, value: any) => {
    updateSection('hero', { data: { [field]: value } });
  };

  const handleToggleEnabled = () => {
    updateSection('hero', { enabled: !hero.enabled });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => handleChange('backgroundImage', e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">قسم البطل (Hero)</h3>
        <button onClick={handleToggleEnabled} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm ${hero.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {hero.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          {hero.enabled ? 'مفعل' : 'غير مفعل'}
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">العنوان الرئيسي</label>
          <input type="text" value={hero.data.title} onChange={(e) => handleChange('title', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
          <textarea value={hero.data.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" rows={2} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">صورة الخلفية</label>
          <div className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="hero-image-upload" />
            <label htmlFor="hero-image-upload" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700">
              <Upload size={20} />
              رفع صورة
            </label>
            {hero.data.backgroundImage && <img src={hero.data.backgroundImage} alt="Hero Background" className="w-16 h-16 object-cover rounded" />}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">نص الزر</label>
            <input type="text" value={hero.data.ctaText} onChange={(e) => handleChange('ctaText', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">رابط الزر</label>
            <input type="text" value={hero.data.ctaLink} onChange={(e) => handleChange('ctaLink', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
