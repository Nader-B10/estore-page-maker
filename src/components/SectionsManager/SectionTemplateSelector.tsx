import React from 'react';
import { Form } from 'react-bootstrap';
import { templateRegistry } from '../../templates/registry';

interface SectionTemplateSelectorProps {
  sectionKey: keyof typeof templateRegistry;
  currentTemplate: string;
  onSelect: (templateId: string) => void;
}

export default function SectionTemplateSelector({ sectionKey, currentTemplate, onSelect }: SectionTemplateSelectorProps) {
  const templatesForSection = templateRegistry[sectionKey];
  if (!templatesForSection || Object.keys(templatesForSection).length <= 1) {
    return null; // Don't show selector if there's only one or zero options
  }

  return (
    <Form.Group>
      <Form.Label className="fw-semibold">اختر القالب</Form.Label>
      <Form.Select value={currentTemplate} onChange={(e) => onSelect(e.target.value)}>
        {Object.entries(templatesForSection).map(([templateId, templateModule]) => (
          <option key={templateId} value={templateId}>
            {templateModule.metadata.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}
