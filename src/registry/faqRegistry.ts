import { ComponentType } from 'react';
import { StoreSettings } from '../types/store';

// FAQ Components
import AccordionFAQ, { AccordionFAQConfig } from '../components/StoreBuilder/sections/faq/AccordionFAQ';
import SimpleFAQ, { SimpleFAQConfig } from '../components/StoreBuilder/sections/faq/SimpleFAQ';

export interface FAQComponentProps {
  settings: StoreSettings;
}

export const faqComponents: Record<string, {
  component: ComponentType<FAQComponentProps>;
  config: any;
}> = {
  'accordion-faq': {
    component: AccordionFAQ,
    config: AccordionFAQConfig
  },
  'simple-faq': {
    component: SimpleFAQ,
    config: SimpleFAQConfig
  }
};

export const getFAQComponent = (templateId: string) => {
  return faqComponents[templateId] || faqComponents['accordion-faq'];
};

export const getAvailableFAQs = () => {
  return Object.entries(faqComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};