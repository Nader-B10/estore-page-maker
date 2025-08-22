import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { Truck, Shield, Headphones, Star, Heart, Check, Gift, Clock, Zap, Award } from 'lucide-react';

interface GridFeaturesProps {
  settings: StoreSettings;
}

export default function GridFeatures({ settings }: GridFeaturesProps) {
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
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${settings.primaryColor}05, ${settings.accentColor}05, ${settings.secondaryColor}05)`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 25%, ${settings.primaryColor}05 25%, ${settings.primaryColor}05 50%, transparent 50%, transparent 75%, ${settings.primaryColor}05 75%)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div 
        className="absolute top-20 left-20 w-32 h-32 rounded-full blur-xl animate-pulse opacity-20"
        style={{
          background: `linear-gradient(135deg, ${settings.primaryColor}40, ${settings.accentColor}40)`
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full blur-xl animate-pulse animation-delay-2000 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${settings.secondaryColor}40, ${settings.primaryColor}40)`
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div 
            className="inline-flex items-center gap-2 backdrop-blur-sm border rounded-full px-6 py-3 mb-8 shadow-lg"
            style={{
              backgroundColor: `${settings.primaryColor}10`,
              borderColor: `${settings.primaryColor}20`
            }}
          >
            <Star 
              className="w-5 h-5"
              style={{ color: settings.primaryColor }}
            />
            <span 
              className="font-semibold"
              style={{ color: settings.primaryColor }}
            >
              مميزاتنا الخاصة
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span 
              className="bg-gradient-to-r bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor}, ${settings.accentColor})`
              }}
            >
              {whyChooseUs.title}
            </span>
          </h2>
          
          <p 
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-600"
          >
            {whyChooseUs.subtitle}
          </p>
          
          <div 
            className="w-24 h-1 mx-auto mt-8 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.accentColor})`
            }}
          ></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            
            return (
              <div 
                key={item.id} 
                className="group relative backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-white/50"
                style={{ 
                  borderColor: `${settings.primaryColor}10`,
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                {/* Decorative Elements */}
                <div 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-60 animate-pulse"
                  style={{ backgroundColor: settings.primaryColor }}
                ></div>
                <div 
                  className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full opacity-40 animate-pulse animation-delay-1000"
                  style={{ backgroundColor: settings.accentColor }}
                ></div>
                
                {/* Icon */}
                <div className="relative mb-8">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                    }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div 
                    className="absolute inset-0 w-20 h-20 rounded-2xl mx-auto blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
                    }}
                  ></div>
                </div>
                
                {/* Content */}
                <div className="text-center space-y-4">
                  <h3 
                    className="text-2xl font-bold group-hover:text-opacity-80 transition-colors duration-300 text-gray-800"
                  >
                    {item.title}
                  </h3>
                  
                  <p 
                    className="leading-relaxed text-lg text-gray-600"
                  >
                    {item.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${settings.primaryColor}05, ${settings.accentColor}05)`
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

export const GridFeaturesConfig = {
  id: 'grid-features',
  name: 'شبكة الميزات المتقدمة',
  description: 'عرض الميزات في شبكة أنيقة مع تأثيرات بصرية متقدمة وحركات سلسة',
  preview: '/previews/grid-features.jpg',
  category: 'modern',
  features: ['شبكة متجاوبة', 'تأثيرات حركية', 'تدرجات متقدمة', 'تصميم عصري'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};