/**
 * مولد HTML و CSS لقالب Sweet Dreams
 * ينشئ تصميماً مستوحى من متجر الكيك في الصورة
 */

import { TemplateGenerator } from '../../types/template';
import { StoreData } from '../../types/store';

export const generator: TemplateGenerator = {
  generateHTML: (storeData: StoreData): string => {
    const { settings } = storeData;

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.storeName}</title>
    <meta name="description" content="${settings.description}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="sweet-dreams-template">
    ${generateSweetDreamsHeader(storeData)}
    <main>
        ${generateSweetDreamsHero(storeData)}
        ${generateSweetDreamsWhyChooseUs(storeData)}
        ${generateSweetDreamsProducts(storeData)}
        ${generateSweetDreamsTestimonials(storeData)}
        ${generateSweetDreamsCTA(storeData)}
    </main>
    ${generateSweetDreamsFooter(storeData)}
    <script src="main.js"></script>
</body>
</html>`;
  },

  generateCSS: (storeData: StoreData): string => {
    return generateSweetDreamsCSS(storeData);
  },

  generateJS: (storeData: StoreData): string => {
    return `
document.addEventListener('DOMContentLoaded', () => {
  console.log('Sweet Dreams template initialized!');

  // Testimonials carousel
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
      card.style.display = i === index ? 'block' : 'none';
    });
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }

  if (testimonialCards.length > 0) {
    showTestimonial(0);
    setInterval(nextTestimonial, 5000);
  }

  // WhatsApp functionality
  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.whatsapp-buy-btn');
    if (button) {
      const phoneNumber = button.dataset.phone;
      const message = button.dataset.message;
      
      if (phoneNumber && message) {
        const whatsappUrl = \`https://wa.me/\${phoneNumber.replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(message)}\`;
        window.open(whatsappUrl, '_blank');
      }
    }
  });
});
`;
  },
};

