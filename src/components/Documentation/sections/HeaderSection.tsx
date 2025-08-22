import React from 'react';
import { Copy, Check } from 'lucide-react';

interface HeaderSectionProps {
  copyToClipboard: (code: string, id: string) => void;
  copiedCode: string | null;
}

export default function HeaderSection({ copyToClipboard, copiedCode }: HeaderSectionProps) {
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