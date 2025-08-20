export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface StoreSettings {
  storeName: string;
  description: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  layout: 'grid' | 'list' | 'masonry';
  headerStyle: 'classic' | 'modern' | 'minimal';
  footerText: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface StoreData {
  settings: StoreSettings;
  products: Product[];
}