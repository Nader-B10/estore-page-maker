import { StoreData, Product, StoreSettings } from '../../../types/store';
import { generateProductCardHTML } from './components/ProductCardGenerator';

const generateProductSectionHTML = (title: string, subtitle: string, products: Product[], settings: StoreSettings): string => {
  if (products.length === 0) return '';
  const layoutClass = settings.layout === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  return `
    <section class="container mx-auto px-6 py-16" id="${title.toLowerCase().replace(/\s+/g, '-')}">
      <div class="text-center mb-12">
        <h2 class="text-3xl lg:text-4xl font-bold mb-2" style="color: ${settings.primaryColor};">${title}</h2>
        <p class="text-subtle-text max-w-2xl mx-auto">${subtitle}</p>
        <div class="w-24 h-1 mx-auto mt-4 rounded" style="background-color: ${settings.accentColor};"></div>
      </div>
      <div class="grid ${layoutClass} gap-6">
        ${products.map(p => generateProductCardHTML(p, settings)).join('')}
      </div>
    </section>
  `;
};

export const generator = (storeData: StoreData, sectionKey?: keyof StoreSettings['sections']): string => {
  const productSectionKeys: (keyof StoreSettings['sections'])[] = ['featuredProducts', 'bestSellers', 'onSale', 'allProducts'];
  if (!sectionKey || !productSectionKeys.includes(sectionKey)) return '';

  const { settings, products } = storeData;
  const sectionConfig = settings.sections[sectionKey];
  if (!sectionConfig || !sectionConfig.enabled) return '';

  const { title, subtitle } = sectionConfig.data;
  const limit = (sectionConfig.data as any).limit;

  let sectionProducts: Product[] = [];
  switch (sectionKey) {
    case 'featuredProducts': sectionProducts = products.filter(p => p.isFeatured); break;
    case 'bestSellers': sectionProducts = products.filter(p => p.isBestSeller); break;
    case 'onSale': sectionProducts = products.filter(p => p.isOnSale); break;
    case 'allProducts': sectionProducts = products; break;
  }

  if (limit) sectionProducts = sectionProducts.slice(0, limit);
  if (sectionProducts.length === 0) return '';

  return generateProductSectionHTML(title, subtitle, sectionProducts, settings);
};
