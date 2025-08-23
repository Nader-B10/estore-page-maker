import { Product, StoreSettings } from '../../../../types/store';

export const generateProductCardHTML = (product: Product, settings: StoreSettings): string => `
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
        <button class="add-to-cart-btn px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style="background-color: ${settings.secondaryColor};">
          أضف للسلة
        </button>
      </div>
    </div>
  </div>
`;
