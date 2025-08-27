import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { StoreData, StoreSettings, Product, CustomPage } from '../types';
import ProductDetailPage from '../components/Products/ProductDetailPage';
import ProductsPage from '../components/Products/ProductsPage';
import { 
  getHeaderComponent, 
  getFooterComponent, 
  getHeroComponent, 
  getAboutComponent, 
  getFeaturesComponent, 
  getFAQComponent 
} from '../registry';

/**
 * تحويل مكون React إلى HTML ثابت باستخدام ReactDOMServer.renderToStaticMarkup
 * هذه الطريقة تنتج HTML نظيف بدون أي وسوم React إضافية
 */
export const renderComponentToHTML = (component: React.ReactElement): string => {
  try {
    // استخدام renderToStaticMarkup بدلاً من renderToString
    // لإنتاج HTML نظيف بدون وسوم React الإضافية
    return renderToStaticMarkup(component);
  } catch (error) {
    console.error('Error rendering component to HTML with ReactDOMServer:', error);
    return '';
  }
};

/**
 * تحويل الهيدر إلى HTML ثابت
 */
export const renderHeaderToHTML = (settings: StoreSettings, customPages: CustomPage[]): string => {
  const HeaderComponent = getHeaderComponent(settings.headerTemplate).component;
  const headerElement = createElement(HeaderComponent, { settings, customPages });
  return renderComponentToHTML(headerElement);
};

/**
 * تحويل الفوتر إلى HTML ثابت
 */
export const renderFooterToHTML = (settings: StoreSettings, customPages: CustomPage[]): string => {
  const FooterComponent = getFooterComponent(settings.footerTemplate).component;
  const footerElement = createElement(FooterComponent, { settings, customPages });
  return renderComponentToHTML(footerElement);
};

/**
 * تحويل قسم الهيرو إلى HTML ثابت
 */
export const renderHeroToHTML = (settings: StoreSettings): string => {
  if (!settings.heroSection.enabled) return '';
  
  const HeroComponent = getHeroComponent(settings.heroTemplate).component;
  const heroElement = createElement(HeroComponent, { settings });
  return renderComponentToHTML(heroElement);
};

/**
 * تحويل قسم من نحن إلى HTML ثابت
 */
export const renderAboutToHTML = (settings: StoreSettings): string => {
  if (!settings.aboutSection?.enabled) return '';
  
  const AboutComponent = getAboutComponent(settings.aboutTemplate).component;
  const aboutElement = createElement(AboutComponent, { settings });
  return renderComponentToHTML(aboutElement);
};

/**
 * تحويل قسم لماذا تختارنا إلى HTML ثابت
 */
export const renderFeaturesToHTML = (settings: StoreSettings): string => {
  if (!settings.whyChooseUs?.enabled) return '';
  
  const FeaturesComponent = getFeaturesComponent(settings.featuresTemplate).component;
  const featuresElement = createElement(FeaturesComponent, { settings });
  return renderComponentToHTML(featuresElement);
};

/**
 * تحويل قسم الأسئلة الشائعة إلى HTML ثابت
 */
export const renderFAQToHTML = (settings: StoreSettings): string => {
  if (!settings.faq?.enabled) return '';
  
  const FAQComponent = getFAQComponent(settings.faqTemplate).component;
  const faqElement = createElement(FAQComponent, { settings });
  return renderComponentToHTML(faqElement);
};

/**
 * تحويل قسم المنتجات إلى HTML ثابت
 */
