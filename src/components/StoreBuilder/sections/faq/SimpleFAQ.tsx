import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { HelpCircle } from 'lucide-react';

interface SimpleFAQProps {
  settings: StoreSettings;
}

export default function SimpleFAQ({ settings }: SimpleFAQProps) {
  const { faq } = settings;

  if (!faq.enabled) return null;

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: settings.primaryColor }}>
            {faq.title}
          </h2>
          <p className="text-lg text-gray-600">
            {faq.subtitle}
          </p>
        </div>

        <div className="space-y-8">
          {faq.items.map((item, index) => (
            <div key={item.id} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex items-start gap-4">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: `${settings.primaryColor}20` }}
                >
                  <HelpCircle size={16} style={{ color: settings.primaryColor }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-3" style={{ color: settings.primaryColor }}>
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const SimpleFAQConfig = {
  id: 'simple-faq',
  name: 'أسئلة شائعة بسيطة',
  description: 'أسئلة شائعة بتصميم بسيط ونظيف',
  preview: '/previews/simple-faq.jpg',
  category: 'simple',
  features: ['تصميم بسيط', 'سهل القراءة', 'أيقونات صغيرة'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};