// مولدات الأقسام لقالب Sweet Dreams
function generateSweetDreamsHeader(storeData: StoreData): string {
  const { settings } = storeData;
  const { header } = settings.sections;

  if (!header.enabled) return '';

  return `
  <header class="sweet-dreams-header">
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="h-12" />` : ''}
          <div>
            <h1 class="text-2xl font-bold sweet-dreams-logo">${settings.storeName}</h1>
            <p class="text-sm opacity-80">${settings.description}</p>
          </div>
        </div>
        <nav class="hidden md:flex gap-8">
          ${header.data.links.map(link => `
            <a href="${link.link}" class="sweet-dreams-nav-link">${link.text}</a>
          `).join('')}
        </nav>
        <div class="flex items-center gap-4">
          <div class="sweet-dreams-cart-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
              <path d="m2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/>
            </svg>
            <span class="sweet-dreams-cart-count">0</span>
          </div>
        </div>
      </div>
    </div>
  </header>`;
}

function generateSweetDreamsHero(storeData: StoreData): string {
  const { settings } = storeData;
  const { hero } = settings.sections;

  if (!hero.enabled) return '';

  return `
  <section class="sweet-dreams-hero">
    <div class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="sweet-dreams-hero-content">
          <h2 class="sweet-dreams-hero-title">${hero.data.title}</h2>
          <p class="sweet-dreams-hero-subtitle">${hero.data.subtitle}</p>
          <div class="sweet-dreams-hero-buttons">
            <a href="${hero.data.ctaLink}" class="sweet-dreams-btn-primary">${hero.data.ctaText}</a>
            <a href="#products" class="sweet-dreams-btn-secondary">تصفح المنتجات</a>
          </div>
        </div>
        <div class="sweet-dreams-hero-image">
          ${hero.data.backgroundImage ? 
            `<img src="${hero.data.backgroundImage}" alt="Hero Image" class="w-full h-auto rounded-2xl shadow-2xl" />` :
            `<div class="sweet-dreams-hero-placeholder">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" fill="${settings.primaryColor}" opacity="0.1"/>
                <circle cx="100" cy="100" r="60" fill="${settings.primaryColor}" opacity="0.2"/>
                <circle cx="100" cy="100" r="40" fill="${settings.primaryColor}" opacity="0.3"/>
              </svg>
            </div>`
          }
        </div>
      </div>
    </div>
  </section>`;
}

function generateSweetDreamsWhyChooseUs(storeData: StoreData): string {
  const { settings } = storeData;
  const { whyChooseUs } = settings.sections;

  if (!whyChooseUs.enabled) return '';

  return `
  <section class="sweet-dreams-features">
    <div class="container mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="sweet-dreams-section-title">${whyChooseUs.data.title}</h2>
        <p class="sweet-dreams-section-subtitle">${whyChooseUs.data.subtitle}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${whyChooseUs.data.items.map((item, index) => `
          <div class="sweet-dreams-feature-card" style="--delay: ${index * 0.1}s">
            <div class="sweet-dreams-feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${getFeatureIcon(item.icon)}
              </svg>
            </div>
            <h3 class="sweet-dreams-feature-title">${item.title}</h3>
            <p class="sweet-dreams-feature-description">${item.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function generateSweetDreamsProducts(storeData: StoreData): string {
  const { settings, products } = storeData;
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return `
  <section class="sweet-dreams-products" id="products">
    <div class="container mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="sweet-dreams-section-title">Popular Cakes</h2>
        <p class="sweet-dreams-section-subtitle">Our most loved creations</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${featuredProducts.map(product => `
          <div class="sweet-dreams-product-card">
            <div class="sweet-dreams-product-image">
              <img src="${product.image}" alt="${product.name}" />
              ${product.isOnSale ? '<div class="sweet-dreams-sale-badge">Sale</div>' : ''}
            </div>
            <div class="sweet-dreams-product-info">
              <h3 class="sweet-dreams-product-name">${product.name}</h3>
              <p class="sweet-dreams-product-description">${product.description}</p>
              <div class="sweet-dreams-product-price">
                <span class="current-price">$${product.price}</span>
                ${product.originalPrice && product.originalPrice > product.price ? 
                  `<span class="original-price">$${product.originalPrice}</span>` : ''}
              </div>
              <button class="sweet-dreams-add-to-cart whatsapp-buy-btn" 
                      data-phone="${storeData.whatsappSettings.phoneNumber}"
                      data-message="${generateWhatsAppMessage(product, storeData)}">
                Add to Cart
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function generateSweetDreamsTestimonials(storeData: StoreData): string {
  // بيانات تجريبية للشهادات
  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: 'Absolutely amazing! The chocolate cake was perfect for our anniversary.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      text: 'Best birthday cake ever! My daughter loved the unicorn design.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      text: 'Quality ingredients, beautiful design, and incredible taste!',
      rating: 5
    }
  ];

  return `
  <section class="sweet-dreams-testimonials">
    <div class="container mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <h2 class="sweet-dreams-section-title">What Our Customers Say</h2>
        <p class="sweet-dreams-section-subtitle">Real reviews from real customers</p>
      </div>
      <div class="sweet-dreams-testimonials-container">
        ${testimonials.map((testimonial, index) => `
          <div class="testimonial-card sweet-dreams-testimonial-card" style="display: ${index === 0 ? 'block' : 'none'}">
            <div class="sweet-dreams-testimonial-content">
              <div class="sweet-dreams-testimonial-stars">
                ${'★'.repeat(testimonial.rating)}
              </div>
              <p class="sweet-dreams-testimonial-text">"${testimonial.text}"</p>
              <div class="sweet-dreams-testimonial-author">
                <div class="sweet-dreams-testimonial-avatar">
                  ${testimonial.name.charAt(0)}
                </div>
                <span class="sweet-dreams-testimonial-name">${testimonial.name}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function generateSweetDreamsCTA(storeData: StoreData): string {
  const { settings } = storeData;

  return `
  <section class="sweet-dreams-cta">
    <div class="container mx-auto px-6 py-16 text-center">
      <h2 class="sweet-dreams-cta-title">Ready to Order Your Dream Cake?</h2>
      <p class="sweet-dreams-cta-subtitle">Let us create something special for your next celebration</p>
      <div class="sweet-dreams-cta-buttons">
        <a href="#products" class="sweet-dreams-btn-primary">Browse Cakes</a>
        <a href="tel:${settings.contactInfo.phone}" class="sweet-dreams-btn-outline">Call Us Now</a>
      </div>
    </div>
  </section>`;
}

function generateSweetDreamsFooter(storeData: StoreData): string {
  const { settings } = storeData;
  const { footer } = settings.sections;

  if (!footer.enabled) return '';

  return `
  <footer class="sweet-dreams-footer">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <h3 class="sweet-dreams-footer-title">${settings.storeName}</h3>
          <p class="sweet-dreams-footer-description">${settings.description}</p>
          <div class="sweet-dreams-social-links">
            ${footer.data.socialLinks.map(link => `
              <a href="${link.url}" target="_blank" class="sweet-dreams-social-link">
                ${getSocialIcon(link.platform)}
              </a>
            `).join('')}
          </div>
        </div>
        <div>
          <h4 class="sweet-dreams-footer-heading">Quick Links</h4>
          <ul class="sweet-dreams-footer-links">
            ${settings.sections.header.data.links.map(link => `
              <li><a href="${link.link}">${link.text}</a></li>
            `).join('')}
          </ul>
        </div>
        <div>
          <h4 class="sweet-dreams-footer-heading">Contact Info</h4>
          <div class="sweet-dreams-contact-info">
            ${footer.data.contactInfo.email ? `<p>Email: <a href="mailto:${footer.data.contactInfo.email}">${footer.data.contactInfo.email}</a></p>` : ''}
            ${footer.data.contactInfo.phone ? `<p>Phone: ${footer.data.contactInfo.phone}</p>` : ''}
            ${footer.data.contactInfo.address ? `<p>Address: ${footer.data.contactInfo.address}</p>` : ''}
          </div>
        </div>
      </div>
      <div class="sweet-dreams-footer-bottom">
        <p>${footer.data.copyrightText}</p>
      </div>
    </div>
  </footer>`;
}

// دوال مساعدة
function getFeatureIcon(iconName: string): string {
  const icons: { [key: string]: string } = {
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    star: '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.9 4.9 0 0 1 12 5.5"/><path d="M16.5 8a2.5 2.5 0 0 0 0-5A4.9 4.9 0 0 0 12 5.5"/>',
  };
  return icons[iconName] || icons.star;
}

function getSocialIcon(platform: string): string {
  const icons: { [key: string]: string } = {
    facebook: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    instagram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>',
    twitter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>',
  };
  return icons[platform] || '';
}

function generateWhatsAppMessage(product: any, storeData: StoreData): string {
  return storeData.whatsappSettings.messageTemplate
    .replace('{productName}', product.name)
    .replace('{price}', product.price.toString())
    .replace('{description}', product.description)
    .replace('{storeName}', storeData.settings.storeName);
}

function generateSweetDreamsCSS(storeData: StoreData): string {
  const { settings } = storeData;
  
  return `
/* Sweet Dreams Template Styles */
:root {
  --primary-color: ${settings.primaryColor};
  --secondary-color: ${settings.secondaryColor};
  --accent-color: ${settings.accentColor};
  --font-family: '${settings.fontFamily}';
}

/* Reset and Base */
*, ::before, ::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font-family), sans-serif; line-height: 1.6; color: #333; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }

/* Sweet Dreams Header */
.sweet-dreams-header {
  background: linear-gradient(135deg, #fff 0%, #fef7f7 100%);
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.sweet-dreams-logo {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sweet-dreams-nav-link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.sweet-dreams-nav-link:hover {
  color: var(--primary-color);
}

.sweet-dreams-nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.sweet-dreams-nav-link:hover::after {
  width: 100%;
}

.sweet-dreams-cart-icon {
  position: relative;
  color: var(--primary-color);
  cursor: pointer;
}

.sweet-dreams-cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--accent-color);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

/* Sweet Dreams Hero */
.sweet-dreams-hero {
  background: linear-gradient(135deg, #fef7f7 0%, #fff 50%, #f0f9ff 100%);
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.sweet-dreams-hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sweet-dreams-hero-subtitle {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.sweet-dreams-hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.sweet-dreams-btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
}

.sweet-dreams-btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(233, 30, 99, 0.4);
}

.sweet-dreams-btn-secondary {
  background: transparent;
  color: var(--primary-color);
  padding: 1rem 2rem;
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.sweet-dreams-btn-secondary:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.sweet-dreams-hero-image img {
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

/* Sweet Dreams Features */
.sweet-dreams-features {
  background: #fff;
  padding: 4rem 0;
}

.sweet-dreams-section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
}

.sweet-dreams-section-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.sweet-dreams-feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #fff 0%, #fef7f7 100%);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  animation-delay: var(--delay);
  opacity: 0;
  transform: translateY(30px);
}

.sweet-dreams-feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.sweet-dreams-feature-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.sweet-dreams-feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.sweet-dreams-feature-description {
  color: #666;
  line-height: 1.6;
}

/* Sweet Dreams Products */
.sweet-dreams-products {
  background: #f8f9fa;
  padding: 4rem 0;
}

.sweet-dreams-product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.sweet-dreams-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.sweet-dreams-product-image {
  position: relative;
  overflow: hidden;
  height: 250px;
}

.sweet-dreams-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.sweet-dreams-product-card:hover .sweet-dreams-product-image img {
  transform: scale(1.05);
}

.sweet-dreams-sale-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
}

.sweet-dreams-product-info {
  padding: 1.5rem;
}

.sweet-dreams-product-name {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.sweet-dreams-product-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.sweet-dreams-product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.sweet-dreams-product-price .current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.sweet-dreams-product-price .original-price {
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
}

.sweet-dreams-add-to-cart {
  width: 100%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sweet-dreams-add-to-cart:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
}

/* Sweet Dreams Testimonials */
.sweet-dreams-testimonials {
  background: linear-gradient(135deg, #fef7f7 0%, #f0f9ff 100%);
  padding: 4rem 0;
}

.sweet-dreams-testimonials-container {
  max-width: 800px;
  margin: 0 auto;
}

.sweet-dreams-testimonial-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  text-align: center;
}

.sweet-dreams-testimonial-stars {
  color: var(--accent-color);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.sweet-dreams-testimonial-text {
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.sweet-dreams-testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.sweet-dreams-testimonial-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
}

.sweet-dreams-testimonial-name {
  font-weight: 600;
  color: #333;
}

/* Sweet Dreams CTA */
.sweet-dreams-cta {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 0;
}

.sweet-dreams-cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.sweet-dreams-cta-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.sweet-dreams-cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.sweet-dreams-btn-outline {
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border: 2px solid white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.sweet-dreams-btn-outline:hover {
  background: white;
  color: var(--primary-color);
  transform: translateY(-2px);
}

/* Sweet Dreams Footer */
.sweet-dreams-footer {
  background: #2d3748;
  color: white;
  padding: 3rem 0 1rem;
}

.sweet-dreams-footer-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.sweet-dreams-footer-description {
  color: #a0aec0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.sweet-dreams-social-links {
  display: flex;
  gap: 1rem;
}

.sweet-dreams-social-link {
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.sweet-dreams-social-link:hover {
  background: var(--secondary-color);
  transform: translateY(-2px);
}

.sweet-dreams-footer-heading {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.sweet-dreams-footer-links {
  list-style: none;
}

.sweet-dreams-footer-links li {
  margin-bottom: 0.5rem;
}

.sweet-dreams-footer-links a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.sweet-dreams-footer-links a:hover {
  color: white;
}

.sweet-dreams-contact-info p {
  color: #a0aec0;
  margin-bottom: 0.5rem;
}

.sweet-dreams-contact-info a {
  color: var(--primary-color);
  text-decoration: none;
}

.sweet-dreams-footer-bottom {
  border-top: 1px solid #4a5568;
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
  color: #a0aec0;
}

/* Animations */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .sweet-dreams-hero-title {
    font-size: 2.5rem;
  }
  
  .sweet-dreams-hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .sweet-dreams-btn-primary,
  .sweet-dreams-btn-secondary {
    width: 100%;
    text-align: center;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 3rem;
  }
}
`;
}