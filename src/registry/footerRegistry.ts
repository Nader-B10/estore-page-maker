import { ComponentType } from 'react';
import { StoreSettings, CustomPage } from '../types/store';

// Footer Components
import DefaultFooter, { DefaultFooterConfig } from '../components/StoreBuilder/sections/footers/DefaultFooter';
import SimpleFooter, { SimpleFooterConfig } from '../components/StoreBuilder/sections/footers/SimpleFooter';
import DetailedFooter, { DetailedFooterConfig } from '../components/StoreBuilder/sections/footers/DetailedFooter';
import ModernFooter, { ModernFooterConfig } from '../components/StoreBuilder/sections/footers/ModernFooter';

export interface FooterComponentProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export const footerComponents: Record<string, {
  component: ComponentType<FooterComponentProps>;
  config: any;
}> = {
  'default-footer': {
    component: DefaultFooter,
    config: DefaultFooterConfig
  },
  'simple-footer': {
    component: SimpleFooter,
    config: SimpleFooterConfig
  },
  'detailed-footer': {
    component: DetailedFooter,
    config: DetailedFooterConfig
  },
  'modern-footer': {
    component: ModernFooter,
    config: ModernFooterConfig
  }
};

export const getFooterComponent = (templateId: string) => {
  return footerComponents[templateId] || footerComponents['default-footer'];
};

export const getAvailableFooters = () => {
  return Object.entries(footerComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};