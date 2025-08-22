export interface SearchSettings {
  enabled: boolean;
  placeholder: string;
  showSuggestions: boolean;
  enableVoiceSearch: boolean;
  searchFields: SearchField[];
  resultsPerPage: number;
  enableFilters: boolean;
  enableSorting: boolean;
}

export interface SearchField {
  field: 'name' | 'description' | 'category' | 'tags';
  enabled: boolean;
  weight: number; // للترجيح في النتائج
}

export interface SearchFilters {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  availability: 'all' | 'inStock' | 'onSale';
  tags: string[];
}

export interface SortOption {
  id: string;
  label: string;
  field: 'name' | 'price' | 'rating' | 'date' | 'popularity';
  direction: 'asc' | 'desc';
}