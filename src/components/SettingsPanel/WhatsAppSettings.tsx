import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { defaultWhatsAppSettings } from '../../contexts/StoreContext';

export default function WhatsAppSettings() {
  const { storeData, updateWhatsAppSettings } = useStore();
  const { whatsappSettings = defaultWhatsAppSettings } = storeData;

  const handleChange = (field: string, value: any) => {
    updateWhatsAppSettings({ [field]: value });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MessageCircle size={20} className="text-green-600" />
        إعدادات الشراء عبر الواتساب
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="whatsapp-enabled"
            checked={whatsappSettings.enabled}
            onChange={(e) => handleChange('enabled', e.target.checked)}
            className="w-4 h-4 text-green-600"
          />
          <label htmlFor="whatsapp-enabled" className="text-sm font-medium">
            تفعيل الشراء عبر الواتساب
          </label>
        </div>

        {whatsappSettings.enabled && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Phone size={16} />
                رقم الواتساب
              </label>
              <input
                type="tel"
                value={whatsappSettings.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="+966501234567"
                dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1">
                يجب أن يبدأ الرقم برمز الدولة (مثال: +966 للسعودية)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">نص زر الشراء</label>
              <input
                type="text"
                value={whatsappSettings.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="اشتري عبر الواتساب"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">قالب الرسالة</label>
              <textarea
                value={whatsappSettings.messageTemplate}
                onChange={(e) => handleChange('messageTemplate', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={6}
                placeholder="مرحباً، أريد شراء هذا المنتج..."
              />
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800 mb-2">المتغيرات المتاحة:</p>
                <div className="text-xs text-green-700 space-y-1">
                  <p><code className="bg-green-100 px-1 rounded">{'{productName}'}</code> - اسم المنتج</p>
                  <p><code className="bg-green-100 px-1 rounded">{'{price}'}</code> - سعر المنتج</p>
                  <p><code className="bg-green-100 px-1 rounded">{'{description}'}</code> - وصف المنتج</p>
                  <p><code className="bg-green-100 px-1 rounded">{'{productUrl}'}</code> - رابط المنتج</p>
                  <p><code className="bg-green-100 px-1 rounded">{'{storeName}'}</code> - اسم المتجر</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}