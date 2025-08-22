import { ComponentType } from 'react';
import { StoreSettings } from '../types';

// About Components
import ModernAbout, { ModernAboutConfig } from '../components/StoreBuilder/sections/about/ModernAbout';
import SimpleAbout, { SimpleAboutConfig } from '../components/StoreBuilder/sections/about/SimpleAbout';

export interface AboutComponentProps {
  settings: StoreSettings;
}

export const aboutComponents: Record<string, {
  component: ComponentType<AboutComponentProps>;
  config: any;
}> = {
  'modern-about': {
    component: ModernAbout,
    config: ModernAboutConfig
  },
  'simple-about': {
    component: SimpleAbout,
    config: SimpleAboutConfig
  }
};

export const getAboutComponent = (templateId: string) => {
  return aboutComponents[templateId] || aboutComponents['modern-about'];
};

export const getAvailableAbouts = () => {
  return Object.entries(aboutComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};