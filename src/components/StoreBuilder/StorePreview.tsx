import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import { themes } from '../../themes/palettes';

// Import specific preview components
import PreviewHeader from '../StorePreview/PreviewHeader';
import PreviewFooter from '../StorePreview/PreviewFooter';
import PreviewHero from '../StorePreview/PreviewHero';
import PreviewProductSection from '../StorePreview/PreviewProductSection';
import PreviewWhyChooseUs from '../StorePreview/PreviewWhyChooseUs';
import PreviewFAQ from '../StorePreview/PreviewFAQ';

export default function StorePreview() {
  const { storeData } = useStore();
  const { settings, products } = storeData;
  
  const currentTheme = themes.find(t => t.name === settings.theme) || themes[0];

  // Prepare product sections
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, settings.sections.featuredProducts.data.limit);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, settings.sections.bestSellers.data.limit);
  const onSale = products.filter(p => p.isOnSale).slice(0, settings.sections.onSale.data.limit);
  const allProducts = products;

  const orderedSections = [
    { key: 'hero', enabled: settings.sections.hero.enabled, component: <PreviewHero settings={settings} /> },
    { key: 'featuredProducts', enabled: settings.sections.featuredProducts.enabled, component: <PreviewProductSection title={settings.sections.featuredProducts.data.title} subtitle={settings.sections.featuredProducts.data.subtitle} products={featuredProducts} settings={settings} /> },
    { key: 'bestSellers', enabled: settings.sections.bestSellers.enabled, component: <PreviewProductSection title={settings.sections.bestSellers.data.title} subtitle={settings.sections.bestSellers.data.subtitle} products={bestSellers} settings={settings} /> },
    { key: 'onSale', enabled: settings.sections.onSale.enabled, component: <PreviewProductSection title={settings.sections.onSale.data.title} subtitle={settings.sections.onSale.data.subtitle} products={onSale} settings={settings} /> },
    { key: 'whyChooseUs', enabled: settings.sections.whyChooseUs.enabled, component: <PreviewWhyChooseUs settings={settings} /> },
    { key: 'faq', enabled: settings.sections.faq.enabled, component: <PreviewFAQ settings={settings} /> },
    { key: 'allProducts', enabled: settings.sections.allProducts.enabled, component: <PreviewProductSection title={settings.sections.allProducts.data.title} subtitle={settings.sections.allProducts.data.subtitle} products={allProducts} settings={settings} /> },
  ];

  return (
    <div style={{ 
        fontFamily: settings.fontFamily, 
        backgroundColor: currentTheme.colors.background, 
        color: currentTheme.colors.text 
    }}>
      <PreviewHeader settings={settings} />

      <main>
        {orderedSections.map(section => section.enabled && <React.Fragment key={section.key}>{section.component}</React.Fragment>)}
      </main>

      <PreviewFooter settings={settings} />
    </div>
  );
}
