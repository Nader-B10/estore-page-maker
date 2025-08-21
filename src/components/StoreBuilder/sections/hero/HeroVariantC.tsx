import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, ShoppingBag, Truck, Shield, Clock } from 'lucide-react';

interface HeroVariantCProps {
  settings: StoreSettings;
}

export default function HeroVariantC({ settings }: HeroVariantCProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section 
      className="relative py-24 px-6 text-white overflow-hidden"
      style={{
        background: heroSection.backgroundImage 
          ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroSection.backgroundImage})`
          : `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <ShoppingBag size={20} />
            <span className="font-semibold">متجر إلكتروني موثوق</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            {heroSection.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {heroSection.subtitle}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Truck size={32} className="mx-auto mb-3 text-blue-300" />
              <h3 className="font-bold mb-2">شحن مجاني</h3>
              <p className="text-sm opacity-80">توصيل مجاني لجميع الطلبات</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Shield size={32} className="mx-auto mb-3 text-green-300" />
              <h3 className="font-bold mb-2">ضمان الجودة</h3>
              <p className="text-sm opacity-80">منتجات أصلية مضمونة</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Clock size={32} className="mx-auto mb-3 text-yellow-300" />
              <h3 className="font-bold mb-2">دعم 24/7</h3>
              <p className="text-sm opacity-80">خدمة عملاء متاحة دائماً</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={heroSection.ctaLink}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
              style={{ backgroundColor: settings.accentColor }}
            >
              {heroSection.ctaText}
              <ArrowLeft size={24} />
            </a>
            
            <div className="text-center">
              <p className="text-lg font-semibold mb-1">🎉 عرض خاص</p>
              <p className="text-sm opacity-80">خصم 20% على أول طلب</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const HeroVariantCConfig = {
  id: 'hero-variant-c',
  name: 'هيرو تسويقي مع عروض',
  description: 'قسم هيرو تسويقي مع ميزات وعروض خاصة',
  preview: '/previews/hero-variant-c.jpg',
  category: 'marketing',
  features: ['شبكة ميزات', 'عروض خاصة', 'تأثيرات متحركة', 'تصميم تسويقي'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};