import React, { useState } from 'react';
import { Plus, Edit, Trash2, ExternalLink, Lock } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { CustomPage } from '../../types/store';
import PageForm from '../PagesManager/PageForm';

export default function PagesManager() {
  const { storeData, addPage, editPage, deletePage } = useStore();
  const { pages } = storeData;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);

  const handleOpenModalForEdit = (page: CustomPage) => {
    setEditingPage(page);
    setIsModalOpen(true);
  };

  const handleOpenModalForAdd = () => {
    setEditingPage(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPage(null);
  };

  const handleSavePage = (page: CustomPage) => {
    if (editingPage) {
      editPage(editingPage.id, page);
    } else {
      addPage(page);
    }
    handleCloseModal();
  };

  const handleDeletePage = (id: string) => {
    const page = pages.find(p => p.id === id);
    if (page?.isDefault) {
      alert('لا يمكن حذف الصفحة الافتراضية');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذه الصفحة؟')) {
      deletePage(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">إدارة الصفحات</h3>
          <p className="text-sm text-gray-600 mt-1">أنشئ صفحات مخصصة لمتجرك</p>
        </div>
        <button
          onClick={handleOpenModalForAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          إضافة صفحة
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pages.map((page) => (
          <div key={page.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-lg">{page.title}</h4>
                  {page.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Lock size={12} />
                      افتراضية
                    </span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    page.pageType === 'products' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {page.pageType === 'products' ? 'صفحة منتجات' : 'صفحة محتوى'}
                  </span>
                  {page.showAllProducts && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      عرض المنتجات
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">{page.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>الرابط: /{page.slug}</span>
                  <span className="flex items-center gap-1">
                    <ExternalLink size={14} />
                    صفحة مخصصة
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModalForEdit(page)}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded"
                >
                  <Edit size={16} />
                </button>
                {!page.isDefault && (
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <PageForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePage}
        editingPage={editingPage}
      />
    </div>
  );
}