export const renderProductSectionToHTML = (
  storeData: StoreData, 
  sectionType: 'featured' | 'bestSellers' | 'onSale'
): string => {
  const { settings, products } = storeData;
  const sectionConfig = settings.productSections[sectionType];

  if (!sectionConfig.enabled) return '';

  const filteredProducts = products.filter(product => {
    switch (sectionType) {
      case 'featured':
        return product.isFeatured;
      case 'bestSellers':
        return product.isBestSeller;
      case 'onSale':
        return product.isOnSale;
      default:
        return false;
    }
  }).slice(0, sectionConfig.limit);

  if (filteredProducts.length === 0) return '';

  const generateProductCardHTML = (product: Product) => `
    <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2 cursor-pointer" onclick="window.open('product-${product.id}.html', '_blank')">
      <div class="relative overflow-hidden">
        <img src="images/${product.id}.jpg" alt="${product.name}" class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
        
        <div class="absolute top-3 right-3 flex flex-col gap-2">
          ${product.category ? `<span class="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg" style="background-color: ${settings.accentColor}">${product.category}</span>` : ''}
          ${product.isOnSale && product.discountPercentage ? `<span class="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-pulse">-${product.discountPercentage}%</span>` : ''}
        </div>

        <div class="absolute bottom-3 left-3 flex flex-wrap gap-1">
          ${product.isFeatured ? '<span class="bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-full">⭐ مميز</span>' : ''}
          ${product.isBestSeller ? '<span class="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">🏆 الأعلى مبيعاً</span>' : ''}
          ${product.isOnSale ? '<span class="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">🔥 عرض</span>' : ''}
        </div>
      </div>

      <div class="p-6">
        <h3 class="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">${product.name}</h3>
        <p class="text-gray-600 mb-4 line-clamp-2 leading-relaxed">${product.description}</p>
        
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <span class="text-2xl font-black" style="color: ${settings.primaryColor}">$${product.price}</span>
            ${product.originalPrice && product.originalPrice > product.price ? `<span class="text-sm text-gray-500 line-through">$${product.originalPrice}</span>` : ''}
          </div>
          
          ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
            <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}?text=${encodeURIComponent(generateWhatsAppMessage(product, settings))}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="px-6 py-3 text-white rounded-xl hover:opacity-90 transition-all duration-200 flex items-center gap-2 hover:scale-105 shadow-lg font-bold" style="background-color: #25D366">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              شراء الآن
            </a>
          ` : `
            <button class="px-6 py-3 text-white rounded-xl opacity-50 cursor-not-allowed shadow-lg" style="background-color: ${settings.secondaryColor}" disabled>غير متاح</button>
          `}
        </div>
      </div>
    </div>
  `;

  const generateWhatsAppMessage = (product: Product, settings: StoreSettings): string => {
    let message = settings.whatsappSettings.messageTemplate;
    
    if (settings.whatsappSettings.includeProductName) {
      message = message.replace('{productName}', product.name);
    }
    if (settings.whatsappSettings.includeProductPrice) {
      message = message.replace('{productPrice}', `$${product.price}`);
    }
    if (settings.whatsappSettings.includeProductDescription) {
      message = message.replace('{productDescription}', product.description);
    }
    if (settings.whatsappSettings.includeStoreInfo) {
      message = message.replace('{storeName}', settings.storeName);
    }
    if (settings.whatsappSettings.includeProductLink) {
      const productLink = `${window.location.origin}/product-${product.id}.html`;
      message = message.replace('{productLink}', productLink);
    }
    
    return message;
  };

  const getSectionColor = () => {
    switch (sectionType) {
      case 'featured':
        return settings.primaryColor;
      case 'bestSellers':
        return settings.secondaryColor;
      case 'onSale':
        return settings.accentColor;
      default:
        return settings.primaryColor;
    }
  };

  return `
    <section class="py-16 px-6" style="background-color: ${settings.themeId === 'dark-professional' ? '#111827' : '#f8fafc'}">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4" style="color: ${getSectionColor()}">${sectionConfig.title}</h2>
          <p class="text-xl text-gray-600">${sectionConfig.subtitle}</p>
          <div class="w-24 h-1 mx-auto mt-6 rounded" style="background-color: ${settings.accentColor}"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          ${filteredProducts.map(product => generateProductCardHTML(product)).join('')}
        </div>

        <div class="text-center">
          <button onclick="window.open('/products?filter=${sectionType === 'bestSellers' ? 'bestsellers' : sectionType === 'onSale' ? 'onsale' : sectionType}', '_blank')" class="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg" style="background-color: ${getSectionColor()}10; color: ${getSectionColor()}; border: 2px solid ${getSectionColor()}20">
            <span>عرض جميع ${sectionConfig.title}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  `;
};

/**
 * تحويل الصفحة الكاملة إلى HTML ثابت
 */
export const renderFullPageToHTML = (storeData: StoreData): string => {
  const { settings } = storeData;

  // تحويل كل قسم إلى HTML
  const headerHTML = renderHeaderToHTML(settings, storeData.customPages);
  const heroHTML = renderHeroToHTML(settings);
  const aboutHTML = renderAboutToHTML(settings);
  const featuresHTML = renderFeaturesToHTML(settings);
  const faqHTML = renderFAQToHTML(settings);
  const footerHTML = renderFooterToHTML(settings, storeData.customPages);

  // تحويل أقسام المنتجات حسب الترتيب
  const sectionsHTML = settings.sectionsOrder.map(sectionId => {
    switch (sectionId) {
      case 'hero':
        return heroHTML;
      case 'featured':
        return renderProductSectionToHTML(storeData, 'featured');
      case 'bestSellers':
        return renderProductSectionToHTML(storeData, 'bestSellers');
      case 'onSale':
        return renderProductSectionToHTML(storeData, 'onSale');
      case 'about':
        return aboutHTML;
      case 'whyChooseUs':
        return featuresHTML;
      case 'faq':
        return faqHTML;
      default:
        return '';
    }
  }).filter(html => html.trim() !== '').join('\n');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.storeName}</title>
    <meta name="description" content="${settings.description}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="favicon.ico">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    ${headerHTML}
    
    <main>
        ${sectionsHTML}
    </main>
    
    ${footerHTML}
    
    <script src="js/main.js"></script>
</body>
</html>`;
};

/**
 * تحويل صفحة تفاصيل المنتج إلى HTML ثابت
 */
export const renderProductDetailPageToHTML = (
  product: Product, 
  settings: StoreSettings, 
  relatedProducts: Product[] = []
): string => {
  const pageElement = createElement(ProductDetailPage, { 
    product, 
    storeData: { settings, products: relatedProducts, customPages: [] },
    relatedProducts 
  });
  
  return renderComponentToHTML(pageElement);
};

/**
 * تحويل صفحة المنتجات إلى HTML ثابت
 */
export const renderProductsPageToHTML = (storeData: StoreData): string => {
  const pageElement = createElement(ProductsPage, { storeData });
  
  return renderComponentToHTML(pageElement);
};

/**
 * تحويل صفحة مخصصة إلى HTML ثابت
 */
export const renderCustomPageToHTML = (page: CustomPage, settings: StoreSettings): string => {
  const headerHTML = renderHeaderToHTML(settings, []);
  const footerHTML = renderFooterToHTML(settings, []);

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.metaTitle || page.title} - ${settings.storeName}</title>
    <meta name="description" content="${page.metaDescription || page.title}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="favicon.ico">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    ${headerHTML}
    
    <main class="container max-w-4xl mx-auto px-4 py-8">
        <a href="index.html" class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          العودة للرئيسية
        </a>
        
        <div class="bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-4xl font-bold mb-6 text-center" style="color: ${settings.primaryColor}">${page.title}</h1>
            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                ${page.content}
            </div>
        </div>
    </main>
    
    ${footerHTML}
    
    <script src="js/main.js"></script>
</body>
</html>`;
};