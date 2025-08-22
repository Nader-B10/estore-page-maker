import React from 'react';
import { StoreSettings } from '../../../types/store';

interface ProductDetailSettingsProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function ProductDetailSettings({ settings, onUpdateSettings }: ProductDetailSettingsProps) {
  const handleChange = (field: keyof StoreSettings['productDetailSettings'], value: any) => {
    onUpdateSettings({
      ...settings,
      productDetailSettings: {
        ...settings.productDetailSettings,
        [field]: value,
      },
    });
  };

  const { productDetailSettings } = settings;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-6">إعدادات صفحة تفاصيل المنتج</h3>
      
      <div className="space-y-6">
        {/* Display Options */}
        <div>
          <h4 className="font-medium mb-4 text-gray-800">عناصر العرض</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showRating}
                onChange={(e) => handleChange('showRating', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">⭐ التقييمات</span>
                <p className="text-xs text-gray-600">عرض نجوم التقييم</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showReviewsCount}
                onChange={(e) => handleChange('showReviewsCount', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">📊 عدد المراجعات</span>
                <p className="text-xs text-gray-600">عرض عدد التقييمات</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showOriginalPrice}
                onChange={(e) => handleChange('showOriginalPrice', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">💰 السعر الأصلي</span>
                <p className="text-xs text-gray-600">عرض السعر قبل الخصم</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showSavingsAmount}
                onChange={(e) => handleChange('showSavingsAmount', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">💵 مبلغ التوفير</span>
                <p className="text-xs text-gray-600">عرض المبلغ الموفر</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showProductTags}
                onChange={(e) => handleChange('showProductTags', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">🏷️ علامات المنتج</span>
                <p className="text-xs text-gray-600">عرض العلامات والكلمات المفتاحية</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showProductFeatures}
                onChange={(e) => handleChange('showProductFeatures', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">✨ ميزات الخدمة</span>
                <p className="text-xs text-gray-600">شحن مجاني، ضمان، إرجاع</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showProductBadges}
                onChange={(e) => handleChange('showProductBadges', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">🎖️ شارات المنتج</span>
                <p className="text-xs text-gray-600">مميز، الأعلى مبيعاً، عرض</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showProductCategory}
                onChange={(e) => handleChange('showProductCategory', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">📂 فئة المنتج</span>
                <p className="text-xs text-gray-600">عرض فئة المنتج</p>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <h4 className="font-medium mb-4 text-gray-800">أزرار العمل</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showShareButton}
                onChange={(e) => handleChange('showShareButton', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">📤 زر المشاركة</span>
                <p className="text-xs text-gray-600">مشاركة المنتج</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showFavoriteButton}
                onChange={(e) => handleChange('showFavoriteButton', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">❤️ زر المفضلة</span>
                <p className="text-xs text-gray-600">إضافة للمفضلة</p>
              </div>
            </label>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h4 className="font-medium mb-4 text-gray-800">المنتجات ذات الصلة</h4>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showRelatedProducts}
                onChange={(e) => handleChange('showRelatedProducts', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">🔗 المنتجات ذات الصلة</span>
                <p className="text-xs text-gray-600">عرض منتجات مشابهة</p>
              </div>
            </label>

            {productDetailSettings.showRelatedProducts && (
              <div>
                <label className="block text-sm font-medium mb-2">عدد المنتجات ذات الصلة</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={productDetailSettings.relatedProductsLimit}
                  onChange={(e) => handleChange('relatedProductsLimit', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Advanced Options */}
        <div>
          <h4 className="font-medium mb-4 text-gray-800">خيارات متقدمة</h4>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.enableImageZoom}
                onChange={(e) => handleChange('enableImageZoom', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">🔍 تكبير الصورة</span>
                <p className="text-xs text-gray-600">إمكانية تكبير صورة المنتج</p>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={productDetailSettings.showProductDescription}
                onChange={(e) => handleChange('showProductDescription', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="font-medium text-gray-800">📝 وصف المنتج</span>
                <p className="text-xs text-gray-600">عرض الوصف التفصيلي</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}