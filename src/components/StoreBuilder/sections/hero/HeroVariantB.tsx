import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, Play, Star, Users, Award, CheckCircle, Rocket, Heart } from 'lucide-react';

interface HeroVariantBProps {
  settings: StoreSettings;
}

export default function HeroVariantB({ settings }: HeroVariantBProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <polygon fill="url(#grad1)" points="0,0 1000,300 1000,1000 0,1000" />
        </svg>
        
        {/* Floating Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 shadow-lg">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-700 font-medium">تقييم 5 نجوم من 1000+ عميل</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-gray-900">{heroSection.title.split(' ').slice(0, -1).join(' ')}</span>
                <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
                  {heroSection.title.split(' ').slice(-1)[0]}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                {heroSection.subtitle}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-3xl font-black text-gray-900">1000+</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">عميل سعيد</span>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-6 h-6 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-3xl font-black text-gray-900">5+</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">سنوات خبرة</span>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart className="w-6 h-6 text-pink-600 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-3xl font-black text-gray-900">99%</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">رضا العملاء</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={heroSection.ctaLink}
                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25"
              >
                <Rocket className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                <span>{heroSection.ctaText}</span>
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <button className="group inline-flex items-center justify-center gap-3 bg-white border-2 border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>شاهد الفيديو</span>
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">شحن مجاني</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">ضمان شامل</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">دعم 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">إرجاع مجاني</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative z-10">
              {heroSection.backgroundImage ? (
                <div className="relative group">
                  <img
                    src={heroSection.backgroundImage}
                    alt="Hero"
                    className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100 rounded-3xl shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                        <Star className="w-12 h-12 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">منتجات استثنائية</h3>
                        <p className="text-gray-600">جودة عالية وأسعار منافسة</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-gray-800">متوفر الآن</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 transform -rotate-3 hover:-rotate-6 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-bold text-gray-800">تقييم ممتاز</span>
                </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const HeroVariantBConfig = {
  id: 'hero-variant-b',
  name: 'هيرو احترافي مع إحصائيات',
  description: 'قسم هيرو احترافي مع إحصائيات وتقييمات وتصميم هندسي',
  preview: '/previews/hero-variant-b.jpg',
  category: 'professional',
  features: ['إحصائيات متقدمة', 'تقييمات', 'كروت عائمة', 'تصميم هندسي'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};