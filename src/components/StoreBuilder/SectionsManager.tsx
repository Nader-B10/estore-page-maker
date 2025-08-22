import React, { useState } from 'react';
import { GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { StoreSettings } from '../../types/store';
import { useErrorHandler } from '../../hooks/useErrorHandler';
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
  const { handleError, withErrorHandling } = useErrorHandler();

  const allSections = [
    { id: 'hero', label: 'قسم البطل (Hero)', icon: '🦸', color: 'bg-purple-100 text-purple-700' },
    { id: 'categories', label: 'الفئات', icon: '📁', color: 'bg-blue-100 text-blue-700' },
    { id: 'search', label: 'البحث المتقدم', icon: '🔍', color: 'bg-green-100 text-green-700' },
    { id: 'featured', label: 'المنتجات المميزة', icon: '⭐', color: 'bg-yellow-100 text-yellow-700' },
    { id: 'bestSellers', label: 'الأعلى مبيعاً', icon: '🏆', color: 'bg-green-100 text-green-700' },
    { id: 'onSale', label: 'العروض والتخفيضات', icon: '🔥', color: 'bg-red-100 text-red-700' },
    { id: 'about', label: 'قسم من نحن', icon: '👥', color: 'bg-blue-100 text-blue-700' },
    { id: 'whyChooseUs', label: 'لماذا تختارنا', icon: '✨', color: 'bg-indigo-100 text-indigo-700' },
    { id: 'faq', label: 'الأسئلة الشائعة', icon: '❓', color: 'bg-gray-100 text-gray-700' },
  ];

  const sections = settings.sectionsOrder.map(sectionId => 
    allSections.find(section => section.id === sectionId)
  ).filter(Boolean);

  const moveSection = withErrorHandling((index: number, direction: 'up' | 'down') => {
    const newOrder = [...settings.sectionsOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newOrder.length) {
      return;
    }

    // تبديل العناصر
    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];

    onUpdateSettings({
      ...settings,
      sectionsOrder: newOrder
    });
  }, 'moveSection');

  const handleSectionClick = withErrorHandling((sectionId: string) => {
    setActiveSection(sectionId);
  }, 'handleSectionClick');

  return (
    <div className="space-y-6">
      {/* Sections Reordering with Arrows */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GripVertical className="text-gray-400" size={20} />
          ترتيب الأقسام
        </h3>
        
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div
              key={`${section.id}-${index}`}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="تحريك لأعلى"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === sections.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="تحريك لأسفل"
                >
                  <ArrowDown size={16} />
                </button>
              </div>
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${section.color}`}>
                <span className="text-lg">{section.icon}</span>
              </div>
              
              <div className="flex-1">
                <span className="font-semibold text-gray-800">{section.label}</span>
                <div className="text-xs text-gray-500 mt-1">
                  الترتيب: {index + 1}
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 flex items-center gap-2">
            <span>💡</span>
            <span>استخدم الأسهم لإعادة ترتيب الأقسام. التغييرات ستظهر في المعاينة فوراً!</span>
          </p>
        </div>
      </div>

      {/* Section Settings Navigation */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">إعدادات الأقسام</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`p-4 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                <span className="text-xs leading-tight text-center">{section.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-lg shadow-sm">
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
    </div>
  );
}