import React from 'react';
import { Package, Download, HelpCircle, Loader } from 'lucide-react';

interface AppHeaderProps {
  onExport: () => void;
  isExporting: boolean;
  onOpenDocumentation: () => void;
}

export default function AppHeader({ onExport, isExporting, onOpenDocumentation }: AppHeaderProps) {
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