import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { Truck, Shield, Headphones, Star, Heart, Check, Gift, Clock, Zap, Award } from 'lucide-react';

interface IconFeaturesProps {
  settings: StoreSettings;
}

export default function IconFeatures({ settings }: IconFeaturesProps) {
  const { whyChooseUs } = settings;

  if (!whyChooseUs.enabled) return null;

  const getIcon = (iconName: string) => {
    const icons = {
      truck: Truck,
      shield: Shield,
      headphones: Headphones,
      star: Star,
      heart: Heart,
      check: Check,
      gift: Gift,
      clock: Clock,
      zap: Zap,
      award: Award,
    };
    return icons[iconName as keyof typeof icons] || Star;
  };

  return (
    <section 
      className="relative py-20 overflow-hidden bg-gray-50"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${settings.primaryColor} 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div 
        className="absolute top-10 left-10 w-20 h-20 border-2 rounded-full animate-spin-slow"
        style={{ borderColor: `${settings.primaryColor}20` }}
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-16 h-16 border-2 rounded-lg animate-pulse"
        style={{ borderColor: `${settings.accentColor}20` }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full animate-bounce-slow"
        style={{
          background: `linear-gradient(135deg, ${settings.primaryColor}10, ${settings.accentColor}10)`
        }}
      ></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 border rounded-full px-6 py-3 mb-6 bg-white shadow-lg"
            style={{
              borderColor: `${settings.primaryColor}20`
            }}
          >
            <div 
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: settings.primaryColor }}
            ></div>
            <span 
              className="font-semibold text-sm"
              style={{ color: settings.primaryColor }}
            >
              لماذا نحن مختلفون
            </span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-black mb-4 text-gray-800"
          >
            {whyChooseUs.title}
          </h2>
          
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600"
          >
            {whyChooseUs.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            
            return (
              <div 
                key={item.id} 
                className="group text-center hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div 
                    className="w-20 h-20 border-2 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl bg-white"
                    style={{
                      borderColor: `${settings.primaryColor}20`
                    }}
                  >
                    <Icon 
                      className="w-10 h-10"
                      style={{ color: settings.primaryColor }}
                    />
                  </div>
                  
                  {/* Pulse Effect */}
                  <div 
                    className="absolute inset-0 w-20 h-20 rounded-2xl mx-auto animate-ping opacity-20 group-hover:opacity-40"
                    style={{ backgroundColor: `${settings.primaryColor}20` }}
                  ></div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 
                    className="text-xl font-bold group-hover:opacity-80 transition-colors duration-300 text-gray-800"
                  >
                    {item.title}
                  </h3>
                  
                  <p 
                    className="text-sm leading-relaxed text-gray-600"
                  >
                    {item.description}
                  </p>
                </div>

                {/* Decorative Line */}
                <div 
                  className="w-12 h-0.5 mx-auto mt-6 group-hover:w-16 transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${settings.primaryColor}50, transparent)`
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const IconFeaturesConfig = {
  id: 'icon-features',
  name: 'ميزات بالأيقونات البسيطة',
  description: 'عرض الميزات بأيقونات أنيقة وتصميم نظيف مع تأثيرات خفيفة',
  preview: '/previews/icon-features.jpg',
  category: 'simple',
  features: ['أيقونات كبيرة', 'تصميم نظيف', 'تأثيرات خفيفة', 'ألوان متدرجة'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};