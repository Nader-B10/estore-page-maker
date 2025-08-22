import React from 'react';
import { Package, Download, HelpCircle, Loader, Save, Upload, RotateCcw } from 'lucide-react';

interface AppHeaderProps {
  onExport: () => void;
  isExporting: boolean;
  onOpenDocumentation: () => void;
  onSaveNow?: () => void;
  onExportData?: () => void;
  onImportData?: (file: File) => void;
  onReset?: () => void;
}

export default function AppHeader({ 
  onExport, 
  isExporting, 
  onOpenDocumentation,
  onSaveNow,
  onExportData,
  onImportData,
  onReset
}: AppHeaderProps) {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file && onImportData) {
        onImportData(file);
      }
    };
    input.click();
  };

  return (
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
          
          <div className="flex items-center gap-3">
            {/* Save Now Button */}
            {onSaveNow && (
              <button
                onClick={onSaveNow}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                title="حفظ فوري"
              >
                <Save className="w-4 h-4" />
                حفظ
              </button>
            )}

            {/* Data Management Dropdown */}
            <div className="relative group">
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors">
                <Package className="w-4 h-4" />
                إدارة البيانات
              </button>
              
              <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-48">
                {onExportData && (
                  <button
                    onClick={onExportData}
                    className="w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                  >
                    <Download className="w-4 h-4" />
                    تصدير البيانات
                  </button>
                )}
                
                {onImportData && (
                  <button
                    onClick={handleImportClick}
                    className="w-full text-right px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                  >
                    <Upload className="w-4 h-4" />
                    استيراد البيانات
                  </button>
                )}
                
                {onReset && (
                  <button
                    onClick={() => {
                      if (confirm('هل أنت متأكد من إعادة تعيين جميع البيانات؟ سيتم فقدان جميع التغييرات!')) {
                        onReset();
                      }
                    }}
                    className="w-full text-right px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-red-600 border-t border-gray-100"
                  >
                    <RotateCcw className="w-4 h-4" />
                    إعادة تعيين
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={onExport}
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
            
            <button
              onClick={onOpenDocumentation}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <HelpCircle className="w-5 h-5" />
              دليل المطور
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}