import { StoreData } from '../../../types/store';

export const generateHeaderHTML = (storeData: StoreData): string => {
  const { settings } = storeData;
  const { storeName, logo } = settings;
  const { header } = settings.sections;

  if (!header.enabled) {
    return '';
  }

  return `
  <header class="bg-surface shadow-sm border-b border-gray-200/10 p-4 sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <a href="#" class="flex items-center gap-3 text-xl font-bold text-text">
        ${logo ? `<img src="${logo}" alt="Logo" class="h-10" />` : ''}
        <span>${storeName}</span>
      </a>
      <nav class="hidden md:flex gap-6">
        ${header.data.links.map(link => `<a href="${link.link}" class="text-subtle-text hover:text-text">${link.text}</a>`).join('')}
      </nav>
      <button class="text-text" aria-label="Shopping Cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>
      </button>
    </div>
  </header>`;
};
