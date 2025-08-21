import React from 'react';
import { Upload } from 'lucide-react';
import { StoreSettings } from '../../types/store';

interface SettingsPanelProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function SettingsPanel({ settings, onUpdateSettings }: SettingsPanelProps) {
  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleContactInfoChange = (field: string, value: string) => {
    onUpdateSettings({
      ...settings,
      contactInfo: {
        ...settings.contactInfo,
        [field]: value,
      },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleChange('logo', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">الإعدادات العامة</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">اسم المتجر</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="اسم المتجر"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">وصف المتجر</label>
            <textarea
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="وصف قصير عن المتجر"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">شعار المتجر</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Upload size={20} />
                رفع الشعار
              </label>
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="w-12 h-12 object-cover rounded" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">أيقونة المتجر (Favicon)</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      handleChange('favicon', e.target?.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="favicon-upload"
              />
              <label
                htmlFor="favicon-upload"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Upload size={20} />
                رفع الأيقونة
              </label>
              {settings.favicon && (
                <img src={settings.favicon} alt="Favicon" className="w-8 h-8 object-cover rounded" />
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">يفضل أن تكون الصورة مربعة (32x32 أو 64x64 بكسل)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">الألوان والمظهر</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">اللون الأساسي</label>
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">اللون الثانوي</label>
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">لون التأكيد</label>
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => handleChange('accentColor', e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">نوع الخط</label>
          <select
            value={settings.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Cairo">Cairo</option>
            <option value="Tajawal">Tajawal</option>
            <option value="Almarai">Almarai</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">نمط التخطيط</label>
          <select
            value={settings.layout}
            onChange={(e) => handleChange('layout', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="grid">شبكة</option>
            <option value="list">قائمة</option>
            <option value="masonry">بناء حجري</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">قالب الرأس</label>
          <select
            value={settings.headerTemplate}
            onChange={(e) => handleChange('headerTemplate', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="classic">الكلاسيكي</option>
            <option value="modern">العصري</option>
            <option value="minimal">البسيط</option>
            <option value="elegant">الأنيق</option>
            <option value="corporate">المؤسسي</option>
            <option value="creative">الإبداعي</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">قالب التذييل</label>
          <select
            value={settings.footerTemplate}
            onChange={(e) => handleChange('footerTemplate', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="default">الافتراضي</option>
            <option value="minimal">البسيط</option>
            <option value="detailed">المفصل</option>
            <option value="modern">العصري</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">إعدادات الواتساب</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={settings.whatsappSettings.enabled}
                onChange={(e) => handleChange('whatsappSettings', {
                  ...settings.whatsappSettings,
                  enabled: e.target.checked
                })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">تفعيل الشراء عبر الواتساب</span>
            </label>
          </div>

          {settings.whatsappSettings.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">رقم الواتساب (مع رمز البلد)</label>
                <input
                  type="tel"
                  value={settings.whatsappSettings.phoneNumber}
                  onChange={(e) => handleChange('whatsappSettings', {
                    ...settings.whatsappSettings,
                    phoneNumber: e.target.value
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="966501234567"
                  dir="ltr"
                />
                <p className="text-xs text-gray-500 mt-1">مثال: 966501234567 (بدون علامة +)</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">قالب الرسالة</label>
                <textarea
                  value={settings.whatsappSettings.messageTemplate}
                  onChange={(e) => handleChange('whatsappSettings', {
                    ...settings.whatsappSettings,
                    messageTemplate: e.target.value
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="مرحباً، أريد شراء هذا المنتج..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  يمكنك استخدام: {'{productName}'}, {'{productPrice}'}, {'{productDescription}'}, {'{storeName}'}
                </p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">ما يتم تضمينه في الرسالة:</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsappSettings.includeProductName}
                      onChange={(e) => handleChange('whatsappSettings', {
                        ...settings.whatsappSettings,
                        includeProductName: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">اسم المنتج</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsappSettings.includeProductDescription}
                      onChange={(e) => handleChange('whatsappSettings', {
                        ...settings.whatsappSettings,
                        includeProductDescription: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">وصف المنتج</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsappSettings.includeProductPrice}
                      onChange={(e) => handleChange('whatsappSettings', {
                        ...settings.whatsappSettings,
                        includeProductPrice: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">سعر المنتج</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.whatsappSettings.includeStoreInfo}
                      onChange={(e) => handleChange('whatsappSettings', {
                        ...settings.whatsappSettings,
                        includeStoreInfo: e.target.checked
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">معلومات المتجر</span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={settings.contactInfo.email}
              onChange={(e) => handleContactInfoChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="example@store.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
            <input
              type="tel"
              value={settings.contactInfo.phone}
              onChange={(e) => handleContactInfoChange('phone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+966 50 123 4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">العنوان</label>
            <textarea
              value={settings.contactInfo.address}
              onChange={(e) => handleContactInfoChange('address', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="الرياض، المملكة العربية السعودية"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نص التذييل</label>
            <input
              type="text"
              value={settings.footerText}
              onChange={(e) => handleChange('footerText', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="جميع الحقوق محفوظة 2024"
            />
          </div>
        </div>
      </div>
    </div>
  );
}