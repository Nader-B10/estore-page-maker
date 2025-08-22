import React from 'react';
import { StoreProvider } from './contexts/StoreContext';
import AppHeader from './components/layout/AppHeader';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
        <AppHeader />
        <MainLayout />
      </div>
    </StoreProvider>
  );
}

export default App;
