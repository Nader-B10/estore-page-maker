import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, Star, Zap, Shield } from 'lucide-react';

interface HeroVariantAProps {
  settings: StoreSettings;
}

export default function HeroVariantA({ settings }: HeroVariantAProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section 
      className="relative py-20 px-6 text-white overflow-hidden"
      style={{
        backgroundImage: heroSection.backgroundImage 
          ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroSection.backgroundImage})`
          : `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <Star className="text-yellow-400" size={20} />
              <span className="text-sm font-medium opacity-90">متجر موثوق ومضمون</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {heroSection.title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              {heroSection.subtitle}
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <Zap size={16} className="text-yellow-400" />
                <span>توصيل سريع</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield size={16} className="text-green-400" />
                <span>ضمان الجودة</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star size={16} className="text-blue-400" />
                <span>خدمة مميزة</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={heroSection.ctaLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-full hover:opacity-90 transition-all duration-200 text-white shadow-lg hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: settings.accentColor }}
              >
                {heroSection.ctaText}
                <ArrowLeft size={20} />
              </a>
              
              <button className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-200">
                تعرف أكثر
              </button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full h-80 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={40} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">منتجات مميزة</h3>
                  <p className="text-sm opacity-80">اكتشف مجموعتنا الحصرية</p>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center">
              <Zap size={24} className="text-yellow-400" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center">
              <Shield size={20} className="text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const HeroVariantAConfig = {
  id: 'hero-variant-a',
  name: 'هيرو متقدم مع ميزات',
  description: 'قسم هيرو احترافي مع عناصر بصرية وميزات المتجر',
  preview: '/previews/hero-variant-a.jpg',
  category: 'advanced',
  features: ['عناصر بصرية', 'ميزات المتجر', 'تأثيرات متحركة', 'تصميم متجاوب'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};