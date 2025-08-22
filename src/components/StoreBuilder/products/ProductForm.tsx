import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Product, StoreSettings } from '../../../types';

interface ProductFormProps {
  product?: Product | null;
  settings: StoreSettings;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({ product, settings, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    category: product?.category || '',
    image: product?.image || '',
    isFeatured: product?.isFeatured || false,
    isBestSeller: product?.isBestSeller || false,
    isOnSale: product?.isOnSale || false,
    discountPercentage: product?.discountPercentage || 0,
    tags: product?.tags || [],
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.image) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const productData: Product = {
      id: product?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: formData.price,
      originalPrice: formData.originalPrice || undefined,
      category: formData.category,
      image: formData.image,
      isFeatured: formData.isFeatured,
      isBestSeller: formData.isBestSeller,
      isOnSale: formData.isOnSale,
      discountPercentage: formData.discountPercentage || undefined,
      tags: formData.tags,
    };

    onSave(productData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">اسم المنتج *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">الفئة</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">السعر الحالي *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">السعر الأصلي (قبل الخصم)</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {formData.isOnSale && (
            <div>
              <label className="block text-sm font-medium mb-2">نسبة الخصم (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discountPercentage}
                onChange={(e) => setFormData(prev => ({ ...prev, discountPercentage: parseFloat(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">العلامات (مفصولة بفاصلة)</label>
            <select
              value={formData.tags.join(', ')}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
              }))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="جديد, مميز, عرض خاص"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">صورة المنتج *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">اختر الفئة</option>
              {settings.categories?.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              )) || []}
            </select>
            {formData.image && (
              <img
                src={formData.image}
                alt="معاينة"
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Product Sections */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">إعدادات العرض</h4>
            <div className="space-y-3">
              {settings.productSections.featured.enabled && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">منتج مميز</span>
                </label>
              )}

              {settings.productSections.bestSellers.enabled && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">من الأعلى مبيعاً</span>
                </label>
              )}

              {settings.productSections.onSale.enabled && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isOnSale}
                    onChange={(e) => setFormData(prev => ({ ...prev, isOnSale: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">عليه عرض/تخفيض</span>
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {product ? 'حفظ التغييرات' : 'إضافة المنتج'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}