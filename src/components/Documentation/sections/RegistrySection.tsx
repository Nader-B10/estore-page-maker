import React from 'react';
import { Copy, Check } from 'lucide-react';

interface RegistrySectionProps {
  copyToClipboard: (code: string, id: string) => void;
  copiedCode: string | null;
}

export default function RegistrySection({ copyToClipboard, copiedCode }: RegistrySectionProps) {
  const registryCode = `// في ملف componentRegistry.ts

// 1. استيراد المكون الجديد
import MyCustomHeader, { MyCustomHeaderConfig } from '../components/StoreBuilder/sections/headers/MyCustomHeader';

// 2. إضافة المكون للسجل
export const headerComponents: Record<string, {
  component: ComponentType<HeaderComponentProps>;
  config: ComponentConfig;
}> = {
  'modern-header-1': {
    component: ModernHeader1,
    config: ModernHeader1Config
  },
  'classic-header': {
    component: ClassicHeader,
    config: ClassicHeaderConfig
  },
  // إضافة المكون الجديد
  'my-custom-header': {
    component: MyCustomHeader,
    config: MyCustomHeaderConfig
  }
};

// 3. إضافة HTML ثابت للتصدير
export const generateHeaderHTML = (templateId: string, settings: StoreSettings): string => {
  switch (templateId) {
    case 'my-custom-header':
      return \`
        <header class="bg-white shadow-lg py-4 px-6">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                \${settings.logo ? \`<img src="\${settings.logo}" alt="Logo" class="w-12 h-12 object-cover rounded-lg" />\` : ''}
                <div>
                  <h1 class="text-xl font-bold text-gray-800">\${settings.storeName}</h1>
                  <p class="text-sm text-gray-600">\${settings.description}</p>
                </div>
              </div>
              <nav class="hidden md:flex items-center gap-6">
                \${settings.headerLinks.filter(link => link.isVisible).map(link => \`
                  <a href="\${link.url}" class="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                    \${link.text}
                  </a>
                \`).join('')}
              </nav>
            </div>
          </div>
        </header>
      \`;
    
    default:
      // باقي القوالب...
  }
};`;

  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📝 تسجيل المكونات والتصدير</h1>
      
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-red-800 mb-3">خطوات التسجيل والتصدير:</h3>
        <div className="bg-white rounded-lg p-4 relative">
          <button
            onClick={() => copyToClipboard(registryCode, 'registry-code')}
            className="absolute top-2 left-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {copiedCode === 'registry-code' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          </button>
          <pre className="text-sm text-gray-800 overflow-x-auto pr-10">
            <code>{registryCode}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-3">1️⃣ تسجيل المكون:</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• أضف المكون في <code>componentRegistry.ts</code></li>
            <li>• تأكد من استيراد المكون والـ Config</li>
            <li>• استخدم ID فريد للمكون</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">2️⃣ إضافة HTML للتصدير:</h3>
          <ul className="text-green-700 space-y-2 text-sm">
            <li>• أضف case جديد في <code>generateHeaderHTML</code></li>
            <li>• استخدم HTML ثابت بدون React</li>
            <li>• تأكد من استخدام فئات CSS صحيحة</li>
            <li>• اختبر التصدير للتأكد من عمله</li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-800 mb-3">3️⃣ اختبار المكون:</h3>
          <ul className="text-purple-700 space-y-2 text-sm">
            <li>• اختبر المكون في المعاينة</li>
            <li>• تأكد من عمل جميع الثيمات</li>
            <li>• اختبر التصدير كـ HTML</li>
            <li>• تأكد من التجاوب على جميع الأحجام</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
        <h3 className="font-semibold text-yellow-800 mb-3">🎉 تهانينا!</h3>
        <p className="text-yellow-700">
          الآن أصبح لديك قالب مخصص يعمل بكامل الميزات! يمكن للمستخدمين اختياره من قائمة القوالب 
          وسيتم تصديره كـ HTML ثابت يعمل بدون Node.js.
        </p>
      </div>
    </div>
  );
}