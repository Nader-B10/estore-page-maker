import { ComponentType } from 'react';
import { StoreSettings } from '../types/store';

// Hero Components
import HeroVariantA, { HeroVariantAConfig } from '../components/StoreBuilder/sections/hero/HeroVariantA';
import HeroVariantB, { HeroVariantBConfig } from '../components/StoreBuilder/sections/hero/HeroVariantB';
import HeroVariantC, { HeroVariantCConfig } from '../components/StoreBuilder/sections/hero/HeroVariantC';

export interface HeroComponentProps {
  settings: StoreSettings;
}

export const heroComponents: Record<string, {
  component: ComponentType<HeroComponentProps>;
  config: any;
}> = {
  'hero-variant-a': {
    component: HeroVariantA,
    config: HeroVariantAConfig
  },
  'hero-variant-b': {
    component: HeroVariantB,
    config: HeroVariantBConfig
  },
  'hero-variant-c': {
    component: HeroVariantC,
    config: HeroVariantCConfig
  }
};

export const getHeroComponent = (templateId: string) => {
  return heroComponents[templateId] || heroComponents['hero-variant-a'];
};

export const getAvailableHeros = () => {
  return Object.entries(heroComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};