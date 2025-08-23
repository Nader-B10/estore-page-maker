import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CustomPage } from '../../types/store';

interface PageFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (page: CustomPage) => void;
  editingPage: CustomPage | null;
}

export default function PageForm({ isOpen, onClose, onSave, editingPage }: PageFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    showAllProducts: false,
    metaDescription: '',
  });

  useEffect(() => {
    if (editingPage) {
      setFormData({
        title: editingPage.title,
        slug: editingPage.slug,
        content: editingPage.content,
        showAllProducts: editingPage.showAllProducts,
        metaDescription: editingPage.metaDescription || '',
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        content: '',
        showAllProducts: false,
        metaDescription: '',
      });
    }
  }, [editingPage, isOpen]);

  if (!isOpen) return null;

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !editingPage ? generateSlug(title) : prev.slug
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      alert('يرجى ملء الحقول المطلوبة: العنوان والرابط.');
      return;
    }

    const page: CustomPage = {
      id: editingPage?.id || Date.now().toString(),
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      isDefault: editingPage?.isDefault || false,
      showAllProducts: formData.showAllProducts,
      metaDescription: formData.metaDescription,
    };
    onSave(page);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {editingPage ? 'تعديل الصفحة' : 'إضافة صفحة جديدة'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">عنوان الصفحة *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
                disabled={editingPage?.isDefault}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">رابط الصفحة *</label>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm mr-1">/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  disabled={editingPage?.isDefault}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">وصف الصفحة</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="وصف مختصر عن محتوى الصفحة"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">وصف SEO (اختياري)</label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={2}
              placeholder="وصف الصفحة لمحركات البحث"
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">إعدادات العرض</h4>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.showAllProducts}
                onChange={(e) => setFormData(prev => ({ ...prev, showAllProducts: e.target.checked }))}
              />
              <span>عرض جميع المنتجات في هذه الصفحة</span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {editingPage ? 'حفظ التغييرات' : 'إضافة الصفحة'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}