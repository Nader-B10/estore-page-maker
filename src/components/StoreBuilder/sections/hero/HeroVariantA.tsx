import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, Star, Sparkles, Zap, Shield, Award, TrendingUp } from 'lucide-react';

interface HeroVariantAProps {
  settings: StoreSettings;
}

export default function HeroVariantA({ settings }: HeroVariantAProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
            <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
            <span className="text-white font-medium">متجر مميز وموثوق</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 animate-fade-in-up animation-delay-200">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              {heroSection.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            {heroSection.subtitle}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto animate-fade-in-up animation-delay-600">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">توصيل سريع</h3>
              <p className="text-purple-200 text-sm">خلال 24 ساعة</p>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">ضمان شامل</h3>
              <p className="text-purple-200 text-sm">جودة مضمونة</p>
            </div>

            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-bold mb-2">خدمة مميزة</h3>
              <p className="text-purple-200 text-sm">دعم 24/7</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animation-delay-800">
            <a
              href={heroSection.ctaLink}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <span className="relative z-10">{heroSection.ctaText}</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>

            <button className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-4 px-8 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              <TrendingUp className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>تعرف أكثر</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fade-in-up animation-delay-1000">
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">1000+</div>
              <div className="text-purple-200 text-sm">عميل سعيد</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">5⭐</div>
              <div className="text-purple-200 text-sm">تقييم ممتاز</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">24/7</div>
              <div className="text-purple-200 text-sm">دعم فني</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
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