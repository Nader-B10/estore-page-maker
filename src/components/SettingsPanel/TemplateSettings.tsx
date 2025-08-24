/**
 * مكون إعدادات القوالب
 * يسمح للمستخدم بالتبديل بين القوالب المختلفة
 */

import React from 'react';
import { Palette, CheckCircle } from 'lucide-react';
import { useTemplate } from '../../contexts/TemplateContext';

export default function TemplateSettings() {
  const { currentTemplate, availableTemplates, switchTemplate } = useTemplate();

  const handleTemplateSelect = (templateId: string) => {
    if (window.confirm('هل أنت متأكد من تغيير القالب؟ سيتم تطبيق الإعدادات الافتراضية للقالب الجديد.')) {
      switchTemplate(templateId);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Palette size={20} />
        اختيار القالب
      </h3>
      
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>ملاحظة:</strong> تغيير القالب سيؤثر على التصميم العام للمتجر وقد يتطلب إعادة تخصيص بعض الإعدادات.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableTemplates.map((template) => {
          const isSelected = template.id === currentTemplate;
          return (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected 
                  ? 'border-blue-600 shadow-lg bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-3 bg-blue-600 text-white rounded-full p-1">
                  <CheckCircle size={16} />
                </div>
              )}
              
              <div className="text-center">
                <h4 className="font-bold text-lg mb-2">{template.displayName}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                
                <div className="flex justify-center items-center gap-1 h-8 mb-3">
                  <div
                    className="w-1/3 h-full rounded-l-md"
                    style={{ backgroundColor: template.defaultSettings?.primaryColor || '#3B82F6' }}
                  />
                  <div
                    className="w-1/3 h-full"
                    style={{ backgroundColor: template.defaultSettings?.secondaryColor || '#1E40AF' }}
                  />
                  <div
                    className="w-1/3 h-full rounded-r-md"
                    style={{ backgroundColor: template.defaultSettings?.accentColor || '#F59E0B' }}
                  />
                </div>
                
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  template.category === 'creative' ? 'bg-purple-100 text-purple-800' :
                  template.category === 'business' ? 'bg-blue-100 text-blue-800' :
                  template.category === 'minimal' ? 'bg-gray-100 text-gray-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {template.category === 'creative' ? 'إبداعي' :
                   template.category === 'business' ? 'تجاري' :
                   template.category === 'minimal' ? 'بسيط' : 'عصري'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}