import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, Play, Sparkles } from 'lucide-react';

interface HeroVariantAProps {
  settings: StoreSettings;
}

export default function HeroVariantA({ settings }: HeroVariantAProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${settings.primaryColor}15, ${settings.secondaryColor}15, ${settings.accentColor}10)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-30"
          style={{ backgroundColor: `${settings.primaryColor}40` }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-30"
          style={{ backgroundColor: `${settings.accentColor}40` }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-30"
          style={{ backgroundColor: `${settings.secondaryColor}40` }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: settings.primaryColor }}
            ></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-3 mb-8 animate-fade-in-up"
            style={{
              backgroundColor: `${settings.primaryColor}10`,
              borderColor: `${settings.primaryColor}30`,
              color: settings.primaryColor
            }}
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            <span className="font-medium">متجر مميز وموثوق</span>
            <div 
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: settings.accentColor }}
            ></div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 animate-fade-in-up animation-delay-200">
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor})`
              }}
            >
              {heroSection.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400"
            style={{ color: settings.textSecondary }}
          >
            {heroSection.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-600">
            <a
              href={heroSection.ctaLink}
              onClick={(e) => {
                e.preventDefault();
                window.open('/products', '_blank');
              }}
              className="group relative inline-flex items-center gap-3 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                boxShadow: `0 10px 25px ${settings.primaryColor}25`
              }}
            >
              <span className="relative z-10">{heroSection.ctaText}</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div 
                className="absolute inset-0 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                }}
              ></div>
            </a>

            <button 
              className="group inline-flex items-center gap-3 font-bold py-4 px-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 transform hover:scale-105"
              style={{
                backgroundColor: `${settings.primaryColor}10`,
                borderColor: `${settings.primaryColor}30`,
                color: settings.primaryColor
              }}
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>شاهد الفيديو</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in-up animation-delay-800">
            <div className="text-center">
              <div 
                className="text-3xl font-black mb-1"
                style={{ color: settings.primaryColor }}
              >
                1000+
              </div>
              <div style={{ color: settings.textSecondary }}>عميل سعيد</div>
            </div>
            <div className="text-center">
              <div 
                className="text-3xl font-black mb-1"
                style={{ color: settings.primaryColor }}
              >
                5⭐
              </div>
              <div style={{ color: settings.textSecondary }}>تقييم ممتاز</div>
            </div>
            <div className="text-center">
              <div 
                className="text-3xl font-black mb-1"
                style={{ color: settings.primaryColor }}
              >
                24/7
              </div>
              <div style={{ color: settings.textSecondary }}>دعم فني</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-6 h-10 border-2 rounded-full flex justify-center"
          style={{ borderColor: `${settings.primaryColor}30` }}
        >
          <div 
            className="w-1 h-3 rounded-full mt-2 animate-pulse"
            style={{ backgroundColor: `${settings.primaryColor}50` }}
          ></div>
        </div>
      </div>
    </section>
  );
}

export const HeroVariantAConfig = {
  id: 'hero-variant-a',
  name: 'هيرو متقدم مع تأثيرات',
  description: 'قسم هيرو احترافي مع تأثيرات بصرية متقدمة وحركات سلسة',
  preview: '/previews/hero-variant-a.jpg',
  category: 'advanced',
  features: ['تأثيرات متحركة', 'تدرجات متقدمة', 'جسيمات عائمة', 'تصميم متجاوب'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};