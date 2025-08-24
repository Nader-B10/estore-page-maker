import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { themes } from '../../themes/palettes';
import { CustomPage } from '../../types/store';

// Import specific preview components
import PreviewHeader from '../StorePreview/PreviewHeader';
import PreviewFooter from '../StorePreview/PreviewFooter';
import PreviewHero from '../StorePreview/PreviewHero';
import PreviewProductSection from '../StorePreview/PreviewProductSection';
import PreviewWhyChooseUs from '../StorePreview/PreviewWhyChooseUs';
import PreviewFAQ from '../StorePreview/PreviewFAQ';
import StorePreviewPage from '../StorePreview/StorePreviewPage';

export default function StorePreview() {
  const { storeData } = useStore();
  const { settings, products, pages } = storeData;
  
  const currentTheme = themes.find(t => t.name === settings.theme) || themes[0];
  const [selectedPage, setSelectedPage] = React.useState<CustomPage | null>(null);

  // If a custom page is selected, show it instead of the main store
  if (selectedPage) {
    return (
      <div className="relative">
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={() => setSelectedPage(null)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            ← العودة للصفحة الرئيسية
          </button>
        </div>
        <StorePreviewPage page={selectedPage} />
      </div>
    );
  }

  // Prepare product sections
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, settings.sections.featuredProducts.data.limit);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, settings.sections.bestSellers.data.limit);
  const onSale = products.filter(p => p.isOnSale).slice(0, settings.sections.onSale.data.limit);
  const allProducts = products;

  // Create section components map
  const sectionComponents: { [key: string]: { enabled: boolean; component: React.ReactNode } } = {
    hero: { enabled: settings.sections.hero.enabled, component: <PreviewHero settings={settings} /> },
    featuredProducts: { enabled: settings.sections.featuredProducts.enabled, component: <PreviewProductSection title={settings.sections.featuredProducts.data.title} subtitle={settings.sections.featuredProducts.data.subtitle} products={featuredProducts} settings={settings} /> },
    bestSellers: { enabled: settings.sections.bestSellers.enabled, component: <PreviewProductSection title={settings.sections.bestSellers.data.title} subtitle={settings.sections.bestSellers.data.subtitle} products={bestSellers} settings={settings} /> },
    onSale: { enabled: settings.sections.onSale.enabled, component: <PreviewProductSection title={settings.sections.onSale.data.title} subtitle={settings.sections.onSale.data.subtitle} products={onSale} settings={settings} /> },
    whyChooseUs: { enabled: settings.sections.whyChooseUs.enabled, component: <PreviewWhyChooseUs settings={settings} /> },
    faq: { enabled: settings.sections.faq.enabled, component: <PreviewFAQ settings={settings} /> },
    allProducts: { enabled: settings.sections.allProducts.enabled, component: <PreviewProductSection title={settings.sections.allProducts.data.title} subtitle={settings.sections.allProducts.data.subtitle} products={allProducts} settings={settings} /> },
  };

  // Create ordered sections based on sectionOrder
  const orderedSections = settings.sectionOrder
    .map(sectionKey => ({
      key: sectionKey,
      enabled: sectionComponents[sectionKey]?.enabled || false,
      component: sectionComponents[sectionKey]?.component || null
    }))
    .filter(section => section.component !== null);

  return (
    <div className="relative">
      {/* Page Navigation */}
      {pages.length > 1 && (
        <div className="absolute top-4 right-4 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
            <p className="text-sm font-medium text-gray-700 mb-2">معاينة الصفحات:</p>
            <div className="space-y-1">
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page)}
                  className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded flex items-center gap-2"
                >
                  <ExternalLink size={14} />
                  {page.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}
