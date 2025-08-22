import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { Mail, Phone, MapPin, Clock, Shield, Truck, Headphones } from 'lucide-react';

interface DetailedFooterProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function DetailedFooter({ settings, customPages }: DetailedFooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Store Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-12 h-12 object-cover rounded-lg" />
              )}
              <h3 className="text-2xl font-bold">{settings.storeName}</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">{settings.description}</p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {settings.contactInfo.email && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail size={18} className="text-blue-400" />
                  <span>{settings.contactInfo.email}</span>
                </div>
              )}
              {settings.contactInfo.phone && (
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone size={18} className="text-green-400" />
                  <span>{settings.contactInfo.phone}</span>
                </div>
              )}
              {settings.contactInfo.address && (
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={18} className="text-red-400" />
                  <span>{settings.contactInfo.address}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-300">
                <Clock size={18} className="text-yellow-400" />
                <span>ساعات العمل: 9:00 - 18:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-blue-400">روابط سريعة</h4>
            <div className="space-y-3">
              {settings.footerLinks.filter(link => link.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                >
                  → {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-green-400">خدماتنا</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <Truck size={18} className="text-blue-400" />
                <span>شحن مجاني</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Shield size={18} className="text-green-400" />
                <span>ضمان الجودة</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Headphones size={18} className="text-purple-400" />
                <span>دعم 24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="text-center">
            <h4 className="font-bold mb-2 text-xl">اشترك في النشرة الإخبارية</h4>
            <p className="text-gray-300 mb-4">احصل على آخر العروض والمنتجات الجديدة</p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-4 py-2 rounded-r-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              />
              <button 
                className="px-6 py-2 rounded-l-lg text-white font-medium transition-colors"
                style={{ backgroundColor: settings.primaryColor }}
              >
                اشتراك
              </button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mb-8">
          <h4 className="font-bold mb-4 text-lg">تابعنا على</h4>
          <div className="flex justify-center gap-4">
            <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors transform hover:scale-110">
              <span className="text-white font-bold">f</span>
            </a>
            <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors transform hover:scale-110">
              <span className="text-white font-bold">t</span>
            </a>
            <a href="#" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors transform hover:scale-110">
              <span className="text-white font-bold">i</span>
            </a>
            <a href="#" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors transform hover:scale-110">
              <span className="text-white font-bold">y</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            {settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            تم التطوير بواسطة أداة بناء المتاجر الإلكترونية
          </p>
        </div>
      </div>
    </footer>
  );
}

export const DetailedFooterConfig = {
  id: 'detailed-footer',
  name: 'الفوتر المفصل',
  description: 'فوتر شامل مع جميع المعلومات والخدمات',
  preview: '/previews/detailed-footer.jpg',
  category: 'detailed',
  features: ['معلومات شاملة', 'نشرة إخبارية', 'وسائل التواصل', 'خدمات متعددة'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};