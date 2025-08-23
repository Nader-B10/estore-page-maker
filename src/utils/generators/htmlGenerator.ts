import { StoreData } from '../../types/store';
import { templateRegistry } from '../../templates/registry';

export const generateStoreHTML = (storeData: StoreData): string => {
  const { settings } = storeData;

  const headerHTML = templateRegistry.header.default.generator(storeData);
  const footerHTML = templateRegistry.footer.default.generator(storeData);

  const orderedSections: (keyof typeof settings.sections)[] = [
    'hero', 'featuredProducts', 'bestSellers', 'onSale', 'allProducts', 'whyChooseUs', 'faq'
  ];

  const sectionsHTML = orderedSections
    .map(sectionKey => {
      const sectionConfig = settings.sections[sectionKey];
      if (!sectionConfig.enabled) return '';
      const template = (templateRegistry as any)[sectionKey]?.[sectionConfig.template];
      if (!template) return `<!-- Template ${sectionConfig.template} for ${sectionKey} not found -->`;
      return template.generator(storeData, sectionKey);
    })
    .join('\n');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.storeName}</title>
    <meta name="description" content="${settings.description}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="font-sans">
    ${headerHTML}
    <main>
        ${sectionsHTML}
    </main>
    ${footerHTML}
    <script src="main.js"></script>
</body>
</html>`;
};
