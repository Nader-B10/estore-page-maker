import { Product, StoreData, StoreSettings } from '../../../types/store';
import { generateIconHTML } from '../iconGenerator';

const generateProductCardHTML = (product: Product, settings: StoreSettings, whatsappSettings: any): string => {
  const whatsappMessage = whatsappSettings.enabled ? whatsappSettings.messageTemplate
    .replace('{productName}', product.name)
    .replace('{price}', product.price.toString())
    .replace('{description}', product.description)
    .replace('{productUrl}', typeof window !== 'undefined' ? window.location.href : '')
    .replace('{storeName}', settings.storeName) : '';

  return `
  <div class="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group border border-gray-200/10 flex flex-col" data-product-id="${product.id}">
    <div class="relative overflow-hidden aspect-square">
      <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      <div class="absolute top-2 right-2 flex flex-col gap-1">
        ${product.category ? `<span class="px-2 py-1 text-xs font-medium text-black rounded-full" style="background-color: ${settings.accentColor};">${product.category}</span>` : ''}
        ${product.isOnSale && product.discountPercentage ? `<span class="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">-${product.discountPercentage}%</span>` : ''}
      </div>
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <h3 class="font-semibold text-lg mb-2 text-text">${product.name}</h3>
      <p class="text-subtle-text text-sm mb-3 line-clamp-2 flex-grow">${product.description}</p>
      <div class="flex justify-between items-center mt-auto">
        <div class="flex flex-col">
          <span class="text-xl font-bold" style="color: ${settings.primaryColor};">${product.price} ر.س</span>
          ${product.originalPrice && product.originalPrice > product.price ? `<span class="text-sm text-subtle-text line-through">${product.originalPrice} ر.س</span>` : ''}
        </div>
        <button 
          class="whatsapp-buy-btn px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2" 
          style="background-color: ${whatsappSettings.enabled ? '#25D366' : settings.secondaryColor};"
          data-phone="${whatsappSettings.phoneNumber || ''}"
          data-message="${whatsappMessage}"
        >
          ${whatsappSettings.enabled ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/><path d="M12 7v5l3 3"/></svg>` : ''}
          ${whatsappSettings.enabled ? whatsappSettings.buttonText : 'أضف للسلة'}
        </button>
      </div>
    </div>
  </div>
`};

export const generateProductSectionHTML = (storeData: StoreData, sectionKey: 'featuredProducts' | 'bestSellers' | 'onSale' | 'allProducts'): string => {
  const { settings, products, whatsappSettings } = storeData;
  const sectionConfig = settings.sections[sectionKey];

  if (!sectionConfig.enabled) {
    return '';
  }

  const { title, subtitle } = sectionConfig.data;
  const limit = (sectionConfig.data as any).limit;

  let sectionProducts: Product[] = [];
  switch (sectionKey) {
    case 'featuredProducts':
      sectionProducts = products.filter(p => p.isFeatured);
      break;
    case 'bestSellers':
      sectionProducts = products.filter(p => p.isBestSeller);
      break;
    case 'onSale':
      sectionProducts = products.filter(p => p.isOnSale);
      break;
    case 'allProducts':
      sectionProducts = products;
      break;
  }

  if (limit) {
    sectionProducts = sectionProducts.slice(0, limit);
  }

  const layoutClass = settings.layout === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  
  const contentHTML = sectionProducts.length > 0
    ? `<div class="grid ${layoutClass} gap-6">
        ${sectionProducts.map(p => generateProductCardHTML(p, settings, whatsappSettings)).join('')}
      </div>`
    : `<div class="py-10 border-2 border-dashed border-gray-400/30 rounded-lg text-center bg-surface/50">
        <div class="w-12 h-12 bg-gray-500/10 rounded-full flex items-center justify-center mx-auto mb-4" style="color: var(--subtle-text-color);">
          ${generateIconHTML('package-open')}
        </div>
        <h3 class="text-lg font-semibold text-text">القسم فارغ حالياً</h3>
        <p class="text-subtle-text mt-2">
          قم بإضافة منتجات وتصنيفها كـ "${title}" لتظهر هنا.
        </p>
      </div>`;

  // Generate section ID based on section key
  const sectionId = sectionKey === 'allProducts' ? 'all-products' : 
                   sectionKey === 'featuredProducts' ? 'featured-products' :
                   sectionKey === 'bestSellers' ? 'best-sellers' :
                   sectionKey === 'onSale' ? 'on-sale' : sectionKey;
  return `
    <section class="container mx-auto px-6 py-16" id="${sectionId}">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold mb-2" style="color: ${settings.primaryColor};">${title}</h2>
        <p class="text-subtle-text max-w-2xl mx-auto">${subtitle}</p>
        <div class="w-24 h-1 mx-auto mt-4 rounded" style="background-color: ${settings.accentColor};"></div>
      </div>
      ${contentHTML}
    </section>
  `;
};
