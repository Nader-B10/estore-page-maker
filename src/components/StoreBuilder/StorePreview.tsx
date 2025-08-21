import React from 'react';
import { Mail, Phone, MapPin, Star, Truck, Shield, Headphones, Heart, Check, Gift, Clock, ChevronDown, MessageCircle, Package } from 'lucide-react';
import { StoreData, getThemeById } from '../../types/store';
import { getHeaderComponent, getFooterComponent } from '../../utils/componentRegistry';

interface StorePreviewProps {
  storeData: StoreData;
}

export default function StorePreview({ storeData }: StorePreviewProps) {
  const { settings, products } = storeData;
  const currentTheme = getThemeById(settings.themeId);
  
  const HeaderComponent = getHeaderComponent(settings.headerTemplate).component;
  const FooterComponent = getFooterComponent(settings.footerTemplate).component;

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
            <span className="text-xl font-bold" style={{ color: currentTheme.palette.primary }}>
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm line-through" style={{ color: currentTheme.palette.textSecondary }}>
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
      {settings.heroSection.enabled && (
        <section 
          className="relative py-20 px-6 text-white text-center"
          style={{
            backgroundImage: settings.heroSection.backgroundImage 
              ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${settings.heroSection.backgroundImage})`
              : `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">{settings.heroSection.title}</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">{settings.heroSection.subtitle}</p>
            <a
              href={settings.heroSection.ctaLink}
              className="inline-block px-8 py-4 text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity text-white"
              style={{ backgroundColor: currentTheme.palette.accent }}
            >
              {settings.heroSection.ctaText}
            </a>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6" style={{ backgroundColor: currentTheme.palette.background }}>
        {/* Featured Products */}
        {settings.productSections.featured.enabled && featuredProducts.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.palette.primary }}>
                {settings.productSections.featured.title}
              </h2>
              <p style={{ color: currentTheme.palette.textSecondary }}>{settings.productSections.featured.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
            </div>
            <div className={`grid ${getLayoutClass()} gap-6`}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers */}
        {settings.productSections.bestSellers.enabled && bestSellerProducts.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.palette.primary }}>
                {settings.productSections.bestSellers.title}
              </h2>
              <p style={{ color: currentTheme.palette.textSecondary }}>{settings.productSections.bestSellers.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
            </div>
            <div className={`grid ${getLayoutClass()} gap-6`}>
              {bestSellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* On Sale Products */}
        {settings.productSections.onSale.enabled && onSaleProducts.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.palette.primary }}>
                {settings.productSections.onSale.title}
              </h2>
              <p style={{ color: currentTheme.palette.textSecondary }}>{settings.productSections.onSale.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
            </div>
            <div className={`grid ${getLayoutClass()} gap-6`}>
              {onSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-2" style={{ color: currentTheme.palette.primary }}>
            جميع المنتجات
          </h2>
          <p className="text-center" style={{ color: currentTheme.palette.textSecondary }}>تصفح مجموعتنا الكاملة من المنتجات</p>
          <div className="w-24 h-1 mx-auto rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
        </div>

        {products.length > 0 ? (
          <div className={`grid ${getLayoutClass()} gap-6`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4" style={{ color: currentTheme.palette.textSecondary }}>
              <Package size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: currentTheme.palette.textSecondary }}>لا توجد منتجات بعد</h3>
            <p style={{ color: currentTheme.palette.textSecondary }}>ابدأ بإضافة منتجات إلى متجرك</p>
          </div>
        )}
      </main>

      {/* Why Choose Us Section */}
      {settings.whyChooseUs.enabled && settings.whyChooseUs.items.length > 0 && (
        <section className="py-16" style={{ backgroundColor: currentTheme.palette.surface }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.palette.primary }}>
                {settings.whyChooseUs.title}
              </h2>
              <p style={{ color: currentTheme.palette.textSecondary }}>{settings.whyChooseUs.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {settings.whyChooseUs.items.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={item.id} className="text-center">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${currentTheme.palette.primary}20` }}
                    >
                      <Icon size={32} style={{ color: currentTheme.palette.primary }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p style={{ color: currentTheme.palette.textSecondary }}>{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {settings.faq.enabled && settings.faq.items.length > 0 && (
        <section className="py-16" style={{ backgroundColor: currentTheme.palette.background }}>
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2" style={{ color: currentTheme.palette.primary }}>
                {settings.faq.title}
              </h2>
              <p style={{ color: currentTheme.palette.textSecondary }}>{settings.faq.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: currentTheme.palette.accent }}></div>
            </div>
            <div className="space-y-4">
              {settings.faq.items.map((item) => (
                <FAQItem key={item.id} item={item} primaryColor={settings.primaryColor} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}



      <FooterComponent settings={settings} customPages={storeData.customPages} />
    </div>
  );
}

// FAQ Item Component with Accordion
function FAQItem({ item, primaryColor }: { item: any; primaryColor: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="rounded-lg shadow-sm border" style={{ 
      backgroundColor: 'var(--surface-color)', 
      borderColor: 'var(--border-color)' 
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-right flex justify-between items-center hover:opacity-80 transition-colors"
      >
        <span className="font-medium">{item.question}</span>
        <ChevronDown 
          size={20} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: primaryColor }}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p style={{ color: 'var(--text-secondary)' }}>{item.answer}</p>
        </div>
      )}
    </div>
  );
}