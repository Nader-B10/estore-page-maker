import React from 'react';
import { ShoppingCart, Mail, Phone, MapPin } from 'lucide-react';
import { StoreData } from '../../types/store';

interface StorePreviewProps {
  storeData: StoreData;
}

export default function StorePreview({ storeData }: StorePreviewProps) {
  const { settings, products } = storeData;

  const getLayoutClass = () => {
    switch (settings.layout) {
      case 'list':
        return 'grid-cols-1';
      case 'masonry':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  const getHeaderClass = () => {
    switch (settings.headerStyle) {
      case 'modern':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 text-white';
      case 'minimal':
        return 'bg-white border-b border-gray-200 text-gray-800';
      default:
        return 'bg-gray-900 text-white';
    }
  };

  return (
    <div className="h-full overflow-auto bg-gray-50" style={{ fontFamily: settings.fontFamily }}>
      {/* Header */}
      <header className={`${getHeaderClass()} py-6 px-6`} style={{ backgroundColor: settings.primaryColor }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-12 h-12 object-cover rounded" />
              )}
              <div>
                <h1 className="text-2xl font-bold">{settings.storeName}</h1>
                <p className="text-sm opacity-90">{settings.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShoppingCart size={24} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2" style={{ color: settings.primaryColor }}>
            منتجاتنا
          </h2>
          <div className="w-24 h-1 mx-auto rounded" style={{ backgroundColor: settings.accentColor }}></div>
        </div>

        {products.length > 0 ? (
          <div className={`grid ${getLayoutClass()} gap-6`}>
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.category && (
                    <span 
                      className="absolute top-2 right-2 px-2 py-1 text-xs font-medium text-white rounded-full"
                      style={{ backgroundColor: settings.accentColor }}
                    >
                      {product.category}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold" style={{ color: settings.primaryColor }}>
                      ${product.price}
                    </span>
                    <button
                      className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: settings.secondaryColor }}
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingCart size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد منتجات بعد</h3>
            <p className="text-gray-500">ابدأ بإضافة منتجات إلى متجرك</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">معلومات الاتصال</h3>
              <div className="space-y-2">
                {settings.contactInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    <span>{settings.contactInfo.email}</span>
                  </div>
                )}
                {settings.contactInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{settings.contactInfo.phone}</span>
                  </div>
                )}
                {settings.contactInfo.address && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{settings.contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">حول المتجر</h3>
              <p className="text-sm text-gray-300">{settings.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">روابط سريعة</h3>
              <div className="space-y-1">
                <a href="#" className="block text-sm text-gray-300 hover:text-white">الرئيسية</a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white">المنتجات</a>
                <a href="#" className="block text-sm text-gray-300 hover:text-white">اتصل بنا</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-4 text-center">
            <p className="text-sm text-gray-400">
              {settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}