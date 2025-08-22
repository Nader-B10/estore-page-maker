import React from 'react';
import { StoreData, getThemeById } from '../../types';
import { getHeaderComponent, getFooterComponent, getHeroComponent, getAboutComponent, getFeaturesComponent, getFAQComponent } from '../../registry';
import ProductSection from './preview/ProductSection';
import CategoriesSection from './preview/CategoriesSection';
import AdvancedSearch from './preview/AdvancedSearch';

interface StorePreviewProps {
  storeData: StoreData;
}

export default function StorePreview({ storeData }: StorePreviewProps) {
  const { settings } = storeData;
  const currentTheme = getThemeById(settings.themeId);
  const [filteredProducts, setFilteredProducts] = React.useState(storeData.products);
  
  // حساب عدد المنتجات لكل فئة
  const productCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    storeData.products.forEach(product => {
      if (product.category) {
        counts[product.category] = (counts[product.category] || 0) + 1;
      }
    });
    return counts;
  }, [storeData.products]);
  
  const HeaderComponent = getHeaderComponent(settings.headerTemplate).component;
  const FooterComponent = getFooterComponent(settings.footerTemplate).component;
  const HeroComponent = getHeroComponent(settings.heroTemplate).component;
  const AboutComponent = getAboutComponent(settings.aboutTemplate).component;
  const FeaturesComponent = getFeaturesComponent(settings.featuresTemplate).component;
  const FAQComponent = getFAQComponent(settings.faqTemplate).component;

  const renderSection = (sectionId: string, index: number) => {
    const key = `${sectionId}-${index}-${Date.now()}`;
    
    switch (sectionId) {
      case 'hero':
        return <HeroComponent key={key} settings={settings} />;
      
      case 'categories':
        return (
          <CategoriesSection
            key={key}
            categories={storeData.categories}
            settings={settings}
            productCounts={productCounts}
          />
        );
      
      case 'search':
        return (
          <div key={key} className="py-8 px-6">
            <div className="max-w-4xl mx-auto">
              <AdvancedSearch
                products={storeData.products}
                categories={storeData.categories}
                settings={settings}
                onProductsFiltered={setFilteredProducts}
              />
            </div>
          </div>
        );
      
      case 'featured':
        return (
          <ProductSection
            key={key}
            storeData={{ ...storeData, products: filteredProducts }}
            sectionType="featured"
            currentTheme={currentTheme}
          />
        );
      
      case 'bestSellers':
        return (
          <ProductSection
            key={key}
            storeData={{ ...storeData, products: filteredProducts }}
            sectionType="bestSellers"
            currentTheme={currentTheme}
          />
        );
      
      case 'onSale':
        return (
          <ProductSection
            key={key}
            storeData={{ ...storeData, products: filteredProducts }}
            sectionType="onSale"
            currentTheme={currentTheme}
          />
        );
      
      case 'about':
        return <AboutComponent key={key} settings={settings} />;
      
      case 'whyChooseUs':
        return <FeaturesComponent key={key} settings={settings} />;
      
      case 'faq':
        return <FAQComponent key={key} settings={settings} />;
      
      default:
        return null;
    }
  };

  return (
    <div 
      className="h-full overflow-auto" 
      style={{ 
        fontFamily: settings.fontFamily,
        backgroundColor: currentTheme.palette.background,
        color: currentTheme.palette.text,
        '--primary-color': currentTheme.palette.primary,
        '--secondary-color': currentTheme.palette.secondary,
        '--accent-color': currentTheme.palette.accent,
        '--text-color': currentTheme.palette.text,
        '--text-secondary': currentTheme.palette.textSecondary,
        '--background-color': currentTheme.palette.background,
        '--surface-color': currentTheme.palette.surface,
        '--border-color': currentTheme.palette.border,
        '--success-color': currentTheme.palette.success,
        '--warning-color': currentTheme.palette.warning,
        '--error-color': currentTheme.palette.error
      } as React.CSSProperties}
    >
      {/* Header */}
      <HeaderComponent settings={settings} customPages={storeData.customPages} />

      {/* Dynamic Sections Based on Order */}
      {settings.sectionsOrder.map((sectionId, index) => renderSection(sectionId, index))}

      {/* Footer */}
      <FooterComponent settings={settings} customPages={storeData.customPages} />
    </div>
  );
}