/**
 * سجل القوالب المركزي
 * يحتوي على جميع القوالب المتاحة ومولداتها ومكونات المعاينة
 */

import { TemplateRegistry } from '../types/template';

// استيراد القالب الافتراضي (التصميم الحالي)
import * as defaultTemplate from './default';

// استيراد قالب Sweet Dreams (من الصورة)
import * as sweetDreamsTemplate from './sweet-dreams';

export const templateRegistry: TemplateRegistry = {
  'default': {
    template: defaultTemplate.template,
    generator: defaultTemplate.generator,
    previewComponents: defaultTemplate.previewComponents,
  },
  'sweet-dreams': {
    template: sweetDreamsTemplate.template,
    generator: sweetDreamsTemplate.generator,
    previewComponents: sweetDreamsTemplate.previewComponents,
  },
};

/**
 * الحصول على قالب محدد من السجل
 */
export const getTemplate = (templateId: string) => {
  return templateRegistry[templateId] || templateRegistry['default'];
};

/**
 * الحصول على جميع القوالب المتاحة
 */
export const getAllTemplates = () => {
  return Object.keys(templateRegistry).map(id => ({
    id,
    ...templateRegistry[id].template
  }));
};