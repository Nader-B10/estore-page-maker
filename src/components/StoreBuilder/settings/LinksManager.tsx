import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, Link, ExternalLink } from 'lucide-react';
import { StoreSettings, LinkItem, CustomPage } from '../../../types';

interface LinksManagerProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
  customPages?: CustomPage[];
}

export default function LinksManager({ settings, onUpdateSettings, customPages = [] }: LinksManagerProps) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [linkType, setLinkType] = useState<'header' | 'footer'>('header');
  const [linkFormData, setLinkFormData] = useState({
    text: '',
    url: '',
    type: 'internal' as LinkItem['type'],
  });

  const handleAddLink = (type: 'header' | 'footer') => {
    setLinkType(type);
    setEditingLink(null);
    setLinkFormData({ text: '', url: '', type: 'internal' });
    setIsLinkModalOpen(true);
  };

  const handleEditLink = (link: LinkItem, type: 'header' | 'footer') => {
    setLinkType(type);
    setEditingLink(link);
    setLinkFormData({ text: link.text, url: link.url, type: link.type });
    setIsLinkModalOpen(true);
  };

  const handleSaveLink = () => {
    if (!linkFormData.text || !linkFormData.url) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const newLink: LinkItem = {
      id: editingLink?.id || Date.now().toString(),
      text: linkFormData.text,
      url: linkFormData.url,
      type: linkFormData.type,
      isVisible: true,
      order: editingLink?.order || (linkType === 'header' ? settings.headerLinks.length + 1 : settings.footerLinks.length + 1),
    };

    const linksKey = linkType === 'header' ? 'headerLinks' : 'footerLinks';
    const currentLinks = settings[linksKey];

    if (editingLink) {
      const updatedLinks = currentLinks.map(link => link.id === editingLink.id ? newLink : link);
      onUpdateSettings({ ...settings, [linksKey]: updatedLinks });
    } else {
      onUpdateSettings({ ...settings, [linksKey]: [...currentLinks, newLink] });
    }

    setIsLinkModalOpen(false);
    setEditingLink(null);
  };

  const handleDeleteLink = (linkId: string, type: 'header' | 'footer') => {
    const linksKey = type === 'header' ? 'headerLinks' : 'footerLinks';
    const updatedLinks = settings[linksKey].filter(link => link.id !== linkId);
    onUpdateSettings({ ...settings, [linksKey]: updatedLinks });
  };

  const handleToggleLinkVisibility = (linkId: string, type: 'header' | 'footer') => {
    const linksKey = type === 'header' ? 'headerLinks' : 'footerLinks';
    const updatedLinks = settings[linksKey].map(link => 
      link.id === linkId ? { ...link, isVisible: !link.isVisible } : link
    );
    onUpdateSettings({ ...settings, [linksKey]: updatedLinks });
  };

  return (
    <div className="space-y-6">
      {/* Header Links */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">روابط الهيدر</h3>
        
        <div className="space-y-3 mb-4">
          {settings.headerLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Link size={16} className="text-gray-500" />
                  <span className={`font-medium ${!link.isVisible ? 'text-gray-400' : ''}`}>
                    {link.text}
                  </span>
                  {link.type === 'external' && <ExternalLink size={12} className="text-gray-400" />}
                </div>
                <span className="text-xs text-gray-500">({link.url})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleLinkVisibility(link.id, 'header')}
                  className={`p-1 rounded ${link.isVisible ? 'text-green-600' : 'text-gray-400'}`}
                  title={link.isVisible ? 'إخفاء' : 'إظهار'}
                >
                  {link.isVisible ? '👁️' : '🙈'}
                </button>
                <button
                  onClick={() => handleEditLink(link, 'header')}
                  className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDeleteLink(link.id, 'header')}
                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => handleAddLink('header')}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          إضافة رابط للهيدر
        </button>
      </div>

      {/* Footer Links */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">روابط الفوتر</h3>
        
        <div className="space-y-3 mb-4">
          {settings.footerLinks.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Link size={16} className="text-gray-500" />
                  <span className={`font-medium ${!link.isVisible ? 'text-gray-400' : ''}`}>
                    {link.text}
                  </span>
                  {link.type === 'external' && <ExternalLink size={12} className="text-gray-400" />}
                </div>
                <span className="text-xs text-gray-500">({link.url})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleLinkVisibility(link.id, 'footer')}
                  className={`p-1 rounded ${link.isVisible ? 'text-green-600' : 'text-gray-400'}`}
                  title={link.isVisible ? 'إخفاء' : 'إظهار'}
                >
                  {link.isVisible ? '👁️' : '🙈'}
                </button>
                <button
                  onClick={() => handleEditLink(link, 'footer')}
                  className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => handleDeleteLink(link.id, 'footer')}
                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={() => handleAddLink('footer')}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          إضافة رابط للفوتر
        </button>
      </div>

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingLink ? 'تعديل الرابط' : `إضافة رابط ${linkType === 'header' ? 'للهيدر' : 'للفوتر'}`}
              </h3>
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">نص الرابط</label>
                <input
                  type="text"
                  value={linkFormData.text}
                  onChange={(e) => setLinkFormData(prev => ({ ...prev, text: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="مثال: من نحن"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">نوع الرابط</label>
                <select
                  value={linkFormData.type}
                  onChange={(e) => setLinkFormData(prev => ({ ...prev, type: e.target.value as LinkItem['type'] }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="internal">داخلي (قسم في الصفحة)</option>
                  <option value="page">صفحة مخصصة</option>
                  <option value="external">رابط خارجي</option>
                  <option value="category">فئة منتجات</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {linkFormData.type === 'internal' && 'الرابط (مثال: #products)'}
                  {linkFormData.type === 'page' && 'اختر الصفحة'}
                  {linkFormData.type === 'external' && 'الرابط الخارجي'}
                  {linkFormData.type === 'category' && 'اسم الفئة'}
                </label>
                
                {linkFormData.type === 'page' ? (
                  <select
                    value={linkFormData.url}
                    onChange={(e) => setLinkFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">اختر صفحة</option>
                    {customPages.filter(page => page.isPublished).map(page => (
                      <option key={page.id} value={`/${page.slug}`}>
                        {page.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={linkFormData.url}
                    onChange={(e) => setLinkFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      linkFormData.type === 'internal' ? '#products' :
                      linkFormData.type === 'external' ? 'https://example.com' :
                      'electronics'
                    }
                  />
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={handleSaveLink}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {editingLink ? 'حفظ التغييرات' : 'إضافة الرابط'}
              </button>
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
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