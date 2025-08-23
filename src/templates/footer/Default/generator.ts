import { StoreData } from '../../../types/store';

export const generator = (storeData: StoreData): string => {
  const { settings } = storeData;
  const { storeName, description, contactInfo } = settings;
  const { footer } = settings.sections;

  if (!footer.enabled) return '';

  return `
    <!-- Footer -->
    <footer class="footer-custom bg-dark text-white mt-5">
      <div class="container py-5">
        <div class="row gy-4">
          <div class="col-lg-4 col-md-12">
            <h3 class="h4 fw-bold mb-2">${storeName}</h3>
            <p class="text-white-50">${description}</p>
          </div>
          <div class="col-lg-4 col-md-6">
            <h4 class="h5 mb-3 footer-heading">روابط سريعة</h4>
            <ul class="list-unstyled footer-links">
              <li class="mb-2"><a href="products.html">المنتجات</a></li>
              <li class="mb-2"><a href="index.html#why-us">لماذا نحن</a></li>
              <li><a href="index.html#faq">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-6">
            <h4 class="h5 mb-3 footer-heading">تواصل معنا</h4>
            <ul class="list-unstyled text-white-50">
              ${contactInfo.email ? `<li class="mb-2">البريد: <a href="mailto:${contactInfo.email}" class="text-reset text-decoration-none hover-underline">${contactInfo.email}</a></li>` : ''}
              ${contactInfo.phone ? `<li class="mb-2">الهاتف: ${contactInfo.phone}</li>` : ''}
              ${contactInfo.address ? `<li>العنوان: ${contactInfo.address}</li>` : ''}
            </ul>
          </div>
        </div>
        <div class="mt-5 pt-4 border-top border-secondary text-center text-white-50">
          <p>${footer.data.text}</p>
        </div>
      </div>
    </footer>
    <!-- End Footer -->`;
};
