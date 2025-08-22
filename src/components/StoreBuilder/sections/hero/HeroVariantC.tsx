import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, ShoppingBag, Truck, Shield, Clock, Gift, Zap, Crown } from 'lucide-react';

interface HeroVariantCProps {
  settings: StoreSettings;
}

export default function HeroVariantC({ settings }: HeroVariantCProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(239,68,68,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.2),transparent_50%)]"></div>
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-r border-gray-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-2xl animate-bounce-slow">
            <Crown className="w-6 h-6" />
            <span className="font-bold text-lg">متجر إلكتروني مميز</span>
            <div className="w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
          </div>
          
          {/* Main Title with Animation */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span className="block bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                {heroSection.title}
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              {heroSection.subtitle}
            </p>
          </div>

          {/* Interactive Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group relative bg-white/80 backdrop-blur-sm border border-orange-200 rounded-3xl p-8 hover:bg-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/25">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse"></div>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">شحن مجاني</h3>
              <p className="text-gray-600">توصيل مجاني لجميع الطلبات فوق 100 ريال</p>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm border border-red-200 rounded-3xl p-8 hover:bg-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/25">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse animation-delay-500"></div>
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">ضمان الجودة</h3>
              <p className="text-gray-600">منتجات أصلية مع ضمان شامل لمدة سنة</p>
            </div>

            <div className="group relative bg-white/80 backdrop-blur-sm border border-pink-200 rounded-3xl p-8 hover:bg-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/25">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">دعم 24/7</h3>
              <p className="text-gray-600">خدمة عملاء متاحة على مدار الساعة</p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href={heroSection.ctaLink}
                className="group relative inline-flex items-center justify-center gap-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 hover:from-orange-700 hover:via-red-700 hover:to-pink-700 text-white font-black py-6 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-red-500/50"
              >
                <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>{heroSection.ctaText}</span>
                <ArrowLeft className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </a>
              
              <div className="text-center bg-white/80 backdrop-blur-sm border border-orange-200 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="w-6 h-6 text-orange-600" />
                  <span className="text-2xl font-black text-orange-600">🎉 عرض خاص</span>
                </div>
                <p className="text-gray-700 font-medium">خصم 30% على أول طلب</p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">معالجة فورية</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="font-medium">دفع آمن</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-500" />
                <span className="font-medium">خدمة مميزة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute top-1/4 right-8 animate-float">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-2xl">🔥</span>
        </div>
      </div>
      
      <div className="absolute bottom-1/4 left-8 animate-float animation-delay-2000">
        <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-xl">⚡</span>
        </div>
      </div>
    </section>
  );
}

export const HeroVariantCConfig = {
  id: 'hero-variant-c',
  name: 'هيرو تسويقي مع عروض',
  description: 'قسم هيرو تسويقي مع ميزات تفاعلية وعروض خاصة وتأثيرات متقدمة',
  preview: '/previews/hero-variant-c.jpg',
  category: 'marketing',
  features: ['شبكة تفاعلية', 'عروض خاصة', 'تأثيرات متحركة', 'تصميم تسويقي'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};