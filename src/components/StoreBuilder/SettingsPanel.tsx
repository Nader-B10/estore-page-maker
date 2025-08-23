import React from 'react';
import GeneralSettings from '../SettingsPanel/GeneralSettings';
import ThemeSettings from '../SettingsPanel/ThemeSettings';
import LayoutSettings from '../SettingsPanel/LayoutSettings';

export default function SettingsPanel() {
  return (
    <div className="space-y-6">
      <GeneralSettings />
      <ThemeSettings />
      <LayoutSettings />
    </div>
  );
}
