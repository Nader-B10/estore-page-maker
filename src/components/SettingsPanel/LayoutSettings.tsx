import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useStore } from '../../contexts/StoreContext';

export default function LayoutSettings() {
  const { storeData, updateSettings } = useStore();
  const { settings } = storeData;

  const handleChange = (field: string, value: any) => {
    updateSettings({ [field]: value });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h3" className="mb-0 h6">التخطيط والمظهر</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form className="d-flex flex-column gap-3">
          <Form.Group>
            <Form.Label>نوع الخط</Form.Label>
            <Form.Select value={settings.fontFamily} onChange={(e) => handleChange('fontFamily', e.target.value)}>
              <option value="Cairo">Cairo</option>
              <option value="Tajawal">Tajawal</option>
              <option value="Almarai">Almarai</option>
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>نمط عرض المنتجات</Form.Label>
            <Form.Select value={settings.layout} onChange={(e) => handleChange('layout', e.target.value)}>
              <option value="grid">شبكة</option>
              <option value="list">قائمة</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>نمط الرأس</Form.Label>
            <Form.Select value={settings.headerStyle} onChange={(e) => handleChange('headerStyle', e.target.value)}>
              <option value="classic">كلاسيكي</option>
              <option value="modern">عصري</option>
              <option value="minimal">بسيط</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
