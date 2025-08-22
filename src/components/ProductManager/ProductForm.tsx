import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Product, StoreSettings } from '../../types/store';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  editingProduct: Product | null;
  settings: StoreSettings;
}

export default function ProductForm({ isOpen, onClose, onSave, editingProduct, settings }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '', description: '', price: 0, originalPrice: 0, category: '', image: '',
    isFeatured: false, isBestSeller: false, isOnSale: false, discountPercentage: 0, tags: [] as string[],
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name, description: editingProduct.description, price: editingProduct.price,
        originalPrice: editingProduct.originalPrice || 0, category: editingProduct.category, image: editingProduct.image,
        isFeatured: editingProduct.isFeatured, isBestSeller: editingProduct.isBestSeller, isOnSale: editingProduct.isOnSale,
        discountPercentage: editingProduct.discountPercentage || 0, tags: editingProduct.tags,
      });
    } else {
      setFormData({
        name: '', description: '', price: 0, originalPrice: 0, category: '', image: '',
        isFeatured: false, isBestSeller: false, isOnSale: false, discountPercentage: 0, tags: [],
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert('يرجى ملء الحقول المطلوبة: اسم المنتج، السعر، والصورة.');
      return;
    }
    const product: Product = {
      id: editingProduct?.id || Date.now().toString(),
      ...formData,
      originalPrice: formData.originalPrice || undefined,
      discountPercentage: formData.discountPercentage || undefined,
    };
    onSave(product);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">اسم المنتج *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الفئة</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الوصف</label>
            <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="w-full p-2 border border-gray-300 rounded-lg" rows={3} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">السعر الحالي *</label>
              <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))} className="w-full p-2 border border-gray-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">السعر الأصلي</label>
              <input type="number" step="0.01" value={formData.originalPrice} onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))} className="w-full p-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">صورة المنتج *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border border-gray-300 rounded-lg" />
            {formData.image && <img src={formData.image} alt="معاينة" className="mt-2 w-full h-32 object-cover rounded-lg" />}
          </div>
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">إعدادات العرض</h4>
            <div className="space-y-3">
              {settings.sections.featuredProducts.enabled && <label className="flex items-center gap-2"><input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))} /><span>منتج مميز</span></label>}
              {settings.sections.bestSellers.enabled && <label className="flex items-center gap-2"><input type="checkbox" checked={formData.isBestSeller} onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))} /><span>من الأعلى مبيعاً</span></label>}
              {settings.sections.onSale.enabled && <label className="flex items-center gap-2"><input type="checkbox" checked={formData.isOnSale} onChange={(e) => setFormData(prev => ({ ...prev, isOnSale: e.target.checked }))} /><span>عليه عرض/تخفيض</span></label>}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">{editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}</button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
