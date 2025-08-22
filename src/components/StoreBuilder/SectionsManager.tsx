import React, { useState } from 'react';
import { StoreSettings } from '../../types/store';
import HeroSectionManager from './sections-manager/HeroSectionManager';
import ProductSectionsManager from './sections-manager/ProductSectionsManager';
import AboutSectionManager from './sections-manager/AboutSectionManager';
import WhyChooseUsSectionManager from './sections-manager/WhyChooseUsSectionManager';
import FAQSectionManager from './sections-manager/FAQSectionManager';

interface SectionsManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function SectionsManager({ settings, onUpdateSettings }: SectionsManagerProps) {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'قسم البطل (Hero)' },
    { id: 'products', label: 'أقسام المنتجات' },
    { id: 'about', label: 'قسم من نحن' },
    { id: 'why-choose-us', label: 'لماذا تختارنا' },
    { id: 'faq', label: 'الأسئلة الشائعة' },
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
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

      {/* Section Content */}
      {activeSection === 'hero' && (
        <HeroSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}

      {activeSection === 'products' && (
        <ProductSectionsManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}

      {activeSection === 'about' && (
        <AboutSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}

      {activeSection === 'why-choose-us' && (
        <WhyChooseUsSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}

      {activeSection === 'faq' && (
        <FAQSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}
    </div>
  );
}