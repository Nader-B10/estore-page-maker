import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { MessageCircle, Search } from 'lucide-react';

interface MinimalHeaderProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function MinimalHeader({ settings, customPages }: MinimalHeaderProps) {
  return (
    <header className="py-6 px-6 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {settings.logo && (
              <img 
                src={settings.logo} 
                alt="Logo" 
                className="w-12 h-12 object-cover rounded-lg shadow-sm" 
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{settings.storeName}</h1>
              <p className="text-sm text-gray-600">{settings.description}</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="البحث في المنتجات..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {settings.headerLinks.filter(link => link.isVisible).map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                target={link.type === 'external' ? '_blank' : undefined}
                rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
              >
                {link.text}
              </a>
            ))}
          </nav>
          
          {settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber && (
            <a
              href={`https://wa.me/${settings.whatsappSettings.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              <MessageCircle size={20} />
              تواصل معنا
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export const MinimalHeaderConfig = {
  id: 'minimal-header',
  name: 'الهيدر البسيط',
  description: 'هيدر نظيف وبسيط مع شريط بحث',
  preview: '/previews/minimal-header.jpg',
  category: 'minimal',
  features: ['شريط بحث', 'تصميم نظيف', 'بساطة'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};