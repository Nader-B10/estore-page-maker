import React from 'react';
import { StoreSettings } from '../../../types/store';

interface WhatsAppSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function WhatsAppSettings({ settings, onUpdateSettings }: WhatsAppSettingsProps) {
  const handleChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      whatsappSettings: {
        ...settings.whatsappSettings,
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">إعدادات الواتساب</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={settings.whatsappSettings.enabled}
              onChange={(e) => handleChange('enabled', e.target.checked)}
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
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
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
                onChange={(e) => handleChange('messageTemplate', e.target.value)}
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
                    onChange={(e) => handleChange('includeProductName', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">اسم المنتج</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.whatsappSettings.includeProductDescription}
                    onChange={(e) => handleChange('includeProductDescription', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">وصف المنتج</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.whatsappSettings.includeProductPrice}
                    onChange={(e) => handleChange('includeProductPrice', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">سعر المنتج</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.whatsappSettings.includeStoreInfo}
                    onChange={(e) => handleChange('includeStoreInfo', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  يمكنك استخدام: {'{productName}'}, {'{productPrice}'}, {'{productDescription}'}, {'{productLink}'}, {'{storeName}'}
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.whatsappSettings.includeProductLink}
                    onChange={(e) => handleChange('includeProductLink', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">رابط المنتج</span>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}