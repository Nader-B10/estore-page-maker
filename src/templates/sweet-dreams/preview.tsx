/**
 * مكونات المعاينة لقالب Sweet Dreams
 * مكونات React مخصصة لعرض قالب Sweet Dreams في المعاينة
 */

import React from 'react';
import { TemplatePreviewComponents } from '../../types/template';
import { StoreSettings, Product } from '../../types/store';
import { MessageCircle, Heart, Star, Gift } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

// مكون الهيدر لقالب Sweet Dreams
const SweetDreamsHeader: React.FC<{ settings: StoreSettings }> = ({ settings }) => {
  const { storeData } = useStore();
  const { whatsappSettings } = storeData;
  const { header } = settings.sections;

  if (!header.enabled) return null;

  return (
    <header className="bg-gradient-to-r from-pink-50 to-blue-50 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {settings.logo && <img src={settings.logo} alt="Logo" className="h-12" />}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {settings.storeName}
              </h1>
              <p className="text-sm text-gray-600">{settings.description}</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            {header.data.links.map(link => (
              <a key={link.id} href={link.link} className="text-gray-600 hover:text-pink-600 font-medium relative group">
                {link.text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="relative cursor-pointer text-pink-600">
              <MessageCircle size={24} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// مكون البطل لقالب Sweet Dreams
const SweetDreamsHero: React.FC<{ settings: StoreSettings }> = ({ settings }) => {
  const { hero } = settings.sections;

  if (!hero.enabled) return null;

  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-blue-50 min-h-[80vh] flex items-center">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {hero.data.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {hero.data.subtitle}
            </p>
            <div className="flex gap-4 flex-wrap">
              <a
                href={hero.data.ctaLink}
                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {hero.data.ctaText}
              </a>
              <a
                href="#products"
                className="border-2 border-pink-600 text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-pink-600 hover:text-white transition-all duration-300"
              >
                تصفح المنتجات
              </a>
            </div>
          </div>
          <div className="relative">
            {hero.data.backgroundImage ? (
              <img 
                src={hero.data.backgroundImage} 
                alt="Hero Image" 
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-gray-600">صورة المنتج الرئيسي</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// مكون لماذا تختارنا لقالب Sweet Dreams
const SweetDreamsWhyChooseUs: React.FC<{ settings: StoreSettings }> = ({ settings }) => {
  const { whyChooseUs } = settings.sections;

  if (!whyChooseUs.enabled) return null;

  const iconMap: { [key: string]: React.ElementType } = {
    heart: Heart,
    star: Star,
    gift: Gift,
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">{whyChooseUs.data.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{whyChooseUs.data.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.data.items.map((item, index) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <div 
                key={item.id} 
                className="text-center p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// مكون المنتجات لقالب Sweet Dreams
const SweetDreamsProductSection: React.FC<{
  title: string;
  subtitle: string;
  products: Product[];
  settings: StoreSettings;
}> = ({ title, subtitle, products, settings }) => {
  const { storeData } = useStore();
  const { whatsappSettings } = storeData;

  return (
    <section className="py-16 bg-gray-50" id="products">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="relative overflow-hidden h-64">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.isOnSale && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
                    Sale
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-pink-600">${product.price}</span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => {
                    if (whatsappSettings.enabled) {
                      const message = whatsappSettings.messageTemplate
                        .replace('{productName}', product.name)
                        .replace('{price}', product.price.toString())
                        .replace('{description}', product.description)
                        .replace('{storeName}', settings.storeName);
                      const whatsappUrl = `https://wa.me/${whatsappSettings.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// مكون الأسئلة الشائعة لقالب Sweet Dreams
const SweetDreamsFAQ: React.FC<{ settings: StoreSettings }> = ({ settings }) => {
  const { faq } = settings.sections;

  if (!faq.enabled) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">{faq.data.title}</h2>
          <p className="text-xl text-gray-600">{faq.data.subtitle}</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faq.data.items.map(item => (
            <div key={item.id} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold text-lg mb-2 text-gray-800">{item.question}</h4>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// مكون الشهادات لقالب Sweet Dreams
const SweetDreamsTestimonials: React.FC<{ settings: StoreSettings }> = ({ settings }) => {
  const testimonials = [
    { name: 'سارة أحمد', text: 'كيكة رائعة ولذيذة جداً! أفضل متجر كيك جربته', rating: 5 },
    { name: 'محمد علي', text: 'خدمة ممتازة وجودة عالية، أنصح بشدة', rating: 5 },
    { name: 'فاطمة خالد', text: 'تصاميم إبداعية وطعم لا يُقاوم', rating: 5 }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">ماذا يقول عملاؤنا</h2>
          <p className="text-xl text-gray-600">آراء حقيقية من عملاء حقيقيين</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-lg text-center">
                <div className="text-orange-500 text-2xl mb-4">
                  {'★'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-600 italic mb-6 text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-800">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// مكون دعوة للعمل لقالب Sweet Dreams
const SweetDreamsCTA: React.FC<{ settings: StoreSettings }> = ({ settings }) => {
  return (
    <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">جاهز لطلب كيكة أحلامك؟</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          دعنا ننشئ شيئاً مميزاً لاحتفالك القادم
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#products"
            className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            تصفح الكيكات
          </a>
          <a
            href={`tel:${settings.contactInfo.phone}`}
            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300"
          >
            اتصل بنا الآن
          </a>
        </div>
      </div>
    </section>
  );
};

// مكون الفوتر لقالب Sweet Dreams
const SweetDreamsFooter: React.FC<{ settings: StoreSettings }> = ({ settings }) => {
  const { footer } = settings.sections;

  if (!footer.enabled) return null;

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">{settings.storeName}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">{settings.description}</p>
            <div className="flex gap-4">
              {footer.data.socialLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
                >
                  <MessageCircle size={20} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {settings.sections.header.data.links.map(link => (
                <li key={link.id}>
                  <a href={link.link} className="text-gray-300 hover:text-white transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-2 text-gray-300">
              {footer.data.contactInfo.email && (
                <p>البريد: <a href={`mailto:${footer.data.contactInfo.email}`} className="text-pink-400 hover:text-pink-300">{footer.data.contactInfo.email}</a></p>
              )}
              {footer.data.contactInfo.phone && <p>الهاتف: {footer.data.contactInfo.phone}</p>}
              {footer.data.contactInfo.address && <p>العنوان: {footer.data.contactInfo.address}</p>}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{footer.data.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export const previewComponents: TemplatePreviewComponents = {
  Header: SweetDreamsHeader,
  Footer: SweetDreamsFooter,
  Hero: SweetDreamsHero,
  ProductSection: SweetDreamsProductSection,
  WhyChooseUs: SweetDreamsWhyChooseUs,
  FAQ: SweetDreamsFAQ,
  Testimonials: SweetDreamsTestimonials,
  CTA: SweetDreamsCTA,
};