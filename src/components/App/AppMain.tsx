import React from 'react';
import { Eye } from 'lucide-react';
import { StoreData } from '../../types/store';
import StorePreview from '../StoreBuilder/StorePreview';

interface AppMainProps {
  storeData: StoreData;
}

export default function AppMain({ storeData }: AppMainProps) {
  return (
    <main className="flex-1 bg-gray-100 h-full">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">معاينة المتجر</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Eye size={16} />
            معاينة مباشرة
          </div>
        </div>
      </div>
      <StorePreview storeData={storeData} />
    </main>
  );
}