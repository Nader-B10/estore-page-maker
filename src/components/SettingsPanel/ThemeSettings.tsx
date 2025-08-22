import React from 'react';
import { Palette } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import ThemeSelector from '../StoreBuilder/ThemeSelector';
import { Theme, themes } from '../../themes/palettes';

export default function ThemeSettings() {
  const { storeData, updateSettings } = useStore();
  const { settings } = storeData;

  const handleChange = (field: string, value: any) => {
    updateSettings({ [field]: value });
  };

  const handleThemeSelect = (theme: Theme) => {
    updateSettings({
      theme: theme.name,
      primaryColor: theme.colors.primary,
      secondaryColor: theme.colors.secondary,
      accentColor: theme.colors.accent,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Palette size={20} />
        الثيم والألوان
      </h3>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">اختر ثيماً جاهزاً</label>
        <ThemeSelector currentThemeName={settings.theme} onSelectTheme={handleThemeSelect} />
      </div>
      <h4 className="text-md font-semibold mb-3">أو قم بتخصيص الألوان</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">اللون الأساسي</label>
          <input type="color" value={settings.primaryColor} onChange={(e) => handleChange('primaryColor', e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">اللون الثانوي</label>
          <input type="color" value={settings.secondaryColor} onChange={(e) => handleChange('secondaryColor', e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">لون التأكيد</label>
          <input type="color" value={settings.accentColor} onChange={(e) => handleChange('accentColor', e.target.value)} className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
