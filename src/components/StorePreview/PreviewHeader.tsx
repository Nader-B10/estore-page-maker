import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { StoreSettings } from '../../types/store';

interface PreviewHeaderProps {
  settings: StoreSettings;
}

export default function PreviewHeader({ settings }: PreviewHeaderProps) {
  const { storeName, logo } = settings;
  const { header } = settings.sections;

  if (!header.enabled) {
    return null;
  }

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
        <button className="text-gray-700" aria-label="Shopping Cart">
          <ShoppingCart size={24} />
        </button>
      </div>
    </header>
  );
}
