import React, { useState } from 'react';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

const sectionLabels: { [key: string]: string } = {
  hero: 'قسم البطل (Hero)',
  featuredProducts: 'المنتجات المميزة',
  bestSellers: 'الأعلى مبيعاً',
  onSale: 'عروض وتخفيضات',
  whyChooseUs: 'لماذا تختارنا',
  faq: 'الأسئلة الشائعة',
  allProducts: 'جميع المنتجات',
};

export default function GeneralSectionSettings() {
  const { storeData, updateSectionOrder } = useStore();
  const { sectionOrder } = storeData.settings;
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newOrder = [...sectionOrder];
    const [movedItem] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedItem);
    updateSectionOrder(newOrder);
  };

  const moveSectionUp = (index: number) => {
    if (index > 0) {
      moveSection(index, index - 1);
    }
  };

  const moveSectionDown = (index: number) => {
    if (index < sectionOrder.length - 1) {
      moveSection(index, index + 1);
    }
  };

  const handleDragStart = (e: React.DragEvent, sectionKey: string) => {
    setDraggedItem(sectionKey);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSectionKey: string) => {
    e.preventDefault();
    if (!draggedItem) return;

    const fromIndex = sectionOrder.indexOf(draggedItem);
    const toIndex = sectionOrder.indexOf(targetSectionKey);
    
    if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
      moveSection(fromIndex, toIndex);
    }
    
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">الإعدادات العامة للأقسام</h3>
        <p className="text-sm text-gray-600">
          قم بترتيب أقسام الصفحة الرئيسية حسب تفضيلك باستخدام الأسهم أو السحب والإفلات
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-gray-700 mb-3">ترتيب الأقسام:</h4>
        {sectionOrder.map((sectionKey, index) => (
          <div
            key={sectionKey}
            className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 transition-all ${
              draggedItem === sectionKey ? 'border-blue-400 bg-blue-50' : 'border-transparent'
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, sectionKey)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, sectionKey)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex items-center gap-3">
              <div className="cursor-move text-gray-400 hover:text-gray-600">
                <GripVertical size={20} />
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  {index + 1}
                </span>
                <span className="font-medium">{sectionLabels[sectionKey]}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => moveSectionUp(index)}
                disabled={index === 0}
                className={`p-1 rounded ${
                  index === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                title="نقل للأعلى"
              >
                <ChevronUp size={18} />
              </button>
              <button
                onClick={() => moveSectionDown(index)}
                disabled={index === sectionOrder.length - 1}
                className={`p-1 rounded ${
                  index === sectionOrder.length - 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                title="نقل للأسفل"
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">💡 نصائح:</h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• اسحب الأقسام لإعادة ترتيبها بسهولة</li>
          <li>• استخدم الأسهم للتحكم الدقيق في الترتيب</li>
          <li>• يمكنك تفعيل/إلغاء تفعيل الأقسام من محرراتها المخصصة</li>
        </ul>
      </div>
    </div>
  );
}