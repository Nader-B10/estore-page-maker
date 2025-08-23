import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useStore } from '../../contexts/StoreContext';

export default function AllProductsEditor() {
  const { storeData, updateSection } = useStore();
  const { allProducts } = storeData.settings.sections;

  const handleChange = (field: string, value: any) => {
    updateSection('allProducts', { data: { [field]: value } });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h3" className="mb-0 h6">إعدادات صفحة جميع المنتجات</Card.Title>
      </Card.Header>
      <Card.Body>
        <p className="small text-muted">
          هذه الصفحة موجودة دائماً في متجرك. يمكنك هنا تعديل العناوين التي تظهر فيها.
        </p>
        <Form className="d-flex flex-column gap-3 mt-3">
          <Form.Group>
            <Form.Label>العنوان</Form.Label>
            <Form.Control type="text" value={allProducts.data.title} onChange={(e) => handleChange('title', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>العنوان الفرعي</Form.Label>
            <Form.Control type="text" value={allProducts.data.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}
