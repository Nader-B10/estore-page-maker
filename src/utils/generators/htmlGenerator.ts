import { StoreData } from '../../types/store';
import { templateRegistry } from '../../templates/registry';
import { themes } from '../../themes/palettes';

export const generateStoreHTML = (storeData: StoreData): string => {
  const { settings } = storeData;
  const theme = themes.find(t => t.name === settings.theme) || themes[0];

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
  
  const tailwindConfig = {
    theme: {
      extend: {
        colors: {
          primary: settings.primaryColor,
          secondary: settings.secondaryColor,
          accent: settings.accentColor,
          background: theme.colors.background,
          surface: theme.colors.surface,
          text: theme.colors.text,
          'subtle-text': theme.colors.subtleText,
          'footer-background': theme.colors.footerBackground,
          'footer-text': theme.colors.footerText,
        },
        fontFamily: {
          sans: [`'${settings.fontFamily}'`, 'sans-serif'],
        },
      }
    }
  };

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.storeName}</title>
    <meta name="description" content="${settings.description}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = ${JSON.stringify(tailwindConfig, null, 2)}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;700&display=swap" rel="stylesheet">
    <style>
      body { 
        font-family: ${JSON.stringify(tailwindConfig.theme.extend.fontFamily.sans)};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    </style>
</head>
<body class="font-sans bg-background text-text">
    ${headerHTML}
    <main>
        ${sectionsHTML}
    </main>
    ${footerHTML}
    <script src="main.js"></script>
</body>
</html>`;
};
