import { ComponentType } from 'react';
import { StoreSettings, CustomPage } from '../types/store';

// Header Components
import ModernHeader1, { ModernHeader1Config } from '../components/StoreBuilder/sections/headers/ModernHeader1';
import ClassicHeader, { ClassicHeaderConfig } from '../components/StoreBuilder/sections/headers/ClassicHeader';
import MinimalHeader, { MinimalHeaderConfig } from '../components/StoreBuilder/sections/headers/MinimalHeader';
import ElegantHeader, { ElegantHeaderConfig } from '../components/StoreBuilder/sections/headers/ElegantHeader';
import CorporateHeader, { CorporateHeaderConfig } from '../components/StoreBuilder/sections/headers/CorporateHeader';
import CreativeHeader, { CreativeHeaderConfig } from '../components/StoreBuilder/sections/headers/CreativeHeader';

// Footer Components
import DefaultFooter, { DefaultFooterConfig } from '../components/StoreBuilder/sections/footers/DefaultFooter';
import SimpleFooter, { SimpleFooterConfig } from '../components/StoreBuilder/sections/footers/SimpleFooter';
import DetailedFooter, { DetailedFooterConfig } from '../components/StoreBuilder/sections/footers/DetailedFooter';
import ModernFooter, { ModernFooterConfig } from '../components/StoreBuilder/sections/footers/ModernFooter';

// Hero Components
import HeroVariantA, { HeroVariantAConfig } from '../components/StoreBuilder/sections/hero/HeroVariantA';
import HeroVariantB, { HeroVariantBConfig } from '../components/StoreBuilder/sections/hero/HeroVariantB';
import HeroVariantC, { HeroVariantCConfig } from '../components/StoreBuilder/sections/hero/HeroVariantC';

// About Components
import ModernAbout, { ModernAboutConfig } from '../components/StoreBuilder/sections/about/ModernAbout';
import SimpleAbout, { SimpleAboutConfig } from '../components/StoreBuilder/sections/about/SimpleAbout';

// Features Components
import GridFeatures, { GridFeaturesConfig } from '../components/StoreBuilder/sections/features/GridFeatures';
import IconFeatures, { IconFeaturesConfig } from '../components/StoreBuilder/sections/features/IconFeatures';

// FAQ Components
import AccordionFAQ, { AccordionFAQConfig } from '../components/StoreBuilder/sections/faq/AccordionFAQ';
import SimpleFAQ, { SimpleFAQConfig } from '../components/StoreBuilder/sections/faq/SimpleFAQ';

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

export interface FooterComponentProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export interface HeroComponentProps {
  settings: StoreSettings;
}

export interface AboutComponentProps {
  settings: StoreSettings;
}

export interface FeaturesComponentProps {
  settings: StoreSettings;
}

export interface FAQComponentProps {
  settings: StoreSettings;
}

// Component Registry
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

