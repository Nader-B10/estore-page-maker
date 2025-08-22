import { ComponentType } from 'react';
import { StoreSettings } from '../types/store';

// Features Components
import GridFeatures, { GridFeaturesConfig } from '../components/StoreBuilder/sections/features/GridFeatures';
import IconFeatures, { IconFeaturesConfig } from '../components/StoreBuilder/sections/features/IconFeatures';

export interface FeaturesComponentProps {
  settings: StoreSettings;
}

export const featuresComponents: Record<string, {
  component: ComponentType<FeaturesComponentProps>;
  config: any;
}> = {
  'grid-features': {
    component: GridFeatures,
    config: GridFeaturesConfig
  },
  'icon-features': {
    component: IconFeatures,
    config: IconFeaturesConfig
  }
};

export const getFeaturesComponent = (templateId: string) => {
  return featuresComponents[templateId] || featuresComponents['grid-features'];
};

export const getAvailableFeatures = () => {
  return Object.entries(featuresComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};