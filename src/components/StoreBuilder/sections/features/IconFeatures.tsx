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
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-200 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-purple-200 rounded-lg animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-bounce-slow"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <span className="text-blue-600 font-semibold text-sm">لماذا نحن مختلفون</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {whyChooseUs.title}
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {whyChooseUs.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            const colors = [
              { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200' },
              { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200' },
              { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200' },
              { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200' },
              { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-200' },
              { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-200' }
            ];
            const color = colors[index % colors.length];
            
            return (
              <div 
                key={item.id} 
                className="group text-center hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 ${color.bg} ${color.border} border-2 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    <Icon className={`w-10 h-10 ${color.icon}`} />
                  </div>
                  
                  {/* Pulse Effect */}
                  <div className={`absolute inset-0 w-20 h-20 ${color.bg} rounded-2xl mx-auto animate-ping opacity-20 group-hover:opacity-40`}></div>
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative Line */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-auto mt-6 group-hover:via-blue-500 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-500"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-500"></div>
          </div>
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