import React from 'react';
import { ShoppingCart, Mail, Phone, MapPin, Star, Truck, Shield, Headphones, Heart, Check, Gift, Clock, ChevronDown, MessageCircle, Search, Globe, DollarSign } from 'lucide-react';
import { StoreData } from '../../types/store';
import { generateWhatsAppURL } from '../../utils/whatsapp';

interface StorePreviewProps {
  storeData: StoreData;
}

export default function StorePreview({ storeData }: StorePreviewProps) {
  const { settings, products } = storeData;

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

  const ProductCard = ({ product }: { product: any }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
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
              style={{ backgroundColor: settings.accentColor }}
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
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
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
          {settings.whatsapp.enabled ? (
            <a
              href={generateWhatsAppURL(product, settings)}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm ${
                settings.whatsapp.buttonStyle === 'whatsapp' ? 'bg-green-500' :
                settings.whatsapp.buttonStyle === 'primary' ? '' :
                settings.whatsapp.buttonStyle === 'secondary' ? '' :
                'bg-green-500'
              }`}
              style={{ 
                backgroundColor: settings.whatsapp.buttonStyle === 'whatsapp' ? '#25D366' :
                               settings.whatsapp.buttonStyle === 'primary' ? settings.primaryColor :
                               settings.whatsapp.buttonStyle === 'secondary' ? settings.secondaryColor :
                               '#25D366'
              }}
            >
              <MessageCircle size={16} />
              {settings.whatsapp.buttonText}
            </a>
          ) : (
            <button
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: settings.secondaryColor }}
            >
              أضف للسلة
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-auto bg-gray-50" style={{ fontFamily: settings.fontFamily }}>
      {/* Top Bar */}
      {settings.header.topBar.enabled && (
        <div 
          className="text-center py-2 text-sm"
          style={{ 
            backgroundColor: settings.header.topBar.backgroundColor,
            color: settings.header.topBar.textColor 
          }}
        >
          {settings.header.topBar.text}
        </div>
      )}

      {/* Announcement Bar */}
      {settings.header.announcement.enabled && (
        <div 
          className="text-center py-3 text-sm font-medium"
          style={{ 
            backgroundColor: settings.header.announcement.backgroundColor,
            color: settings.header.announcement.textColor 
          }}
        >
          {settings.header.announcement.text}
        </div>
      )}

      {/* Header */}
      <header 
        className={`${getHeaderClass()} py-6 px-6 ${settings.header.position === 'sticky' ? 'sticky top-0 z-40' : settings.header.position === 'fixed' ? 'fixed top-0 left-0 right-0 z-40' : ''}`} 
        style={{ 
          backgroundColor: settings.header.backgroundColor,
          color: settings.header.textColor 
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center ${
            settings.header.layout === 'centered' ? 'justify-center' :
            settings.header.layout === 'split' ? 'justify-between' :
            'justify-between'
          }`}>
            <div className={`flex items-center gap-4 ${
              settings.header.logoPosition === 'center' ? 'justify-center flex-1' :
              settings.header.logoPosition === 'right' ? 'order-2' :
              ''
            }`}>
              {settings.logo && (
                <img 
                  src={settings.logo} 
                  alt="Logo" 
                  className={`object-cover rounded ${
                    settings.header.logoSize === 'small' ? 'w-8 h-8' :
                    settings.header.logoSize === 'large' ? 'w-16 h-16' :
                    'w-12 h-12'
                  }`} 
                />
              )}
              <div>
                <h1 className="text-2xl font-bold">{settings.storeName}</h1>
                <p className="text-sm opacity-90">{settings.description}</p>
              </div>
            </div>
            
            {/* Navigation */}
            {settings.header.navigation.length > 0 && (
              <nav className={`hidden md:flex items-center gap-6 ${
                settings.header.logoPosition === 'center' ? 'absolute left-6' :
                settings.header.logoPosition === 'right' ? 'order-1' :
                ''
              }`}>
                {settings.header.navigation
                  .filter(item => item.isVisible)
                  .sort((a, b) => a.order - b.order)
                  .map((item) => (
                    <a
                      key={item.id}
                      href={item.url || '#'}
                      className="hover:opacity-75 transition-opacity"
                    >
                      {item.label}
                    </a>
                  ))}
              </nav>
            )}
            
            <div className={`flex items-center gap-4 ${
              settings.header.logoPosition === 'center' ? 'absolute right-6' :
              settings.header.logoPosition === 'right' ? 'order-1' :
              ''
            }`}>
              {settings.header.showSearch && (
                <button className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full">
                  <Search size={20} />
                </button>
              )}
              {settings.header.showLanguage && (
                <button className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full">
                  <Globe size={20} />
                </button>
              )}
              {settings.header.showCurrency && (
                <button className="p-2 hover:bg-black hover:bg-opacity-10 rounded-full">
                  <DollarSign size={20} />
                </button>
              )}
              {!settings.whatsapp.enabled && (
                <ShoppingCart size={24} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {settings.heroSection.enabled && (
        <section 
          className={`relative px-6 text-white ${
            settings.heroSection.textAlignment === 'left' ? 'text-left' :
            settings.heroSection.textAlignment === 'right' ? 'text-right' :
            'text-center'
          } ${
            settings.heroSection.height === 'small' ? 'py-12' :
            settings.heroSection.height === 'large' ? 'py-32' :
            settings.heroSection.height === 'fullscreen' ? 'min-h-screen flex items-center' :
            'py-20'
          }`}
          style={{
            backgroundImage: settings.heroSection.backgroundType === 'image' && settings.heroSection.backgroundImage
              ? `linear-gradient(rgba(0,0,0,${settings.heroSection.overlayOpacity / 100}), rgba(0,0,0,${settings.heroSection.overlayOpacity / 100})), url(${settings.heroSection.backgroundImage})`
              : settings.heroSection.backgroundType === 'gradient'
              ? `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
              : 'none',
            backgroundColor: settings.heroSection.backgroundType === 'gradient' ? 'transparent' : settings.primaryColor,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${
              settings.heroSection.animation === 'fadeIn' ? 'animate-fade-in' :
              settings.heroSection.animation === 'slideUp' ? 'animate-slide-up' :
              settings.heroSection.animation === 'slideDown' ? 'animate-slide-down' :
              ''
            }`}>{settings.heroSection.title}</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">{settings.heroSection.subtitle}</p>
            <a
              href={settings.heroSection.ctaLink}
              className={`inline-block px-8 py-4 text-lg font-semibold rounded-lg hover:opacity-90 transition-opacity ${
                settings.heroSection.ctaStyle === 'outline' ? 'border-2 bg-transparent' :
                settings.heroSection.ctaStyle === 'secondary' ? '' :
                ''
              }`}
              style={{ 
                backgroundColor: settings.heroSection.ctaStyle === 'outline' ? 'transparent' :
                               settings.heroSection.ctaStyle === 'secondary' ? settings.secondaryColor :
                               settings.accentColor,
                borderColor: settings.heroSection.ctaStyle === 'outline' ? settings.accentColor : 'transparent'
              }}
            >
              {settings.heroSection.ctaText}
            </a>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Featured Products */}
        {settings.productSections.featured.enabled && featuredProducts.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: settings.primaryColor }}>
                {settings.productSections.featured.title}
              </h2>
              <p className="text-gray-600">{settings.productSections.featured.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: settings.accentColor }}></div>
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
              <h2 className="text-3xl font-bold mb-2" style={{ color: settings.primaryColor }}>
                {settings.productSections.bestSellers.title}
              </h2>
              <p className="text-gray-600">{settings.productSections.bestSellers.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: settings.accentColor }}></div>
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
              <h2 className="text-3xl font-bold mb-2" style={{ color: settings.primaryColor }}>
                {settings.productSections.onSale.title}
              </h2>
              <p className="text-gray-600">{settings.productSections.onSale.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: settings.accentColor }}></div>
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
          <h2 className="text-3xl font-bold text-center mb-2" style={{ color: settings.primaryColor }}>
            جميع المنتجات
          </h2>
          <p className="text-center text-gray-600">تصفح مجموعتنا الكاملة من المنتجات</p>
          <div className="w-24 h-1 mx-auto rounded" style={{ backgroundColor: settings.accentColor }}></div>
        </div>

        {products.length > 0 ? (
          <div className={`grid ${getLayoutClass()} gap-6`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
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

      {/* Why Choose Us Section */}
      {settings.whyChooseUs.enabled && settings.whyChooseUs.items.length > 0 && (
        <section 
          className="py-16"
          style={{ 
            backgroundColor: settings.whyChooseUs.backgroundColor,
            color: settings.whyChooseUs.textColor 
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">
                {settings.whyChooseUs.title}
              </h2>
              <p className="opacity-75">{settings.whyChooseUs.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: settings.accentColor }}></div>
            </div>
            <div className={`grid gap-8 ${
              settings.whyChooseUs.layout === 'horizontal' ? 'grid-cols-1 md:grid-cols-3' :
              settings.whyChooseUs.layout === 'vertical' ? 'grid-cols-1' :
              `grid-cols-1 md:grid-cols-2 lg:grid-cols-${settings.whyChooseUs.columns}`
            }`}>
              {settings.whyChooseUs.items.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <div key={item.id} className="text-center">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${settings.primaryColor}20` }}
                    >
                      <Icon size={32} style={{ color: settings.primaryColor }} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="opacity-75">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {settings.faq.enabled && settings.faq.items.length > 0 && (
        <section 
          className="py-16"
          style={{ backgroundColor: settings.faq.backgroundColor }}
        >
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2" style={{ color: settings.primaryColor }}>
                {settings.faq.title}
              </h2>
              <p className="text-gray-600">{settings.faq.subtitle}</p>
              <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: settings.accentColor }}></div>
            </div>
            <div className={`${
              settings.faq.style === 'cards' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' :
              settings.faq.style === 'tabs' ? 'flex flex-col' :
              'space-y-4'
            }`}>
              {settings.faq.items.map((item, index) => (
                <FAQItem 
                  key={item.id} 
                  item={item} 
                  primaryColor={settings.primaryColor}
                  style={settings.faq.style}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

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

// FAQ Item Component with Accordion
function FAQItem({ item, primaryColor }: { item: any; primaryColor: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-right flex justify-between items-center hover:bg-gray-50 transition-colors"
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
          <p className="text-gray-600">{item.answer}</p>
        </div>
      )}
    </div>
  );
}