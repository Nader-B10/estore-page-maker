import React, { useState } from 'react';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
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

  const allSections = [
    { id: 'hero', label: 'قسم البطل (Hero)', icon: '🦸' },
    { id: 'featured', label: 'المنتجات المميزة', icon: '⭐' },
    { id: 'bestSellers', label: 'الأعلى مبيعاً', icon: '🏆' },
    { id: 'onSale', label: 'العروض والتخفيضات', icon: '🔥' },
    { id: 'about', label: 'قسم من نحن', icon: '👥' },
    { id: 'whyChooseUs', label: 'لماذا تختارنا', icon: '✨' },
    { id: 'faq', label: 'الأسئلة الشائعة', icon: '❓' },
  ];

  const sections = settings.sectionsOrder.map(sectionId => 
    allSections.find(section => section.id === sectionId)
  ).filter(Boolean);

  const moveSectionUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...settings.sectionsOrder];
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
      onUpdateSettings({
        ...settings,
        sectionsOrder: newOrder
      });
    }
  };

  const moveSectionDown = (index: number) => {
    if (index < settings.sectionsOrder.length - 1) {
      const newOrder = [...settings.sectionsOrder];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      onUpdateSettings({
        ...settings,
        sectionsOrder: newOrder
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sections Reordering */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">ترتيب الأقسام</h3>
        <div className="space-y-2">
          {sections.map((section, index) => (
            <div key={section.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <GripVertical className="text-gray-400 cursor-move" size={16} />
              <span className="text-lg">{section.icon}</span>
              <span className="flex-1 font-medium">{section.label}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => moveSectionUp(index)}
                  disabled={index === 0}
                  className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="تحريك لأعلى"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveSectionDown(index)}
                  disabled={index === sections.length - 1}
                  className="p-1 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="تحريك لأسفل"
                >
                  <ArrowDown size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">إعدادات الأقسام</h3>
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
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      {activeSection === 'hero' && (
        <HeroSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}

      {(activeSection === 'featured' || activeSection === 'bestSellers' || activeSection === 'onSale') && (
        <ProductSectionsManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}

      {activeSection === 'about' && (
        <AboutSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}

      {activeSection === 'whyChooseUs' && (
        <WhyChooseUsSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}

      {activeSection === 'faq' && (
        <FAQSectionManager settings={settings} onUpdateSettings={onUpdateSettings} />
      )}
    </div>
  );
}