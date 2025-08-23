import { StoreData, Page } from '../../types/store';
import { templateRegistry } from '../../templates/registry';

export const generatePageHTML = (storeData: StoreData, page: Page): string => {
  const { settings } = storeData;

  const headerHTML = templateRegistry.header.default.generator(storeData);
  
  const sectionsHTML = page.sections
    .map(sectionKey => {
      const sectionConfig = settings.sections[sectionKey];
      if (!sectionConfig || !sectionConfig.enabled) return '';
      
      const templateModule = (templateRegistry as any)[sectionKey]?.[sectionConfig.template];
      if (!templateModule) {
        return `<!-- Template "${sectionConfig.template}" for section "${sectionKey}" not found. -->`;
      }
      return templateModule.generator(storeData, sectionKey);
    })
    .join('\n');

  const footerConfig = settings.sections.footer;
  const footerTemplate = (templateRegistry.footer as any)[footerConfig.template];
  const footerHTML = footerTemplate ? footerTemplate.generator(storeData, 'footer') : '';

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title} | ${settings.storeName}</title>
    <meta name="description" content="${settings.description}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css" rel="stylesheet" integrity="sha384-dpuaG1suU0eT09tx5plTaGMLBsfA80DDsmIVtd/QFOQwFdpvoDhWRSHdkKtspZER" crossorigin="anonymous">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;700&display=swap" rel="stylesheet">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    ${headerHTML}
    <main>
        ${sectionsHTML}
    </main>
    ${footerHTML}

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    
    <!-- Custom JS -->
    <script src="assets/main.js"></script>
</body>
</html>`;
};
