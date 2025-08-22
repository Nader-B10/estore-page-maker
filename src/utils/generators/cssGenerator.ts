import { StoreData } from '../../types/store';
import { themes } from '../../themes/palettes';

export const generateStoreCSS = (storeData: StoreData): string => {
  const { settings } = storeData;
  const theme = themes.find(t => t.name === settings.theme) || themes[0];

  return `
:root {
  --primary-color: ${settings.primaryColor};
  --secondary-color: ${settings.secondaryColor};
  --accent-color: ${settings.accentColor};
  --background-color: ${theme.colors.background};
  --surface-color: ${theme.colors.surface};
  --text-color: ${theme.colors.text};
  --subtle-text-color: ${theme.colors.subtleText};
  --border-color: rgba(128, 128, 128, 0.2);
  --footer-background-color: ${theme.colors.footerBackground};
  --footer-text-color: ${theme.colors.footerText};
  --font-family: '${settings.fontFamily}', sans-serif;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --border-radius: 0.75rem;
}

/* Base Styles */
* { box-sizing: border-box; }
body { 
  font-family: var(--font-family); 
  background-color: var(--background-color); 
  color: var(--text-color); 
  margin: 0; 
  direction: rtl; 
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container { max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; }
img { max-width: 100%; height: auto; display: block; }
a { color: var(--primary-color); text-decoration: none; transition: color 0.2s; }
a:hover { color: var(--secondary-color); }

/* Header */
.site-header {
  background-color: var(--surface-color);
  color: var(--text-color);
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--border-color);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}
.header-content { display: flex; justify-content: space-between; align-items: center; }
.logo-link { display: flex; align-items: center; gap: 0.75rem; font-weight: bold; font-size: 1.5rem; color: var(--text-color); }
.logo-img { height: 48px; }
.main-nav { display: none; }
@media (min-width: 768px) {
  .main-nav { display: flex; gap: 2rem; }
  .main-nav a { font-weight: 500; color: var(--subtle-text-color); transition: color 0.2s; }
  .main-nav a:hover { color: var(--text-color); }
}
.cart-btn { background: none; border: none; cursor: pointer; color: var(--text-color); padding: 0.5rem; }
.cart-btn svg { width: 28px; height: 28px; }

/* Hero Section */
.hero-section {
  padding: 6rem 1.5rem;
  text-align: center;
  color: white;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-section[style*="background-image"] { background-size: cover; background-position: center; }
.hero-content { max-width: 800px; margin: 0 auto; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 800; margin: 0 0 1rem; line-height: 1.2; }
.hero-subtitle { font-size: clamp(1.1rem, 2vw, 1.5rem); opacity: 0.9; margin: 0 0 2.5rem; }
.hero-cta {
  display: inline-block;
  background-color: var(--accent-color);
  color: var(--footer-text-color);
  padding: 1rem 2.5rem;
  border-radius: 99px;
  font-size: 1.1rem;
  font-weight: bold;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow-lg);
}
.hero-cta:hover { transform: translateY(-3px) scale(1.05); }

/* Main Content & Sections */
.main-content { padding-top: 4rem; }
.section-header { text-align: center; margin-bottom: 4rem; }
.section-title { font-size: clamp(2rem, 4vw, 3rem); color: var(--text-color); font-weight: 700; margin: 0 0 1rem; }
.section-subtitle { font-size: 1.1rem; color: var(--subtle-text-color); margin: 0; max-width: 600px; margin: auto; }
.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background-color: var(--accent-color);
  margin: 1rem auto 0;
  border-radius: 2px;
}

/* Products Section */
.products-section { margin-bottom: 5rem; }
.products-container { display: grid; gap: 2rem; }
.products-container.layout-grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }
.products-container.layout-list { grid-template-columns: 1fr; }

/* Product Card */
.product-card {
  background: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
}
.product-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-lg); }
.product-image-wrapper { position: relative; overflow: hidden; aspect-ratio: 1 / 1; }
.product-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.product-card:hover .product-image { transform: scale(1.08); }
.product-badges { position: absolute; top: 1rem; right: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
.badge { padding: 0.3rem 0.8rem; font-size: 0.8rem; font-weight: 500; border-radius: 99px; color: white; backdrop-filter: blur(5px); }
.category-badge { background-color: var(--accent-color); color: var(--footer-text-color); }
.discount-badge { background-color: #ef4444; }
.product-content { padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; }
.product-title { font-size: 1.25rem; font-weight: 600; margin: 0 0 0.5rem; color: var(--text-color); }
.product-description { font-size: 0.95rem; color: var(--subtle-text-color); margin: 0 0 1.5rem; flex-grow: 1; line-height: 1.6; }
.product-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.product-price-container { display: flex; flex-direction: column; line-height: 1.2; }
.product-price { font-weight: bold; color: var(--primary-color); font-size: 1.5rem; }
.product-original-price { font-size: 1rem; color: var(--subtle-text-color); text-decoration: line-through; }
.add-to-cart-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s, transform 0.2s;
}
.add-to-cart-btn:hover { background-color: var(--secondary-color); transform: scale(1.05); }

/* Why Choose Us Section */
.why-choose-us-section { padding: 5rem 0; background-color: var(--surface-color); }
.features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 3rem; }
.feature-item { text-align: center; }
.feature-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 0 0 8px var(--background-color);
}
.feature-icon svg { width: 36px; height: 36px; }
.feature-title { font-size: 1.3rem; font-weight: 600; margin: 0 0 0.5rem; color: var(--text-color); }
.feature-description { font-size: 1rem; color: var(--subtle-text-color); }

/* FAQ Section */
.faq-section { padding: 5rem 0; }
.faq-accordion { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem; }
.faq-item { background: var(--surface-color); border: 1px solid var(--border-color); border-radius: var(--border-radius); overflow: hidden; }
.faq-question {
  width: 100%;
  padding: 1.5rem;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
}
.faq-chevron { transition: transform 0.3s; color: var(--primary-color); }
.faq-question[aria-expanded="true"] .faq-chevron { transform: rotate(180deg); }
.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}
.faq-answer p { padding: 0 1.5rem 1.5rem; margin: 0; color: var(--subtle-text-color); font-size: 1rem; }

/* Footer */
.site-footer {
  background-color: var(--footer-background-color);
  color: var(--footer-text-color);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
}
.footer-content { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; margin-bottom: 3rem; }
.footer-info, .footer-contact { flex: 1; }
.footer-title { font-size: 1.75rem; font-weight: bold; margin: 0 0 1rem; }
.footer-subtitle { font-size: 1.2rem; font-weight: bold; margin: 0 0 1.5rem; border-bottom: 2px solid var(--accent-color); padding-bottom: 0.75rem; }
.contact-list { list-style: none; padding: 0; margin: 0; }
.contact-list li { margin-bottom: 0.75rem; }
.contact-list a { color: var(--footer-text-color); opacity: 0.8; }
.contact-list a:hover { opacity: 1; text-decoration: underline; }
.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0.7;
  font-size: 0.9rem;
}
`;
};
