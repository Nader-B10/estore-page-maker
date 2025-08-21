import React from 'react';
import { StoreSettings, CustomPage } from '../../../../types/store';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface ModernFooterProps {
  settings: StoreSettings;
  customPages: CustomPage[];
}

export default function ModernFooter({ settings, customPages }: ModernFooterProps) {
  return (
    <footer 
      className="relative py-16 px-6 mt-12 text-white overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Store Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-14 h-14 object-cover rounded-xl shadow-lg border-2 border-white/20" />
              )}
              <h3 className="text-2xl font-bold">{settings.storeName}</h3>
            </div>
            <p className="text-white/90 mb-6 leading-relaxed">{settings.description}</p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {settings.contactInfo.email && (
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <span>{settings.contactInfo.email}</span>
                </div>
              )}
              {settings.contactInfo.phone && (
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <span>{settings.contactInfo.phone}</span>
                </div>
              )}
              {settings.contactInfo.address && (
                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <span>{settings.contactInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-xl">روابط سريعة</h4>
            <div className="space-y-3">
              {settings.footerLinks.filter(link => link.isVisible).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-200 group"
                  target={link.type === 'external' ? '_blank' : undefined}
                  rel={link.type === 'external' ? 'noopener noreferrer' : undefined}
                >
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-6 text-xl">ابق على تواصل</h4>
            <p className="text-white/80 mb-4">اشترك للحصول على آخر العروض</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/60 transition-colors"
              />
              <button 
                className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                style={{ backgroundColor: settings.accentColor }}
              >
                اشتراك
              </button>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-4">
            <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110">
              <span className="text-white font-bold">f</span>
            </a>
            <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110">
              <span className="text-white font-bold">t</span>
            </a>
            <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200 transform hover:scale-110">
              <span className="text-white font-bold">i</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/70">
            {settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
          </p>
        </div>
      </div>
    </footer>
  );
}

export const ModernFooterConfig = {
  id: 'modern-footer',
  name: 'الفوتر العصري',
  description: 'فوتر عصري مع تدرجات ألوان وتأثيرات بصرية',
  preview: '/previews/modern-footer.jpg',
  category: 'modern',
  features: ['تدرجات ألوان', 'تأثيرات بصرية', 'نشرة إخبارية', 'تصميم عصري'],
  customizable: {
    colors: true,
    layout: true,
    typography: true
  }
};