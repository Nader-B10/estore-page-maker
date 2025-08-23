import { StoreData } from '../../types/store';
import { generateHeaderHTML } from './sectionGenerators/header';
import { generateFooterHTML } from './sectionGenerators/footer';
import { generateHeroHTML } from './sectionGenerators/hero';
import { generateProductSectionHTML } from './sectionGenerators/products';
import { generateWhyChooseUsHTML } from './sectionGenerators/whyChooseUs';
import { generateFaqHTML } from './sectionGenerators/faq';

export const generateStoreHTML = (storeData: StoreData): string => {
  const { settings } = storeData;

  // Create section generators map
  const sectionGenerators: { [key: string]: () => string } = {
    hero: () => generateHeroHTML(storeData),
    featuredProducts: () => generateProductSectionHTML(storeData, 'featuredProducts'),
    bestSellers: () => generateProductSectionHTML(storeData, 'bestSellers'),
    onSale: () => generateProductSectionHTML(storeData, 'onSale'),
    whyChooseUs: () => generateWhyChooseUsHTML(storeData),
    faq: () => generateFaqHTML(storeData),
    allProducts: () => generateProductSectionHTML(storeData, 'allProducts'),
  };

  // Generate sections in the specified order
  const sectionsHTML = settings.sectionOrder
    .map(sectionKey => sectionGenerators[sectionKey]?.())
    .filter(Boolean)
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
    ${generateHeaderHTML(storeData)}
    <main>
        ${sectionsHTML}
    </main>
    ${generateFooterHTML(storeData)}
    <script src="main.js"></script>
</body>
</html>`;
};