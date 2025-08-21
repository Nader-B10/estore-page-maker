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
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: settings.primaryColor }}>
            {whyChooseUs.title}
          </h2>
          <p className="text-lg text-gray-600">
            {whyChooseUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div key={item.id} className="text-center group">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${settings.primaryColor}20` }}
                >
                  <Icon size={32} style={{ color: settings.primaryColor }} />
                </div>
                
                <h3 className="text-lg font-semibold mb-2" style={{ color: settings.primaryColor }}>
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
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
  name: 'ميزات بالأيقونات',
  description: 'عرض الميزات بأيقونات بسيطة وأنيقة',
  preview: '/previews/icon-features.jpg',
  category: 'simple',
  features: ['أيقونات كبيرة', 'تصميم بسيط', 'تأثيرات خفيفة'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};