import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, FileText, Save } from 'lucide-react';
import { CustomPage, StoreSettings } from '../../types/store';

interface PageManagerProps {
  pages: CustomPage[];
  settings: StoreSettings;
  onAddPage: (page: CustomPage) => void;
  onEditPage: (id: string, page: CustomPage) => void;
  onDeletePage: (id: string) => void;
}

export default function PageManager({
  pages,
  settings,
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
    metaDescription: '',
    isPublished: true,
    showInNavigation: false,
    showInFooter: true,
    template: 'default' as CustomPage['template'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug) {
      alert('يرجى ملء العنوان والرابط');
      return;
    }

    const page: CustomPage = {
      id: editingPage?.id || Date.now().toString(),
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      metaDescription: formData.metaDescription,
      isPublished: formData.isPublished,
      showInNavigation: formData.showInNavigation,
      showInFooter: formData.showInFooter,
      template: formData.template,
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
      metaDescription: '',
      isPublished: true,
      showInNavigation: false,
      showInFooter: true,
      template: 'default',
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
      metaDescription: page.metaDescription,
      isPublished: page.isPublished,
      showInNavigation: page.showInNavigation,
      showInFooter: page.showInFooter,
      template: page.template,
    });
    setIsModalOpen(true);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\u0600-\u06FFa-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: !editingPage ? generateSlug(title) : prev.slug,
    }));
  };

  const predefinedPages = [
    {
      title: 'سياسة الخصوصية',
      slug: 'privacy-policy',
      content: `# سياسة الخصوصية

## جمع المعلومات
نحن نجمع المعلومات التي تقدمها لنا مباشرة عند استخدام موقعنا.

## استخدام المعلومات
نستخدم المعلومات التي نجمعها لتقديم وتحسين خدماتنا.

## حماية المعلومات
نحن نتخذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية.

## الاتصال بنا
إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى الاتصال بنا.`,
      metaDescription: 'سياسة الخصوصية الخاصة بمتجرنا الإلكتروني',
    },
    {
      title: 'شروط الاستخدام',
      slug: 'terms-of-service',
      content: `# شروط الاستخدام

## قبول الشروط
باستخدام موقعنا، فإنك توافق على هذه الشروط والأحكام.

## استخدام الموقع
يجب استخدام الموقع للأغراض القانونية فقط.

## المنتجات والخدمات
نحتفظ بالحق في تعديل أو إيقاف أي منتج أو خدمة.

## المسؤولية
نحن غير مسؤولين عن أي أضرار قد تنتج عن استخدام الموقع.`,
      metaDescription: 'شروط وأحكام استخدام متجرنا الإلكتروني',
    },
    {
      title: 'سياسة الإرجاع والاستبدال',
      slug: 'return-policy',
      content: `# سياسة الإرجاع والاستبدال

## مدة الإرجاع
يمكن إرجاع المنتجات خلال 14 يوم من تاريخ الشراء.

## شروط الإرجاع
- يجب أن يكون المنتج في حالته الأصلية
- يجب الاحتفاظ بالفاتورة الأصلية
- المنتجات المستخدمة لا يمكن إرجاعها

## عملية الإرجاع
1. تواصل معنا عبر البريد الإلكتروني أو الهاتف
2. احصل على رقم الإرجاع
3. أرسل المنتج إلى عنواننا

## استرداد الأموال
سيتم استرداد الأموال خلال 7-10 أيام عمل.`,
      metaDescription: 'سياسة الإرجاع والاستبدال لمتجرنا الإلكتروني',
    },
    {
      title: 'عنا',
      slug: 'about-us',
      content: `# عن متجرنا

## قصتنا
نحن متجر إلكتروني متخصص في تقديم أفضل المنتجات بأسعار منافسة.

## رؤيتنا
أن نكون المتجر الإلكتروني الأول في المنطقة.

## رسالتنا
تقديم تجربة تسوق استثنائية لعملائنا الكرام.

## قيمنا
- الجودة
- الثقة
- الخدمة المتميزة
- الأسعار المنافسة

## فريق العمل
لدينا فريق متخصص ومتفان لخدمة عملائنا.`,
      metaDescription: 'تعرف على قصتنا ورؤيتنا ورسالتنا',
    },
    {
      title: 'اتصل بنا',
      slug: 'contact-us',
      content: `# اتصل بنا

## معلومات الاتصال

**العنوان:** ${settings.contactInfo.address || 'لم يتم تحديد العنوان بعد'}

**الهاتف:** ${settings.contactInfo.phone || 'لم يتم تحديد الهاتف بعد'}

**البريد الإلكتروني:** ${settings.contactInfo.email || 'لم يتم تحديد البريد الإلكتروني بعد'}

## ساعات العمل
${settings.contactInfo.workingHours || 'من السبت إلى الخميس: 9:00 ص - 6:00 م'}

## تواصل معنا
نحن هنا لمساعدتك! لا تتردد في التواصل معنا لأي استفسار أو طلب.`,
      metaDescription: 'تواصل معنا للاستفسارات والدعم',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة الصفحات</h3>
        <div className="flex gap-2">
          <div className="relative">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  const predefined = predefinedPages.find(p => p.slug === e.target.value);
                  if (predefined) {
                    setFormData({
                      ...predefined,
                      isPublished: true,
                      showInNavigation: false,
                      showInFooter: true,
                      template: 'default',
                    });
                    setIsModalOpen(true);
                  }
                }
                e.target.value = '';
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm appearance-none cursor-pointer"
            >
              <option value="">صفحة جاهزة</option>
              {predefinedPages.map((page) => (
                <option key={page.slug} value={page.slug}>
                  {page.title}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            صفحة جديدة
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-lg">{page.title}</h4>
                <div className="flex items-center gap-1">
                  {page.isPublished ? (
                    <Eye size={16} className="text-green-600" />
                  ) : (
                    <EyeOff size={16} className="text-gray-400" />
                  )}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">/{page.slug}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {page.showInNavigation && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    في القائمة
                  </span>
                )}
                {page.showInFooter && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    في التذييل
                  </span>
                )}
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {page.template === 'default' && 'افتراضي'}
                  {page.template === 'full-width' && 'عرض كامل'}
                  {page.template === 'sidebar' && 'مع شريط جانبي'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {new Date(page.updatedAt).toLocaleDateString('ar')}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(page)}
                    className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDeletePage(page.id)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText size={20} />
                {editingPage ? 'تعديل الصفحة' : 'إضافة صفحة جديدة'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    سيكون الرابط: /{formData.slug}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف الصفحة (Meta Description)</label>
                <input
                  type="text"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="وصف مختصر للصفحة يظهر في محركات البحث"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">محتوى الصفحة</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={12}
                  placeholder="اكتب محتوى الصفحة هنا... يمكنك استخدام Markdown للتنسيق"
                />
                <p className="text-xs text-gray-500 mt-1">
                  يمكنك استخدام Markdown للتنسيق (# للعناوين، ** للنص الغامق، إلخ)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">القالب</label>
                  <select
                    value={formData.template}
                    onChange={(e) => setFormData(prev => ({ ...prev, template: e.target.value as CustomPage['template'] }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="default">افتراضي</option>
                    <option value="full-width">عرض كامل</option>
                    <option value="sidebar">مع شريط جانبي</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">نشر الصفحة</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.showInNavigation}
                      onChange={(e) => setFormData(prev => ({ ...prev, showInNavigation: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">إظهار في قائمة التنقل</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.showInFooter}
                      onChange={(e) => setFormData(prev => ({ ...prev, showInFooter: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">إظهار في التذييل</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {editingPage ? 'حفظ التغييرات' : 'إنشاء الصفحة'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
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