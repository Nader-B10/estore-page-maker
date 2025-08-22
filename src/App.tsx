import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { useStoreData } from './hooks/useStoreData';
import { exportStore } from './utils/fileExporter';
import AppHeader from './components/App/AppHeader';
import AppSidebar from './components/App/AppSidebar';
import AppMain from './components/App/AppMain';
import DocumentationViewer from './components/Documentation/DocumentationViewer';

function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [isExporting, setIsExporting] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  
  const {
    storeData,
    handleUpdateSettings,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleAddPage,
    handleEditPage,
    handleDeletePage
  } = useStoreData();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const success = await exportStore(storeData);
      if (success) {
        alert('تم تصدير المتجر بنجاح!');
      } else {
        alert('حدث خطأ أثناء تصدير المتجر');
      }
    } catch (error) {
      console.error('Export error:', error);
      alert('حدث خطأ أثناء تصدير المتجر');
    } finally {
      setIsExporting(false);
    }
  };

  // Listen for switch to products tab
  React.useEffect(() => {
    const handleSwitchToProducts = () => {
      setActiveTab('products');
    };

    window.addEventListener('switchToProducts', handleSwitchToProducts);
    return () => window.removeEventListener('switchToProducts', handleSwitchToProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AppHeader 
        onExport={handleExport}
        isExporting={isExporting}
        onOpenDocumentation={() => setIsDocumentationOpen(true)}
      />

      <div className="flex-1 flex">
        <AppSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          storeData={storeData}
          onUpdateSettings={handleUpdateSettings}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onAddPage={handleAddPage}
          onEditPage={handleEditPage}
          onDeletePage={handleDeletePage}
        />

        <AppMain storeData={storeData} />
      </div>

      {/* Export Status */}
      {isExporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">جاري تحضير المتجر...</h3>
            <p className="text-gray-600">يتم الآن تجهيز وضغط ملفات متجرك</p>
          </div>
        </div>
      )}

      {/* Documentation Viewer */}
      <DocumentationViewer 
        isOpen={isDocumentationOpen} 
        onClose={() => setIsDocumentationOpen(false)} 
      />
    </div>
  );
}

export default App;