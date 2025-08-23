import React from 'react';
import { Card, Form, Button, Image } from 'react-bootstrap';
import { Upload } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';

export default function GeneralSettings() {
  const { storeData, updateSettings } = useStore();
  const { settings } = storeData;

  const handleChange = (field: string, value: any) => {
    updateSettings({ [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleChange(field, event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h3" className="mb-0 h6">الإعدادات العامة</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>اسم المتجر</Form.Label>
            <Form.Control
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              placeholder="اسم المتجر"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>وصف المتجر</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="وصف قصير عن المتجر"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>شعار المتجر</Form.Label>
            <div className="d-flex align-items-center gap-3">
              <Form.Control type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} className="d-none" id="logo-upload" />
              <Button as="label" htmlFor="logo-upload" className="d-flex align-items-center gap-2">
                <Upload size={20} />
                رفع الشعار
              </Button>
              {settings.logo && <Image src={settings.logo} alt="Logo" rounded style={{ width: '48px', height: '48px', objectFit: 'cover' }} />}
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>أيقونة المتجر (Favicon)</Form.Label>
            <div className="d-flex align-items-center gap-3">
              <Form.Control type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'favicon')} className="d-none" id="favicon-upload" />
              <Button as="label" htmlFor="favicon-upload" className="d-flex align-items-center gap-2">
                <Upload size={20} />
                رفع الأيقونة
              </Button>
              {settings.favicon && <Image src={settings.favicon} alt="Favicon" rounded style={{ width: '32px', height: '32px', objectFit: 'cover' }} />}
            </div>
            <Form.Text muted>يفضل أن تكون الصورة مربعة (32x32 أو 64x64 بكسل)</Form.Text>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
