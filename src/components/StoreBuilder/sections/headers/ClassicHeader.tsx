import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { MessageCircle, Menu } from 'lucide-react';

interface ClassicHeaderProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function ClassicHeader({ settings, customPages }: ClassicHeaderProps) {
  return (
    <header 
      className="py-4 px-6 text-white shadow-lg"
      style={{ backgroundColor: settings.primaryColor }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {settings.logo && (
              <img 
                src={settings.logo} 
                alt="Logo" 
                className="w-10 h-10 object-cover rounded-lg" 
              />
            )}
            <div>
              <h1 className="text-xl font-bold">{settings.storeName}</h1>
              <p className="text-sm opacity-90">{settings.description}</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {settings.headerLinks.filter(link => link.isVisible).map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-white hover:opacity-80 transition-opacity font-medium"
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
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MessageCircle size={18} />
              تواصل معنا
            </a>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export const ClassicHeaderConfig = {
  id: 'classic-header',
  name: 'الهيدر الكلاسيكي',
  description: 'هيدر بسيط وأنيق مناسب لجميع أنواع المتاجر',
  preview: '/previews/classic-header.jpg',
  category: 'classic',
  features: ['بساطة', 'وضوح', 'تصميم متجاوب'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};