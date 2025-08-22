import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, ShoppingBag, Gift, Zap, Crown } from 'lucide-react';

interface HeroVariantCProps {
  settings: StoreSettings;
}

export default function HeroVariantC({ settings }: HeroVariantCProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section 
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${settings.primaryColor}05, ${settings.secondaryColor}05, ${settings.accentColor}05)`
      }}
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${settings.primaryColor}30, transparent 50%)`
          }}
        ></div>
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 70% 80%, ${settings.secondaryColor}30, transparent 50%)`
          }}
        ></div>
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${settings.accentColor}20, transparent 50%)`
          }}
        ></div>
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="border-r animate-pulse" 
              style={{ 
                borderColor: settings.primaryColor,
                animationDelay: `${i * 0.1}s` 
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-12">
          {/* Premium Badge */}
          <div 
            className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full shadow-2xl animate-bounce-slow"
            style={{
              background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
            }}
          >
            <Crown className="w-6 h-6" />
            <span className="font-bold text-lg">متجر إلكتروني مميز</span>
            <div 
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: settings.accentColor }}
            ></div>
          </div>
          
          {/* Main Title with Animation */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span 
                className="block bg-gradient-to-r bg-clip-text text-transparent animate-gradient-x"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor})`
                }}
              >
                {heroSection.title}
              </span>
            </h1>
            
            <p 
              className="text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto leading-relaxed font-medium"
              style={{ color: settings.text }}
            >
              {heroSection.subtitle}
            </p>
          </div>
          
          {/* CTA Section */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href={heroSection.ctaLink}
                className="group relative inline-flex items-center justify-center gap-4 text-white font-black py-6 px-12 rounded-full text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor})`,
                  boxShadow: `0 20px 40px ${settings.primaryColor}50`
                }}
              >
                <ShoppingBag className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>{heroSection.ctaText}</span>
                <ArrowLeft className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div 
                  className="absolute inset-0 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  style={{
                    background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                  }}
                ></div>
              </a>
              
              <div 
                className="text-center backdrop-blur-sm border rounded-2xl p-6 shadow-xl"
                style={{
                  backgroundColor: `${settings.primaryColor}10`,
                  borderColor: `${settings.primaryColor}20`
                }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift 
                    className="w-6 h-6"
                    style={{ color: settings.primaryColor }}
                  />
                  <span 
                    className="text-2xl font-black"
                    style={{ color: settings.primaryColor }}
                  >
                    🎉 عرض خاص
                  </span>
                </div>
                <p 
                  className="font-medium"
                  style={{ color: settings.text }}
                >
                  خصم 30% على أول طلب
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div 
              className="flex flex-wrap justify-center items-center gap-8"
              style={{ color: settings.textSecondary }}
            >
              <div className="flex items-center gap-2">
                <Zap 
                  className="w-5 h-5"
                  style={{ color: settings.accentColor }}
                />
                <span className="font-medium">معالجة فورية</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown 
                  className="w-5 h-5"
                  style={{ color: settings.primaryColor }}
                />
                <span className="font-medium">دفع آمن</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift 
                  className="w-5 h-5"
                  style={{ color: settings.secondaryColor }}
                />
                <span className="font-medium">خدمة مميزة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute top-1/4 right-8 animate-float">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${settings.accentColor}, ${settings.primaryColor})`
          }}
        >
          <span className="text-2xl">🔥</span>
        </div>
      </div>
      
      <div className="absolute bottom-1/4 left-8 animate-float animation-delay-2000">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${settings.secondaryColor}, ${settings.accentColor})`
          }}
        >
          <span className="text-xl">⚡</span>
        </div>
      </div>
    </section>
  );
}

export const HeroVariantCConfig = {
  id: 'hero-variant-c',
  name: 'هيرو تسويقي مع عروض',
  description: 'قسم هيرو تسويقي مع عروض خاصة وتأثيرات متقدمة',
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