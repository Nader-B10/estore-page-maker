import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Theme, themes } from '../../themes/palettes';

interface ThemeSelectorProps {
  currentThemeName: string;
  onSelectTheme: (theme: Theme) => void;
}

export default function ThemeSelector({ currentThemeName, onSelectTheme }: ThemeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {themes.map((theme) => {
        const isSelected = theme.name === currentThemeName;
        return (
          <div
            key={theme.name}
            onClick={() => onSelectTheme(theme)}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              isSelected ? 'border-blue-600 shadow-lg' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            {isSelected && (
              <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full p-1">
                <CheckCircle size={16} />
              </div>
            )}
            <p className="font-semibold text-center mb-3">{theme.displayName}</p>
            <div className="flex justify-center items-center gap-1 h-8">
              <div
                className="w-1/3 h-full rounded-l-md"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <div
                className="w-1/3 h-full"
                style={{ backgroundColor: theme.colors.secondary }}
              />
              <div
                className="w-1/3 h-full rounded-r-md"
                style={{ backgroundColor: theme.colors.accent }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
