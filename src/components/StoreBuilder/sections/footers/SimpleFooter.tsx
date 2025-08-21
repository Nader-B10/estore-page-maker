import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';

interface SimpleFooterProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function SimpleFooter({ settings, customPages }: SimpleFooterProps) {
  return (
    <footer className="bg-gray-100 py-8 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Store Info */}
          <div className="mb-6">
            {settings.logo && (
              <img src={settings.logo} alt="Logo" className="w-12 h-12 object-cover rounded mx-auto mb-3" />
            )}
            <h3 className="text-xl font-bold text-gray-800 mb-2">{settings.storeName}</h3>
            <p className="text-gray-600 max-w-md mx-auto">{settings.description}</p>
          </div>

          {/* Quick Links */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-6">
              {settings.footerLinks.filter(link => link.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          {(settings.contactInfo.email || settings.contactInfo.phone) && (
            <div className="mb-6 text-sm text-gray-600">
              {settings.contactInfo.email && (
                <span className="mr-4">📧 {settings.contactInfo.email}</span>
              )}
              {settings.contactInfo.phone && (
                <span>📞 {settings.contactInfo.phone}</span>
              )}
            </div>
          )}

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              {settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export const SimpleFooterConfig = {
  id: 'simple-footer',
  name: 'الفوتر البسيط',
  description: 'فوتر بسيط ونظيف مع المعلومات الأساسية',
  preview: '/previews/simple-footer.jpg',
  category: 'simple',
  features: ['تصميم بسيط', 'معلومات أساسية', 'روابط سريعة'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};