import React, { useState } from 'react';
import { X, Code, FileText, Palette, Layout, Zap, Copy, Check } from 'lucide-react';
import OverviewSection from './sections/OverviewSection';
import HeaderSection from './sections/HeaderSection';
import FooterSection from './sections/FooterSection';
import HeroSection from './sections/HeroSection';
import StylingSection from './sections/StylingSection';
import RegistrySection from './sections/RegistrySection';

interface DocumentationViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentationViewer({ isOpen, onClose }: DocumentationViewerProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: 'overview', title: 'نظرة عامة', icon: FileText },
    { id: 'header', title: 'إنشاء هيدر', icon: Layout },
    { id: 'footer', title: 'إنشاء فوتر', icon: Layout },
    { id: 'hero', title: 'إنشاء هيرو', icon: Zap },
    { id: 'styling', title: 'التصميم', icon: Palette },
    { id: 'registry', title: 'التسجيل', icon: Code },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800">دليل المطور</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-2">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'header' && <HeaderSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'footer' && <FooterSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'hero' && <HeroSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'styling' && <StylingSection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
          {activeSection === 'registry' && <RegistrySection copyToClipboard={copyToClipboard} copiedCode={copiedCode} />}
        </div>
      </div>
    </div>
  );
}

















































