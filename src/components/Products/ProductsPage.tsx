import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, SortAsc, SortDesc, X, ChevronDown, Star, Heart, ShoppingCart } from 'lucide-react';
import { Product, StoreData } from '../types/store';

interface ProductsPageProps {
  storeData: StoreData;
}

interface FilterState {
  category: string;
  priceRange: [number, number];
  rating: number;
  onSale: boolean;
  featured: boolean;
  bestSeller: boolean;
}

type SortOption = 'name' | 'price-low' | 'price-high' | 'newest' | 'rating';
type ViewMode = 'grid' | 'list';

export default function ProductsPage({ storeData }: ProductsPageProps) {
  const { settings, products } = storeData;
  
  // Get URL parameters for initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const initialFilter = urlParams.get('filter');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
    onSale: initialFilter === 'onsale',
    featured: initialFilter === 'featured',
    bestSeller: initialFilter === 'bestsellers'
  });

  // Get unique categories
  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return [...new Set(cats)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }
      
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Special filters
      if (filters.onSale && !product.isOnSale) return false;
      if (filters.featured && !product.isFeatured) return false;
      if (filters.bestSeller && !product.isBestSeller) return false;
      
      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'rating':
          return 5 - 4; // Placeholder for rating
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, filters, sortBy]);

  const generateWhatsAppMessage = (product: Product) => {
    if (!settings.whatsappSettings.enabled || !settings.whatsappSettings.phoneNumber) {
      return '#';
    }

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

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${settings.whatsappSettings.phoneNumber}?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: settings.fontFamily }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-12 h-12 object-cover rounded-lg" />
              )}
              <div>
                <h1 className="text-2xl font-bold" style={{ color: settings.primaryColor }}>
                  {settings.storeName}
                </h1>
                <p className="text-gray-600">{settings.description}</p>
              </div>
            </div>
            <button 
              onClick={() => window.close()}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} />
                <span>فلترة</span>
              </button>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">ترتيب أبجدي</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="newest">الأحدث</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
              <h3 className="text-lg font-semibold mb-6">فلترة المنتجات</h3>
              
              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">الفئة</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">جميع الفئات</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">نطاق السعر</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="من"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [Number(e.target.value), prev.priceRange[1]] 
                    }))}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    placeholder="إلى"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: [prev.priceRange[0], Number(e.target.value)] 
                    }))}
                    className="flex-1 p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Special Filters */}
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.featured}
                    onChange={(e) => setFilters(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span>منتجات مميزة</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.bestSeller}
                    onChange={(e) => setFilters(prev => ({ ...prev, bestSeller: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span>الأعلى مبيعاً</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => setFilters(prev => ({ ...prev, onSale: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span>عروض وتخفيضات</span>
                </label>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({
                  category: '',
                  priceRange: [0, 1000],
                  rating: 0,
                  onSale: false,
                  featured: false,
                  bestSeller: false
                })}
                className="w-full mt-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                مسح الفلاتر
              </button>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                عرض {filteredProducts.length} من أصل {products.length} منتج
              </p>
              
              {/* Active Filters */}
              <div className="flex gap-2">
                {filters.featured && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    مميز
                  </span>
                )}
                {filters.bestSeller && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    الأعلى مبيعاً
                  </span>
                )}
                {filters.onSale && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    عرض
                  </span>
                )}
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                      viewMode === 'list' ? 'flex items-center' : ''
                    }`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : ''}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`object-cover ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
                      />
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {product.category && (
                          <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-blue-500">
                            {product.category}
                          </span>
                        )}
                        {product.isOnSale && product.discountPercentage && (
                          <span className="px-2 py-1 text-xs font-bold text-white rounded-full bg-red-500">
                            -{product.discountPercentage}%
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.isFeatured && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">مميز</span>
                        )}
                        {product.isBestSeller && (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">الأعلى مبيعاً</span>
                        )}
                        {product.isOnSale && (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">عرض</span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-xl font-bold" style={{ color: settings.primaryColor }}>
                            ${product.price}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        {settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? (
                          <a
                            href={generateWhatsAppMessage(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <ShoppingCart size={16} />
                            شراء
                          </a>
                        ) : (
                          <button
                            className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                            disabled
                          >
                            <ShoppingCart size={16} />
                            غير متاح
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4 text-gray-400">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">لم يتم العثور على منتجات</h3>
                <p className="text-gray-500">جرب تغيير معايير البحث أو الفلترة</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            {settings.logo && (
              <img src={settings.logo} alt="Logo" className="w-8 h-8 object-cover rounded" />
            )}
            <h3 className="text-lg font-bold">{settings.storeName}</h3>
          </div>
          <p className="text-gray-300 mb-4">{settings.description}</p>
          <p className="text-gray-400 text-sm">
            {settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
          </p>
        </div>
      </footer>
    </div>
  );
}