/**
 * محرك القوالب المتقدم
 * يدير إنشاء وتخصيص القوالب للمتاجر الثابتة
 */

import { StoreData, StoreSettings } from '../types/store';
import { Template, TemplateGenerator } from '../types/template';

export interface TemplateEngineConfig {
  minifyOutput: boolean;
  includeComments: boolean;
  optimizeImages: boolean;
  generateSourceMaps: boolean;
}

export class TemplateEngine {
  private static instance: TemplateEngine;
  private config: TemplateEngineConfig;
  private templates: Map<string, Template> = new Map();
  private generators: Map<string, TemplateGenerator> = new Map();

  private constructor(config: Partial<TemplateEngineConfig> = {}) {
    this.config = {
      minifyOutput: true,
      includeComments: false,
      optimizeImages: true,
      generateSourceMaps: false,
      ...config
    };
  }

  public static getInstance(config?: Partial<TemplateEngineConfig>): TemplateEngine {
    if (!TemplateEngine.instance) {
      TemplateEngine.instance = new TemplateEngine(config);
    }
    return TemplateEngine.instance;
  }

  /**
   * تسجيل قالب جديد
   */
  registerTemplate(template: Template, generator: TemplateGenerator): void {
    this.templates.set(template.id, template);
    this.generators.set(template.id, generator);
  }

  /**
   * الحصول على قالب
   */
  getTemplate(templateId: string): Template | undefined {
    return this.templates.get(templateId);
  }

  /**
   * الحصول على جميع القوالب
   */
  getAllTemplates(): Template[] {
    return Array.from(this.templates.values());
  }

  /**
   * إنشاء HTML للمتجر
   */
  generateHTML(storeData: StoreData, templateId?: string): string {
    const currentTemplateId = templateId || storeData.settings.currentTemplate || 'default';
    const generator = this.generators.get(currentTemplateId);
    
    if (!generator) {
      throw new Error(`Template generator not found: ${currentTemplateId}`);
    }

    let html = generator.generateHTML(storeData);

    if (this.config.minifyOutput) {
      html = this.minifyHTML(html);
    }

    return html;
  }

  /**
   * إنشاء CSS للمتجر
   */
  generateCSS(storeData: StoreData, templateId?: string): string {
    const currentTemplateId = templateId || storeData.settings.currentTemplate || 'default';
    const generator = this.generators.get(currentTemplateId);
    
    if (!generator) {
      throw new Error(`Template generator not found: ${currentTemplateId}`);
    }

    let css = generator.generateCSS(storeData);

    if (this.config.minifyOutput) {
      css = this.minifyCSS(css);
    }

    return css;
  }

  /**
   * إنشاء JavaScript للمتجر
   */
  generateJS(storeData: StoreData, templateId?: string): string {
    const currentTemplateId = templateId || storeData.settings.currentTemplate || 'default';
    const generator = this.generators.get(currentTemplateId);
    
    if (!generator || !generator.generateJS) {
      return this.generateDefaultJS(storeData);
    }

    let js = generator.generateJS(storeData);

    if (this.config.minifyOutput) {
      js = this.minifyJS(js);
    }

    return js;
  }

  /**
   * إنشاء ملفات المتجر الكاملة
   */
  generateStoreFiles(storeData: StoreData, templateId?: string): {
    'index.html': string;
    'styles.css': string;
    'main.js': string;
    [key: string]: string;
  } {
    const files: { [key: string]: string } = {};

    // إنشاء الملفات الأساسية
    files['index.html'] = this.generateHTML(storeData, templateId);
    files['styles.css'] = this.generateCSS(storeData, templateId);
    files['main.js'] = this.generateJS(storeData, templateId);

    // إنشاء الصفحات المخصصة
    const customPages = this.generateCustomPages(storeData, templateId);
    Object.assign(files, customPages);

    // إنشاء ملفات إضافية
    files['manifest.json'] = this.generateManifest(storeData);
    files['robots.txt'] = this.generateRobotsTxt(storeData);
    files['sitemap.xml'] = this.generateSitemap(storeData);

    return files;
  }

  /**
   * إنشاء الصفحات المخصصة
   */
  private generateCustomPages(storeData: StoreData, templateId?: string): { [key: string]: string } {
    const pages: { [key: string]: string } = {};
    const currentTemplateId = templateId || storeData.settings.currentTemplate || 'default';
    const generator = this.generators.get(currentTemplateId);

    if (!generator) return pages;

    storeData.pages.forEach(page => {
      if (!page.isDefault) {
        const pageHTML = this.generateCustomPageHTML(storeData, page, generator);
        pages[`${page.slug}.html`] = pageHTML;
      }
    });

    return pages;
  }

