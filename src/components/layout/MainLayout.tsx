import React, { useState } from 'react';
import { Settings, Package, Layers, Eye } from 'lucide-react';
import SettingsPanel from '../StoreBuilder/SettingsPanel';
import ProductManager from '../StoreBuilder/ProductManager';
import StorePreview from '../StoreBuilder/StorePreview';
import SectionsManager from '../StoreBuilder/SectionsManager';

const tabs = [
  { id: 'settings', label: 'الإعدادات', icon: Settings },
  { id: 'sections', label: 'الأقسام', icon: Layers },
  { id: 'products', label: 'المنتجات', icon: Package },
];

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState('settings');

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'settings':
        return <SettingsPanel />;
      case 'sections':
        return <SectionsManager />;
      case 'products':
        return <ProductManager />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
      {/* Control Panel */}
      <aside className="col-span-1 lg:col-span-5 xl:col-span-4 bg-white flex flex-col border-r border-gray-200">
        <div className="p-3 border-b border-gray-200">
          <div className="flex justify-center flex-wrap gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderActivePanel()}
        </div>
      </aside>

      {/* Preview Panel */}
      <main className="col-span-1 lg:col-span-7 xl:col-span-8 bg-gray-100 flex flex-col h-full">
        <div className="bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">معاينة المتجر المباشرة</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Eye size={16} />
              <span>يتم التحديث تلقائياً</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <StorePreview />
        </div>
      </main>
    </div>
  );
}
