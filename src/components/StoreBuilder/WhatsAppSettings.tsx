import React from 'react';
import { MessageCircle, Phone, Settings } from 'lucide-react';
import { StoreSettings } from '../../types/store';
import { getCountryCodes, formatPhoneNumber, validatePhoneNumber } from '../../utils/whatsapp';

interface WhatsAppSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function WhatsAppSettings({ settings, onUpdateSettings }: WhatsAppSettingsProps) {
  const handleWhatsAppChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      whatsapp: {
        ...settings.whatsapp,
        [field]: value,
      },
    });
  };

  const countryCodes = getCountryCodes();

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-6 h-6 text-green-600" />
        <h3 className="text-lg font-semibold">إعدادات الواتساب</h3>
      </div>

      <div className="space-y-6">
        {/* Enable WhatsApp */}
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div>
            <h4 className="font-medium text-green-900">تفعيل الواتساب</h4>
            <p className="text-sm text-green-700">السماح للعملاء بالتواصل عبر الواتساب</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.whatsapp.enabled}
              onChange={(e) => handleWhatsAppChange('enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        {settings.whatsapp.enabled && (
          <>
            {/* Phone Number */}
            <div className="space-y-4">
              <h4 className="font-medium">رقم الهاتف</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">كود الدولة</label>
                  <select
                    value={settings.whatsapp.countryCode}
                    onChange={(e) => handleWhatsAppChange('countryCode', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code} {country.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
                  <input
                    type="tel"
                    value={settings.whatsapp.phoneNumber}
                    onChange={(e) => handleWhatsAppChange('phoneNumber', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="501234567"
                  />
                  {settings.whatsapp.phoneNumber && (
                    <p className="text-sm text-gray-600 mt-1">
                      الرقم الكامل: {formatPhoneNumber(settings.whatsapp.phoneNumber, settings.whatsapp.countryCode)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="space-y-4">
              <h4 className="font-medium">محتوى الرسالة</h4>
              
              <div>
                <label className="block text-sm font-medium mb-2">الرسالة المخصصة</label>
                <textarea
                  value={settings.whatsapp.customMessage}
                  onChange={(e) => handleWhatsAppChange('customMessage', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="مرحباً، أود الاستفسار عن هذا المنتج:"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h5 className="text-sm font-medium">تضمين في الرسالة:</h5>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsapp.includeProductName}
                      onChange={(e) => handleWhatsAppChange('includeProductName', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">اسم المنتج</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsapp.includeProductDescription}
                      onChange={(e) => handleWhatsAppChange('includeProductDescription', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">وصف المنتج</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsapp.includeProductPrice}
                      onChange={(e) => handleWhatsAppChange('includeProductPrice', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">سعر المنتج</span>
                  </label>
                </div>

                <div className="space-y-3">
                  <h5 className="text-sm font-medium">معلومات إضافية:</h5>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsapp.includeProductImage}
                      onChange={(e) => handleWhatsAppChange('includeProductImage', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">صورة المنتج</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsapp.includeStoreInfo}
                      onChange={(e) => handleWhatsAppChange('includeStoreInfo', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">معلومات المتجر</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Button Settings */}
            <div className="space-y-4">
              <h4 className="font-medium">إعدادات الزر</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">نص الزر</label>
                  <input
                    type="text"
                    value={settings.whatsapp.buttonText}
                    onChange={(e) => handleWhatsAppChange('buttonText', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="اشتري عبر الواتساب"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">نمط الزر</label>
                  <select
                    value={settings.whatsapp.buttonStyle}
                    onChange={(e) => handleWhatsAppChange('buttonStyle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="primary">أساسي</option>
                    <option value="secondary">ثانوي</option>
                    <option value="success">أخضر</option>
                    <option value="whatsapp">واتساب</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">موضع الزر</label>
                <select
                  value={settings.whatsapp.position}
                  onChange={(e) => handleWhatsAppChange('position', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="product">في بطاقة المنتج فقط</option>
                  <option value="floating">زر عائم في الصفحة</option>
                  <option value="both">كلاهما</option>
                </select>
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">معاينة الرسالة</h4>
              <div className="bg-white p-3 rounded border text-sm">
                <p>{settings.whatsapp.customMessage || 'مرحباً، أود الاستفسار عن هذا المنتج:'}</p>
                <br />
                {settings.whatsapp.includeProductName && <p>📦 *اسم المنتج*</p>}
                {settings.whatsapp.includeProductDescription && <p>📝 وصف المنتج</p>}
                {settings.whatsapp.includeProductPrice && <p>💰 السعر: $XX</p>}
                {settings.whatsapp.includeStoreInfo && (
                  <>
                    <br />
                    <p>🏪 {settings.storeName}</p>
                    {settings.contactInfo.address && <p>📍 {settings.contactInfo.address}</p>}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}