  /**
   * إنشاء HTML للصفحة المخصصة
   */
  private generateCustomPageHTML(storeData: StoreData, page: any, generator: TemplateGenerator): string {
    const { settings } = storeData;
    
    let pageContent = '';
    
    if (page.pageType === 'products' && page.showAllProducts) {
      // صفحة منتجات
      pageContent = `
        <section class="container mx-auto px-6 py-16">
          <div class="text-center mb-12">
            <h1 class="text-4xl font-bold mb-4" style="color: ${settings.primaryColor};">${page.title}</h1>
            <p class="text-gray-600">${page.content}</p>
            <div class="w-24 h-1 mx-auto mt-4 rounded" style="background-color: ${settings.accentColor};"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${storeData.products.map(product => this.generateProductCardHTML(product, storeData)).join('')}
          </div>
        </section>
      `;
    } else {
      // صفحة محتوى
      pageContent = `
        <section class="container mx-auto px-6 py-16">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h1 class="text-4xl font-bold mb-4" style="color: ${settings.primaryColor};">
                ${page.title}
              </h1>
              <div class="w-24 h-1 mx-auto rounded" style="background-color: ${settings.accentColor};"></div>
            </div>
            <div class="prose prose-lg max-w-none">
              ${page.content.split('\n').map((paragraph: string) => 
                paragraph.trim() ? `<p class="mb-4 leading-relaxed text-gray-700">${paragraph}</p>` : ''
              ).join('')}
            </div>
          </div>
        </section>
      `;
    }

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title} - ${settings.storeName}</title>
    <meta name="description" content="${page.metaDescription || page.content.substring(0, 160)}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body class="font-sans">
    ${this.generateHeaderHTML(storeData)}
    <main>
        ${pageContent}
    </main>
    ${this.generateFooterHTML(storeData)}
    <script src="main.js"></script>
</body>
</html>`;
  }

  /**
   * إنشاء بطاقة المنتج HTML
   */
  private generateProductCardHTML(product: any, storeData: StoreData): string {
    const { settings, whatsappSettings } = storeData;
    
    const whatsappMessage = whatsappSettings?.enabled ? whatsappSettings.messageTemplate
      .replace('{productName}', product.name)
      .replace('{price}', product.price.toString())
      .replace('{description}', product.description)
      .replace('{storeName}', settings.storeName) : '';

    return `
      <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div class="relative overflow-hidden">
          <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
          ${product.isOnSale && product.discountPercentage ? 
            `<div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">-${product.discountPercentage}%</div>` : ''}
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg mb-2">${product.name}</h3>
          <p class="text-gray-600 text-sm mb-3">${product.description}</p>
          <div class="flex justify-between items-center">
            <div class="flex flex-col">
              <span class="text-xl font-bold" style="color: ${settings.primaryColor};">${product.price} ر.س</span>
              ${product.originalPrice && product.originalPrice > product.price ? 
                `<span class="text-sm text-gray-500 line-through">${product.originalPrice} ر.س</span>` : ''}
            </div>
            <button 
              class="whatsapp-buy-btn px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" 
              style="background-color: ${whatsappSettings?.enabled ? '#25D366' : settings.secondaryColor};"
              data-phone="${whatsappSettings?.phoneNumber || ''}"
              data-message="${whatsappMessage}"
            >
              ${whatsappSettings?.enabled ? whatsappSettings.buttonText : 'أضف للسلة'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * إنشاء Header HTML
   */
  private generateHeaderHTML(storeData: StoreData): string {
    const { settings, whatsappSettings } = storeData;
    const { header } = settings.sections;

    if (!header.enabled) return '';

    return `
      <header class="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-50">
        <div class="container mx-auto flex justify-between items-center">
          <a href="index.html" class="flex items-center gap-3 text-xl font-bold text-gray-800">
            ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="h-10" />` : ''}
            <span>${settings.storeName}</span>
          </a>
          <nav class="hidden md:flex gap-6">
            ${header.data.links.map(link => `<a href="${link.link}" class="text-gray-600 hover:text-gray-900">${link.text}</a>`).join('')}
          </nav>
          <button 
            class="header-whatsapp-btn ${whatsappSettings?.enabled ? 'text-green-600 hover:text-green-700' : 'text-gray-700'}" 
            data-phone="${whatsappSettings?.phoneNumber || ''}"
            data-message="${whatsappSettings?.enabled ? `مرحباً، أريد الاستفسار عن منتجاتكم في متجر ${settings.storeName}` : ''}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/><path d="M12 7v5l3 3"/>
            </svg>
          </button>
        </div>
      </header>
    `;
  }

  /**
   * إنشاء Footer HTML
   */
  private generateFooterHTML(storeData: StoreData): string {
    const { settings } = storeData;
    const { footer } = settings.sections;

    if (!footer.enabled) return '';

    return `
      <footer class="bg-gray-800 text-white mt-16">
        <div class="container mx-auto px-6 py-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-2xl font-bold mb-2">${settings.storeName}</h3>
              <p class="opacity-80">${settings.description}</p>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">${footer.data.linksTitle}</h4>
              <ul class="space-y-2">
                ${settings.sections.header.data.links.map(link => 
                  `<li><a href="${link.link}" class="opacity-80 hover:opacity-100">${link.text}</a></li>`
                ).join('')}
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">${footer.data.contactTitle}</h4>
              <ul class="space-y-2 opacity-80">
                ${footer.data.contactInfo.email ? `<li>البريد: <a href="mailto:${footer.data.contactInfo.email}">${footer.data.contactInfo.email}</a></li>` : ''}
                ${footer.data.contactInfo.phone ? `<li>الهاتف: ${footer.data.contactInfo.phone}</li>` : ''}
                ${footer.data.contactInfo.address ? `<li>العنوان: ${footer.data.contactInfo.address}</li>` : ''}
              </ul>
            </div>
          </div>
          <div class="mt-8 pt-6 border-t border-gray-700 text-center opacity-70">
            <p>${footer.data.copyrightText}</p>
          </div>
        </div>
      </footer>
    `;
  }

  /**
   * إنشاء JavaScript الافتراضي
   */
  private generateDefaultJS(storeData: StoreData): string {
    return `
document.addEventListener('DOMContentLoaded', () => {
  console.log('Store initialized successfully!');

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      button.setAttribute('aria-expanded', String(!isExpanded));
      
      if (answer && answer.classList.contains('faq-answer')) {
        answer.classList.toggle('hidden');
      }
      
      const chevron = button.querySelector('.faq-chevron');
      if (chevron) {
        chevron.classList.toggle('rotate-180');
      }
    });
  });

  // WhatsApp functionality
  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.whatsapp-buy-btn, .header-whatsapp-btn');
    if (button) {
      const phoneNumber = button.dataset.phone;
      const message = button.dataset.message;
      
      if (phoneNumber && message) {
        const whatsappUrl = \`https://wa.me/\${phoneNumber.replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(message)}\`;
        window.open(whatsappUrl, '_blank');
      }
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Image lazy loading fallback
  if ('IntersectionObserver' in window) {
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

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
});
`;
  }

  /**
   * إنشاء ملف Manifest
   */
  private generateManifest(storeData: StoreData): string {
    const { settings } = storeData;
    
    return JSON.stringify({
      name: settings.storeName,
      short_name: settings.storeName,
      description: settings.description,
      start_url: "/",
      display: "standalone",
      background_color: settings.primaryColor,
      theme_color: settings.primaryColor,
      icons: settings.favicon ? [
        {
          src: settings.favicon,
          sizes: "192x192",
          type: "image/png"
        }
      ] : []
    }, null, 2);
  }

  /**
   * إنشاء ملف robots.txt
   */
  private generateRobotsTxt(storeData: StoreData): string {
    return `User-agent: *
Allow: /

Sitemap: /sitemap.xml`;
  }

  /**
   * إنشاء ملف sitemap.xml
   */
  private generateSitemap(storeData: StoreData): string {
    const baseUrl = 'https://example.com'; // يجب تخصيصه حسب النطاق
    const pages = [''];
    
    // إضافة الصفحات المخصصة
    storeData.pages.forEach(page => {
      if (!page.isDefault) {
        pages.push(page.slug);
      }
    });

    const urls = pages.map(page => `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  }

  /**
   * ضغط HTML
   */
  private minifyHTML(html: string): string {
    return html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  /**
   * ضغط CSS
   */
  private minifyCSS(css: string): string {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/;\s*}/g, '}')
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/,\s*/g, ',')
      .trim();
  }

  /**
   * ضغط JavaScript
   */
  private minifyJS(js: string): string {
    return js
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
      .replace(/\s+/g, ' ')
      .replace(/;\s*}/g, ';}')
      .trim();
  }
}

// تصدير المثيل الوحيد
export const templateEngine = TemplateEngine.getInstance();