/**
 * أنواع البيانات الخاصة بنظام القوالب
 * يحدد هذا الملف جميع الواجهات والأنواع المطلوبة لنظام القوالب
 */

import { StoreData, StoreSettings } from './store';

// واجهة تعريف القالب الأساسية
export interface Template {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: 'business' | 'creative' | 'minimal' | 'modern';
  preview: string; // رابط صورة المعاينة
  defaultSettings: Partial<StoreSettings>;
  customSections?: string[]; // أقسام مخصصة للقالب
  requiredSections: string[]; // الأقسام المطلوبة للقالب
}

// واجهة مولد HTML للقالب
export interface TemplateGenerator {
  generateHTML: (storeData: StoreData) => string;
  generateCSS: (storeData: StoreData) => string;
  generateJS?: (storeData: StoreData) => string;
}

// واجهة مكونات المعاينة للقالب
export interface TemplatePreviewComponents {
  Header: React.ComponentType<{ settings: StoreSettings }>;
  Footer: React.ComponentType<{ settings: StoreSettings }>;
  Hero: React.ComponentType<{ settings: StoreSettings }>;
  ProductSection: React.ComponentType<{ 
    title: string; 
    subtitle: string; 
    products: any[]; 
    settings: StoreSettings;
    sectionType?: string;
  }>;
  WhyChooseUs: React.ComponentType<{ settings: StoreSettings }>;
  FAQ: React.ComponentType<{ settings: StoreSettings }>;
  Testimonials?: React.ComponentType<{ settings: StoreSettings }>;
  CTA?: React.ComponentType<{ settings: StoreSettings }>;
}

// واجهة سجل القوالب
export interface TemplateRegistry {
  [templateId: string]: {
    template: Template;
    generator: TemplateGenerator;
    previewComponents: TemplatePreviewComponents;
  };
}

// نوع بيانات القالب المحدد حالياً
export interface TemplateContext {
  currentTemplate: string;
  availableTemplates: Template[];
  switchTemplate: (templateId: string) => void;
}