/**
 * تعريف القالب الافتراضي
 * يحتوي على البيانات الوصفية والإعدادات الافتراضية للقالب
 */

import { Template } from '../../types/template';

export const template: Template = {
  id: 'default',
  name: 'default',
  displayName: 'القالب الافتراضي',
  description: 'تصميم نظيف وبسيط مناسب لجميع أنواع المتاجر',
  category: 'business',
  preview: '/templates/default-preview.jpg',
  defaultSettings: {
    theme: 'oceanic-blue',
    fontFamily: 'Cairo',
    layout: 'grid',
    headerStyle: 'classic',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    accentColor: '#F59E0B',
  },
  requiredSections: ['header', 'hero', 'allProducts', 'footer'],
  customSections: ['featuredProducts', 'bestSellers', 'onSale', 'whyChooseUs', 'faq'],
};