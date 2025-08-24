import React from 'react';
import GeneralSettings from '../SettingsPanel/GeneralSettings';
import ThemeSettings from '../SettingsPanel/ThemeSettings';
import LayoutSettings from '../SettingsPanel/LayoutSettings';
import ContactSettings from '../SettingsPanel/ContactSettings';
import WhatsAppSettings from '../SettingsPanel/WhatsAppSettings';

export default function SettingsPanel() {
  return (
    <div className="space-y-6">
      <GeneralSettings />
      <ThemeSettings />
      <LayoutSettings />
      <ContactSettings />
      <WhatsAppSettings />
    </div>
  );
}