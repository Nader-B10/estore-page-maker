import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';

interface LivePreviewProps {
  children: React.ReactNode;
  isEnabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

export default function LivePreview({ children, isEnabled = true, onToggle }: LivePreviewProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLastUpdate(new Date());
  }, [children]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }, 500);
  };

  const handleTogglePreview = () => {
    onToggle?.(!isEnabled);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">معاينة مباشرة</span>
          </div>
          
          <div className="text-xs text-gray-500">
            آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            title="تحديث المعاينة"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={handleTogglePreview}
            className={`p-2 rounded-lg transition-colors ${
              isEnabled 
                ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
            title={isEnabled ? 'إيقاف المعاينة' : 'تفعيل المعاينة'}
          >
            {isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div 
        ref={containerRef}
        className={`flex-1 transition-all duration-300 ${
          isEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
      >
        {isRefreshing ? (
          <div className="h-full flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-600">جاري تحديث المعاينة...</p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}