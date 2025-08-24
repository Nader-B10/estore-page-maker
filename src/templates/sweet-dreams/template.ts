/**
 * تعريف قالب Sweet Dreams
 * مستوحى من تصميم متجر الكيك في الصورة المرفقة
 */

import { Template } from '../../types/template';

export const template: Template = {
  id: 'sweet-dreams',
  name: 'sweet-dreams',
  displayName: 'أحلام حلوة',
  description: 'تصميم إبداعي مستوحى من متاجر الحلويات والكيك، بألوان زاهية وتخطيط جذاب',
  category: 'creative',
  preview: '/templates/sweet-dreams-preview.jpg',
  defaultSettings: {
    theme: 'sunset-glow',
    fontFamily: 'Cairo',
    layout: 'grid',
    headerStyle: 'modern',
    primaryColor: '#E91E63', // وردي زاهي
    secondaryColor: '#8E24AA', // بنفسجي
    accentColor: '#FF9800', // برتقالي
    storeName: 'Sweet Dreams',
    description: 'كيكات مصنوعة بحب خصيصاً لك',
  },
  requiredSections: ['header', 'hero', 'whyChooseUs', 'featuredProducts', 'testimonials', 'cta', 'footer'],
  customSections: ['testimonials', 'cta'],
};