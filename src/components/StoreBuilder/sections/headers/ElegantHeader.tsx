import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { MessageCircle, Search, User, Heart, ShoppingBag } from 'lucide-react';

interface ElegantHeaderProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function ElegantHeader({ settings, customPages }: ElegantHeaderProps) {
  return (
    <header className="bg-white shadow-lg border-b-4 border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-50 py-2 px-6 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-gray-600">
            {settings.contactInfo.email && (
              <span>📧 {settings.contactInfo.email}</span>
            )}
            {settings.contactInfo.phone && (
              <span>📞 {settings.contactInfo.phone}</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <User size={16} />
            </button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              {settings.logo && (
                <div className="relative">
                  <img 
                    src={settings.logo} 
                    alt="Logo" 
                    className="w-16 h-16 object-cover rounded-xl shadow-md border-2 border-gray-100" 
                  />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">{settings.storeName}</h1>
                <p className="text-gray-600 text-sm">{settings.description}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappSettings.phoneNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <MessageCircle size={20} />
                  <span className="font-medium">تواصل معنا</span>
                </a>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg"
              />
              <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-full text-white font-medium transition-colors"
                style={{ backgroundColor: settings.primaryColor }}
              >
                بحث
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center">
            <div className="flex items-center gap-8 bg-gray-50 px-8 py-4 rounded-full">
              {settings.headerLinks.filter(link => link.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-lg relative group"
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                >
                  {link.text}
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export const ElegantHeaderConfig = {
  id: 'elegant-header',
  name: 'الهيدر الأنيق المتقدم',
  description: 'هيدر أنيق مع شريط علوي وبحث متقدم',
  preview: '/previews/elegant-header.jpg',
  category: 'elegant',
  features: ['شريط علوي', 'بحث متقدم', 'تصميم أنيق', 'أيقونات تفاعلية'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};