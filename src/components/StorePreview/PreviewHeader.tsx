import React from 'react';
import { MessageCircle } from 'lucide-react';
import { StoreSettings } from '../../types/store';
import { useStore } from '../../contexts/StoreContext';
import { defaultWhatsAppSettings } from '../../contexts/StoreContext';

interface PreviewHeaderProps {
  settings: StoreSettings;
}

export default function PreviewHeader({ settings }: PreviewHeaderProps) {
  const { storeData } = useStore();
  const { whatsappSettings = defaultWhatsAppSettings } = storeData;
  const { storeName, logo } = settings;
  const { header } = settings.sections;

  if (!header.enabled) {
    return null;
  }

  const handleWhatsAppClick = () => {
    if (!whatsappSettings?.enabled) return;
    
    const message = `مرحباً، أريد الاستفسار عن منتجاتكم في متجر ${settings.storeName}`;
    const whatsappUrl = `https://wa.me/${whatsappSettings.phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 text-xl font-bold text-gray-800">
          {logo && <img src={logo} alt="Logo" className="h-10" />}
          <span>{storeName}</span>
        </a>
        <nav className="hidden md:flex gap-6">
          {header.data.links.map(link => (
            <a key={link.id} href={link.link} className="text-gray-600 hover:text-gray-900">{link.text}</a>
          ))}
        </nav>
        <button 
          onClick={handleWhatsAppClick}
          className={`${whatsappSettings?.enabled ? 'text-green-600 hover:text-green-700' : 'text-gray-700'}`} 
          aria-label={whatsappSettings?.enabled ? 'WhatsApp Contact' : 'Contact'}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </header>
  );
}
