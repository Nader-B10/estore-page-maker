import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { storeName, logo } = settings;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 text-xl font-bold text-gray-800">
          {logo && <img src={logo} alt="Logo" className="h-10" />}
          <span>{storeName}</span>
        </a>
        <nav className="hidden md:flex gap-6">
          <a href="#products" className="text-gray-600 hover:text-gray-900">المنتجات</a>
          <a href="#why-us" className="text-gray-600 hover:text-gray-900">لماذا نحن</a>
          <a href="#faq" className="text-gray-600 hover:text-gray-900">الأسئلة الشائعة</a>
        </nav>
        <button className="text-gray-700" aria-label="Shopping Cart">
          <ShoppingCart size={24} />
        </button>
      </div>
    </header>
  );
};
