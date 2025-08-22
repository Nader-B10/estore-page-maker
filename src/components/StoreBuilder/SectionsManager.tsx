import React, { useState } from 'react';
import HeroSectionEditor from '../SectionsManager/HeroSectionEditor';
import ProductSectionsEditor from '../SectionsManager/ProductSectionsEditor';
import WhyChooseUsEditor from '../SectionsManager/WhyChooseUsEditor';
import FAQEditor from '../SectionsManager/FAQEditor';

const sections = [
  { id: 'hero', label: 'قسم البطل (Hero)' },
  { id: 'products', label: 'أقسام المنتجات' },
  { id: 'why-choose-us', label: 'لماذا تختارنا' },
  { id: 'faq', label: 'الأسئلة الشائعة' },
];

export default function SectionsManager() {
  const [activeSection, setActiveSection] = useState('hero');

  const renderActiveEditor = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroSectionEditor />;
      case 'products':
        return <ProductSectionsEditor />;
      case 'why-choose-us':
        return <WhyChooseUsEditor />;
      case 'faq':
        return <FAQEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
      
      {renderActiveEditor()}
    </div>
  );
}
