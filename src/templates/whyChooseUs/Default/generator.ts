import { StoreData } from '../../../types/store';
import { generateIconHTML } from '../../../utils/generators/iconGenerator';

export const generator = (storeData: StoreData): string => {
  const { whyChooseUs } = storeData.settings.sections;
  if (!whyChooseUs.enabled || whyChooseUs.data.items.length === 0) return '';

  return `
    <section id="why-us" class="py-16 bg-surface">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-3xl lg:text-4xl font-bold mb-2" style="color: ${storeData.settings.primaryColor};">${whyChooseUs.data.title}</h2>
          <p class="text-subtle-text max-w-2xl mx-auto">${whyChooseUs.data.subtitle}</p>
          <div class="w-24 h-1 mx-auto mt-4 rounded" style="background-color: ${storeData.settings.accentColor};"></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${whyChooseUs.data.items.map(item => `
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white" style="background-color: ${storeData.settings.primaryColor};">
                ${generateIconHTML(item.icon)}
              </div>
              <h3 class="text-xl font-semibold mb-2 text-text">${item.title}</h3>
              <p class="text-subtle-text">${item.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>`;
};
