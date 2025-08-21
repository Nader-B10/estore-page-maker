import React, { useState } from 'react';
import { Palette, Check, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { ColorTheme, StoreSettings } from '../../types/store';
import { predefinedThemes, getThemesByCategory, applyTheme } from '../../utils/themes';

interface ThemeSelectorProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function ThemeSelector({ settings, onUpdateSettings }: ThemeSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<ColorTheme['category']>('business');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customTheme, setCustomTheme] = useState<Partial<ColorTheme>>({});

  const categories = [
    { id: 'business', label: 'مهني', icon: '💼' },
    { id: 'creative', label: 'إبداعي', icon: '🎨' },
    { id: 'minimal', label: 'بسيط', icon: '⚪' },
    { id: 'bold', label: 'جريء', icon: '⚡' },
    { id: 'nature', label: 'طبيعي', icon: '🌿' },
    { id: 'luxury', label: 'فاخر', icon: '👑' },
  ];

  const handleThemeChange = (themeId: string) => {
    const theme = predefinedThemes.find(t => t.id === themeId);
    if (theme) {
      applyTheme(theme);
      onUpdateSettings({
        ...settings,
        currentTheme: themeId,
        primaryColor: theme.primary,
        secondaryColor: theme.secondary,
        accentColor: theme.accent,
      });
    }
  };

  const handleCustomThemeCreate = () => {
    if (!customTheme.name) {
      alert('يرجى إدخال اسم للثيم المخصص');
      return;
    }

    const newTheme: ColorTheme = {
      id: `custom-${Date.now()}`,
      name: customTheme.name,
      category: 'business',
      primary: customTheme.primary || settings.primaryColor,
      secondary: customTheme.secondary || settings.secondaryColor,
      accent: customTheme.accent || settings.accentColor,
      background: customTheme.background || '#f8fafc',
      surface: customTheme.surface || '#ffffff',
      text: customTheme.text || '#1f2937',
      textSecondary: customTheme.textSecondary || '#6b7280',
      border: customTheme.border || '#e5e7eb',
      success: customTheme.success || '#10b981',
      warning: customTheme.warning || '#f59e0b',
      error: customTheme.error || '#ef4444',
      info: customTheme.info || '#3b82f6',
    };

    onUpdateSettings({
      ...settings,
      customThemes: [...settings.customThemes, newTheme],
      currentTheme: newTheme.id,
      primaryColor: newTheme.primary,
      secondaryColor: newTheme.secondary,
      accentColor: newTheme.accent,
    });

    applyTheme(newTheme);
    setIsCustomizing(false);
    setCustomTheme({});
  };

  const deleteCustomTheme = (themeId: string) => {
    onUpdateSettings({
      ...settings,
      customThemes: settings.customThemes.filter(t => t.id !== themeId),
      currentTheme: settings.currentTheme === themeId ? 'professional-blue' : settings.currentTheme,
    });
  };

  const currentCategoryThemes = getThemesByCategory(activeCategory);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">اختيار الثيم</h3>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as ColorTheme['category'])}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {currentCategoryThemes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isSelected={settings.currentTheme === theme.id}
              onSelect={() => handleThemeChange(theme.id)}
            />
          ))}
        </div>

        {/* Custom Themes */}
        {settings.customThemes.length > 0 && (
          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">الثيمات المخصصة</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.customThemes.map((theme) => (
                <div key={theme.id} className="relative">
                  <ThemeCard
                    theme={theme}
                    isSelected={settings.currentTheme === theme.id}
                    onSelect={() => handleThemeChange(theme.id)}
                  />
                  <button
                    onClick={() => deleteCustomTheme(theme.id)}
                    className="absolute top-2 left-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Custom Theme */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">إنشاء ثيم مخصص</h4>
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus size={16} />
              ثيم جديد
            </button>
          </div>

          {isCustomizing && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم الثيم</label>
                <input
                  type="text"
                  value={customTheme.name || ''}
                  onChange={(e) => setCustomTheme(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="ثيمي المخصص"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اللون الأساسي</label>
                  <input
                    type="color"
                    value={customTheme.primary || settings.primaryColor}
                    onChange={(e) => setCustomTheme(prev => ({ ...prev, primary: e.target.value }))}
                    className="w-full h-10 rounded border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">اللون الثانوي</label>
                  <input
                    type="color"
                    value={customTheme.secondary || settings.secondaryColor}
                    onChange={(e) => setCustomTheme(prev => ({ ...prev, secondary: e.target.value }))}
                    className="w-full h-10 rounded border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">لون التأكيد</label>
                  <input
                    type="color"
                    value={customTheme.accent || settings.accentColor}
                    onChange={(e) => setCustomTheme(prev => ({ ...prev, accent: e.target.value }))}
                    className="w-full h-10 rounded border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">لون الخلفية</label>
                  <input
                    type="color"
                    value={customTheme.background || '#f8fafc'}
                    onChange={(e) => setCustomTheme(prev => ({ ...prev, background: e.target.value }))}
                    className="w-full h-10 rounded border"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCustomThemeCreate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  إنشاء الثيم
                </button>
                <button
                  onClick={() => {
                    setIsCustomizing(false);
                    setCustomTheme({});
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Theme Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h4 className="font-medium mb-4">الثيم الحالي</h4>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <div
              className="w-8 h-8 rounded border-2 border-white shadow-sm"
              style={{ backgroundColor: settings.primaryColor }}
            />
            <div
              className="w-8 h-8 rounded border-2 border-white shadow-sm"
              style={{ backgroundColor: settings.secondaryColor }}
            />
            <div
              className="w-8 h-8 rounded border-2 border-white shadow-sm"
              style={{ backgroundColor: settings.accentColor }}
            />
          </div>
          <div>
            <p className="font-medium">
              {predefinedThemes.find(t => t.id === settings.currentTheme)?.name || 
               settings.customThemes.find(t => t.id === settings.currentTheme)?.name || 
               'مخصص'}
            </p>
            <p className="text-sm text-gray-600">
              {predefinedThemes.find(t => t.id === settings.currentTheme)?.category || 'مخصص'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Theme Card Component
function ThemeCard({ 
  theme, 
  isSelected, 
  onSelect 
}: { 
  theme: ColorTheme; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  return (
    <div
      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <Check size={14} className="text-white" />
        </div>
      )}
      
      <div className="mb-3">
        <h4 className="font-medium text-gray-900">{theme.name}</h4>
        <p className="text-xs text-gray-500 capitalize">{theme.category}</p>
      </div>
      
      <div className="flex gap-1 mb-3">
        <div
          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: theme.primary }}
          title="اللون الأساسي"
        />
        <div
          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: theme.secondary }}
          title="اللون الثانوي"
        />
        <div
          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: theme.accent }}
          title="لون التأكيد"
        />
        <div
          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: theme.background }}
          title="لون الخلفية"
        />
      </div>
      
      {theme.gradient && (
        <div
          className="w-full h-3 rounded mb-2"
          style={{ 
            background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.from}, ${theme.gradient.to})` 
          }}
        />
      )}
      
      <div className="text-xs text-gray-500">
        انقر للتطبيق
      </div>
    </div>
  );
}