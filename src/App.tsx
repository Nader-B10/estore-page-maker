import React, { useState } from 'react';
import { Loader } from 'lucide-react';
import { useStoreData } from './hooks/useStoreData';
import { useErrorHandler } from './hooks/useErrorHandler';
import { exportStore } from './utils/fileExporter';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import AppHeader from './components/App/AppHeader';
import AppSidebar from './components/App/AppSidebar';
import AppMain from './components/App/AppMain';
import DocumentationViewer from './components/Documentation/DocumentationViewer';
import SaveIndicator from './components/App/SaveIndicator';

function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [isExporting, setIsExporting] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const { handleError, withErrorHandling } = useErrorHandler();
  
  const {
    storeData,
    handleUpdateSettings,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    handleAddPage,
    handleEditPage,
    handleDeletePage,
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
    resetStoreData,
    exportStoreData,
    importStoreData,
    saveNow
  } = useStoreData();

  const handleExport = withErrorHandling(async () => {
    setIsExporting(true);
    try {
      await exportStore(storeData);
      alert('تم تصدير المتجر بنجاح!');
    } catch (error) {
      alert('حدث خطأ أثناء تصدير المتجر');
      throw error;
    } finally {
      setIsExporting(false);
    }
  }, 'handleExport');

  const handleSaveNow = withErrorHandling(async () => {
    setIsSaving(true);
    try {
      await saveNow();
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  }, 'handleSaveNow');

  const handleImportData = withErrorHandling(async (file: File) => {
    try {
      await importStoreData(file);
      setLastSaved(new Date());
      alert('تم استيراد البيانات بنجاح!');
    } catch (error) {
      alert('فشل في استيراد البيانات. تأكد من صحة الملف.');
      throw error;
    }
  }, 'handleImportData');

  const handleReset = withErrorHandling(() => {
    resetStoreData();
    setLastSaved(new Date());
  }, 'handleReset');

  // Listen for switch to products tab
  React.useEffect(() => {
    const handleSwitchToProducts = () => {
      setActiveTab('products');
    };

    window.addEventListener('switchToProducts', handleSwitchToProducts);
    return () => window.removeEventListener('switchToProducts', handleSwitchToProducts);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AppHeader 
          onExport={handleExport}
          isExporting={isExporting}
          onOpenDocumentation={() => setIsDocumentationOpen(true)}
          onSaveNow={handleSaveNow}
          onExportData={exportStoreData}
          onImportData={handleImportData}
          onReset={handleReset}
        />

        {/* Save Indicator */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <SaveIndicator 
              lastSaved={lastSaved}
              isSaving={isSaving}
              hasUnsavedChanges={false}
            />
            <div className="text-xs text-gray-500">
              💾 الحفظ التلقائي مفعل - تتم المزامنة كل ثانية
            </div>
          </div>
        </div>

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
            onAddCategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
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
    </ErrorBoundary>
  );
}

export default App;