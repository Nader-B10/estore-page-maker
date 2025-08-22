import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { StoreData, CustomPage, StoreSettings } from '../types/store';
import { generateStoreHTML, generateStoreCSS, generateStoreJS } from '../generators';

const generateProductsPageHTML = (storeData: StoreData): string => {
  const { settings, products } = storeData;
  
  const generateProductHTML = (product: any) => `
    <div class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div class="product-image relative">
        <img src="images/${product.id}.jpg" alt="${product.name}" class="w-full h-48 object-cover" />
        <div class="product-badges absolute top-2 right-2 flex flex-col gap-1">
          ${product.category ? `<span class="product-category bg-blue-500 text-white px-2 py-1 text-xs rounded-full">${product.category}</span>` : ''}
          ${product.isOnSale && product.discountPercentage ? `<span class="discount-badge bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">-${product.discountPercentage}%</span>` : ''}
        </div>
      </div>
      <div class="product-content p-4">
        <h3 class="product-title font-semibold text-lg mb-2">${product.name}</h3>
        <p class="product-description text-gray-600 text-sm mb-3">${product.description}</p>
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
            <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}?text=${encodeURIComponent(`مرحباً، أريد شراء ${product.name} بسعر $${product.price}`)}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
              شراء
            </a>
          ` : `
            <button class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2" disabled>
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
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50" style="font-family: '${settings.fontFamily}', sans-serif;">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-6">
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-4">
                    ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-12 h-12 object-cover rounded-lg" />` : ''}
                    <div>
                        <h1 class="text-2xl font-bold" style="color: ${settings.primaryColor}">${settings.storeName}</h1>
                        <p class="text-gray-600">${settings.description}</p>
                    </div>
                </div>
                <a href="index.html" class="text-gray-500 hover:text-gray-700 px-4 py-2 border border-gray-300 rounded-lg">
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
                ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-8 h-8 object-cover rounded" />` : ''}
                <h3 class="text-lg font-bold">${settings.storeName}</h3>
            </div>
            <p class="text-gray-300 mb-4">${settings.description}</p>
            <p class="text-gray-400 text-sm">
                ${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
            </p>
        </div>
    </footer>

    <script>
        // Products data
        const products = ${JSON.stringify(products)};
        const settings = ${JSON.stringify(settings)};
        
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilter = urlParams.get('filter') || 'all';
        
        // Apply initial filter
        document.addEventListener('DOMContentLoaded', function() {
            filterProducts(initialFilter);
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'transparent';
                btn.style.color = settings.primaryColor;
                btn.style.border = '2px solid ' + settings.primaryColor;
            });
            
            const activeBtn = document.querySelector('[onclick="filterProducts(\\''+initialFilter+'\\')"]');
            if (activeBtn) {
                activeBtn.classList.add('active');
                activeBtn.style.backgroundColor = settings.primaryColor;
                activeBtn.style.color = 'white';
                activeBtn.style.border = '2px solid ' + settings.primaryColor;
            }
        });
        
        // Filter products function
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
            
            // Update active button
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
        
        // Display products function
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
                    <div class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div class="product-image relative">
                            <img src="images/\${product.id}.jpg" alt="\${product.name}" class="w-full h-48 object-cover" />
                            <div class="product-badges absolute top-2 right-2 flex flex-col gap-1">
                                \${product.category ? \`<span class="product-category bg-blue-500 text-white px-2 py-1 text-xs rounded-full">\${product.category}</span>\` : ''}
                                \${product.isOnSale && product.discountPercentage ? \`<span class="discount-badge bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">-\${product.discountPercentage}%</span>\` : ''}
                            </div>
                        </div>
                        <div class="product-content p-4">
                            <h3 class="product-title font-semibold text-lg mb-2">\${product.name}</h3>
                            <p class="product-description text-gray-600 text-sm mb-3">\${product.description}</p>
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
                                    <a href="https://wa.me/\${settings.whatsappSettings.phoneNumber}?text=\${encodeURIComponent(\`مرحباً، أريد شراء \${product.name} بسعر $\${product.price}\`)}" target="_blank" rel="noopener noreferrer" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                                        شراء
                                    </a>
                                \` : \`
                                    <button class="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed flex items-center gap-2" disabled>
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
    </script>
</body>
</html>`;
};

