import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import { CustomPage } from '../../types/store';
import { themes } from '../../themes/palettes';
import PreviewHeader from './PreviewHeader';
import PreviewFooter from './PreviewFooter';
import PreviewProductSection from './PreviewProductSection';

interface StorePreviewPageProps {
  page: CustomPage;
}

export default function StorePreviewPage({ page }: StorePreviewPageProps) {
  const { storeData } = useStore();
  const { settings, products } = storeData;
  
  const currentTheme = themes.find(t => t.name === settings.theme) || themes[0];

  const renderPageContent = () => {
    if (page.pageType === 'products' && page.showAllProducts) {
      return (
        <PreviewProductSection 
          title={page.title}
          subtitle={page.content}
          products={products}
          settings={settings}
        />
      );
    }

    // Content page
    return (
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: settings.primaryColor }}>
              {page.title}
            </h1>
            <div className="w-24 h-1 mx-auto rounded" style={{ backgroundColor: settings.accentColor }}></div>
          </div>
          <div className="prose prose-lg max-w-none">
            {page.content.split('\n').map((paragraph, index) => 
              paragraph.trim() ? (
                <p key={index} className="mb-4 leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ) : null
            )}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div style={{ 
        fontFamily: settings.fontFamily, 
        backgroundColor: currentTheme.colors.background, 
        color: currentTheme.colors.text 
    }}>
      <PreviewHeader settings={settings} />
      <main>
        {renderPageContent()}
      </main>
      <PreviewFooter settings={settings} />
    </div>
  );
}