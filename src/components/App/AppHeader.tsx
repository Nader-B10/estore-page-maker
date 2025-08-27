import React from 'react';
import { Download, FileText, Settings, HelpCircle } from 'lucide-react';

interface AppHeaderProps {
  onExport?: () => void;
  onShowDocumentation?: () => void;
  onShowSettings?: () => void;
}

export default function AppHeader({ 
  onExport, 
  onShowDocumentation, 
  onShowSettings 
}: AppHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SB</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Store Builder</h1>
            <p className="text-sm text-gray-500">Build your perfect online store</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {onShowDocumentation && (
            <button
              onClick={onShowDocumentation}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Documentation"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </button>
          )}
          
          {onShowSettings && (
            <button
              onClick={onShowSettings}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>
          )}
          
          {onExport && (
            <button
              onClick={onExport}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              title="Export Store"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}