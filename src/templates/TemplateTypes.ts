import React from 'react';
import { StoreData, StoreSettings } from '../types/store';

export interface TemplateProps {
  storeData: StoreData;
  sectionKey?: keyof StoreSettings['sections'];
}

export interface TemplateModule {
  Preview: React.FC<TemplateProps>;
  generator: (storeData: StoreData, sectionKey?: keyof StoreSettings['sections']) => string;
  metadata: {
    id: string;
    name: string;
  };
}