export const footerComponents: Record<string, {
  component: ComponentType<FooterComponentProps>;
  config: ComponentConfig;
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

export const heroComponents: Record<string, {
  component: ComponentType<HeroComponentProps>;
  config: ComponentConfig;
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

export const aboutComponents: Record<string, {
  component: ComponentType<AboutComponentProps>;
  config: ComponentConfig;
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

export const featuresComponents: Record<string, {
  component: ComponentType<FeaturesComponentProps>;
  config: ComponentConfig;
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

export const faqComponents: Record<string, {
  component: ComponentType<FAQComponentProps>;
  config: ComponentConfig;
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

// Helper functions
export const getHeaderComponent = (templateId: string) => {
  return headerComponents[templateId] || headerComponents['classic-header'];
};

export const getFooterComponent = (templateId: string) => {
  return footerComponents[templateId] || footerComponents['default-footer'];
};

export const getHeroComponent = (templateId: string) => {
  return heroComponents[templateId] || heroComponents['hero-variant-a'];
};

export const getAboutComponent = (templateId: string) => {
  return aboutComponents[templateId] || aboutComponents['modern-about'];
};

export const getFeaturesComponent = (templateId: string) => {
  return featuresComponents[templateId] || featuresComponents['grid-features'];
};

export const getFAQComponent = (templateId: string) => {
  return faqComponents[templateId] || faqComponents['accordion-faq'];
};

export const getAvailableHeaders = () => {
  return Object.entries(headerComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};

export const getAvailableFooters = () => {
  return Object.entries(footerComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};

export const getAvailableHeros = () => {
  return Object.entries(heroComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};

export const getAvailableAbouts = () => {
  return Object.entries(aboutComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};

export const getAvailableFeatures = () => {
  return Object.entries(featuresComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};

export const getAvailableFAQs = () => {
  return Object.entries(faqComponents).map(([id, { config }]) => ({
    id,
    ...config
  }));
};

// Static HTML generators for export
export const generateHeaderHTML = (templateId: string, settings: StoreSettings): string => {
  switch (templateId) {
    case 'modern-header-1':
      return `
        <header class="py-6 px-6 text-white relative overflow-hidden" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}); box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          </div>
          <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                ${settings.logo ? `
                  <div class="relative">
                    <img src="${settings.logo}" alt="Logo" class="w-14 h-14 object-cover rounded-xl shadow-lg border-2 border-white/20" />
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                ` : ''}
                <div>
                  <h1 class="text-2xl font-bold mb-1 drop-shadow-sm">${settings.storeName}</h1>
                  <p class="text-sm opacity-90 drop-shadow-sm">${settings.description}</p>
                </div>
              </div>
              <nav class="hidden md:flex items-center gap-8">
                ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                  <a href="${link.url}" class="text-white hover:text-opacity-80 transition-all duration-200 font-medium relative group" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    ${link.text}
                    <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"></div>
                  </a>
                `).join('')}
              </nav>
              ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
                <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                  تواصل معنا
                </a>
              ` : ''}
            </div>
          </div>
        </header>
      `;
    
    case 'elegant-header':
      return `
        <header class="bg-white shadow-lg border-b-4 border-gray-100">
          <div class="bg-gray-50 py-2 px-6 text-sm">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
              <div class="flex items-center gap-4 text-gray-600">
                ${settings.contactInfo.email ? `<span>📧 ${settings.contactInfo.email}</span>` : ''}
                ${settings.contactInfo.phone ? `<span>📞 ${settings.contactInfo.phone}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="py-6 px-6">
            <div class="max-w-7xl mx-auto">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-4">
                  ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-16 h-16 object-cover rounded-xl shadow-md border-2 border-gray-100" />` : ''}
                  <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-1">${settings.storeName}</h1>
                    <p class="text-gray-600 text-sm">${settings.description}</p>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <div class="relative max-w-2xl mx-auto">
                  <input type="text" placeholder="ابحث عن المنتجات..." class="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 text-lg" />
                  <button class="absolute left-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full text-white font-medium" style="background-color: ${settings.primaryColor}">بحث</button>
                </div>
              </div>
              <nav class="flex justify-center">
                <div class="flex items-center gap-8 bg-gray-50 px-8 py-4 rounded-full">
                  ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg relative group">
                      ${link.text}
                    </a>
                  `).join('')}
                </div>
              </nav>
            </div>
          </div>
        </header>
      `;

    case 'corporate-header':
      return `
        <header class="bg-white">
          <div class="bg-gray-800 text-white py-2 px-6 text-sm">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
              <div class="flex items-center gap-6">
                ${settings.contactInfo.phone ? `<span>📞 ${settings.contactInfo.phone}</span>` : ''}
                ${settings.contactInfo.email ? `<span>📧 ${settings.contactInfo.email}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="py-6 px-6 border-b border-gray-200">
            <div class="max-w-7xl mx-auto">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-6">
                  ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-20 h-20 object-cover rounded-lg shadow-md" />` : ''}
                  <div>
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">${settings.storeName}</h1>
                    <p class="text-gray-600 text-lg">${settings.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 py-4 px-6">
            <div class="max-w-7xl mx-auto">
              <nav class="flex justify-center">
                <div class="flex items-center gap-8">
                  ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg px-4 py-2 rounded-lg hover:bg-white hover:shadow-md">
                      ${link.text}
                    </a>
                  `).join('')}
                </div>
              </nav>
            </div>
          </div>
        </header>
      `;

    case 'creative-header':
      return `
        <header class="relative overflow-hidden" style="background: linear-gradient(135deg, ${settings.primaryColor}15, ${settings.secondaryColor}15, ${settings.accentColor}15);">
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
            <div class="absolute top-1/2 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full"></div>
          </div>
          <div class="relative z-10 py-8 px-6">
            <div class="max-w-7xl mx-auto">
              <div class="text-center mb-8">
                ${settings.logo ? `
                  <div class="mb-6 flex justify-center">
                    <img src="${settings.logo}" alt="Logo" class="w-24 h-24 object-cover rounded-full shadow-2xl border-4 border-white" />
                  </div>
                ` : ''}
                <h1 class="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  ${settings.storeName}
                </h1>
                <p class="text-xl text-gray-700 mb-6">✨ ${settings.description} ✨</p>
              </div>
              <nav class="flex justify-center">
                <div class="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-full shadow-xl">
                  ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg" style="background: linear-gradient(135deg, ${settings.primaryColor}20, ${settings.accentColor}20); color: ${settings.primaryColor}">
                      ${link.text}
                    </a>
                  `).join('')}
                </div>
              </nav>
            </div>
          </div>
        </header>
      `;

    case 'minimal-header':
      return `
        <header class="py-6 px-6 bg-white border-b border-gray-100 shadow-sm">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-12 h-12 object-cover rounded-lg shadow-sm" />` : ''}
                <div>
                  <h1 class="text-2xl font-bold text-gray-900">${settings.storeName}</h1>
                  <p class="text-sm text-gray-600">${settings.description}</p>
                </div>
              </div>
              <nav class="hidden md:flex items-center gap-8">
                ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                  <a href="${link.url}" class="text-gray-700 hover:text-gray-900 transition-colors font-medium" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    ${link.text}
                  </a>
                `).join('')}
              </nav>
            </div>
          </div>
        </header>
      `;
    
    default: // classic-header
      return `
        <header class="py-4 px-6 text-white shadow-lg" style="background-color: ${settings.primaryColor};">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-10 h-10 object-cover rounded-lg" />` : ''}
                <div>
                  <h1 class="text-xl font-bold">${settings.storeName}</h1>
                  <p class="text-sm opacity-90">${settings.description}</p>
                </div>
              </div>
              <nav class="hidden md:flex items-center gap-6">
                ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                  <a href="${link.url}" class="text-white hover:opacity-80 transition-opacity font-medium" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                    ${link.text}
                  </a>
                `).join('')}
              </nav>
            </div>
          </div>
        </header>
      `;
  }
};