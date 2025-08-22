import React, { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { StoreSettings } from '../../../types/store';

interface FAQSectionManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQSectionManager({ settings, onUpdateSettings }: FAQSectionManagerProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });

  const handleSectionChange = (field: string, value: any) => {
    onUpdateSettings({
      ...settings,
      faqSection: {
        ...settings.faqSection,
        [field]: value,
      },
    });
  };

  const handleTemplateChange = (templateId: string) => {
    onUpdateSettings({
      ...settings,
      faqTemplate: templateId,
    });
  };

  const openModal = (faq?: FAQItem) => {
    if (faq) {
      setEditingFAQ(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer
      });
    } else {
      setEditingFAQ(null);
      setFormData({
        question: '',
        answer: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFAQ(null);
    setFormData({
      question: '',
      answer: ''
    });
  };

  const handleSave = () => {
    if (!formData.question.trim() || !formData.answer.trim()) return;

    const currentFAQs = settings.faqSection.faqs || [];
    let updatedFAQs;

    if (editingFAQ) {
      updatedFAQs = currentFAQs.map(faq =>
        faq.id === editingFAQ.id
          ? { ...faq, question: formData.question, answer: formData.answer }
          : faq
      );
    } else {
      const newFAQ: FAQItem = {
        id: Date.now().toString(),
        question: formData.question,
        answer: formData.answer
      };
      updatedFAQs = [...currentFAQs, newFAQ];
    }

    handleSectionChange('faqs', updatedFAQs);
    closeModal();
  };

  const handleDelete = (faqId: string) => {
    const currentFAQs = settings.faqSection.faqs || [];
    const updatedFAQs = currentFAQs.filter(faq => faq.id !== faqId);
    handleSectionChange('faqs', updatedFAQs);
  };

  const availableTemplates = [
    {
      id: 'simple',
      name: 'قائمة بسيطة',
      description: 'عرض الأسئلة والأجوبة في قائمة بسيطة'
    },
    {
      id: 'accordion',
      name: 'أكورديون',
      description: 'عرض الأسئلة مع إمكانية توسيع الأجوبة'
    }
  ];

  return (
    <div className="space-y-6">
      {/* FAQ Section Settings */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">إعدادات قسم الأسئلة الشائعة</h3>
        
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={settings.faqSection?.enabled || false}
                onChange={(e) => handleSectionChange('enabled', e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium">تفعيل قسم الأسئلة الشائعة</span>
            </label>
          </div>

          {settings.faqSection?.enabled && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">عنوان القسم</label>
                <input
                  type="text"
                  value={settings.faqSection.title || ''}
                  onChange={(e) => handleSectionChange('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="الأسئلة الشائعة"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف القسم</label>
                <textarea
                  value={settings.faqSection.subtitle || ''}
                  onChange={(e) => handleSectionChange('subtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="إجابات على الأسئلة الأكثر شيوعاً"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* FAQ Items Management */}
      {settings.faqSection?.enabled && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">إدارة الأسئلة والأجوبة</h3>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              إضافة سؤال جديد
            </button>
          </div>

          <div className="space-y-3">
            {(settings.faqSection.faqs || []).map((faq: FAQItem) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(faq)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {(!settings.faqSection.faqs || settings.faqSection.faqs.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                لا توجد أسئلة شائعة. اضغط على "إضافة سؤال جديد" لبدء الإضافة.
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAQ Templates */}
      {settings.faqSection?.enabled && (
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">قوالب الأسئلة الشائعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                className={`p-4 rounded-lg border-2 transition-all text-right ${
                  settings.faqTemplate === template.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-semibold text-purple-700 mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingFAQ ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">السؤال</label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="اكتب السؤال هنا..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الإجابة</label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="اكتب الإجابة هنا..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={!formData.question.trim() || !formData.answer.trim()}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {editingFAQ ? 'حفظ التعديلات' : 'إضافة السؤال'}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}