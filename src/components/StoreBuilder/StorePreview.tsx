import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import { themes } from '../../themes/palettes';
import { templateRegistry } from '../../templates/registry';
import { StoreSettings } from '../../types/store';

export default function StorePreview() {
  const { storeData } = useStore();
  const { settings } = storeData;
  
  const currentTheme = themes.find(t => t.name === settings.theme) || themes[0];

  const orderedSections: (keyof StoreSettings['sections'])[] = [
    'hero',
    'featuredProducts',
    'bestSellers',
    'onSale',
    'allProducts',
    'whyChooseUs',
    'faq'
  ];

  return (
    <div style={{ 
        fontFamily: settings.fontFamily, 
        backgroundColor: currentTheme.colors.background, 
        color: currentTheme.colors.text 
    }}>
      <div className="preview-header">
        {templateRegistry.header.default.Preview({ storeData })}
      </div>

      <main>
        {orderedSections.map(sectionKey => {
          const sectionConfig = settings.sections[sectionKey];
          if (!sectionConfig.enabled) return null;

          const template = (templateRegistry as any)[sectionKey]?.[sectionConfig.template];
          if (!template || !template.Preview) {
            return <div key={sectionKey} className="p-4 text-red-500">Template Preview not found for {sectionKey}</div>;
          }
          
          const PreviewComponent = template.Preview;
          return <PreviewComponent key={sectionKey} storeData={storeData} sectionKey={sectionKey} />;
        })}
      </main>

      <div className="preview-footer">
        {templateRegistry.footer.default.Preview({ storeData })}
      </div>
    </div>
  );
}
