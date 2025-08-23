import { StoreData } from '../../../types/store';

export const generator = (storeData: StoreData): string => {
  const { settings } = storeData;
  const { storeName, logo } = settings;

  return `
    <!-- Header -->
    <header>
      <nav class="navbar navbar-custom navbar-expand-lg navbar-light bg-white shadow-sm border-bottom sticky-top">
        <div class="container">
          <a class="navbar-brand fw-bold" href="index.html">
            ${logo ? `<img src="${logo}" alt="Logo" style="height: 40px;" class="me-2">` : ''}
            ${storeName}
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNavbar">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="products.html">المنتجات</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html#why-us">لماذا نحن</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="index.html#faq">الأسئلة الشائعة</a>
              </li>
            </ul>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link cart-icon" href="#cart" aria-label="Shopping Cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></svg>
                    </a>
                </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- End Header -->`;
};
