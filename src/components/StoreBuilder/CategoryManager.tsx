import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Eye, EyeOff, FolderOpen, Image } from 'lucide-react';
import { Category } from '../../types';

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Category) => void;
  onEditCategory: (id: string, category: Category) => void;
  onDeleteCategory: (id: string) => void;
}

export default function CategoryManager({
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: CategoryManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    slug: '',
    isVisible: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      alert('يرجى إدخال اسم الفئة');
      return;
    }

    const slug = formData.slug || generateSlug(formData.name);

    const category: Category = {
      id: editingCategory?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      image: formData.image,
      slug: slug,
      isVisible: formData.isVisible,
      order: editingCategory?.order || categories.length + 1,
      createdAt: editingCategory?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingCategory) {
      onEditCategory(editingCategory.id, category);
    } else {
      onAddCategory(category);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      slug: '',
      isVisible: true,
    });
    setEditingCategory(null);
    setIsModalOpen(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      slug: category.slug,
      isVisible: category.isVisible,
    });
    setIsModalOpen(true);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  };

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">إدارة الفئات</h3>
          <p className="text-sm text-gray-600">أنشئ وأدر فئات المنتجات</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          إضافة فئة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {/* Category Image */}
            <div className="relative h-32 bg-gray-100">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                  <FolderOpen size={32} className="text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  category.isVisible 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {category.isVisible ? 'مرئية' : 'مخفية'}
                </span>
              </div>
            </div>

            {/* Category Info */}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">{category.name}</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                    title="تعديل"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category.id)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                    title="حذف"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{category.description}</p>
              <p className="text-xs text-gray-500">
                الرابط: <code className="bg-gray-100 px-1 rounded">/{category.slug}</code>
              </p>
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200">
            <FolderOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد فئات بعد</h3>
            <p className="text-gray-500 mb-4">ابدأ بإنشاء فئات لتنظيم منتجاتك</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إنشاء أول فئة
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {editingCategory ? 'تعديل الفئة' : 'إنشاء فئة جديدة'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">اسم الفئة *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        name: e.target.value,
                        slug: prev.slug || generateSlug(e.target.value)
                      }));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: إلكترونيات"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">الرابط (Slug) *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="electronics"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف الفئة</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="وصف مختصر للفئة..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">صورة الفئة</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="معاينة"
                    className="mt-2 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium">إظهار الفئة في المتجر</span>
                </label>
              </div>

              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingCategory ? 'حفظ التغييرات' : 'إنشاء الفئة'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}