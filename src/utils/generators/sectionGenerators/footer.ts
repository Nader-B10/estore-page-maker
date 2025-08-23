import { StoreData } from '../../../types/store';
import { generateIconHTML } from '../iconGenerator';

export const generateFooterHTML = (storeData: StoreData): string => {
  const { settings } = storeData;
  const { storeName, description, sections } = settings;
  const { footer, header } = sections;

  if (!footer.enabled) {
    return '';
  }

  const { contactInfo, linksTitle, contactTitle, socialLinks, copyrightText } = footer.data;

  return `
  <footer class="bg-footer-background text-footer-text mt-16">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
          <h3 class="text-2xl font-bold mb-2">${storeName}</h3>
          <p class="opacity-80">${description}</p>
          ${socialLinks.length > 0 ? `
            <div class="flex gap-4 mt-4">
              ${socialLinks.map(link => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="opacity-80 hover:opacity-100">
                  ${generateIconHTML(link.platform)}
                </a>
              `).join('')}
            </div>
          ` : ''}
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">${linksTitle}</h4>
          <ul class="space-y-2">
            ${header.data.links.map(link => `<li><a href="${link.link}" class="opacity-80 hover:opacity-100">${link.text}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">${contactTitle}</h4>
          <ul class="space-y-2 opacity-80">
            ${contactInfo.email ? `<li>البريد: <a href="mailto:${contactInfo.email}" class="hover:underline">${contactInfo.email}</a></li>` : ''}
            ${contactInfo.phone ? `<li>الهاتف: ${contactInfo.phone}</li>` : ''}
            ${contactInfo.address ? `<li>العنوان: ${contactInfo.address}</li>` : ''}
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-white/10 text-center opacity-70">
        <p>${copyrightText}</p>
      </div>
    </div>
  </footer>`;
};
