import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TemplateProps } from '../../TemplateTypes';
import { FAQItem as FAQItemType } from '../../../types/store';

const FAQItem = ({ item, primaryColor }: { item: FAQItemType; primaryColor: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-6 py-4 text-right flex justify-between items-center hover:bg-gray-50 transition-colors">
        <span className="font-medium">{item.question}</span>
        <ChevronDown size={20} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: primaryColor }} />
      </button>
      {isOpen && (
        <div className="px-6 pb-4">
          <p className="text-gray-600">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { faq } = settings.sections;
  const { primaryColor, accentColor } = settings;

  if (!faq || !faq.enabled || faq.data.items.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>{faq.data.title}</h2>
          <p className="text-gray-600">{faq.data.subtitle}</p>
          <div className="w-24 h-1 mx-auto mt-4 rounded" style={{ backgroundColor: accentColor }}></div>
        </div>
        <div className="space-y-4">
          {faq.data.items.map((item) => (
            <FAQItem key={item.id} item={item} primaryColor={primaryColor} />
          ))}
        </div>
      </div>
    </section>
  );
};
