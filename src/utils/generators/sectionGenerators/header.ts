import { StoreData } from '../../../types/store';

export const generateHeaderHTML = (storeData: StoreData): string => {
  const { settings, whatsappSettings } = storeData;
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
      <button 
        class="header-whatsapp-btn ${whatsappSettings.enabled ? 'text-green-600 hover:text-green-700' : 'text-text'}" 
        aria-label="${whatsappSettings.enabled ? 'WhatsApp Contact' : 'Contact'}"
        data-phone="${whatsappSettings.phoneNumber || ''}"
        data-message="${whatsappSettings.enabled ? `مرحباً، أريد الاستفسار عن منتجاتكم في متجر ${settings.storeName}` : ''}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/><path d="M12 7v5l3 3"/></svg>
      </button>
    </div>
  </header>`;
};
