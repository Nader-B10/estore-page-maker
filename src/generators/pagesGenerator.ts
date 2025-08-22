import { StoreData } from '../types';

export const generateProductsPageHTML = (storeData: StoreData): string => {
  const { settings, products } = storeData;
  
  const generateProductHTML = (product: any) => `
    <div class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="window.open('product-${product.id}.html', '_blank')">
      <div class="product-image relative">
        <img src="images/${product.id}.jpg" alt="${product.name}" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
        <div class="product-badges absolute top-2 right-2 flex flex-col gap-1">
          ${product.category ? `<span class="product-category bg-blue-500 text-white px-2 py-1 text-xs rounded-full">${product.category}</span>` : ''}
          ${product.isOnSale && product.discountPercentage ? `<span class="discount-badge bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">-${product.discountPercentage}%</span>` : ''}
        </div>
      </div>
      <div class="product-content p-4">
        <h3 class="product-title font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">${product.name}</h3>
        <p class="product-description text-gray-600 text-sm mb-3 line-clamp-2">${product.description}</p>
        <div class="product-badges flex flex-wrap gap-1 mb-3">
          ${product.isFeatured ? '<span class="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">مميز</span>' : ''}
          ${product.isBestSeller ? '<span class="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">الأعلى مبيعاً</span>' : ''}
          ${product.isOnSale ? '<span class="bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full">عرض</span>' : ''}
        </div>
        <div class="product-footer flex justify-between items-center">
          <div class="product-price-container">
            <span class="product-price text-xl font-bold" style="color: ${settings.primaryColor}">$${product.price}</span>
            ${product.originalPrice && product.originalPrice > product.price ? 
              `<span class="product-original-price text-sm text-gray-500 line-through block">$${product.originalPrice}</span>` : ''}
          </div>
          ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
            <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}?text=${encodeURIComponent(generateWhatsAppMessage(product, settings))}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2" onclick="event.stopPropagation()">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              شراء
            </a>
          ` : `
            <button class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2" disabled onclick="event.stopPropagation()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005 17v0a1 1 0 001 1h1M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.5"></path></svg>
              غير متاح
            </button>
          `}
        </div>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>المنتجات - ${settings.storeName}</title>
    <meta name="description" content="تصفح جميع منتجات ${settings.storeName}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="favicon.ico">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: '${settings.fontFamily}', sans-serif; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                    ${settings.logo ? `<img src="logo.png" alt="Logo" class="w-12 h-12 object-cover rounded-lg" />` : ''}
                    <div>
                        <h1 class="text-2xl font-bold" style="color: ${settings.primaryColor}">${settings.storeName}</h1>
                        <p class="text-gray-600">${settings.description}</p>
                    </div>
                </div>
                <a href="index.html" class="text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-300 rounded-lg transition-colors">
                    ← العودة للرئيسية
                </a>
            </div>
            
            <!-- Search -->
            <div class="relative max-w-md">
                <input type="text" id="searchInput" placeholder="ابحث عن المنتجات..." class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Filter Buttons -->
        <div class="flex flex-wrap gap-4 mb-8">
            <button onclick="filterProducts('all')" class="filter-btn active px-6 py-2 rounded-full font-medium transition-colors" style="background-color: ${settings.primaryColor}; color: white;">
                جميع المنتجات
            </button>
            <button onclick="filterProducts('featured')" class="filter-btn px-6 py-2 rounded-full font-medium border-2 transition-colors" style="border-color: ${settings.primaryColor}; color: ${settings.primaryColor};">
                المنتجات المميزة
            </button>
            <button onclick="filterProducts('bestsellers')" class="filter-btn px-6 py-2 rounded-full font-medium border-2 transition-colors" style="border-color: ${settings.secondaryColor}; color: ${settings.secondaryColor};">
                الأعلى مبيعاً
            </button>
            <button onclick="filterProducts('onsale')" class="filter-btn px-6 py-2 rounded-full font-medium border-2 transition-colors" style="border-color: ${settings.accentColor}; color: ${settings.accentColor};">
                العروض والتخفيضات
            </button>
        </div>

        <!-- Products Grid -->
        <div id="productsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${products.map(product => generateProductHTML(product)).join('')}
        </div>

        <!-- No Results -->
        <div id="noResults" class="text-center py-12 hidden">
            <div class="mb-4 text-gray-400">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">لم يتم العثور على منتجات</h3>
            <p class="text-gray-500">جرب تغيير معايير البحث أو الفلترة</p>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 px-6 mt-12">
        <div class="max-w-7xl mx-auto text-center">
            <div class="flex items-center justify-center gap-3 mb-4">
                ${settings.logo ? `<img src="logo.png" alt="Logo" class="w-8 h-8 object-cover rounded" />` : ''}
                <h3 class="text-lg font-bold">${settings.storeName}</h3>
            </div>
            <p class="text-gray-300 mb-4">${settings.description}</p>
            <p class="text-gray-400 text-sm">
                ${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
            </p>
        </div>
    </footer>

    <script>
        const products = ${JSON.stringify(products)};
        const settings = ${JSON.stringify(settings)};
        
        function generateWhatsAppMessage(product) {
            let message = settings.whatsappSettings.messageTemplate;
            
            if (settings.whatsappSettings.includeProductName) {
                message = message.replace('{productName}', product.name);
            }
            if (settings.whatsappSettings.includeProductPrice) {
                message = message.replace('{productPrice}', '$' + product.price);
            }
            if (settings.whatsappSettings.includeProductDescription) {
                message = message.replace('{productDescription}', product.description);
            }
            if (settings.whatsappSettings.includeStoreInfo) {
                message = message.replace('{storeName}', settings.storeName);
            }
            if (settings.whatsappSettings.includeProductLink) {
                const productLink = window.location.origin + '/product-' + product.id + '.html';
                message = message.replace('{productLink}', productLink);
            }
            
            return message;
        }
        
        function filterProducts(filter) {
            let filteredProducts = products;
            
            if (filter === 'featured') {
                filteredProducts = products.filter(p => p.isFeatured);
            } else if (filter === 'bestsellers') {
                filteredProducts = products.filter(p => p.isBestSeller);
            } else if (filter === 'onsale') {
                filteredProducts = products.filter(p => p.isOnSale);
            }
            
            displayProducts(filteredProducts);
            updateActiveButton(filter);
        }
        
        function displayProducts(productsToShow) {
            const grid = document.getElementById('productsGrid');
            const noResults = document.getElementById('noResults');
            
            if (productsToShow.length === 0) {
                grid.style.display = 'none';
                noResults.classList.remove('hidden');
            } else {
                grid.style.display = 'grid';
                noResults.classList.add('hidden');
                
                grid.innerHTML = productsToShow.map(product => \`
                    <div class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="window.open('product-\${product.id}.html', '_blank')">
                        <div class="product-image relative">
                            <img src="images/\${product.id}.jpg" alt="\${product.name}" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
                            <div class="product-badges absolute top-2 right-2 flex flex-col gap-1">
                                \${product.category ? \`<span class="product-category bg-blue-500 text-white px-2 py-1 text-xs rounded-full">\${product.category}</span>\` : ''}
                                \${product.isOnSale && product.discountPercentage ? \`<span class="discount-badge bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">-\${product.discountPercentage}%</span>\` : ''}
                            </div>
                        </div>
                        <div class="product-content p-4">
                            <h3 class="product-title font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">\${product.name}</h3>
                            <p class="product-description text-gray-600 text-sm mb-3 line-clamp-2">\${product.description}</p>
                            <div class="product-badges flex flex-wrap gap-1 mb-3">
                                \${product.isFeatured ? '<span class="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full">مميز</span>' : ''}
                                \${product.isBestSeller ? '<span class="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">الأعلى مبيعاً</span>' : ''}
                                \${product.isOnSale ? '<span class="bg-red-100 text-red-800 px-2 py-1 text-xs rounded-full">عرض</span>' : ''}
                            </div>
                            <div class="product-footer flex justify-between items-center">
                                <div class="product-price-container">
                                    <span class="product-price text-xl font-bold" style="color: \${settings.primaryColor}">$\${product.price}</span>
                                    \${product.originalPrice && product.originalPrice > product.price ? 
                                      \`<span class="product-original-price text-sm text-gray-500 line-through block">$\${product.originalPrice}</span>\` : ''}
                                </div>
                                \${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? \`
                                    <a href="https://wa.me/\${settings.whatsappSettings.phoneNumber}?text=\${encodeURIComponent(generateWhatsAppMessage(product))}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2" onclick="event.stopPropagation()">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                                        شراء
                                    </a>
                                \` : \`
                                    <button class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2" disabled onclick="event.stopPropagation()">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005 17v0a1 1 0 001 1h1M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.5"></path></svg>
                                        غير متاح
                                    </button>
                                \`}
                            </div>
                        </div>
                    </div>
                \`).join('');
            }
        }
        
        function updateActiveButton(filter) {
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'transparent';
            });
            
            const activeBtn = document.querySelector('[onclick="filterProducts(\\''+filter+'\\')"]');
            if (activeBtn) {
                activeBtn.classList.add('active');
                activeBtn.style.backgroundColor = settings.primaryColor;
                activeBtn.style.color = 'white';
            }
        }
        
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm) ||
                (product.category && product.category.toLowerCase().includes(searchTerm))
            );
            displayProducts(filteredProducts);
        });
        
        // Apply initial filter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilter = urlParams.get('filter') || 'all';
        filterProducts(initialFilter);
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