const generatePageHTML = (page: CustomPage, settings: StoreSettings): string => {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.metaTitle || page.title} - ${settings.storeName}</title>
    <meta name="description" content="${page.metaDescription || page.title}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <style>
        .page-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-top: 2rem;
            margin-bottom: 2rem;
            line-height: 1.8;
        }
        .page-title {
            color: ${settings.primaryColor};
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
        }
        .page-content h1, .page-content h2, .page-content h3 {
            color: ${settings.primaryColor};
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        .page-content p {
            margin-bottom: 1rem;
        }
        .back-to-home {
            display: inline-block;
            background: ${settings.primaryColor};
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            margin-bottom: 2rem;
            transition: opacity 0.3s ease;
        }
        .back-to-home:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <header style="background: ${settings.primaryColor}; color: white; padding: 1rem 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: flex; align-items: center; gap: 1rem;">
                ${settings.logo ? `<img src="${settings.logo}" alt="Logo" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px;" />` : ''}
                <div>
                    <h1 style="font-size: 1.5rem; margin: 0;">${settings.storeName}</h1>
                    <p style="font-size: 0.875rem; margin: 0; opacity: 0.9;">${settings.description}</p>
                </div>
            </div>
        </div>
    </header>

    <main class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <a href="index.html" class="back-to-home">← العودة للرئيسية</a>
        
        <div class="page-content">
            <h1 class="page-title">${page.title}</h1>
            <div>${page.content}</div>
        </div>
    </main>

    <footer style="background-color: #1a1a1a; color: white; padding: 2rem 0; margin-top: 3rem;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
            <p style="margin: 0; font-size: 0.875rem; color: #999;">
                ${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
            </p>
        </div>
    </footer>
</body>
</html>`;
};

const generateProductDetailHTML = (product: any, settings: StoreSettings, relatedProducts: any[] = []): string => {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} - ${settings.storeName}</title>
    <meta name="description" content="${product.description}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: '${settings.fontFamily}', sans-serif; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    </style>
</head>
<body class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-10 h-10 object-cover rounded-lg" />` : ''}
                    <div>
                        <h1 class="text-lg font-bold" style="color: ${settings.primaryColor}">${settings.storeName}</h1>
                        <p class="text-sm text-gray-600">${settings.description}</p>
                    </div>
                </div>
                
                <div class="flex items-center gap-3">
                    <button onclick="window.history.back()" class="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        العودة
                    </button>
                    
                    <button onclick="shareProduct()" class="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path></svg>
                        مشاركة
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Product Image -->
            <div class="space-y-4">
                <div class="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                    <img src="images/${product.id}.jpg" alt="${product.name}" class="w-full h-96 lg:h-[500px] object-cover" />
                    
                    <!-- Badges -->
                    <div class="absolute top-4 right-4 flex flex-col gap-2">
                        ${product.category ? `<span class="px-3 py-1 text-sm font-medium text-white rounded-full bg-blue-500 shadow-lg">${product.category}</span>` : ''}
                        ${product.isOnSale && product.discountPercentage ? `<span class="px-3 py-1 text-sm font-bold text-white rounded-full bg-red-500 shadow-lg animate-pulse">خصم ${product.discountPercentage}%</span>` : ''}
                    </div>

                    <!-- Product Labels -->
                    <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        ${product.isFeatured ? '<span class="px-3 py-1 text-sm font-bold text-white rounded-full bg-yellow-500 shadow-lg">⭐ مميز</span>' : ''}
                        ${product.isBestSeller ? '<span class="px-3 py-1 text-sm font-bold text-white rounded-full bg-green-500 shadow-lg">🏆 الأعلى مبيعاً</span>' : ''}
                    </div>
                </div>
            </div>

            <!-- Product Info -->
            <div class="space-y-6">
                <!-- Title and Rating -->
                <div>
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">${product.name}</h1>
                    
                    <!-- Rating Stars -->
                    <div class="flex items-center gap-2 mb-4">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        </div>
                        <span class="text-gray-600 text-sm">(4.8) • 127 تقييم</span>
                    </div>
                </div>

                <!-- Price -->
                <div class="flex items-center gap-4">
                    <span class="text-4xl font-black" style="color: ${settings.primaryColor}">$${product.price}</span>
                    ${product.originalPrice && product.originalPrice > product.price ? `
                        <div class="flex flex-col">
                            <span class="text-xl text-gray-500 line-through">$${product.originalPrice}</span>
                            <span class="text-sm text-green-600 font-medium">وفر $${(product.originalPrice - product.price).toFixed(2)}</span>
                        </div>
                    ` : ''}
                </div>

                <!-- Description -->
                <div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">وصف المنتج</h3>
                    <p class="text-gray-700 leading-relaxed text-lg">${product.description}</p>
                </div>

                <!-- Tags -->
                ${product.tags && product.tags.length > 0 ? `
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-3">العلامات</h3>
                        <div class="flex flex-wrap gap-2">
                            ${product.tags.map(tag => `<span class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full border">#${tag}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Features -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
                    <div class="flex items-center gap-3 text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">شحن مجاني</p>
                            <p class="text-sm text-gray-600">للطلبات فوق $50</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-3 text-center">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">ضمان الجودة</p>
                            <p class="text-sm text-gray-600">ضمان لمدة سنة</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-3 text-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-900">إرجاع مجاني</p>
                            <p class="text-sm text-gray-600">خلال 30 يوم</p>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-4">
                    ${settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? `
                        <a href="https://wa.me/${settings.whatsappSettings.phoneNumber}?text=${encodeURIComponent(`مرحباً، أريد شراء ${product.name} بسعر $${product.price}`)}" target="_blank" rel="noopener noreferrer" class="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-bold">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                            اشتري الآن عبر الواتساب
                        </a>
                    ` : `
                        <button class="w-full flex items-center justify-center gap-3 bg-gray-400 text-white px-8 py-4 rounded-xl cursor-not-allowed text-lg font-bold" disabled>
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293A1 1 0 005 17v0a1 1 0 001 1h1M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6.5"></path></svg>
                            غير متاح للشراء
                        </button>
                    `}

                    <button class="w-full flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl transition-colors text-lg font-semibold">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        إضافة للمفضلة
                    </button>
                </div>
            </div>
        </div>

        <!-- Related Products -->
        ${relatedProducts.length > 0 ? `
            <div class="mt-16">
                <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">منتجات ذات صلة</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    ${relatedProducts.slice(0, 4).map(relatedProduct => `
                        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onclick="window.open('product-${relatedProduct.id}.html', '_blank')">
                            <img src="images/${relatedProduct.id}.jpg" alt="${relatedProduct.name}" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
                            <div class="p-4">
                                <h3 class="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">${relatedProduct.name}</h3>
                                <p class="text-gray-600 text-sm mb-3 line-clamp-2">${relatedProduct.description}</p>
                                <div class="flex justify-between items-center">
                                    <span class="text-xl font-bold" style="color: ${settings.primaryColor}">$${relatedProduct.price}</span>
                                    <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">عرض التفاصيل</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8 px-6 mt-16">
        <div class="max-w-7xl mx-auto text-center">
            <div class="flex items-center justify-center gap-3 mb-4">
                ${settings.logo ? `<img src="${settings.logo}" alt="Logo" class="w-8 h-8 object-cover rounded" />` : ''}
                <h3 class="text-lg font-bold">${settings.storeName}</h3>
            </div>
            <p class="text-gray-300 mb-4">${settings.description}</p>
            <p class="text-gray-400 text-sm">
                ${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
            </p>
        </div>
    </footer>

    <script>
        function shareProduct() {
            if (navigator.share) {
                navigator.share({
                    title: '${product.name}',
                    text: '${product.description}',
                    url: window.location.href,
                }).catch(console.error);
            } else {
                navigator.clipboard.writeText(window.location.href);
                alert('تم نسخ رابط المنتج!');
            }
        }
    </script>
</body>
</html>`;
};

export const exportStore = async (storeData: StoreData) => {
  try {
    const zip = new JSZip();
    
    // Create main HTML file
    const htmlContent = generateStoreHTML(storeData);
    zip.file('index.html', htmlContent);
    
    // Create CSS folder and file
    const cssFolder = zip.folder('css');
    const cssContent = generateStoreCSS(storeData);
    cssFolder?.file('style.css', cssContent);
    
    // Create JS folder and file
    const jsFolder = zip.folder('js');
    const jsContent = generateStoreJS();
    jsFolder?.file('main.js', jsContent);
    
    // Create products page
    const productsHTML = generateProductsPageHTML(storeData);
    zip.file('products.html', productsHTML);
    
    // Create product detail pages
    for (const product of storeData.products) {
      try {
        // Get related products (same category, excluding current product)
        const relatedProducts = storeData.products
          .filter(p => p.id !== product.id && p.category === product.category)
          .slice(0, 4);
        
        const productDetailHTML = generateProductDetailHTML(product, storeData.settings, relatedProducts);
        zip.file(`product-${product.id}.html`, productDetailHTML);
      } catch (error) {
        console.warn(`Failed to generate detail page for product ${product.id}:`, error);
      }
    }
    
    // Create images folder and add product images
    const imagesFolder = zip.folder('images');
    
    // Add product images
    for (const product of storeData.products) {
      if (product.image && product.image.startsWith('data:')) {
        try {
          // Convert base64 to blob and add to zip
          const base64Data = product.image.split(',')[1];
          const mimeType = product.image.split(':')[1].split(';')[0];
          const extension = mimeType.split('/')[1];
          
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          
          imagesFolder?.file(`${product.id}.${extension}`, byteArray);
        } catch (error) {
          console.warn(`Failed to process image for product ${product.id}:`, error);
        }
      }
    }
    
    // Add logo if exists
    if (storeData.settings.logo && storeData.settings.logo.startsWith('data:')) {
      try {
        const base64Data = storeData.settings.logo.split(',')[1];
        const mimeType = storeData.settings.logo.split(':')[1].split(';')[0];
        const extension = mimeType.split('/')[1];
        
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        
        zip.file(`logo.${extension}`, byteArray);
      } catch (error) {
        console.warn('Failed to process logo:', error);
      }
    }
    
    // Create README file
    const readmeContent = `# ${storeData.settings.storeName}

## وصف المتجر
${storeData.settings.description}

## معلومات الاتصال
- البريد الإلكتروني: ${storeData.settings.contactInfo.email || 'غير محدد'}
- الهاتف: ${storeData.settings.contactInfo.phone || 'غير محدد'}
- العنوان: ${storeData.settings.contactInfo.address || 'غير محدد'}

## الملفات المضمنة
- index.html - الصفحة الرئيسية للمتجر
- products.html - صفحة جميع المنتجات
- product-[ID].html - صفحات تفاصيل المنتجات
- css/style.css - ملف الأنماط الأساسي
- js/main.js - ملف الجافا سكريبت للوظائف التفاعلية
- images/ - مجلد صور المنتجات
${storeData.customPages.length > 0 ? `\n## الصفحات المخصصة\n${storeData.customPages.map(page => `- ${page.slug}.html - ${page.title}`).join('\n')}` : ''}

## كيفية الاستخدام
1. قم برفع الملفات إلى خادم ويب
2. تأكد من أن جميع الملفات والمجلدات في نفس المستوى
3. افتح index.html في المتصفح

## المتطلبات
- متصفح ويب حديث يدعم HTML5 و CSS3 و JavaScript
- خادم ويب (Apache, Nginx, أو أي خادم آخر)

تم إنشاء هذا المتجر باستخدام أداة بناء المتاجر الإلكترونية.
`;
    
    zip.file('README.md', readmeContent);
    
    // Create custom pages
    for (const page of storeData.customPages) {
      if (page.isPublished) {
        try {
          const pageHTML = generatePageHTML(page, storeData.settings);
          zip.file(`${page.slug}.html`, pageHTML);
        } catch (error) {
          console.warn(`Failed to generate page ${page.slug}:`, error);
        }
      }
    }
    
    // Generate and download the zip file
    const blob = await zip.generateAsync({ type: 'blob' });
    const fileName = `${storeData.settings.storeName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}_store.zip`;
    saveAs(blob, fileName);
    return true;
  } catch (error) {
    console.error('Error creating zip file:', error);
    throw error;
  }
};