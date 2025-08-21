import { ColorTheme } from '../types/store';

export const predefinedThemes: ColorTheme[] = [
  // Business Themes
  {
    id: 'professional-blue',
    name: 'أزرق مهني',
    category: 'business',
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#f59e0b',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    gradient: {
      from: '#1e40af',
      to: '#3b82f6',
      direction: '135deg'
    }
  },
  {
    id: 'corporate-gray',
    name: 'رمادي مؤسسي',
    category: 'business',
    primary: '#374151',
    secondary: '#6b7280',
    accent: '#f59e0b',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  {
    id: 'executive-navy',
    name: 'كحلي تنفيذي',
    category: 'business',
    primary: '#1e3a8a',
    secondary: '#3730a3',
    accent: '#dc2626',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#1e3a8a'
  },

  // Creative Themes
  {
    id: 'vibrant-purple',
    name: 'بنفسجي نابض',
    category: 'creative',
    primary: '#7c3aed',
    secondary: '#a855f7',
    accent: '#f59e0b',
    background: '#faf5ff',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#7c3aed',
    gradient: {
      from: '#7c3aed',
      to: '#ec4899',
      direction: '135deg'
    }
  },
  {
    id: 'sunset-orange',
    name: 'برتقالي الغروب',
    category: 'creative',
    primary: '#ea580c',
    secondary: '#fb923c',
    accent: '#dc2626',
    background: '#fef7f0',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#fed7aa',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#ea580c',
    gradient: {
      from: '#ea580c',
      to: '#dc2626',
      direction: '135deg'
    }
  },
  {
    id: 'electric-cyan',
    name: 'سماوي كهربائي',
    category: 'creative',
    primary: '#0891b2',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    background: '#f0fdff',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#a5f3fc',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#0891b2'
  },

  // Minimal Themes
  {
    id: 'clean-white',
    name: 'أبيض نظيف',
    category: 'minimal',
    primary: '#000000',
    secondary: '#374151',
    accent: '#6b7280',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },
  {
    id: 'soft-beige',
    name: 'بيج ناعم',
    category: 'minimal',
    primary: '#78716c',
    secondary: '#a8a29e',
    accent: '#d97706',
    background: '#fafaf9',
    surface: '#ffffff',
    text: '#1c1917',
    textSecondary: '#78716c',
    border: '#e7e5e4',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0ea5e9'
  },

  // Bold Themes
  {
    id: 'electric-red',
    name: 'أحمر كهربائي',
    category: 'bold',
    primary: '#dc2626',
    secondary: '#ef4444',
    accent: '#f59e0b',
    background: '#fef2f2',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#fecaca',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#dc2626',
    info: '#3b82f6',
    gradient: {
      from: '#dc2626',
      to: '#7c2d12',
      direction: '135deg'
    }
  },
  {
    id: 'neon-green',
    name: 'أخضر نيون',
    category: 'bold',
    primary: '#16a34a',
    secondary: '#22c55e',
    accent: '#f59e0b',
    background: '#f0fdf4',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#bbf7d0',
    success: '#16a34a',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },

  // Nature Themes
  {
    id: 'forest-green',
    name: 'أخضر الغابة',
    category: 'nature',
    primary: '#166534',
    secondary: '#16a34a',
    accent: '#ca8a04',
    background: '#f7fef0',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#d9f99d',
    success: '#16a34a',
    warning: '#ca8a04',
    error: '#dc2626',
    info: '#0ea5e9'
  },
  {
    id: 'ocean-blue',
    name: 'أزرق المحيط',
    category: 'nature',
    primary: '#0c4a6e',
    secondary: '#0284c7',
    accent: '#f59e0b',
    background: '#f0f9ff',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#bae6fd',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#0284c7'
  },

  // Luxury Themes
  {
    id: 'royal-gold',
    name: 'ذهبي ملكي',
    category: 'luxury',
    primary: '#92400e',
    secondary: '#d97706',
    accent: '#1f2937',
    background: '#fffbeb',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#78716c',
    border: '#fde68a',
    success: '#16a34a',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0ea5e9',
    gradient: {
      from: '#92400e',
      to: '#d97706',
      direction: '135deg'
    }
  },
  {
    id: 'platinum-silver',
    name: 'فضي بلاتيني',
    category: 'luxury',
    primary: '#374151',
    secondary: '#6b7280',
    accent: '#dc2626',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0284c7'
  },
  {
    id: 'deep-purple',
    name: 'بنفسجي عميق',
    category: 'luxury',
    primary: '#581c87',
    secondary: '#7c3aed',
    accent: '#f59e0b',
    background: '#faf5ff',
    surface: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    border: '#e9d5ff',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#7c3aed'
  }
];

export const getThemeById = (id: string): ColorTheme | undefined => {
  return predefinedThemes.find(theme => theme.id === id);
};

export const getThemesByCategory = (category: ColorTheme['category']): ColorTheme[] => {
  return predefinedThemes.filter(theme => theme.category === category);
};

export const applyTheme = (theme: ColorTheme) => {
  const root = document.documentElement;
  
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-accent', theme.accent);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-surface', theme.surface);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-text-secondary', theme.textSecondary);
  root.style.setProperty('--color-border', theme.border);
  root.style.setProperty('--color-success', theme.success);
  root.style.setProperty('--color-warning', theme.warning);
  root.style.setProperty('--color-error', theme.error);
  root.style.setProperty('--color-info', theme.info);
  
  if (theme.gradient) {
    root.style.setProperty('--gradient-primary', `linear-gradient(${theme.gradient.direction}, ${theme.gradient.from}, ${theme.gradient.to})`);
  }
};

export const generateCustomTheme = (baseTheme: ColorTheme, customizations: Partial<ColorTheme>): ColorTheme => {
  return {
    ...baseTheme,
    ...customizations,
    id: `custom-${Date.now()}`,
    name: customizations.name || `${baseTheme.name} مخصص`
  };
};