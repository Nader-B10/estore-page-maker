import React from 'react';
import { Settings, Package, Eye } from 'lucide-react';
import { StoreData, CustomPage } from '../../types/store';
import SettingsPanel from '../StoreBuilder/SettingsPanel';
import ProductManager from '../StoreBuilder/ProductManager';
import PageManager from '../StoreBuilder/PageManager';
import SectionsManager from '../StoreBuilder/SectionsManager';
import CategoryManager from '../StoreBuilder/CategoryManager';
import SearchSettings from '../StoreBuilder/SearchSettings';

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  storeData: StoreData;
  onUpdateSettings: (settings: any) => void;
  onAddProduct: (product: any) => void;
  onEditProduct: (id: string, product: any) => void;
  onDeleteProduct: (id: string) => void;
  onAddPage: (page: CustomPage) => void;
  onEditPage: (id: string, page: CustomPage) => void;
  onDeletePage: (id: string) => void;
  onAddCategory: (category: any) => void;
  onEditCategory: (id: string, category: any) => void;
  onDeleteCategory: (id: string) => void;
}

export default function AppSidebar({
  activeTab,
  setActiveTab,
  storeData,
  onUpdateSettings,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onAddPage,
  onEditPage,
  onDeletePage
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}: AppSidebarProps) {
  const tabs = [
    { id: 'settings', label: 'الإعدادات', icon: Settings },
    { id: 'sections', label: 'الأقسام', icon: Package },
    { id: 'products', label: 'المنتجات', icon: Package },
    { id: 'categories', label: 'الفئات', icon: Package },
    { id: 'search', label: 'البحث', icon: Package },
    { id: 'pages', label: 'الصفحات', icon: Package },
  ];

  return (
    <aside className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Tab Navigation */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-2 border-transparent'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'settings' && (
          <SettingsPanel
            settings={storeData.settings}
            onUpdateSettings={onUpdateSettings}
            customPages={storeData.customPages}
          />
        )}
        
        {activeTab === 'sections' && (
          <SectionsManager
            settings={storeData.settings}
            onUpdateSettings={onUpdateSettings}
          />
        )}
        
        {activeTab === 'products' && (
          <ProductManager
            products={storeData.products}
            settings={storeData.settings}
            onAddProduct={onAddProduct}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
            onUpdateSettings={onUpdateSettings}
          />
        )}
        
        {activeTab === 'pages' && (
          <PageManager
            pages={storeData.customPages}
            onAddPage={onAddPage}
            onEditPage={onEditPage}
            onDeletePage={onDeletePage}
          />
        )}
        
        {activeTab === 'categories' && (
          <CategoryManager
            categories={storeData.categories}
            onAddCategory={onAddCategory}
            onEditCategory={onEditCategory}
            onDeleteCategory={onDeleteCategory}
          />
        )}
        
        {activeTab === 'search' && (
          <SearchSettings
            settings={storeData.settings}
            onUpdateSettings={onUpdateSettings}
          />
        )}
      </div>
    </aside>
  );
}