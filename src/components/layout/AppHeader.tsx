import React, { useState } from 'react';
import { Package, Download, Loader } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { exportStore } from '../../utils/fileExporter';

export default function AppHeader() {
  const { storeData } = useStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportStore(storeData);
      alert('تم تصدير المتجر بنجاح!');
    } catch (error) {
      console.error('Export error:', error);
      alert('حدث خطأ أثناء تصدير المتجر');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">أداة بناء المتاجر</h1>
                <p className="text-sm text-gray-600">اصنع متجرك الإلكتروني في دقائق</p>
              </div>
            </div>
            
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  جاري التحضير...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  تحميل المتجر
                </>
              )}
            </button>
          </div>
        </div>
      </header>

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
    </>
  );
}
