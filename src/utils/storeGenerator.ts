import { StoreData } from '../types/store';
import { getThemeById } from '../types/store';
import { generateHeaderHTML } from './componentRegistry';

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

  const productsHTML = products
    .map(
      (product) => generateProductHTML(product)
    )
    .join('');

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
                <div class="text-center mt-8">
                    <a href="products.html?filter=featured" class="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border-2" style="background-color: ${settings.primaryColor}10; color: ${settings.primaryColor}; border-color: ${settings.primaryColor}20;">
                        <span>عرض جميع المنتجات المميزة</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
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
                <div class="text-center mt-8">
                    <a href="products.html?filter=bestsellers" class="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border-2" style="background-color: ${settings.secondaryColor}10; color: ${settings.secondaryColor}; border-color: ${settings.secondaryColor}20;">
                        <span>عرض جميع الأعلى مبيعاً</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
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
                <div class="text-center mt-8">
                    <a href="products.html?filter=onsale" class="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg border-2" style="background-color: ${settings.accentColor}10; color: ${settings.accentColor}; border-color: ${settings.accentColor}20;">
                        <span>عرض جميع العروض والتخفيضات</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                </div>
            </section>
            ` : ''}

            <section class="products-section">
                <div class="section-header">
                    <h2 class="section-title">جميع المنتجات</h2>
                    <p class="section-subtitle">تصفح مجموعتنا الكاملة من المنتجات</p>
                    <div class="section-line"></div>
                </div>

                <div class="text-center py-12">
                    <a href="products.html" class="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300">
                        <span>تصفح جميع المنتجات</span>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </a>
                </div>
            </section>
        </div>
    </main>

    ${settings.whyChooseUs.enabled && settings.whyChooseUs.items.length > 0 ? `
    <section class="why-choose-us-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">${settings.whyChooseUs.title}</h2>
                <p class="section-subtitle">${settings.whyChooseUs.subtitle}</p>
                <div class="section-line"></div>
            </div>
            <div class="why-choose-us-grid">
                ${settings.whyChooseUs.items.map(item => `
                <div class="why-choose-us-item">
                    <div class="why-choose-us-icon">
                        <i class="icon-${item.icon}"></i>
                    </div>
                    <h3 class="why-choose-us-title">${item.title}</h3>
                    <p class="why-choose-us-description">${item.description}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${settings.faq.enabled && settings.faq.items.length > 0 ? `
    <section class="faq-section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">${settings.faq.title}</h2>
                <p class="section-subtitle">${settings.faq.subtitle}</p>
                <div class="section-line"></div>
            </div>
            <div class="faq-container">
                ${settings.faq.items.map((item, index) => `
                <div class="faq-item">
                    <button class="faq-question" onclick="toggleFAQ(${index})">
                        <span>${item.question}</span>
                        <svg class="faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div class="faq-answer" id="faq-${index}">
                        <p>${item.answer}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>معلومات الاتصال</h3>
                    <div class="contact-info">
                        ${
                          settings.contactInfo.email
                            ? `<div class="contact-item">
                            <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <span>${settings.contactInfo.email}</span>
                        </div>`
                            : ''
                        }
                        ${
                          settings.contactInfo.phone
                            ? `<div class="contact-item">
                            <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <span>${settings.contactInfo.phone}</span>
                        </div>`
                            : ''
                        }
                        ${
                          settings.contactInfo.address
                            ? `<div class="contact-item">
                            <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>${settings.contactInfo.address}</span>
                        </div>`
                            : ''
                        }
                    </div>
                </div>

                <div class="footer-section">
                    <h3>حول المتجر</h3>
                    <p>${settings.description}</p>
                </div>

                <div class="footer-section">
                    <h3>روابط سريعة</h3>
                    <div class="footer-links">
                        <a href="#home">الرئيسية</a>
                        <a href="#products">المنتجات</a>
                        <a href="#contact">اتصل بنا</a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>`;
};

export const generateStoreCSS = (storeData: StoreData): string => {
  const { settings } = storeData;
  const currentTheme = getThemeById(settings.themeId);

  return `/* CSS Variables for Theme */
:root {
  --primary-color: ${currentTheme.palette.primary};
  --secondary-color: ${currentTheme.palette.secondary};
  --accent-color: ${currentTheme.palette.accent};
  --text-color: ${currentTheme.palette.text};
  --text-secondary: ${currentTheme.palette.textSecondary};
  --background-color: ${currentTheme.palette.background};
  --surface-color: ${currentTheme.palette.surface};
  --border-color: ${currentTheme.palette.border};
  --success-color: ${currentTheme.palette.success};
  --warning-color: ${currentTheme.palette.warning};
  --error-color: ${currentTheme.palette.error};
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: '${settings.fontFamily}', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    direction: rtl;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header Styles */
.header-classic {
    background-color: var(--primary-color);
    color: white;
    padding: 1.5rem 0;
}

.header-modern {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 1.5rem 0;
}

.header-minimal {
    background-color: var(--surface-color);
    color: var(--text-color);
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 8px;
}

.store-name {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.store-description {
    font-size: 0.875rem;
    opacity: 0.9;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.cart-btn {
    background: var(--accent-color);
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.cart-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cart-icon {
    width: 20px;
    height: 20px;
}

/* Hero Section */
.hero-section {
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    padding: 5rem 0;
    position: relative;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.hero-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.hero-cta {
    display: inline-block;
    background: var(--accent-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.hero-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

/* Main Content */
.main-content {
    padding: 3rem 0;
}

.products-section {
    margin-bottom: 3rem;
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-title {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.section-subtitle {
    font-size: 1rem;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
}

.section-line {
    width: 60px;
    height: 4px;
    background-color: var(--accent-color);
    margin: 0 auto;
    border-radius: 2px;
}

/* Product Layouts */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

.product-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.product-masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Product Cards */
.product-card {
    background: var(--surface-color);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.product-list .product-card {
    display: flex;
    align-items: center;
}

.product-list .product-image {
    flex-shrink: 0;
    width: 200px;
    height: 200px;
}

.product-image {
    position: relative;
    overflow: hidden;
}

.product-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
    transform: scale(1.05);
}

.product-badges {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.product-category {
    background: var(--accent-color);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 500;
}

.discount-badge {
    background: #ef4444;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: bold;
}

.product-content {
    padding: 1.5rem;
}

.product-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.product-description {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.5;
}

.product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.product-price-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.product-price {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--primary-color);
}

.product-original-price {
    font-size: 1rem;
    color: var(--text-secondary);
    text-decoration: line-through;
}

.add-to-cart-btn {
    background: var(--secondary-color);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

/* Why Choose Us Section */
.why-choose-us-section {
    background: var(--surface-color);
    padding: 4rem 0;
}

.why-choose-us-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.why-choose-us-item {
    text-align: center;
    padding: 2rem 1rem;
}

.why-choose-us-icon {
    width: 4rem;
    height: 4rem;
    background: color-mix(in srgb, var(--primary-color) 20%, transparent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 2rem;
    color: var(--primary-color);
}

.why-choose-us-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.why-choose-us-description {
    color: var(--text-secondary);
    line-height: 1.6;
}

/* FAQ Section */
.faq-section {
    background: var(--background-color);
    padding: 4rem 0;
}

.faq-container {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    background: var(--surface-color);
    border-radius: 8px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.faq-question {
    width: 100%;
    padding: 1.5rem;
    background: none;
    border: none;
    text-align: right;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
}

.faq-question:hover {
    background: color-mix(in srgb, var(--background-color) 50%, transparent);
}

.faq-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
    color: var(--primary-color);
}

.faq-item.active .faq-icon {
    transform: rotate(180deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.faq-answer.active {
    max-height: 200px;
}

.faq-answer p {
    padding: 0 1.5rem 1.5rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary);
}

.empty-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem;
    opacity: 0.5;
}

.empty-icon svg {
    width: 100%;
    height: 100%;
}

.empty-state h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

/* Footer */
.footer {
    background-color: var(--primary-color);
    color: white;
    padding: 3rem 0 1rem;
    margin-top: 4rem;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.footer-section h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--accent-color);
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.contact-icon {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.footer-links a {
    color: #ccc;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: var(--accent-color);
}

.footer-bottom {
    border-top: 1px solid color-mix(in srgb, white 20%, transparent);
    padding-top: 1rem;
    text-align: center;
}

.footer-bottom p {
    font-size: 0.875rem;
    color: #999;
}

/* Responsive Design */
@media (max-width: 768px) {
    .header-content {
        text-align: center;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .product-list .product-card {
        flex-direction: column;
    }
    
    .product-list .product-image {
        width: 100%;
    }
    
    .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    .why-choose-us-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        text-align: center;
    }
    
    .section-title {
        font-size: 1.5rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }
    
    .product-grid {
        grid-template-columns: 1fr;
    }
    
    .hero-section {
        padding: 3rem 0;
    }
    
    .hero-title {
        font-size: 1.75rem;
    }
    
    .main-content {
        padding: 2rem 0;
    }
}

/* Animation */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.product-card {
    animation: fadeInUp 0.6s ease forwards;
}

.product-card:nth-child(1) { animation-delay: 0.1s; }
.product-card:nth-child(2) { animation-delay: 0.2s; }
.product-card:nth-child(3) { animation-delay: 0.3s; }
.product-card:nth-child(4) { animation-delay: 0.4s; }`;
};

export const generateStoreJS = (): string => {
  return `// Store JavaScript Functionality
class Store {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts(e.target.value);
            });
        }

        // WhatsApp button analytics (optional)
        document.querySelectorAll('.whatsapp-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Track WhatsApp clicks for analytics
                const productName = e.target.closest('.product-card')?.querySelector('.product-title')?.textContent;
                console.log('WhatsApp order initiated for:', productName);
            });
        });
    }

    filterProducts(searchTerm) {
        const products = document.querySelectorAll('.product-card');
        const term = searchTerm.toLowerCase().trim();

        products.forEach(product => {
            const title = product.querySelector('.product-title')?.textContent.toLowerCase() || '';
            const description = product.querySelector('.product-description')?.textContent.toLowerCase() || '';
            const category = product.querySelector('.product-category')?.textContent.toLowerCase() || '';

            if (title.includes(term) || description.includes(term) || category.includes(term)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Utility function to show notifications
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = \`notification notification-\${type}\`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// FAQ Toggle Function
function toggleFAQ(index) {
    const faqItem = document.querySelector(\`.faq-item:nth-child(\${index + 1})\`);
    const faqAnswer = document.getElementById(\`faq-\${index}\`);
    
    if (faqItem && faqAnswer) {
        faqItem.classList.toggle('active');
        faqAnswer.classList.toggle('active');
    }
}

// Initialize store
const store = new Store();

// Add some additional CSS for notifications
const additionalCSS = \`
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 1001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-success {
        background: #25D366;
    }

    .notification-error {
        background: #dc3545;
    }

    .notification-info {
        background: #17a2b8;
    }
\`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading for images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
`;
};