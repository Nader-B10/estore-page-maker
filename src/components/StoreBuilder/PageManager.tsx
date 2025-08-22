import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Eye, EyeOff, FileText, Calendar } from 'lucide-react';
import { CustomPage } from '../../types/store';

interface PageManagerProps {
  pages: CustomPage[];
  onAddPage: (page: CustomPage) => void;
  onEditPage: (id: string, page: CustomPage) => void;
  onDeletePage: (id: string) => void;
}

export default function PageManager({
  pages,
  onAddPage,
  onEditPage,
  onDeletePage,
}: PageManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    isPublished: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.content) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // Generate slug from title if empty
    const slug = formData.slug || formData.title.toLowerCase()
      .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');

    const page: CustomPage = {
      id: editingPage?.id || Date.now().toString(),
      title: formData.title,
      slug: slug,
      content: formData.content,
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription,
      isPublished: formData.isPublished,
      createdAt: editingPage?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingPage) {
      onEditPage(editingPage.id, page);
    } else {
      onAddPage(page);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      isPublished: true,
    });
    setEditingPage(null);
    setIsModalOpen(false);
  };

  const handleEdit = (page: CustomPage) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      isPublished: page.isPublished,
    });
    setIsModalOpen(true);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">إدارة الصفحات</h3>
          <p className="text-sm text-gray-600">أنشئ وأدر صفحات مخصصة لمتجرك</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          إضافة صفحة
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <FileText size={20} className="text-blue-600" />
                  <h4 className="font-semibold text-lg">{page.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    page.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {page.isPublished ? 'منشور' : 'مسودة'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  الرابط: <code className="bg-gray-100 px-2 py-1 rounded text-xs">/{page.slug}</code>
                </p>
                <p className="text-sm text-gray-500 line-clamp-2">{page.content.substring(0, 150)}...</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(page)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                  title="تعديل"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeletePage(page.id)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  title="حذف"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 border-t pt-3">
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>تم الإنشاء: {new Date(page.createdAt).toLocaleDateString('ar-SA')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>آخر تحديث: {new Date(page.updatedAt).toLocaleDateString('ar-SA')}</span>
              </div>
            </div>
          </div>
        ))}

        {pages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد صفحات بعد</h3>
            <p className="text-gray-500 mb-4">ابدأ بإنشاء صفحات مخصصة لمتجرك</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              إنشاء أول صفحة
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {editingPage ? 'تعديل الصفحة' : 'إنشاء صفحة جديدة'}
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
                  <label className="block text-sm font-medium mb-2">عنوان الصفحة *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        title: e.target.value,
                        slug: prev.slug || generateSlug(e.target.value)
                      }));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: من نحن"
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
                    placeholder="about-us"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">سيكون الرابط: yourstore.com/{formData.slug}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">محتوى الصفحة *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={12}
                  placeholder="اكتب محتوى الصفحة هنا..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">يمكنك استخدام HTML للتنسيق المتقدم</p>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">إعدادات SEO (اختيارية)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">عنوان SEO</label>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="عنوان الصفحة في محركات البحث"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">وصف SEO</label>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="وصف مختصر للصفحة في محركات البحث"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium">نشر الصفحة</span>
                  <span className="text-sm text-gray-500">(إلغاء التحديد لحفظها كمسودة)</span>
                </label>
              </div>

              <div className="flex gap-4 pt-6 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {editingPage ? 'حفظ التغييرات' : 'إنشاء الصفحة'}
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