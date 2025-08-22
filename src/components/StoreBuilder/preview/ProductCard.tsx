import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Product, StoreSettings, PredefinedTheme } from '../../../types/store';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  currentTheme: PredefinedTheme;
}

export default function ProductCard({ product, settings, currentTheme }: ProductCardProps) {
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
    <div 
      className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-2"
      style={{ backgroundColor: currentTheme.palette.surface }}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.category && (
            <span 
              className="px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg"
              style={{ backgroundColor: currentTheme.palette.accent }}
            >
              {product.category}
            </span>
          )}
          {product.isOnSale && product.discountPercentage && (
            <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-pulse">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Product Labels */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {product.isFeatured && (
            <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-full">
              ⭐ مميز
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-green-500 text-white px-2 py-1 text-xs font-bold rounded-full">
              🏆 الأعلى مبيعاً
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
              🔥 عرض
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-opacity-80 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-black" style={{ color: currentTheme.palette.primary }}>
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
              className="px-6 py-3 text-white rounded-xl hover:opacity-90 transition-all duration-200 flex items-center gap-2 hover:scale-105 shadow-lg font-bold"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={18} />
              شراء الآن
            </a>
          ) : (
            <button
              className="px-6 py-3 text-white rounded-xl opacity-50 cursor-not-allowed shadow-lg"
              style={{ backgroundColor: currentTheme.palette.secondary }}
              disabled
            >
              غير متاح
            </button>
          )}
        </div>
      </div>
    </div>
  );
}