import React from 'react';
import { Mail, Phone, MapPin, Star, Truck, Shield, Headphones, Heart, Check, Gift, Clock, ChevronDown, MessageCircle, Package } from 'lucide-react';
import { StoreData, getThemeById } from '../../types/store';
import { getHeaderComponent, getFooterComponent, getHeroComponent, getAboutComponent, getFeaturesComponent, getFAQComponent } from '../../utils/componentRegistry';

interface StorePreviewProps {
  storeData: StoreData;
}

export default function StorePreview({ storeData }: StorePreviewProps) {
  const { settings, products } = storeData;
  const currentTheme = getThemeById(settings.themeId);
  
  const HeaderComponent = getHeaderComponent(settings.headerTemplate).component;
  const FooterComponent = getFooterComponent(settings.footerTemplate).component;
  const HeroComponent = getHeroComponent(settings.heroTemplate).component;
  const AboutComponent = getAboutComponent(settings.aboutTemplate).component;
  const FeaturesComponent = getFeaturesComponent(settings.featuresTemplate).component;
  const FAQComponent = getFAQComponent(settings.faqTemplate).component;

  const getIcon = (iconName: string) => {
    const icons = {
      truck: Truck,
      shield: Shield,
      headphones: Headphones,
      star: Star,
      heart: Heart,
      check: Check,
      gift: Gift,
      clock: Clock,
    };
    return icons[iconName as keyof typeof icons] || Star;
  };

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, settings.productSections.featured.limit);
  const bestSellerProducts = products.filter(p => p.isBestSeller).slice(0, settings.productSections.bestSellers.limit);
  const onSaleProducts = products.filter(p => p.isOnSale).slice(0, settings.productSections.onSale.limit);

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


  const generateWhatsAppMessage = (product: any) => {
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

  const ProductCard = ({ product }: { product: any }) => (
    <div 
      className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
      style={{ backgroundColor: currentTheme.palette.surface }}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.category && (
            <span 
              className="px-2 py-1 text-xs font-medium text-white rounded-full"
              style={{ backgroundColor: currentTheme.palette.accent }}
            >
              {product.category}
            </span>
          )}
          {product.isOnSale && product.discountPercentage && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
              -{product.discountPercentage}%
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-sm mb-3 line-clamp-2" style={{ color: currentTheme.palette.textSecondary }}>{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-lg font-bold" style={{ color: currentTheme.palette.primary }}>
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
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all duration-200 flex items-center gap-2 hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={16} />
              شراء الآن
            </a>
          ) : (
            <button
              className="px-4 py-2 text-white rounded-lg opacity-50 cursor-not-allowed"
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

  return (
    <div 
      className="h-full overflow-auto" 
      style={{ 
        fontFamily: settings.fontFamily,
        backgroundColor: currentTheme.palette.background,
        color: currentTheme.palette.text,
        '--primary-color': currentTheme.palette.primary,
        '--secondary-color': currentTheme.palette.secondary,
        '--accent-color': currentTheme.palette.accent,
        '--text-color': currentTheme.palette.text,
        '--text-secondary': currentTheme.palette.textSecondary,
        '--background-color': currentTheme.palette.background,
        '--surface-color': currentTheme.palette.surface,
        '--border-color': currentTheme.palette.border,
        '--success-color': currentTheme.palette.success,
        '--warning-color': currentTheme.palette.warning,
        '--error-color': currentTheme.palette.error
      } as React.CSSProperties}
    >
      {/* Header */}
      <HeaderComponent settings={settings} customPages={storeData.customPages} />

      {/* Hero Section */}
      <HeroComponent settings={settings} />

      {/* About Section */}
      <AboutComponent settings={settings} />

      {/* Why Choose Us Section */}
      <FeaturesComponent settings={settings} />

      {/* FAQ Section */}
      <FAQComponent settings={settings} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6" style={{ backgroundColor: currentTheme.palette.background }}>
        {/* Featured Products */}
        {settings.productSections.featured.enabled && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.palette.primary }}>
                {settings.productSections.featured.title}
              </h2>
              <p style={{ color: currentTheme.palette.textSecondary }}>{settings.productSections.featured.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
            </div>
            {featuredProducts.length > 0 ? (
              <div className={`grid ${getLayoutClass()} gap-6`}>
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد منتجات مميزة بعد</h3>
                <p className="text-gray-500">أضف منتجات وحدد "منتج مميز" لتظهر هنا</p>
              </div>
            )}
            
            {/* View More Button */}
            {featuredProducts.length > 0 && (
              <div className="text-center mt-8">
                <button 
                  onClick={() => window.open('/products?filter=featured', '_blank')}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: `${currentTheme.palette.primary}10`,
                    color: currentTheme.palette.primary,
                    border: `2px solid ${currentTheme.palette.primary}20`
                  }}
                >
                  <span>عرض جميع المنتجات المميزة</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            )}
          </section>
        )}

        {/* Best Sellers */}
        {settings.productSections.bestSellers.enabled && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.palette.primary }}>
                {settings.productSections.bestSellers.title}
              </h2>
              <p style={{ color: currentTheme.palette.textSecondary }}>{settings.productSections.bestSellers.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
            </div>
            {bestSellerProducts.length > 0 ? (
              <div className={`grid ${getLayoutClass()} gap-6`}>
                {bestSellerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد منتجات من الأعلى مبيعاً بعد</h3>
                <p className="text-gray-500">أضف منتجات وحدد "الأعلى مبيعاً" لتظهر هنا</p>
              </div>
            )}
            
            {/* View More Button */}
            {bestSellerProducts.length > 0 && (
              <div className="text-center mt-8">
                <button 
                  onClick={() => window.open('/products?filter=bestsellers', '_blank')}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: `${currentTheme.palette.secondary}10`,
                    color: currentTheme.palette.secondary,
                    border: `2px solid ${currentTheme.palette.secondary}20`
                  }}
                >
                    <span>عرض جميع الأعلى مبيعاً</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
              </div>
            )}
          </section>
        )}

        {/* On Sale Products */}
        {settings.productSections.onSale.enabled && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.palette.primary }}>
                {settings.productSections.onSale.title}
              </h2>
              <p style={{ color: currentTheme.palette.textSecondary }}>{settings.productSections.onSale.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
            </div>
            {onSaleProducts.length > 0 ? (
              <div className={`grid ${getLayoutClass()} gap-6`}>
                {onSaleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <Package size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد منتجات بعروض وتخفيضات بعد</h3>
                <p className="text-gray-500">أضف منتجات وحدد "عليه عرض/تخفيض" لتظهر هنا</p>
              </div>
            )}
            
            {/* View More Button */}
            {onSaleProducts.length > 0 && (
              <div className="text-center mt-8">
                <button 
                  onClick={() => window.open('/products?filter=onsale', '_blank')}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: `${currentTheme.palette.accent}10`,
                    color: currentTheme.palette.accent,
                    border: `2px solid ${currentTheme.palette.accent}20`
                  }}
                >
                  <span>عرض جميع العروض والتخفيضات</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <FooterComponent settings={settings} customPages={storeData.customPages} />
    </div>
  );
}