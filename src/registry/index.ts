// Re-export all registries
export * from './headerRegistry';
export * from './footerRegistry';
export * from './heroRegistry';
export * from './aboutRegistry';
export * from './featuresRegistry';
export * from './faqRegistry';

// HTML Generators for export
import { StoreSettings } from '../types/store';

export const generateHeaderHTML = (templateId: string, settings: StoreSettings): string => {
  switch (templateId) {
    case 'modern-header-1':
      return `
        <header class="py-6 px-6 text-white relative overflow-hidden" style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}); box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
          </div>
          <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                ${settings.logo ? `
                  <div class="relative">
                    <img src="${settings.logo}" alt="Logo" class="w-14 h-14 object-cover rounded-xl shadow-lg border-2 border-white/20" />
                    <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                ` : ''}
                <div>
                  <h1 class="text-2xl font-bold mb-1 drop-shadow-sm">${settings.storeName}</h1>
                  <p class="text-sm opacity-90 drop-shadow-sm">${settings.description}</p>
                </div>
              </div>
              <nav class="hidden md:flex items-center gap-8">
                ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                  <a href="${link.url}" class="text-white hover:text-opacity-80 transition-all duration-200 font-medium relative group" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : link.type === 'internal' ? `data-scroll-to="${link.url.replace('#', '')}"` : link.type === 'page' ? `data-navigate="page" data-value="${link.url.replace('/', '').replace('#', '')}"` : ''}>
                    ${link.text}
                    <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"></div>
                  </a>
                `).join('')}
              </nav>
              ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
                <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                  تواصل معنا
                </a>
              ` : ''}
            </div>
          </div>
        </header>
      `;
    
    case 'elegant-header':
      return `
        <header class="bg-white shadow-lg border-b-4 border-gray-100">
          <div class="bg-gray-50 py-2 px-6 text-sm">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
              <div class="flex items-center gap-4 text-gray-600">
                ${settings.contactInfo.email ? `<span>📧 ${settings.contactInfo.email}</span>` : ''}
                ${settings.contactInfo.phone ? `<span>📞 ${settings.contactInfo.phone}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="py-6 px-6">
            <div class="max-w-7xl mx-auto">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-4">
                  ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-16 h-16 object-cover rounded-xl shadow-md border-2 border-gray-100" />` : ''}
                  <div>
                    <h1 class="text-3xl font-bold text-gray-800 mb-1">${settings.storeName}</h1>
                    <p class="text-gray-600 text-sm">${settings.description}</p>
                  </div>
                </div>
              </div>
              <div class="mb-6">
                <div class="relative max-w-2xl mx-auto">
                  <input type="text" placeholder="ابحث عن المنتجات..." class="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 text-lg" />
                  <button data-action="search" class="absolute left-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full text-white font-medium" style="background-color: ${settings.primaryColor}">بحث</button>
                </div>
              </div>
              <nav class="flex justify-center">
                <div class="flex items-center gap-8 bg-gray-50 px-8 py-4 rounded-full">
                  ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                    <a href="${link.url}" class="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg relative group" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : link.type === 'internal' ? `data-scroll-to="${link.url.replace('#', '')}"` : link.type === 'page' ? `data-navigate="page" data-value="${link.url.replace('/', '').replace('#', '')}"` : ''}>
                      ${link.text}
                    </a>
                  `).join('')}
                </div>
              </nav>
            </div>
          </div>
        </header>
      `;

    default: // classic-header
      return `
        <header class="py-4 px-6 text-white shadow-lg" style="background-color: ${settings.primaryColor};">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-10 h-10 object-cover rounded-lg" />` : ''}
                <div>
                  <h1 class="text-xl font-bold">${settings.storeName}</h1>
                  <p class="text-sm opacity-90">${settings.description}</p>
                </div>
              </div>
              <nav class="hidden md:flex items-center gap-6">
                ${settings.headerLinks.filter(link => link.isVisible).map(link => `
                  <a href="${link.url}" class="text-white hover:opacity-80 transition-opacity font-medium" ${link.type === 'external' ? 'target="_blank" rel="noopener noreferrer"' : link.type === 'internal' ? `data-scroll-to="${link.url.replace('#', '')}"` : link.type === 'page' ? `data-navigate="page" data-value="${link.url.replace('/', '').replace('#', '')}"` : ''}>
                    ${link.text}
                  </a>
                `).join('')}
              </nav>
              ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
                <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                  تواصل معنا
                </a>
              ` : ''}
            </div>
          </div>
        </header>
      `;
  }
};
                  <button data-action="search" class="absolute left-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full text-white font-medium" style="background-color: ${settings.primaryColor}">بحث</button>