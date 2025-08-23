import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import SectionTemplateSelector from './SectionTemplateSelector';

export default function FooterEditor() {
  const { storeData, updateSection } = useStore();
  const { footer } = storeData.settings.sections;

  const handleChange = (field: string, value: any) => {
    updateSection('footer', { data: { [field]: value } });
  };

  const handleToggleEnabled = () => {
    updateSection('footer', { enabled: !footer.enabled });
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3" className="mb-0 h6">إعدادات التذييل (Footer)</Card.Title>
        <Button size="sm" variant={footer.enabled ? 'success' : 'secondary'} onClick={handleToggleEnabled} className="d-flex align-items-center gap-1">
          {footer.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          {footer.enabled ? 'مفعل' : 'معطل'}
        </Button>
      </Card.Header>
      <Card.Body>
        <Form className="d-flex flex-column gap-3">
          <SectionTemplateSelector
            sectionKey="footer"
            currentTemplate={footer.template}
            onSelect={(template) => updateSection('footer', { template })}
          />
          <Form.Group>
            <Form.Label>نص حقوق النشر</Form.Label>
            <Form.Control type="text" value={footer.data.text} onChange={(e) => handleChange('text', e.target.value)} />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
