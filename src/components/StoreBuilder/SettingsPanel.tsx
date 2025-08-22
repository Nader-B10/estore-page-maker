import React from 'react';
import { StoreSettings, CustomPage } from '../../types/store';
import GeneralSettings from './settings/GeneralSettings';
import ThemeSettings from './settings/ThemeSettings';
import WhatsAppSettings from './settings/WhatsAppSettings';
import LinksManager from './settings/LinksManager';
import ContactSettings from './settings/ContactSettings';

interface SettingsPanelProps {
  settings: StoreSettings;
  onUpdateSettings: (settings: StoreSettings) => void;
  customPages?: CustomPage[];
}

export default function SettingsPanel({ settings, onUpdateSettings, customPages = [] }: SettingsPanelProps) {
  return (
    <div className="space-y-6">
      <GeneralSettings settings={settings} onUpdateSettings={onUpdateSettings} />
      <ThemeSettings settings={settings} onUpdateSettings={onUpdateSettings} />
      <WhatsAppSettings settings={settings} onUpdateSettings={onUpdateSettings} />
      <LinksManager settings={settings} onUpdateSettings={onUpdateSettings} customPages={customPages} />
      <ContactSettings settings={settings} onUpdateSettings={onUpdateSettings} />
    </div>
  );
}