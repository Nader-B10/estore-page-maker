import { StoreData } from '../../../types/store';

export const generateFaqHTML = (storeData: StoreData): string => {
  const { faq } = storeData.settings.sections;
  if (!faq.enabled || faq.data.items.length === 0) return '';

  return `
    <section id="faq" class="py-16">
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-2" style="color: ${storeData.settings.primaryColor};">${faq.data.title}</h2>
          <p class="text-subtle-text max-w-2xl mx-auto">${faq.data.subtitle}</p>
          <div class="w-24 h-1 mx-auto mt-4 rounded" style="background-color: ${storeData.settings.accentColor};"></div>
        </div>
        <div class="space-y-4">
          ${faq.data.items.map(item => `
            <div class="faq-item bg-surface rounded-lg shadow-sm border border-gray-200/10 overflow-hidden">
              <button class="faq-question w-full px-6 py-4 text-right flex justify-between items-center hover:bg-gray-500/10 transition-colors" aria-expanded="false">
                <span class="font-medium text-text">${item.question}</span>
                <svg class="faq-chevron transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${storeData.settings.primaryColor};"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              <div class="faq-answer hidden">
                <p class="px-6 pb-4 text-subtle-text">${item.answer}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;
};
