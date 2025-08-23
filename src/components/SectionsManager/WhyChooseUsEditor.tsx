import React, { useState } from 'react';
import { Button, Form, Card, Row, Col, Image } from 'react-bootstrap';
import { Plus, Edit, Trash2, Eye, EyeOff, Upload } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { WhyChooseUsItem } from '../../types/store';
import WhyChooseUsModal from './WhyChooseUsModal';
import SectionTemplateSelector from './SectionTemplateSelector';

export default function WhyChooseUsEditor() {
  const { storeData, updateSection } = useStore();
  const { whyChooseUs } = storeData.settings.sections;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WhyChooseUsItem | null>(null);

  const handleChange = (field: string, value: any) => {
    updateSection('whyChooseUs', { data: { [field]: value } });
  };

  const handleToggleEnabled = () => {
    updateSection('whyChooseUs', { enabled: !whyChooseUs.enabled });
  };

  const handleSaveItem = (itemData: Omit<WhyChooseUsItem, 'id'>) => {
    if (editingItem) {
      const updatedItems = whyChooseUs.data.items.map(i => i.id === editingItem.id ? { ...i, ...itemData } : i);
      handleChange('items', updatedItems);
    } else {
      const newItem: WhyChooseUsItem = { ...itemData, id: Date.now().toString() };
      handleChange('items', [...whyChooseUs.data.items, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    handleChange('items', whyChooseUs.data.items.filter(i => i.id !== id));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => handleChange('sideImage', e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3" className="mb-0 h6">لماذا تختارنا</Card.Title>
        <div className="d-flex align-items-center gap-2">
          <Button size="sm" onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="d-flex align-items-center gap-1">
            <Plus size={16} /> إضافة ميزة
          </Button>
          <Button size="sm" variant={whyChooseUs.enabled ? 'success' : 'secondary'} onClick={handleToggleEnabled} className="d-flex align-items-center gap-1">
            {whyChooseUs.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            {whyChooseUs.enabled ? 'مفعل' : 'معطل'}
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Form className="d-flex flex-column gap-3 mb-4">
          <SectionTemplateSelector
            sectionKey="whyChooseUs"
            currentTemplate={whyChooseUs.template}
            onSelect={(template) => updateSection('whyChooseUs', { template })}
          />
          <Form.Group>
            <Form.Label>العنوان</Form.Label>
            <Form.Control type="text" value={whyChooseUs.data.title} onChange={(e) => handleChange('title', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>العنوان الفرعي</Form.Label>
            <Form.Control type="text" value={whyChooseUs.data.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} />
          </Form.Group>
          {whyChooseUs.template === 'sideBySide' && (
            <Form.Group>
              <Form.Label>الصورة الجانبية</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} className="d-none" id="why-us-image-upload" />
                <Button as="label" htmlFor="why-us-image-upload" className="d-flex align-items-center gap-2">
                  <Upload size={20} />
                  رفع صورة
                </Button>
                {whyChooseUs.data.sideImage && <Image src={whyChooseUs.data.sideImage} alt="Side Image" rounded style={{ width: '64px', height: '64px', objectFit: 'cover' }} />}
              </div>
            </Form.Group>
          )}
        </Form>
        <Row xs={1} md={2} className="g-3">
          {whyChooseUs.data.items.map((item) => (
            <Col key={item.id}>
              <Card body className="bg-light h-100">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h4 className="h6 fw-medium">{item.title}</h4>
                  <div className="d-flex gap-1">
                    <Button variant="outline-primary" size="sm" onClick={() => { setEditingItem(item); setIsModalOpen(true); }}><Edit size={14} /></Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteItem(item.id)}><Trash2 size={14} /></Button>
                  </div>
                </div>
                <p className="small text-muted mb-1">{item.description}</p>
                <p className="small text-muted mb-0"><small>أيقونة: {item.icon}</small></p>
              </Card>
            </Col>
          ))}
        </Row>
      </Card.Body>
      <WhyChooseUsModal show={isModalOpen} item={editingItem} onSave={handleSaveItem} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
}
