import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

interface DefaultFooterProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function DefaultFooter({ settings, customPages }: DefaultFooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Store Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-10 h-10 object-cover rounded" />
              )}
              <h3 className="text-xl font-bold">{settings.storeName}</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">{settings.description}</p>
            
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
            <h3 className="font-semibold mb-4 text-lg">روابط سريعة</h3>
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
            <h3 className="font-semibold mb-4 text-lg">تابعنا</h3>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            {settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

export const DefaultFooterConfig = {
  id: 'default-footer',
  name: 'الفوتر الافتراضي',
  description: 'فوتر شامل مع معلومات الاتصال ووسائل التواصل',
  preview: '/previews/default-footer.jpg',
  category: 'complete',
  features: ['معلومات الاتصال', 'وسائل التواصل', 'روابط سريعة'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};