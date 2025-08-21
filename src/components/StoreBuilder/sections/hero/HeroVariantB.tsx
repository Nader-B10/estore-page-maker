import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, Play, Star, Users, Award } from 'lucide-react';

interface HeroVariantBProps {
  settings: StoreSettings;
}

export default function HeroVariantB({ settings }: HeroVariantBProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section className="relative py-20 px-6 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-100 rounded-full opacity-50 blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600 font-medium">تقييم 5 نجوم من عملائنا</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-gray-900">{heroSection.title.split(' ').slice(0, -1).join(' ')}</span>
              <span 
                className="block"
                style={{ color: settings.primaryColor }}
              >
                {heroSection.title.split(' ').slice(-1)[0]}
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {heroSection.subtitle}
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Users size={20} style={{ color: settings.primaryColor }} />
                  <span className="text-2xl font-bold text-gray-900">1000+</span>
                </div>
                <span className="text-sm text-gray-600">عميل سعيد</span>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Award size={20} style={{ color: settings.primaryColor }} />
                  <span className="text-2xl font-bold text-gray-900">5+</span>
                </div>
                <span className="text-sm text-gray-600">سنوات خبرة</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={heroSection.ctaLink}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ backgroundColor: settings.primaryColor }}
              >
                {heroSection.ctaText}
                <ArrowLeft size={20} />
              </a>
              
              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold rounded-xl border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                <Play size={20} />
                شاهد الفيديو
              </button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            {heroSection.backgroundImage ? (
              <div className="relative">
                <img
                  src={heroSection.backgroundImage}
                  alt="Hero"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            ) : (
              <div className="relative">
                <div 
                  className="w-full h-96 rounded-2xl shadow-2xl flex items-center justify-center"
                  style={{ 
                    background: `linear-gradient(135deg, ${settings.primaryColor}20, ${settings.secondaryColor}20)` 
                  }}
                >
                  <div className="text-center">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: settings.primaryColor }}
                    >
                      <Star size={48} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">منتجات استثنائية</h3>
                    <p className="text-gray-600">جودة عالية وأسعار منافسة</p>
                  </div>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 transform rotate-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">متوفر الآن</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 transform -rotate-3">
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">تقييم ممتاز</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export const HeroVariantBConfig = {
  id: 'hero-variant-b',
  name: 'هيرو احترافي مع إحصائيات',
  description: 'قسم هيرو احترافي مع إحصائيات وتقييمات',
  preview: '/previews/hero-variant-b.jpg',
  category: 'professional',
  features: ['إحصائيات', 'تقييمات', 'كروت عائمة', 'تصميم احترافي'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};