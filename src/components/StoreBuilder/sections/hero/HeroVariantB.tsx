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
    <section 
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${settings.primaryColor}05, ${settings.accentColor}05, ${settings.secondaryColor}05)`
      }}
    >
      {/* Geometric Background */}
      <div className="absolute inset-0">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: settings.primaryColor, stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: settings.accentColor, stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <polygon fill="url(#grad1)" points="0,0 1000,300 1000,1000 0,1000" />
        </svg>
        
        {/* Floating Shapes */}
        <div 
          className="absolute top-20 right-20 w-32 h-32 rounded-full opacity-20 animate-pulse"
          style={{
            background: `linear-gradient(135deg, ${settings.primaryColor}40, ${settings.accentColor}40)`
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-20 animate-pulse animation-delay-1000"
          style={{
            background: `linear-gradient(135deg, ${settings.secondaryColor}40, ${settings.primaryColor}40)`
          }}
        ></div>
        <div 
          className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full opacity-20 animate-pulse animation-delay-2000"
          style={{
            background: `linear-gradient(135deg, ${settings.accentColor}40, ${settings.secondaryColor}40)`
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div 
              className="inline-flex items-center gap-3 backdrop-blur-sm border rounded-full px-6 py-3 shadow-lg"
              style={{
                backgroundColor: `${settings.primaryColor}10`,
                borderColor: `${settings.primaryColor}20`
              }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span 
                className="font-medium"
                style={{ color: settings.text }}
              >
                تقييم 5 نجوم من 1000+ عميل
              </span>
              <div 
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: settings.accentColor }}
              ></div>
            </div>
            
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span style={{ color: settings.text }}>
                  {heroSection.title.split(' ').slice(0, -1).join(' ')}
                </span>
                <span 
                  className="block bg-gradient-to-r bg-clip-text text-transparent animate-gradient"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor})`
                  }}
                >
                  {heroSection.title.split(' ').slice(-1)[0]}
                </span>
              </h1>
              
              <p 
                className="text-xl md:text-2xl leading-relaxed max-w-2xl"
                style={{ color: settings.textSecondary }}
              >
                {heroSection.subtitle}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users 
                    className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: settings.primaryColor }}
                  />
                  <span 
                    className="text-3xl font-black"
                    style={{ color: settings.text }}
                  >
                    1000+
                  </span>
                </div>
                <span 
                  className="text-sm font-medium"
                  style={{ color: settings.textSecondary }}
                >
                  عميل سعيد
                </span>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award 
                    className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: settings.accentColor }}
                  />
                  <span 
                    className="text-3xl font-black"
                    style={{ color: settings.text }}
                  >
                    5+
                  </span>
                </div>
                <span 
                  className="text-sm font-medium"
                  style={{ color: settings.textSecondary }}
                >
                  سنوات خبرة
                </span>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Heart 
                    className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: settings.secondaryColor }}
                  />
                  <span 
                    className="text-3xl font-black"
                    style={{ color: settings.text }}
                  >
                    99%
                  </span>
                </div>
                <span 
                  className="text-sm font-medium"
                  style={{ color: settings.textSecondary }}
                >
                  رضا العملاء
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={heroSection.ctaLink}
                onClick={(e) => {
                  e.preventDefault();
                  window.open('/products', '_blank');
                }}
                className="group relative inline-flex items-center justify-center gap-3 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                  boxShadow: `0 10px 25px ${settings.primaryColor}25`
                }}
              >
                <Rocket className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                <span>{heroSection.ctaText}</span>
                <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              
              <button 
                className="group inline-flex items-center justify-center gap-3 font-bold py-4 px-8 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: settings.surface,
                  borderColor: `${settings.primaryColor}30`,
                  color: settings.primaryColor
                }}
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>شاهد الفيديو</span>
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle 
                  className="w-5 h-5"
                  style={{ color: settings.accentColor }}
                />
                <span 
                  className="font-medium"
                  style={{ color: settings.text }}
                >
                  شحن مجاني
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle 
                  className="w-5 h-5"
                  style={{ color: settings.accentColor }}
                />
                <span 
                  className="font-medium"
                  style={{ color: settings.text }}
                >
                  ضمان شامل
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle 
                  className="w-5 h-5"
                  style={{ color: settings.accentColor }}
                />
                <span 
                  className="font-medium"
                  style={{ color: settings.text }}
                >
                  دعم 24/7
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle 
                  className="w-5 h-5"
                  style={{ color: settings.accentColor }}
                />
                <span 
                  className="font-medium"
                  style={{ color: settings.text }}
                >
                  إرجاع مجاني
                </span>
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
                  <div 
                    className="w-full h-96 lg:h-[500px] rounded-3xl shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${settings.primaryColor}10, ${settings.accentColor}10, ${settings.secondaryColor}10)`
                    }}
                  >
                    <div className="text-center space-y-6">
                      <div 
                        className="w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                        }}
                      >
                        <Star className="w-12 h-12 text-white" />
                      </div>
                      <div>
                        <h3 
                          className="text-2xl font-bold mb-2"
                          style={{ color: settings.text }}
                        >
                          منتجات استثنائية
                        </h3>
                        <p style={{ color: settings.textSecondary }}>
                          جودة عالية وأسعار منافسة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Floating Cards */}
              <div 
                className="absolute -top-6 -right-6 rounded-2xl shadow-xl p-4 transform rotate-3 hover:rotate-6 transition-transform duration-300"
                style={{ backgroundColor: settings.surface }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: settings.accentColor }}
                  ></div>
                  <span 
                    className="text-sm font-bold"
                    style={{ color: settings.text }}
                  >
                    متوفر الآن
                  </span>
                </div>
              </div>
              
              <div 
                className="absolute -bottom-6 -left-6 rounded-2xl shadow-xl p-4 transform -rotate-3 hover:-rotate-6 transition-transform duration-300"
                style={{ backgroundColor: settings.surface }}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span 
                    className="text-sm font-bold"
                    style={{ color: settings.text }}
                  >
                    تقييم ممتاز
                  </span>
                </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div 
              className="absolute -inset-4 rounded-3xl blur-xl -z-10 opacity-30"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor}40, ${settings.secondaryColor}40)`
              }}
            ></div>
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