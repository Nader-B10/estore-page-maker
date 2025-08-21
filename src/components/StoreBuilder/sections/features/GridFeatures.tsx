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
    <section className="py-20 px-6" style={{ backgroundColor: `${settings.primaryColor}05` }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ color: settings.primaryColor }}>
            {whyChooseUs.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {whyChooseUs.subtitle}
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded" style={{ backgroundColor: settings.accentColor }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="text-center">
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})` 
                    }}
                  >
                    <Icon size={36} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4" style={{ color: settings.primaryColor }}>
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full opacity-20" style={{ backgroundColor: settings.accentColor }}></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full opacity-10" style={{ backgroundColor: settings.primaryColor }}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4" style={{ color: settings.primaryColor }}>
              مستعد للبدء؟
            </h3>
            <p className="text-gray-600 mb-6">
              انضم إلى آلاف العملاء الراضين واكتشف الفرق معنا
            </p>
            <button 
              className="px-8 py-4 rounded-full text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
              style={{ backgroundColor: settings.accentColor }}
            >
              ابدأ التسوق الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export const GridFeaturesConfig = {
  id: 'grid-features',
  name: 'شبكة الميزات',
  description: 'عرض الميزات في شبكة أنيقة مع تأثيرات',
  preview: '/previews/grid-features.jpg',
  category: 'modern',
  features: ['شبكة متجاوبة', 'تأثيرات حركية', 'تصميم عصري', 'دعوة للعمل'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};