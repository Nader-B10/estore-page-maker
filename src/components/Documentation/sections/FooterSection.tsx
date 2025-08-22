import React from 'react';
import { Copy, Check } from 'lucide-react';

interface FooterSectionProps {
  copyToClipboard: (code: string, id: string) => void;
  copiedCode: string | null;
}

export default function FooterSection({ copyToClipboard, copiedCode }: FooterSectionProps) {
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