import React from 'react';
import { ArrowRight, Star, Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product, StoreData } from '../../types/store';

interface ProductDetailPageProps {
  product: Product;
  storeData: StoreData;
  relatedProducts?: Product[];
}

export default function ProductDetailPage({ product, storeData, relatedProducts = [] }: ProductDetailPageProps) {
  const { settings } = storeData;

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط المنتج!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: settings.fontFamily }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-10 h-10 object-cover rounded-lg" />
              )}
              <div>
                <h1 className="text-lg font-bold" style={{ color: settings.primaryColor }}>
                  {settings.storeName}
                </h1>
                <p className="text-sm text-gray-600">{settings.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg transition-colors"
              >
                <ArrowRight size={18} />
                العودة
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg transition-colors"
              >
                <Share2 size={18} />
                مشاركة
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.category && (
                  <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-blue-500 shadow-lg">
                    {product.category}
                  </span>
                )}
                {product.isOnSale && product.discountPercentage && (
                  <span className="px-3 py-1 text-sm font-bold text-white rounded-full bg-red-500 shadow-lg animate-pulse">
                    خصم {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Product Labels */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {product.isFeatured && (
                  <span className="px-3 py-1 text-sm font-bold text-white rounded-full bg-yellow-500 shadow-lg">
                    ⭐ مميز
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="px-3 py-1 text-sm font-bold text-white rounded-full bg-green-500 shadow-lg">
                    🏆 الأعلى مبيعاً
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating Stars */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(4.8) • 127 تقييم</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-black" style={{ color: settings.primaryColor }}>
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="flex flex-col">
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    وفر ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">وصف المنتج</h3>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">العلامات</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
              <div className="flex items-center gap-3 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">شحن مجاني</p>
                  <p className="text-sm text-gray-600">للطلبات فوق $50</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">ضمان الجودة</p>
                  <p className="text-sm text-gray-600">ضمان لمدة سنة</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">إرجاع مجاني</p>
                  <p className="text-sm text-gray-600">خلال 30 يوم</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber ? (
                <a
                  href={generateWhatsAppMessage(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg font-bold"
                >
                  <ShoppingCart size={24} />
                  اشتري الآن عبر الواتساب
                </a>
              ) : (
                <button
                  className="w-full flex items-center justify-center gap-3 bg-gray-400 text-white px-8 py-4 rounded-xl cursor-not-allowed text-lg font-bold"
                  disabled
                >
                  <ShoppingCart size={24} />
                  غير متاح للشراء
                </button>
              )}

              <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl transition-colors text-lg font-semibold">
                <Heart size={24} />
                إضافة للمفضلة
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">منتجات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => window.open(`product-${relatedProduct.id}.html`, '_blank')}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold" style={{ color: settings.primaryColor }}>
                        ${relatedProduct.price}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        عرض التفاصيل
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-6 mt-16">
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