import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { MessageCircle } from 'lucide-react';

interface ModernHeader1Props {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function ModernHeader1({ settings, customPages }: ModernHeader1Props) {
  return (
    <header 
      className="py-6 px-6 text-white relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {settings.logo && (
              <div className="relative">
                <img 
                  src={settings.logo} 
                  alt="Logo" 
                  className="w-14 h-14 object-cover rounded-xl shadow-lg border-2 border-white/20" 
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent"></div>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold mb-1 drop-shadow-sm">{settings.storeName}</h1>
              <p className="text-sm opacity-90 drop-shadow-sm">{settings.description}</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {settings.headerLinks.filter(link => link.isVisible).map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-white hover:text-opacity-80 transition-all duration-200 font-medium relative group"
                target={link.type === 'external' ? '_blank' : undefined}
                rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
              >
                {link.text}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>
          
          {settings.whatsappSettings.enabled && settings.whatsappSettings.phoneNumber && (
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${settings.whatsappSettings.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <MessageCircle size={20} />
                <span className="font-medium">تواصل معنا</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export const ModernHeader1Config = {
  id: 'modern-header-1',
  name: 'الهيدر العصري المتقدم',
  description: 'هيدر عصري مع تأثيرات بصرية وتدرجات ألوان',
  preview: '/previews/modern-header-1.jpg',
  category: 'modern',
  features: ['تدرجات ألوان', 'تأثيرات بصرية', 'تصميم متجاوب', 'أنيميشن'],
  customizable: {
    colors: true,
    layout: false,
    typography: true
  }
};