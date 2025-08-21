import React, { useState } from 'react';
import { X, Code, FileText, Palette, Layout, Zap, Copy, Check } from 'lucide-react';

interface DocumentationViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentationViewer({ isOpen, onClose }: DocumentationViewerProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: 'overview', title: 'نظرة عامة', icon: FileText },
    { id: 'header', title: 'إنشاء هيدر', icon: Layout },
    { id: 'footer', title: 'إنشاء فوتر', icon: Layout },
    { id: 'hero', title: 'إنشاء هيرو', icon: Zap },
    { id: 'styling', title: 'التصميم', icon: Palette },
    { id: 'registry', title: 'التسجيل', icon: Code },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">دليل المطور</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'header' && <HeaderSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'footer' && <FooterSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'hero' && <HeroSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'styling' && <StylingSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'registry' && <RegistrySection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
        </div>
      </div>
    </div>
  );
}

// Overview Section
function OverviewSection() {
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

// Header Section
function HeaderSection({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, id: string) => void; copiedCode: string | null }) {
  const headerCode = `import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { MessageCircle, Menu } from 'lucide-react';

interface MyCustomHeaderProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function MyCustomHeader({ settings, customPages }: MyCustomHeaderProps) {
  return (
    <header className="bg-white shadow-lg py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo & Store Info */}
          <div className="flex items-center gap-4">
            {settings.logo && (
              <img 
                src={settings.logo} 
                alt="Logo" 
                className="w-12 h-12 object-cover rounded-lg" 
              />
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {settings.storeName}
              </h1>
              <p className="text-sm text-gray-600">
                {settings.description}
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {settings.headerLinks.filter(link => link.isVisible).map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                target={link.type === 'external' ? '_blank' : undefined}
                rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
              >
                {link.text}
              </a>
            ))}
          </nav>
          
          {/* WhatsApp Button */}
          {settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber && (
            <a
              href={\`https://wa.me/\${settings.whatsappSettings.phoneNumber}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MessageCircle size={18} />
              تواصل معنا
            </a>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export const MyCustomHeaderConfig = {
  id: 'my-custom-header',
  name: 'هيدر مخصص',
  description: 'هيدر مخصص بتصميم فريد',
  preview: '/previews/my-custom-header.jpg',
  category: 'custom',
  features: ['تصميم مخصص', 'متجاوب', 'واتساب'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};`;

  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🎨 إنشاء قالب هيدر مخصص</h1>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 الخطوات:</h2>
      
      <div className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-3">1. إنشاء ملف المكون</h3>
          <p className="text-blue-700 mb-3">
            أنشئ ملف جديد في <code>src/components/StoreBuilder/sections/headers/</code>
          </p>
          <div className="bg-white rounded-lg p-4 relative">
            <button
              onClick={() => copyToClipboard(headerCode, 'header-code')}
              className="absolute top-2 left-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {copiedCode === 'header-code' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            </button>
            <pre className="text-sm text-gray-800 overflow-x-auto pr-10">
              <code>{headerCode}</code>
            </pre>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">2. النقاط المهمة:</h3>
          <ul className="text-green-700 space-y-2">
            <li>• <strong>Props:</strong> استقبل <code>settings</code> و <code>customPages</code></li>
            <li>• <strong>Logo:</strong> تحقق من وجود الشعار قبل عرضه</li>
            <li>• <strong>Navigation:</strong> اعرض الروابط المرئية فقط</li>
            <li>• <strong>WhatsApp:</strong> تحقق من تفعيل الواتساب</li>
            <li>• <strong>Responsive:</strong> استخدم فئات Tailwind للتجاوب</li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-800 mb-3">3. استخدام الثيمات:</h3>
          <div className="bg-white rounded-lg p-4">
            <pre className="text-sm text-gray-800">
{`// استخدام ألوان الثيم
style={{ backgroundColor: settings.primaryColor }}
style={{ color: settings.secondaryColor }}

// أو استخدام CSS Variables
className="bg-primary text-secondary"`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// Footer Section
function FooterSection({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, id: string) => void; copiedCode: string | null }) {
  const footerCode = `import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { Mail, Phone, MapPin } from 'lucide-react';

interface MyCustomFooterProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function MyCustomFooter({ settings, customPages }: MyCustomFooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Store Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-10 h-10 object-cover rounded" />
              )}
              <h3 className="text-xl font-bold">{settings.storeName}</h3>
            </div>
            <p className="text-gray-300 mb-4">{settings.description}</p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              {settings.contactInfo.email && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail size={16} />
                  <span>{settings.contactInfo.email}</span>
                </div>
              )}
              {settings.contactInfo.phone && (
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone size={16} />
                  <span>{settings.contactInfo.phone}</span>
                </div>
              )}
              {settings.contactInfo.address && (
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin size={16} />
                  <span>{settings.contactInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">روابط سريعة</h4>
            <div className="space-y-2">
              {settings.footerLinks.filter(link => link.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="block text-gray-300 hover:text-white transition-colors"
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">تابعنا</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <span className="text-sm font-bold">t</span>
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <span className="text-sm font-bold">i</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            {settings.footerText || \`© \${new Date().getFullYear()} \${settings.storeName}. جميع الحقوق محفوظة.\`}
          </p>
        </div>
      </div>
    </footer>
  );
}

export const MyCustomFooterConfig = {
  id: 'my-custom-footer',
  name: 'فوتر مخصص',
  description: 'فوتر مخصص بتصميم فريد',
  preview: '/previews/my-custom-footer.jpg',
  category: 'custom',
  features: ['معلومات شاملة', 'وسائل التواصل', 'روابط سريعة'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};`;

  return (
    <div className="prose prose-lg max-w-none">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🦶 إنشاء قالب فوتر مخصص</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-blue-800 mb-3">مثال كامل لفوتر مخصص:</h3>
        <div className="bg-white rounded-lg p-4 relative">
          <button
            onClick={() => copyToClipboard(footerCode, 'footer-code')}
            className="absolute top-2 left-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {copiedCode === 'footer-code' ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          </button>
          <pre className="text-sm text-gray-800 overflow-x-auto pr-10">
            <code>{footerCode}</code>
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-800 mb-3">✅ أفضل الممارسات:</h3>
          <ul className="text-green-700 space-y-2 text-sm">
            <li>• استخدم Grid Layout للتنظيم</li>
            <li>• اعرض معلومات الاتصال إذا كانت متوفرة</li>
            <li>• أضف روابط وسائل التواصل الاجتماعي</li>
            <li>• استخدم ألوان داكنة للفوتر عادة</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-yellow-800 mb-3">⚠️ تجنب هذه الأخطاء:</h3>
          <ul className="text-yellow-700 space-y-2 text-sm">
            <li>• لا تعرض معلومات فارغة</li>
            <li>• لا تنس التحقق من الروابط المرئية</li>
            <li>• لا تستخدم ألوان غير متباينة</li>
            <li>• لا تنس التصميم المتجاوب</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Hero Section
function HeroSection({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, id: string) => void; copiedCode: string | null }) {
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

// Styling Section
function StylingSection({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, id: string) => void; copiedCode: string | null }) {
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

// Registry Section
function RegistrySection({ copyToClipboard, copiedCode }: { copyToClipboard: (code: string, id: string) => void; copiedCode: string | null }) {
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