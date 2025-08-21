import { Product, WhatsAppSettings, StoreSettings } from '../types/store';

export const generateWhatsAppMessage = (
  product: Product,
  settings: StoreSettings
): string => {
  const { whatsapp } = settings;
  let message = whatsapp.customMessage || 'مرحباً، أود الاستفسار عن هذا المنتج:';
  
  message += '\n\n';
  
  if (whatsapp.includeProductName) {
    message += `📦 *${product.name}*\n`;
  }
  
  if (whatsapp.includeProductDescription && product.description) {
    message += `📝 ${product.description}\n`;
  }
  
  if (whatsapp.includeProductPrice) {
    message += `💰 السعر: $${product.price}`;
    if (product.originalPrice && product.originalPrice > product.price) {
      message += ` (بدلاً من $${product.originalPrice})`;
    }
    message += '\n';
  }
  
  if (whatsapp.includeStoreInfo) {
    message += `\n🏪 ${settings.storeName}`;
    if (settings.contactInfo.address) {
      message += `\n📍 ${settings.contactInfo.address}`;
    }
  }
  
  return encodeURIComponent(message.trim());
};

export const generateWhatsAppURL = (
  product: Product,
  settings: StoreSettings
): string => {
  const { whatsapp } = settings;
  const message = generateWhatsAppMessage(product, settings);
  const phoneNumber = `${whatsapp.countryCode}${whatsapp.phoneNumber}`.replace(/\D/g, '');
  
  return `https://wa.me/${phoneNumber}?text=${message}`;
};

export const formatPhoneNumber = (phone: string, countryCode: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  const cleanCountryCode = countryCode.replace(/\D/g, '');
  
  return `+${cleanCountryCode} ${cleanPhone}`;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 8 && cleanPhone.length <= 15;
};

export const getCountryCodes = () => [
  { code: '+966', country: 'السعودية', flag: '🇸🇦' },
  { code: '+971', country: 'الإمارات', flag: '🇦🇪' },
  { code: '+965', country: 'الكويت', flag: '🇰🇼' },
  { code: '+974', country: 'قطر', flag: '🇶🇦' },
  { code: '+973', country: 'البحرين', flag: '🇧🇭' },
  { code: '+968', country: 'عمان', flag: '🇴🇲' },
  { code: '+962', country: 'الأردن', flag: '🇯🇴' },
  { code: '+961', country: 'لبنان', flag: '🇱🇧' },
  { code: '+20', country: 'مصر', flag: '🇪🇬' },
  { code: '+212', country: 'المغرب', flag: '🇲🇦' },
  { code: '+213', country: 'الجزائر', flag: '🇩🇿' },
  { code: '+216', country: 'تونس', flag: '🇹🇳' },
];