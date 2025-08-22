import { StoreData } from '../types/store';
import { getThemeById } from '../types/theme';
import { generateHeaderHTML } from '../registry';

export const generateStoreHTML = (storeData: StoreData): string => {
  const { settings, products } = storeData;
  const currentTheme = getThemeById(settings.themeId);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, settings.productSections.featured.limit);
  const bestSellerProducts = products.filter(p => p.isBestSeller).slice(0, settings.productSections.bestSellers.limit);
  const onSaleProducts = products.filter(p => p.isOnSale).slice(0, settings.productSections.onSale.limit);

  const getLayoutClass = () => {
    switch (settings.layout) {
      case 'list':
        return 'product-list';
      case 'masonry':
        return 'product-masonry';
      default:
        return 'product-grid';
    }
  };

  const generateProductHTML = (product: any) => `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="images/${product.id}.jpg" alt="${product.name}" />
        <div class="product-badges">
          ${product.category ? `<span class="product-category">${product.category}</span>` : ''}
          ${product.isOnSale && product.discountPercentage ? `<span class="discount-badge">-${product.discountPercentage}%</span>` : ''}
        </div>
      </div>
      <div class="product-content">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-footer">
          <div class="product-price-container">
            <span class="product-price">$${product.price}</span>
            ${product.originalPrice && product.originalPrice > product.price ? 
              `<span class="product-original-price">$${product.originalPrice}</span>` : ''}
          </div>
          <button class="add-to-cart-btn">أضف للسلة</button>
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.storeName}</title>
    <meta name="description" content="${settings.description}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    ${generateHeaderHTML(settings.headerTemplate, settings)}

    ${settings.heroSection.enabled ? `
    <section class="hero-section" ${settings.heroSection.backgroundImage ? 
      `style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${settings.heroSection.backgroundImage}')"` : 
      `style="background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})"`
    }>
        <div class="container">
            <div class="hero-content">
                <h2 class="hero-title">${settings.heroSection.title}</h2>
                <p class="hero-subtitle">${settings.heroSection.subtitle}</p>
                <a href="${settings.heroSection.ctaLink}" class="hero-cta">${settings.heroSection.ctaText}</a>
            </div>
        </div>
    </section>
    ` : ''}

    <main class="main-content">
        <div class="container">
            ${settings.productSections.featured.enabled && featuredProducts.length > 0 ? `
            <section class="products-section" id="featured">
                <div class="section-header">
                    <h2 class="section-title">${settings.productSections.featured.title}</h2>
                    <p class="section-subtitle">${settings.productSections.featured.subtitle}</p>
                    <div class="section-line"></div>
                </div>
                <div class="products-container ${getLayoutClass()}">
                    ${featuredProducts.map(product => generateProductHTML(product)).join('')}
                </div>
            </section>
            ` : ''}

            ${settings.productSections.bestSellers.enabled && bestSellerProducts.length > 0 ? `
            <section class="products-section" id="bestsellers">
                <div class="section-header">
                    <h2 class="section-title">${settings.productSections.bestSellers.title}</h2>
                    <p class="section-subtitle">${settings.productSections.bestSellers.subtitle}</p>
                    <div class="section-line"></div>
                </div>
                <div class="products-container ${getLayoutClass()}">
                    ${bestSellerProducts.map(product => generateProductHTML(product)).join('')}
                </div>
            </section>
            ` : ''}

            ${settings.productSections.onSale.enabled && onSaleProducts.length > 0 ? `
            <section class="products-section" id="onsale">
                <div class="section-header">
                    <h2 class="section-title">${settings.productSections.onSale.title}</h2>
                    <p class="section-subtitle">${settings.productSections.onSale.subtitle}</p>
                    <div class="section-line"></div>
                </div>
                <div class="products-container ${getLayoutClass()}">
                    ${onSaleProducts.map(product => generateProductHTML(product)).join('')}
                </div>
            </section>
            ` : ''}
        </div>
    </main>

    <script src="js/main.js"></script>
</body>
</html>`;
};