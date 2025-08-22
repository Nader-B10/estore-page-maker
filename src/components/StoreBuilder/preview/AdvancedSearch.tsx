import React, { useState, useMemo } from 'react';
import { Search, Filter, X, SlidersHorizontal, Mic } from 'lucide-react';
import { Product, StoreSettings, Category, SearchFilters, SortOption } from '../../../types';

interface AdvancedSearchProps {
  products: Product[];
  categories: Category[];
  settings: StoreSettings;
  onProductsFiltered: (products: Product[]) => void;
}

export default function AdvancedSearch({ 
  products, 
  categories, 
  settings, 
  onProductsFiltered 
}: AdvancedSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    priceRange: [0, 1000],
    rating: 0,
    availability: 'all',
    tags: []
  });

  const { searchSettings } = settings;

  // خيارات الترتيب
  const sortOptions: SortOption[] = [
    { id: 'name', label: 'الاسم (أ-ي)', field: 'name', direction: 'asc' },
    { id: 'name-desc', label: 'الاسم (ي-أ)', field: 'name', direction: 'desc' },
    { id: 'price-low', label: 'السعر (الأقل أولاً)', field: 'price', direction: 'asc' },
    { id: 'price-high', label: 'السعر (الأعلى أولاً)', field: 'price', direction: 'desc' },
    { id: 'newest', label: 'الأحدث', field: 'date', direction: 'desc' },
    { id: 'rating', label: 'الأعلى تقييماً', field: 'rating', direction: 'desc' }
  ];

  // فلترة وترتيب المنتجات
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // البحث النصي
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => {
        let score = 0;
        
        searchSettings.searchFields.forEach(field => {
          if (!field.enabled) return;
          
          let fieldValue = '';
          switch (field.field) {
            case 'name':
              fieldValue = product.name.toLowerCase();
              break;
            case 'description':
              fieldValue = product.description.toLowerCase();
              break;
            case 'category':
              fieldValue = product.category?.toLowerCase() || '';
              break;
            case 'tags':
              fieldValue = product.tags.join(' ').toLowerCase();
              break;
          }
          
          if (fieldValue.includes(term)) {
            score += field.weight;
          }
        });
        
        return score > 0;
      });
    }

    // فلتر الفئات
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // فلتر السعر
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // فلتر التوفر
    if (filters.availability === 'onSale') {
      filtered = filtered.filter(product => product.isOnSale);
    }

    // الترتيب
    const currentSort = sortOptions.find(opt => opt.id === sortBy);
    if (currentSort) {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (currentSort.field) {
          case 'name':
            aValue = a.name;
            bValue = b.name;
            break;
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'date':
            aValue = a.id; // استخدام ID كبديل للتاريخ
            bValue = b.id;
            break;
          default:
            return 0;
        }
        
        if (currentSort.direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filtered;
  }, [products, searchTerm, filters, sortBy, searchSettings]);

  // تحديث النتائج
  React.useEffect(() => {
    onProductsFiltered(filteredProducts);
  }, [filteredProducts, onProductsFiltered]);

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 1000],
      rating: 0,
      availability: 'all',
      tags: []
    });
    setSearchTerm('');
  };

  if (!searchSettings.enabled) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {/* Search Bar */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={searchSettings.placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          {searchSettings.enableVoiceSearch && (
            <button className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <Mic size={20} />
            </button>
          )}
        </div>

        {searchSettings.enableFilters && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
              showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter size={20} />
            فلاتر
          </button>
        )}

        {searchSettings.enableSorting && (
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && searchSettings.enableFilters && (
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-800">فلاتر متقدمة</h4>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
              <X size={16} />
              مسح الفلاتر
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">الفئات</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {categories.filter(cat => cat.isVisible).map(category => (
                  <label key={category.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(prev => ({
                            ...prev,
                            categories: [...prev.categories, category.name]
                          }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            categories: prev.categories.filter(c => c !== category.name)
                          }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2">نطاق السعر</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="من"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [Number(e.target.value), prev.priceRange[1]] 
                  }))}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="إلى"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: [prev.priceRange[0], Number(e.target.value)] 
                  }))}
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium mb-2">التوفر</label>
              <select
                value={filters.availability}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  availability: e.target.value as any 
                }))}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="all">جميع المنتجات</option>
                <option value="onSale">العروض فقط</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.categories.length > 0 || filters.availability !== 'all' || searchTerm) && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
              
              {searchTerm && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1">
                  بحث: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}>
                    <X size={14} />
                  </button>
                </span>
              )}
              
              {filters.categories.map(category => (
                <span key={category} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-1">
                  {category}
                  <button onClick={() => setFilters(prev => ({
                    ...prev,
                    categories: prev.categories.filter(c => c !== category)
                  }))}>
                    <X size={14} />
                  </button>
                </span>
              ))}
              
              {filters.availability !== 'all' && (
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center gap-1">
                  {filters.availability === 'onSale' ? 'عروض فقط' : filters.availability}
                  <button onClick={() => setFilters(prev => ({ ...prev, availability: 'all' }))}>
                    <X size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Results Info */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <span>
          عرض {filteredProducts.length} من أصل {products.length} منتج
        </span>
        {searchTerm && (
          <span>
            نتائج البحث عن: "<strong>{searchTerm}</strong>"
          </span>
        )}
      </div>
    </div>
  );
}