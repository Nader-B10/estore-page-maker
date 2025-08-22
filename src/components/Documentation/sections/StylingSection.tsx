import React from 'react';
import { Copy, Check } from 'lucide-react';

interface StylingSectionProps {
  copyToClipboard: (code: string, id: string) => void;
  copiedCode: string | null;
}

export default function StylingSection({ copyToClipboard, copiedCode }: StylingSectionProps) {
  const stylingCode = `// استخدام ألوان الثيم المباشرة
<div style={{ backgroundColor: settings.primaryColor }}>
  محتوى بلون أساسي
</div>

// استخدام CSS Variables (مفضل)
<div className="bg-primary text-secondary">
  محتوى بألوان الثيم
</div>

// تدرجات الألوان
<div 
  style={{
    background: \`linear-gradient(135deg, \${settings.primaryColor}, \${settings.secondaryColor})\`
  }}
>
  تدرج ألوان
</div>

// فئات Tailwind الشائعة للمتاجر
className="
  // Layout
  max-w-7xl mx-auto px-6 py-8
  
  // Grid
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
  
  // Flexbox
  flex items-center justify-between
  
  // Typography
  text-2xl font-bold text-gray-800
  
  // Spacing
  mb-6 mt-4 p-6
  
  // Colors
  bg-white text-gray-700 border-gray-200
  
  // Effects
  shadow-lg hover:shadow-xl transition-all duration-200
  
  // Responsive
  hidden md:flex lg:grid-cols-4
"`;

  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🎨 دليل التصميم مع Tailwind</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-blue-800 mb-3">أمثلة على استخدام الألوان والتصميم:</h3>
        <div className="bg-white rounded-lg p-4 relative">
          <button
            onClick={() => copyToClipboard(stylingCode, 'styling-code')}
            className="absolute top-2 left-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {copiedCode === 'styling-code' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          </button>
          <pre className="text-sm text-gray-800 overflow-x-auto pr-10">
            <code>{stylingCode}</code>
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">🎯 فئات Tailwind المهمة:</h3>
          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-green-700">Layout:</strong>
              <code className="block bg-white p-2 rounded mt-1">container, max-w-7xl, mx-auto</code>
            </div>
            <div>
              <strong className="text-green-700">Grid:</strong>
              <code className="block bg-white p-2 rounded mt-1">grid, grid-cols-1, md:grid-cols-3</code>
            </div>
            <div>
              <strong className="text-green-700">Flex:</strong>
              <code className="block bg-white p-2 rounded mt-1">flex, items-center, justify-between</code>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-800 mb-3">🌈 نظام الألوان:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-purple-700">Primary: اللون الأساسي</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-700 rounded"></div>
              <span className="text-purple-700">Secondary: اللون الثانوي</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-purple-700">Accent: لون التأكيد</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 mb-3">💡 نصائح للتصميم المتجاوب:</h3>
        <ul className="text-yellow-700 space-y-2 text-sm">
          <li>• استخدم <code>hidden md:flex</code> لإخفاء/إظهار العناصر</li>
          <li>• استخدم <code>text-sm md:text-lg</code> لأحجام النصوص</li>
          <li>• استخدم <code>p-4 md:p-8</code> للمسافات المتجاوبة</li>
          <li>• اختبر التصميم على جميع الأحجام</li>
        </ul>
      </div>
    </div>
  );
}