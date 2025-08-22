import React from 'react';
import { useState } from 'react';
import { StoreData } from '../../types/store';
import StorePreview from '../StoreBuilder/StorePreview';
import LivePreview from '../StoreBuilder/preview/LivePreview';

interface AppMainProps {
  storeData: StoreData;
}

export default function AppMain({ storeData }: AppMainProps) {
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(true);

  return (
    <main className="flex-1 bg-gray-100 h-full">
      <LivePreview 
        isEnabled={isPreviewEnabled}
        onToggle={setIsPreviewEnabled}
      >
        <StorePreview storeData={storeData} />
      </LivePreview>
    </main>
  );
}