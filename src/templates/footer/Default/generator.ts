import { StoreData } from '../../../types/store';

export const generator = (storeData: StoreData): string => {
  const { settings } = storeData;
  const { storeName, description, contactInfo, footerText } = settings;

  return `
  <footer class="bg-footer-background text-footer-text mt-16">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
          <h3 class="text-2xl font-bold mb-2">${storeName}</h3>
          <p class="opacity-80">${description}</p>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">روابط سريعة</h4>
          <ul class="space-y-2">
            <li><a href="#products" class="opacity-80 hover:opacity-100">المنتجات</a></li>
            <li><a href="#why-us" class="opacity-80 hover:opacity-100">لماذا نحن</a></li>
            <li><a href="#faq" class="opacity-80 hover:opacity-100">الأسئلة الشائعة</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">تواصل معنا</h4>
          <ul class="space-y-2 opacity-80">
            ${contactInfo.email ? `<li>البريد: <a href="mailto:${contactInfo.email}" class="hover:opacity-100 hover:underline">${contactInfo.email}</a></li>` : ''}
            ${contactInfo.phone ? `<li>الهاتف: ${contactInfo.phone}</li>` : ''}
            ${contactInfo.address ? `<li>العنوان: ${contactInfo.address}</li>` : ''}
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-6 border-t border-white/10 text-center opacity-70">
        <p>${footerText || `© ${new Date().getFullYear()} ${storeName}. جميع الحقوق محفوظة.`}</p>
      </div>
    </div>
  </footer>`;
};
