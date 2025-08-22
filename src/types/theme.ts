export interface ThemePalette {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  background: string;
  surface: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface PredefinedTheme {
  id: string;
  name: string;
  nameAr: string;
  palette: ThemePalette;
  preview: string;
}

export const PREDEFINED_THEMES: PredefinedTheme[] = [
  {
    id: 'blue-modern',
    name: 'Blue Modern',
    nameAr: 'الأزرق العصري',
    palette: {
      primary: '#2563eb',
      secondary: '#1d4ed8',
      accent: '#3b82f6',
      text: '#1e293b',
      textSecondary: '#64748b',
      background: '#f8fafc',
      surface: '#ffffff',
      border: '#e2e8f0',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    preview: 'linear-gradient(135deg, #2563eb, #1d4ed8, #3b82f6)'
  },
  {
    id: 'green-nature',
    name: 'Green Nature',
    nameAr: 'الأخضر الطبيعي',
    palette: {
      primary: '#16a34a',
      secondary: '#15803d',
      accent: '#22c55e',
      text: '#14532d',
      textSecondary: '#4ade80',
      background: '#f0fdf4',
      surface: '#ffffff',
      border: '#bbf7d0',
      success: '#16a34a',
      warning: '#eab308',
      error: '#dc2626'
    },
    preview: 'linear-gradient(135deg, #16a34a, #15803d, #22c55e)'
  },
  {
    id: 'purple-luxury',
    name: 'Purple Luxury',
    nameAr: 'البنفسجي الفاخر',
    palette: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a855f7',
      text: '#581c87',
      textSecondary: '#a78bfa',
      background: '#faf5ff',
      surface: '#ffffff',
      border: '#e9d5ff',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    preview: 'linear-gradient(135deg, #8b5cf6, #7c3aed, #a855f7)'
  },
  {
    id: 'orange-warm',
    name: 'Orange Warm',
    nameAr: 'البرتقالي الدافئ',
    palette: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c',
      text: '#9a3412',
      textSecondary: '#fdba74',
      background: '#fff7ed',
      surface: '#ffffff',
      border: '#fed7aa',
      success: '#059669',
      warning: '#f97316',
      error: '#dc2626'
    },
    preview: 'linear-gradient(135deg, #f97316, #ea580c, #fb923c)'
  },
  {
    id: 'pink-elegant',
    name: 'Pink Elegant',
    nameAr: 'الوردي الأنيق',
    palette: {
      primary: '#f472b6',
      secondary: '#ec4899',
      accent: '#f9a8d4',
      text: '#831843',
      textSecondary: '#f9a8d4',
      background: '#fdf2f8',
      surface: '#ffffff',
      border: '#fce7f3',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    preview: 'linear-gradient(135deg, #f472b6, #ec4899, #f9a8d4)'
  },
  {
    id: 'dark-professional',
    name: 'Dark Professional',
    nameAr: 'الداكن المهني',
    palette: {
      primary: '#3b82f6',
      secondary: '#2563eb',
      accent: '#60a5fa',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      background: '#111827',
      surface: '#1f2937',
      border: '#374151',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    preview: 'linear-gradient(135deg, #111827, #1f2937, #3b82f6)'
  },
  {
    id: 'teal-fresh',
    name: 'Teal Fresh',
    nameAr: 'الأزرق المخضر المنعش',
    palette: {
      primary: '#14b8a6',
      secondary: '#0f766e',
      accent: '#5eead4',
      text: '#134e4a',
      textSecondary: '#5eead4',
      background: '#f0fdfa',
      surface: '#ffffff',
      border: '#a7f3d0',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    preview: 'linear-gradient(135deg, #14b8a6, #0f766e, #5eead4)'
  },
  {
    id: 'rose-elegant',
    name: 'Rose Elegant',
    nameAr: 'الوردي الراقي',
    palette: {
      primary: '#f43f5e',
      secondary: '#e11d48',
      accent: '#fb7185',
      text: '#881337',
      textSecondary: '#fb7185',
      background: '#fff1f2',
      surface: '#ffffff',
      border: '#fecdd3',
      success: '#059669',
      warning: '#d97706',
      error: '#dc2626'
    },
    preview: 'linear-gradient(135deg, #f43f5e, #e11d48, #fb7185)'
  }
];

export const getThemeById = (themeId: string): PredefinedTheme => {
  return PREDEFINED_THEMES.find(theme => theme.id === themeId) || PREDEFINED_THEMES[0];
};