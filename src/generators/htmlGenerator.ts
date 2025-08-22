import { StoreData } from '../types/store';
import { getThemeById } from '../types/theme';
import { generateHeaderHTML, generateFooterHTML, generateHeroHTML, generateAboutHTML, generateFeaturesHTML, generateFAQHTML } from '../registry/htmlGenerators';

export const generateStoreHTML = (storeData: StoreData): string => {
  const { settings, products } = storeData;
  const currentTheme = getThemeById(settings.themeId);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, settings.productSections.featured.limit);
  const bestSellerProducts = products.filter(p => p.isBestSeller).slice(0, settings.productSections.bestSellers.limit);
  const onSaleProducts = products.filter(p => p.isOnSale).slice(0, settings.productSections.onSale.limit);

  const generateProductHTML = (product: any) => `
    <div class="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2 cursor-pointer bg-white" onclick="window.open('product-${product.id}.html', '_blank')">
      <div class="relative overflow-hidden">
        <img src="images/${product.id}.jpg" alt="${product.name}" class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
        
        <!-- Badges -->
        <div class="absolute top-3 right-3 flex flex-col gap-2">
          ${product.category ? `<span class="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg" style="background-color: ${currentTheme.palette.accent}">${product.category}</span>` : ''}
          ${product.isOnSale && product.discountPercentage ? `<span class="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-pulse">-${product.discountPercentage}%</span>` : ''}
        </div>

        <!-- Product Labels -->
        <div class="absolute bottom-3 left-3 flex flex-wrap gap-1">
          ${product.isFeatured ? '<span class="bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-full">⭐ مميز</span>' : ''}
          ${product.isBestSeller ? '<span class="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">🏆 الأعلى مبيعاً</span>' : ''}
          ${product.isOnSale ? '<span class="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">🔥 عرض</span>' : ''}
        </div>
      </div>

      <div class="p-6">
        <h3 class="font-bold text-xl mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">${product.name}</h3>
        <p class="text-gray-600 mb-4 line-clamp-2 leading-relaxed">${product.description}</p>
        
        <div class="flex justify-between items-center">
          <div class="flex flex-col">
            <span class="text-2xl font-black" style="color: ${currentTheme.palette.primary}">$${product.price}</span>
            ${product.originalPrice && product.originalPrice > product.price ? `<span class="text-sm text-gray-500 line-through">$${product.originalPrice}</span>` : ''}
          </div>
          
          ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
            <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}?text=${encodeURIComponent(generateWhatsAppMessage(product, settings))}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" class="px-6 py-3 text-white rounded-xl hover:opacity-90 transition-all duration-200 flex items-center gap-2 hover:scale-105 shadow-lg font-bold" style="background-color: #25D366">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              شراء الآن
            </a>
          ` : `
            <button class="px-6 py-3 text-white rounded-xl opacity-50 cursor-not-allowed shadow-lg" style="background-color: ${currentTheme.palette.secondary}" disabled onclick="event.stopPropagation()">غير متاح</button>
          `}
        </div>
      </div>
    </div>
  `;

  const generateProductSectionHTML = (sectionType: 'featured' | 'bestSellers' | 'onSale', products: any[], sectionConfig: any) => {
    if (!sectionConfig.enabled || products.length === 0) return '';

    const getSectionColor = () => {
      switch (sectionType) {
        case 'featured':
          return currentTheme.palette.primary;
        case 'bestSellers':
          return currentTheme.palette.secondary;
        case 'onSale':
          return currentTheme.palette.accent;
        default:
          return currentTheme.palette.primary;
      }
    };

    const getFilterParam = () => {
      switch (sectionType) {
        case 'bestSellers':
          return 'bestsellers';
        case 'onSale':
          return 'onsale';
        default:
          return sectionType;
      }
    };

    return `
      <section class="py-16 px-6" style="background-color: ${currentTheme.palette.background}">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-4" style="color: ${getSectionColor()}">${sectionConfig.title}</h2>
            <p class="text-xl" style="color: ${currentTheme.palette.textSecondary}">${sectionConfig.subtitle}</p>
            <div class="w-24 h-1 mx-auto mt-6 rounded" style="background-color: ${currentTheme.palette.accent}"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            ${products.map(product => generateProductHTML(product)).join('')}
          </div>

          <div class="text-center">
            <a href="products.html?filter=${getFilterParam()}" class="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg" style="background-color: ${getSectionColor()}10; color: ${getSectionColor()}; border: 2px solid ${getSectionColor()}20">
              <span>عرض جميع ${sectionConfig.title}</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    `;
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return generateHeroHTML(settings.heroTemplate, settings, currentTheme);
      
      case 'featured':
        return generateProductSectionHTML('featured', featuredProducts, settings.productSections.featured);
      
      case 'bestSellers':
        return generateProductSectionHTML('bestSellers', bestSellerProducts, settings.productSections.bestSellers);
      
      case 'onSale':
        return generateProductSectionHTML('onSale', onSaleProducts, settings.productSections.onSale);
      
      case 'about':
        return generateAboutHTML(settings.aboutTemplate, settings, currentTheme);
      
      case 'whyChooseUs':
        return generateFeaturesHTML(settings.featuresTemplate, settings, currentTheme);
      
      case 'faq':
        return generateFAQHTML(settings.faqTemplate, settings, currentTheme);
      
      default:
        return '';
    }
  };

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.storeName}</title>
    <meta name="description" content="${settings.description}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="favicon.ico">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { 
            font-family: '${settings.fontFamily}', sans-serif; 
            background-color: ${currentTheme.palette.background};
            color: ${currentTheme.palette.text};
        }
        
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

        .line-clamp-2 { 
            display: -webkit-box; 
            -webkit-line-clamp: 2; 
            -webkit-box-orient: vertical; 
            overflow: hidden; 
        }

        /* Custom Animations */
        @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-bounce { animation: bounce 1s infinite; }

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
    </style>
</head>
<body>
    ${generateHeaderHTML(settings.headerTemplate, settings)}

    ${settings.sectionsOrder.map(sectionId => renderSection(sectionId)).join('')}

    ${generateFooterHTML(settings.footerTemplate, settings)}

    <script>
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // WhatsApp analytics
        document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('WhatsApp order initiated');
            });
        });

        // FAQ Toggle Function
        function toggleFAQ(index) {
            const faqItem = document.querySelector(\`.faq-item:nth-child(\${index + 1})\`);
            const faqAnswer = document.getElementById(\`faq-\${index}\`);
            
            if (faqItem && faqAnswer) {
                faqItem.classList.toggle('active');
                faqAnswer.classList.toggle('active');
            }
        }
    </script>
</body>
</html>`;
};

const generateWhatsAppMessage = (product: any, settings: any): string => {
  let message = settings.whatsappSettings.messageTemplate;
  
  if (settings.whatsappSettings.includeProductName) {
    message = message.replace('{productName}', product.name);
  }
  if (settings.whatsappSettings.includeProductPrice) {
    message = message.replace('{productPrice}', `$${product.price}`);
  }
  if (settings.whatsappSettings.includeProductDescription) {
    message = message.replace('{productDescription}', product.description);
  }
  if (settings.whatsappSettings.includeStoreInfo) {
    message = message.replace('{storeName}', settings.storeName);
  }
  if (settings.whatsappSettings.includeProductLink) {
    const productLink = `${window.location.origin}/product-${product.id}.html`;
    message = message.replace('{productLink}', productLink);
  }
  
  return message;
};