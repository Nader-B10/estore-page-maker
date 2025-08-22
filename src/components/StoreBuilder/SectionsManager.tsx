import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { GripVertical } from 'lucide-react';
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
    { id: 'hero', label: 'قسم البطل (Hero)', icon: '🦸', color: 'bg-purple-100 text-purple-700' },
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newOrder = Array.from(settings.sectionsOrder);
    const [reorderedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, reorderedItem);

    onUpdateSettings({
      ...settings,
      sectionsOrder: newOrder
    });
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Sections Reordering */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GripVertical className="text-gray-400" size={20} />
          ترتيب الأقسام (اسحب وأفلت)
        </h3>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`space-y-3 p-4 rounded-lg transition-colors ${
                  snapshot.isDraggingOver ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                }`}
              >
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center gap-4 p-4 bg-white rounded-lg border-2 transition-all duration-200 ${
                          snapshot.isDragging 
                            ? 'shadow-xl border-blue-300 rotate-2 scale-105' 
                            : 'shadow-sm border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <GripVertical size={20} />
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 flex items-center gap-2">
            <span>💡</span>
            <span>اسحب الأقسام لإعادة ترتيبها. التغييرات ستظهر في المعاينة فوراً!</span>
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
              onClick={() => setActiveSection(section.id)}
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