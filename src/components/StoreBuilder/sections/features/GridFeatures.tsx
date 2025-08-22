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
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:60px_60px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-6 py-3 mb-8 shadow-lg">
            <Star className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-semibold">مميزاتنا الخاصة</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {whyChooseUs.title}
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {whyChooseUs.subtitle}
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {whyChooseUs.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            const gradients = [
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-pink-500',
              'from-green-500 to-emerald-500',
              'from-orange-500 to-red-500',
              'from-indigo-500 to-purple-500',
              'from-pink-500 to-rose-500'
            ];
            const gradient = gradients[index % gradients.length];
            
            return (
              <div 
                key={item.id} 
                className="group relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-3xl p-8 hover:bg-white transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full opacity-40 animate-pulse animation-delay-1000"></div>
                
                {/* Icon */}
                <div className="relative mb-8">
                  <div className={`w-20 h-20 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-r ${gradient} rounded-2xl mx-auto blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500`}></div>
                </div>
                
                {/* Content */}
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl p-12 shadow-2xl max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900">
                  مستعد للبدء؟
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  انضم إلى آلاف العملاء الراضين واكتشف الفرق معنا
                </p>
                
                <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                  <span>ابدأ التسوق الآن</span>
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                </button>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl -z-10"></div>
          </div>
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
  features: ['شبكة متجاوبة', 'تأثيرات حركية', 'تدرجات متقدمة', 'دعوة للعمل'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};