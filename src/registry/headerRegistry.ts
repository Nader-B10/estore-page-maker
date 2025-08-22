import { ComponentType } from 'react';
import { StoreSettings, CustomPage } from '../types';

// Header Components
import ModernHeader1, { ModernHeader1Config } from '../components/StoreBuilder/sections/headers/ModernHeader1';
import ClassicHeader, { ClassicHeaderConfig } from '../components/StoreBuilder/sections/headers/ClassicHeader';
import MinimalHeader, { MinimalHeaderConfig } from '../components/StoreBuilder/sections/headers/MinimalHeader';
import ElegantHeader, { ElegantHeaderConfig } from '../components/StoreBuilder/sections/headers/ElegantHeader';
import CorporateHeader, { CorporateHeaderConfig } from '../components/StoreBuilder/sections/headers/CorporateHeader';
import CreativeHeader, { CreativeHeaderConfig } from '../components/StoreBuilder/sections/headers/CreativeHeader';

export interface ComponentConfig {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: string;
  features: string[];
  customizable: {
    colors: boolean;
    layout: boolean;
    typography: boolean;
    features?: boolean;
  };
}

export interface HeaderComponentProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export const headerComponents: Record<string, {
  component: ComponentType<HeaderComponentProps>;
  config: ComponentConfig;
}> = {
  'modern-header-1': {
    component: ModernHeader1,
    config: ModernHeader1Config
  },
  'classic-header': {
    component: ClassicHeader,
    config: ClassicHeaderConfig
  },
  'minimal-header': {
    component: MinimalHeader,
    config: MinimalHeaderConfig
  },
  'elegant-header': {
    component: ElegantHeader,
    config: ElegantHeaderConfig
  },
  'corporate-header': {
    component: CorporateHeader,
    config: CorporateHeaderConfig
  },
  'creative-header': {
    component: CreativeHeader,
    config: CreativeHeaderConfig
  }
};

export const getHeaderComponent = (templateId: string) => {
  return headerComponents[templateId] || headerComponents['classic-header'];
};

export const getAvailableHeaders = () => {
  return Object.entries(headerComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};