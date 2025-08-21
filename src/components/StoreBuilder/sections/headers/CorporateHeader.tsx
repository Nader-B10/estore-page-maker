import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface CorporateHeaderProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function CorporateHeader({ settings, customPages }: CorporateHeaderProps) {
  return (
    <header className="bg-white">
      {/* Top Info Bar */}
      <div className="bg-gray-800 text-white py-2 px-6 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            {settings.contactInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>{settings.contactInfo.phone}</span>
              </div>
            )}
            {settings.contactInfo.email && (
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>{settings.contactInfo.email}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>ساعات العمل: 9:00 - 18:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>تابعنا:</span>
            <div className="flex gap-2">
              <a href="#" className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <span className="text-xs">f</span>
              </a>
              <a href="#" className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <span className="text-xs">t</span>
              </a>
              <a href="#" className="w-6 h-6 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <span className="text-xs">i</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-6 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo & Company Info */}
            <div className="flex items-center gap-6">
              {settings.logo && (
                <img 
                  src={settings.logo} 
                  alt="Logo" 
                  className="w-20 h-20 object-cover rounded-lg shadow-md" 
                />
              )}
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{settings.storeName}</h1>
                <p className="text-gray-600 text-lg">{settings.description}</p>
                {settings.contactInfo.address && (
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <MapPin size={16} />
                    <span className="text-sm">{settings.contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center">
              {settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber && (
                <div className="mb-4">
                  <a
                    href={`https://wa.me/${settings.whatsappSettings.phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-lg font-semibold"
                  >
                    <MessageCircle size={24} />
                    <div className="text-right">
                      <div>تواصل معنا الآن</div>
                      <div className="text-sm opacity-90">استشارة مجانية</div>
                    </div>
                  </a>
                </div>
              )}
              <p className="text-sm text-gray-500">خدمة عملاء 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex justify-center">
            <div className="flex items-center gap-8">
              {settings.headerLinks.filter(link => link.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg px-4 py-2 rounded-lg hover:bg-white hover:shadow-md"
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export const CorporateHeaderConfig = {
  id: 'corporate-header',
  name: 'الهيدر المؤسسي',
  description: 'هيدر مؤسسي احترافي مع معلومات الاتصال الكاملة',
  preview: '/previews/corporate-header.jpg',
  category: 'corporate',
  features: ['شريط معلومات', 'تصميم مؤسسي', 'معلومات شاملة', 'وسائل التواصل'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};