import React from 'react';
import { Alert } from 'react-bootstrap';
import { useStore } from '../../contexts/StoreContext';
import { themes } from '../../themes/palettes';
import { templateRegistry } from '../../templates/registry';
import { StoreSettings } from '../../types/store';

interface StorePreviewProps {
  pageId: string;
}

export default function StorePreview({ pageId }: StorePreviewProps) {
  const { storeData } = useStore();
  const { settings } = storeData;
  
  const currentTheme = themes.find(t => t.name === settings.theme) || themes[0];

  if (!currentTheme) {
    return (
      <div className="p-4">
        <Alert variant="danger">
          <Alert.Heading>خطأ في الثيم</Alert.Heading>
          <p>لم يتم العثور على الثيم المحدد. يرجى اختيار ثيم آخر من لوحة الإعدادات.</p>
        </Alert>
      </div>
    );
  }

  const themeStyles: React.CSSProperties = {
    '--bs-primary': settings.primaryColor,
    '--bs-secondary': settings.secondaryColor,
    '--bs-warning': settings.accentColor,
    fontFamily: settings.fontFamily,
    backgroundColor: currentTheme.colors.background,
    color: currentTheme.colors.text,
  };

  const currentPage = settings.pages.find(p => p.id === pageId);
  
  if (!currentPage) {
    return (
        <div className="p-4">
            <Alert variant="danger">
                <Alert.Heading>خطأ في المعاينة</Alert.Heading>
                <p>لم يتم العثور على الصفحة المحددة ({pageId}).</p>
            </Alert>
        </div>
    );
  }

  const pageSections = currentPage.sections;

  return (
    <div style={themeStyles}>
      <div className="preview-header">
        {templateRegistry.header.default.Preview({ storeData })}
      </div>

      <main>
        {pageSections.map(sectionKey => {
          const sectionConfig = settings.sections[sectionKey];
          if (!sectionConfig.enabled) return null;

          const template = (templateRegistry as any)[sectionKey]?.[sectionConfig.template];
          if (!template || !template.Preview) {
            console.warn(`Template Preview not found for section: ${sectionKey} with template: ${sectionConfig.template}`);
            return <div key={sectionKey} className="p-4 text-danger">Template Preview not found for {sectionKey}</div>;
          }
          
          const PreviewComponent = template.Preview;
          return <PreviewComponent key={sectionKey} storeData={storeData} sectionKey={sectionKey} />;
        })}
      </main>

      <div className="preview-footer">
        {(() => {
          const footerConfig = settings.sections.footer;
          if (!footerConfig.enabled) return null;
          const template = (templateRegistry.footer as any)[footerConfig.template];
          if (!template || !template.Preview) {
            console.warn(`Footer template preview not found: ${footerConfig.template}`);
            return null;
          }
          const PreviewComponent = template.Preview;
          return <PreviewComponent storeData={storeData} sectionKey="footer" />;
        })()}
      </div>
    </div>
  );
}
