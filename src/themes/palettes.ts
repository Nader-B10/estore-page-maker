export interface Theme {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string; // For cards, headers, etc.
    text: string;
    subtleText: string; // For descriptions, subtitles
    footerBackground: string;
    footerText: string;
  };
}

export const themes: Theme[] = [
  {
    name: 'midnight-gold',
    displayName: 'الذهب الليلي',
    colors: {
      primary: '#FBBF24', // Amber 400
      secondary: '#374151', // Gray 700
      accent: '#FBBF24',
      background: '#111827', // Gray 900
      surface: '#1F2937', // Gray 800
      text: '#F9FAFB', // Gray 50
      subtleText: '#D1D5DB', // Gray 300
      footerBackground: '#000000',
      footerText: '#F9FAFB',
    },
  },
  {
    name: 'oceanic-blue',
    displayName: 'الأزرق المحيطي',
    colors: {
      primary: '#3B82F6', // Blue 500
      secondary: '#1E40AF', // Blue 800
      accent: '#F59E0B', // Amber 500
      background: '#F9FAFB', // Gray 50
      surface: '#FFFFFF',
      text: '#1F2937', // Gray 800
      subtleText: '#4B5563', // Gray 600
      footerBackground: '#111827', // Gray 900
      footerText: '#FFFFFF',
    },
  },
  {
    name: 'minty-fresh',
    displayName: 'النعناع المنعش',
    colors: {
      primary: '#10B981', // Emerald 500
      secondary: '#047857', // Emerald 700
      accent: '#F59E0B', // Amber 500
      background: '#F0FDF4', // Emerald 50
      surface: '#FFFFFF',
      text: '#111827', // Gray 900
      subtleText: '#374151', // Gray 700
      footerBackground: '#064E3B', // Emerald 900
      footerText: '#ECFDF5', // Emerald 50
    },
  },
  {
    name: 'earthy-tones',
    displayName: 'الألوان الترابية',
    colors: {
      primary: '#854D0E', // Amber 900
      secondary: '#78350F', // Amber 950
      accent: '#A16207', // Yellow 800
      background: '#FEFCE8', // Yellow 50
      surface: '#FFFFFF',
      text: '#3F3F46', // Zinc 700
      subtleText: '#71717A', // Zinc 500
      footerBackground: '#422006',
      footerText: '#FEFCE8',
    },
  },
  {
    name: 'sunset-glow',
    displayName: 'وهج الغروب',
    colors: {
      primary: '#F97316', // Orange 500
      secondary: '#C2410C', // Orange 800
      accent: '#FDE047', // Yellow 300
      background: '#FFF7ED', // Orange 50
      surface: '#FFFFFF',
      text: '#333333',
      subtleText: '#52525B', // Zinc 600
      footerBackground: '#7C2D12', // Orange 900
      footerText: '#FFF7ED',
    },
  },
];
