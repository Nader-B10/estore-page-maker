// Main registry that combines all component registries
export * from './headerRegistry';
export * from './footerRegistry';
export * from './heroRegistry';
export * from './aboutRegistry';
export * from './featuresRegistry';
export * from './faqRegistry';

// Re-export component getters for easy access
export { getHeaderComponent, getAvailableHeaders } from './headerRegistry';
export { getFooterComponent, getAvailableFooters } from './footerRegistry';
export { getHeroComponent, getAvailableHeros } from './heroRegistry';
export { getAboutComponent, getAvailableAbouts } from './aboutRegistry';
export { getFeaturesComponent, getAvailableFeatures } from './featuresRegistry';
export { getFAQComponent, getAvailableFAQs } from './faqRegistry';