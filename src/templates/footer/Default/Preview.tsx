import React from 'react';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { storeName, description, contactInfo, footerText } = settings;
  const theme = {
    bg: 'bg-gray-800',
    text: 'text-white',
    subtleText: 'text-gray-400',
    hoverText: 'hover:text-white',
    borderColor: 'border-gray-700'
  }

  return (
    <footer className={`${theme.bg} ${theme.text} mt-16`}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-2">{storeName}</h3>
            <p className={theme.subtleText}>{description}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#products" className={`${theme.subtleText} ${theme.hoverText}`}>المنتجات</a></li>
              <li><a href="#why-us" className={`${theme.subtleText} ${theme.hoverText}`}>لماذا نحن</a></li>
              <li><a href="#faq" className={`${theme.subtleText} ${theme.hoverText}`}>الأسئلة الشائعة</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
            <ul className={`space-y-2 ${theme.subtleText}`}>
              {contactInfo.email && <li>البريد: <a href={`mailto:${contactInfo.email}`} className={theme.hoverText}>{contactInfo.email}</a></li>}
              {contactInfo.phone && <li>الهاتف: {contactInfo.phone}</li>}
              {contactInfo.address && <li>العنوان: {contactInfo.address}</li>}
            </ul>
          </div>
        </div>
        <div className={`mt-8 pt-6 ${theme.borderColor} border-t text-center text-gray-500`}>
          <p>{footerText || `© ${new Date().getFullYear()} ${storeName}. جميع الحقوق محفوظة.`}</p>
        </div>
      </div>
    </footer>
  );
};
