import { StoreData, Product, StoreSettings } from '../../../types/store';

const generateProductHTML = (product: Product): string => `
  <div class="col">
    <div class="card product-card h-100" data-product-id="${product.id}">
      <div class="product-card-img-container">
        <img src="${product.image}" class="product-card-img" alt="${product.name}" loading="lazy">
        <div class="position-absolute top-0 end-0 p-2 d-flex flex-column gap-1">
          ${product.isOnSale && product.discountPercentage ? `<span class="badge bg-danger fs-sm">-${product.discountPercentage}%</span>` : ''}
        </div>
      </div>
      <div class="card-body d-flex flex-column p-3">
        <h5 class="card-title h6 product-card-title">${product.name}</h5>
        <p class="card-text small text-muted flex-grow-1 line-clamp-2">${product.description}</p>
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div>
            <span class="fw-bold fs-5" style="color: var(--bs-primary);">${product.price} ر.س</span>
            ${product.originalPrice && product.originalPrice > product.price ? `<span class="ms-2 text-muted text-decoration-line-through">${product.originalPrice} ر.س</span>` : ''}
          </div>
          <button class="btn btn-sm btn-add-to-cart">أضف للسلة</button>
        </div>
      </div>
    </div>
  </div>
`;

const generateProductSectionHTML = (title: string, subtitle: string, products: Product[], settings: StoreSettings): string => {
  if (products.length === 0) return '';
  const layoutClass = settings.layout === 'list' ? 'row-cols-1' : 'row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4';
  return `
    <!-- Products Section -->
    <section id="products" class="py-5 animate-on-scroll">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="display-5 fw-bold mb-2">${title}</h2>
          <p class="lead text-muted">${subtitle}</p>
          <div class="section-divider mx-auto"></div>
        </div>
        <div class="row ${layoutClass} g-4">
          ${products.map(p => generateProductHTML(p)).join('')}
        </div>
      </div>
    </section>
    <!-- End Products Section -->
  `;
};

export const generator = (storeData: StoreData, sectionKey?: keyof StoreSettings['sections']): string => {
  const productSectionKeys: (keyof StoreSettings['sections'])[] = ['featuredProducts', 'bestSellers', 'onSale', 'allProducts', 'homeAllProducts'];
  if (!sectionKey || !productSectionKeys.includes(sectionKey)) return '';

  const { settings, products } = storeData;
  const sectionConfig = settings.sections[sectionKey];
  if (!sectionConfig || !sectionConfig.enabled) return '';

  const { title, subtitle } = sectionConfig.data;
  const limit = (sectionConfig.data as any).limit;

  let sectionProducts: Product[] = [];
  switch (sectionKey) {
    case 'featuredProducts': sectionProducts = products.filter(p => p.isFeatured); break;
    case 'bestSellers': sectionProducts = products.filter(p => p.isBestSeller); break;
    case 'onSale': sectionProducts = products.filter(p => p.isOnSale); break;
    case 'allProducts': sectionProducts = products; break;
    case 'homeAllProducts': sectionProducts = products; break;
  }

  if (limit) sectionProducts = sectionProducts.slice(0, limit);
  if (sectionProducts.length === 0 && sectionKey !== 'allProducts' && sectionKey !== 'homeAllProducts') return '';

  return generateProductSectionHTML(title, subtitle, sectionProducts, settings);
};
