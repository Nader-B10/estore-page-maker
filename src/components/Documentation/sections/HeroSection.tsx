import React from 'react';
import { Copy, Check } from 'lucide-react';

interface HeroSectionProps {
  copyToClipboard: (code: string, id: string) => void;
  copiedCode: string | null;
}

export default function HeroSection({ copyToClipboard, copiedCode }: HeroSectionProps) {
  const heroCode = `import React from 'react';
import { StoreSettings } from '../../../../types/store';
import { ArrowLeft, Star, Sparkles } from 'lucide-react';

interface MyCustomHeroProps {
  settings: StoreSettings;
}

export default function MyCustomHero({ settings }: MyCustomHeroProps) {
  const { heroSection } = settings;

  if (!heroSection.enabled) return null;

  return (
    <section 
      className="relative py-20 px-6 text-white overflow-hidden"
      style={{
        backgroundImage: heroSection.backgroundImage 
          ? \`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(\${heroSection.backgroundImage})\`
          : \`linear-gradient(135deg, \${settings.primaryColor}, \${settings.secondaryColor})\`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <Sparkles size={16} />
          <span className="text-sm font-medium">متجر مميز</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {heroSection.title}
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
          {heroSection.subtitle}
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Star size={16} className="text-yellow-400" />
            <span className="text-sm">جودة عالية</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Star size={16} className="text-green-400" />
            <span className="text-sm">شحن مجاني</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Star size={16} className="text-blue-400" />
            <span className="text-sm">ضمان شامل</span>
          </div>
        </div>
        
        <a
          href={heroSection.ctaLink}
          className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-full hover:opacity-90 transition-all duration-200 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          style={{ backgroundColor: settings.accentColor }}
        >
          {heroSection.ctaText}
          <ArrowLeft size={20} />
        </a>
      </div>
    </section>
  );
}

export const MyCustomHeroConfig = {
  id: 'my-custom-hero',
  name: 'هيرو مخصص',
  description: 'قسم هيرو مخصص بتأثيرات جذابة',
  preview: '/previews/my-custom-hero.jpg',
  category: 'custom',
  features: ['تأثيرات متحركة', 'شارات ميزات', 'تصميم جذاب'],
  customizable: {
    colors: true,
    layout: true,
    typography: true,
    features: true
  }
};`;

  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🦸 إنشاء قالب هيرو مخصص</h1>
      
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-purple-800 mb-3">مثال لقسم هيرو متقدم:</h3>
        <div className="bg-white rounded-lg p-4 relative">
          <button
            onClick={() => copyToClipboard(heroCode, 'hero-code')}
            className="absolute top-2 left-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {copiedCode === 'hero-code' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          </button>
          <pre className="text-sm text-gray-800 overflow-x-auto pr-10">
            <code>{heroCode}</code>
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-3">🎨 عناصر التصميم:</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• <strong>Background:</strong> صورة أو تدرج ألوان</li>
            <li>• <strong>Overlay:</strong> طبقة شفافة للوضوح</li>
            <li>• <strong>Animations:</strong> تأثيرات متحركة</li>
            <li>• <strong>CTA Button:</strong> زر واضح للعمل</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">⚡ تحسينات الأداء:</h3>
          <ul className="text-green-700 space-y-2 text-sm">
            <li>• استخدم <code>backdrop-blur-sm</code> للتأثيرات</li>
            <li>• تحقق من تفعيل القسم قبل العرض</li>
            <li>• استخدم <code>transform</code> للحركات</li>
            <li>• اجعل التصميم متجاوب</li>
          </ul>
        </div>
      </div>
    </div>
  );
}