import { StoreData, CustomPage } from '../../types/store';
import { generateStaticCss } from './staticCss';
import { generateStoreJS } from './jsGenerator';
import { generateHeaderHTML } from './sectionGenerators/header';
import { generateFooterHTML } from './sectionGenerators/footer';
import { generateProductSectionHTML } from './sectionGenerators/products';

export const generateCustomPageHTML = (storeData: StoreData, page: CustomPage): string => {
  const { settings } = storeData;

  // Generate page content based on page type
  let pageContent = '';
  
  if (page.pageType === 'products' && page.showAllProducts) {
    // Generate products section for products pages
    pageContent = generateProductSectionHTML(storeData, 'allProducts');
  } else {
    // Generate content page
    pageContent = `
      <section class="container mx-auto px-6 py-16">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4" style="color: ${settings.primaryColor};">${page.title}</h1>
            <div class="w-24 h-1 mx-auto rounded" style="background-color: ${settings.accentColor};"></div>
          </div>
          <div class="prose prose-lg max-w-none text-text">
            ${page.content.split('\n').map(paragraph => 
              paragraph.trim() ? `<p class="mb-4 leading-relaxed">${paragraph}</p>` : ''
            ).join('')}
          </div>
        </div>
      </section>
    `;
  }

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title} - ${settings.storeName}</title>
    <meta name="description" content="${page.metaDescription || page.content.substring(0, 160)}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="font-sans">
    ${generateHeaderHTML(storeData)}
    <main>
        ${pageContent}
    </main>
    ${generateFooterHTML(storeData)}
    <script src="main.js"></script>
</body>
</html>`;
};

export const generateAllCustomPages = (storeData: StoreData): { [filename: string]: string } => {
  const pages: { [filename: string]: string } = {};
  
  storeData.pages.forEach(page => {
    const filename = `${page.slug}.html`;
    pages[filename] = generateCustomPageHTML(storeData, page);
  });
  
  return pages;
};