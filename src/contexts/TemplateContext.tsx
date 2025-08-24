/**
 * سياق القوالب (Template Context)
 * يدير القالب المحدد حالياً ويوفر وظائف التبديل بين القوالب
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { TemplateContext as ITemplateContext, Template } from '../types/template';
import { getAllTemplates, getTemplate } from '../templates/registry';
import { useStore } from './StoreContext';

const TemplateContext = createContext<ITemplateContext | undefined>(undefined);

interface TemplateProviderProps {
  children: ReactNode;
}

export const TemplateProvider: React.FC<TemplateProviderProps> = ({ children }) => {
  const { storeData, updateSettings } = useStore();
  const currentTemplate = storeData.settings.currentTemplate || 'default';
  const availableTemplates = getAllTemplates();

  const switchTemplate = (templateId: string) => {
    const template = getTemplate(templateId);
    if (template) {
      // تطبيق الإعدادات الافتراضية للقالب الجديد
      updateSettings({
        currentTemplate: templateId,
        ...template.template.defaultSettings,
      });
    }
  };

  const value: ITemplateContext = {
    currentTemplate,
    availableTemplates,
    switchTemplate,
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = (): ITemplateContext => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};