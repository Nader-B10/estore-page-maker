import React from 'react';
import { Truck, Shield, Headphones, Star, Heart, Check, Gift, Clock } from 'lucide-react';
import { StoreSettings } from '../../types/store';

const iconMap: { [key: string]: React.ElementType } = {
  truck: Truck,
  shield: Shield,
  headphones: Headphones,
  star: Star,
  heart: Heart,
  check: Check,
  gift: Gift,
  clock: Clock,
};

interface PreviewWhyChooseUsProps {
  settings: StoreSettings;
}

export default function PreviewWhyChooseUs({ settings }: PreviewWhyChooseUsProps) {
  const { whyChooseUs } = settings.sections;
  const { primaryColor, accentColor } = settings;

  if (!whyChooseUs || !whyChooseUs.enabled || whyChooseUs.data.items.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>{whyChooseUs.data.title}</h2>
          <p className="text-gray-600">{whyChooseUs.data.subtitle}</p>
          <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: accentColor }}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.data.items.map((item) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <div key={item.id} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
