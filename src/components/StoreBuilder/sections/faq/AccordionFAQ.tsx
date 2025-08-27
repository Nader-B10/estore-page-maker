import React, { useState } from 'react';
import { StoreSettings } from '../../../../types/store';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface AccordionFAQProps {
  settings: StoreSettings;
}

export default function AccordionFAQ({ settings }: AccordionFAQProps) {
  const { faq } = settings;
  const [openItems, setOpenItems] = useState<string[]>([]);

  if (!faq.enabled) return null;

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: `${settings.primaryColor}20` }}
          >
            <HelpCircle size={32} style={{ color: settings.primaryColor }} />
          </div>
          
          <h2 className="text-4xl font-bold mb-4" style={{ color: settings.primaryColor }}>
            {faq.title}
          </h2>
          <p className="text-xl text-gray-600">
            {faq.subtitle}
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded" style={{ backgroundColor: settings.accentColor }}></div>
        </div>

        <div className="space-y-4">
          {faq.items.map((item, index) => {
            const isOpen = openItems.includes(item.id);
            return (
              <div
                key={item.id} 
                className="faq-item bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="faq-question w-full px-8 py-6 text-right flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  onclick={`toggleFAQ(${index})`}
                >
                  <span className="font-semibold text-lg text-gray-800 flex-1">
                    {item.question}
                  </span>
                  <ChevronDown 
                    size={24} 
                    className={`faq-icon transform transition-transform duration-300 flex-shrink-0 ml-4 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    style={{ color: settings.primaryColor }}
                  />
                </button>
                
                <div className={`faq-answer overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-6">
                    <div 
                      className="w-full h-px mb-4"
                      style={{ backgroundColor: `${settings.primaryColor}20` }}
                    ></div>
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-4" style={{ color: settings.primaryColor }}>
              لم تجد إجابة لسؤالك؟
            </h3>
            <p className="text-gray-600 mb-6">
              فريق الدعم لدينا مستعد لمساعدتك في أي وقت
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: settings.primaryColor }}
              >
                تواصل معنا
              </button>
              <button 
                className="px-6 py-3 rounded-lg font-semibold border-2 hover:bg-gray-50 transition-colors"
                style={{ 
                  borderColor: settings.primaryColor,
                  color: settings.primaryColor 
                }}
              >
                مركز المساعدة
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const AccordionFAQConfig = {
  id: 'accordion-faq',
  name: 'أسئلة شائعة أكورديون',
  description: 'أسئلة شائعة بتصميم أكورديون تفاعلي',
  preview: '/previews/accordion-faq.jpg',
  category: 'interactive',
  features: ['تفاعلي', 'أنيميشن سلس', 'دعوة للعمل', 'تصميم عصري'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};