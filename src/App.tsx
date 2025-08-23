import React from 'react';
import { StoreProvider } from './contexts/StoreContext';
import AppHeader from './components/layout/AppHeader';
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <StoreProvider>
      <div className="min-vh-100 d-flex flex-column">
        <AppHeader />
        <MainLayout />
      </div>
    </StoreProvider>
  );
}

export default App;
