import React from 'react';
import { Layout, Zap, Palette, Code } from 'lucide-react';

export default function OverviewSection() {
  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🚀 دليل إنشاء القوالب المخصصة</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-blue-800 mb-3">مرحباً بك في دليل المطور!</h2>
        <p className="text-blue-700">
          هذا الدليل سيعلمك كيفية إنشاء قوالب مخصصة (هيدر، فوتر، هيرو) وإضافتها لأداة بناء المتاجر.
          النظام مصمم ليكون بسيطاً ومرناً مثل Elementor أو أدوات البناء الشهيرة.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 ما ستتعلمه:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <Layout className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-semibold mb-2">إنشاء قوالب الهيدر والفوتر</h3>
          <p className="text-gray-600 text-sm">تعلم كيفية إنشاء قوالب احترافية للهيدر والفوتر</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <Zap className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="font-semibold mb-2">قوالب الهيرو المتقدمة</h3>
          <p className="text-gray-600 text-sm">إنشاء أقسام هيرو جذابة ومتحركة</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <Palette className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="font-semibold mb-2">التصميم مع Tailwind</h3>
          <p className="text-gray-600 text-sm">استخدام Tailwind CSS لتصميم احترافي</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <Code className="w-8 h-8 text-red-600 mb-3" />
          <h3 className="font-semibold mb-2">التسجيل والتصدير</h3>
          <p className="text-gray-600 text-sm">كيفية تسجيل القوالب وتصديرها كـ HTML ثابت</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">🏗️ هيكل النظام:</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <pre className="text-sm text-gray-700 overflow-x-auto">
{`src/
├── components/StoreBuilder/sections/
│   ├── headers/          # قوالب الهيدر
│   │   ├── ModernHeader1.tsx
│   │   ├── ClassicHeader.tsx
│   │   └── YourNewHeader.tsx
│   ├── footers/          # قوالب الفوتر
│   │   ├── DefaultFooter.tsx
│   │   └── YourNewFooter.tsx
│   └── hero/             # قوالب الهيرو
│       ├── HeroVariantA.tsx
│       └── YourNewHero.tsx
├── utils/
│   └── componentRegistry.ts  # سجل المكونات
└── types/store.ts           # أنواع البيانات`}
        </pre>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
        <h3 className="font-semibold text-yellow-800 mb-2">💡 نصائح مهمة:</h3>
        <ul className="text-yellow-700 space-y-1 text-sm">
          <li>• استخدم Tailwind CSS للتصميم السريع والمتجاوب</li>
          <li>• اتبع نمط التسمية المتسق للمكونات</li>
          <li>• اختبر القوالب في المعاينة قبل التصدير</li>
          <li>• تأكد من دعم جميع الثيمات والألوان</li>
        </ul>
      </div>
    </div>
  );
}