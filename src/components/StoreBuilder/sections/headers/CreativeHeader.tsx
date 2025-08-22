import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { MessageCircle, Sparkles, Star, Zap } from 'lucide-react';

interface CreativeHeaderProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function CreativeHeader({ settings, customPages }: CreativeHeaderProps) {
  return (
    <header 
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${settings.primaryColor}15, ${settings.secondaryColor}15, ${settings.accentColor}15)`,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-4 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-8">
            {/* Logo with Creative Effects */}
            {settings.logo && (
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <img 
                    src={settings.logo} 
                    alt="Logo" 
                    className="w-24 h-24 object-cover rounded-full shadow-2xl border-4 border-white transform hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Store Name with Creative Typography */}
            <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
              {settings.storeName}
            </h1>
            
            <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">
              ✨ {settings.description} ✨
            </p>

            {/* Creative Features */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold text-gray-700">منتجات مميزة</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="font-semibold text-gray-700">توصيل سريع</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="font-semibold text-gray-700">جودة عالية</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            {settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber && (
              <div className="mb-8">
                <a
                  href={`https://wa.me/${settings.whatsappSettings.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg font-bold"
                >
                  <MessageCircle size={24} />
                  <span>🚀 ابدأ التسوق الآن</span>
                </a>
              </div>
            )}
          </div>

          {/* Creative Navigation */}
          <nav className="flex justify-center">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-full shadow-xl">
              {settings.headerLinks.filter(link => link.isVisible).map((link, index) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                  style={{
                    background: `linear-gradient(135deg, ${settings.primaryColor}20, ${settings.accentColor}20)`,
                    color: settings.primaryColor
                  }}
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export const CreativeHeaderConfig = {
  id: 'creative-header',
  name: 'الهيدر الإبداعي',
  description: 'هيدر إبداعي مع تأثيرات متحركة وتصميم جذاب',
  preview: '/previews/creative-header.jpg',
  category: 'creative',
  features: ['تأثيرات متحركة', 'تدرجات إبداعية', 'تصميم جذاب', 'عناصر تفاعلية'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};