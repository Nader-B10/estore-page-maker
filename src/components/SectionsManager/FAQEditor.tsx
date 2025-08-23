import React, { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { FAQItem } from '../../types/store';
import FAQModal from './FAQModal';
import SectionTemplateSelector from './SectionTemplateSelector';

export default function FAQEditor() {
  const { storeData, updateSection } = useStore();
  const { faq } = storeData.settings.sections;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FAQItem | null>(null);

  const handleChange = (field: string, value: any) => {
    updateSection('faq', { data: { [field]: value } });
  };

  const handleToggleEnabled = () => {
    updateSection('faq', { enabled: !faq.enabled });
  };

  const handleSaveItem = (itemData: Omit<FAQItem, 'id'>) => {
    if (editingItem) {
      const updatedItems = faq.data.items.map(i => i.id === editingItem.id ? { ...i, ...itemData } : i);
      handleChange('items', updatedItems);
    } else {
      const newItem: FAQItem = { ...itemData, id: Date.now().toString() };
      handleChange('items', [...faq.data.items, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    handleChange('items', faq.data.items.filter(i => i.id !== id));
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3" className="mb-0 h6">الأسئلة الشائعة</Card.Title>
        <div className="d-flex align-items-center gap-2">
          <Button size="sm" onClick={() => { setEditingItem(null); setIsModalOpen(true); }} className="d-flex align-items-center gap-1">
            <Plus size={16} /> إضافة
          </Button>
          <Button size="sm" variant={faq.enabled ? 'success' : 'secondary'} onClick={handleToggleEnabled} className="d-flex align-items-center gap-1">
            {faq.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            {faq.enabled ? 'مفعل' : 'معطل'}
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Form className="d-flex flex-column gap-3 mb-4">
          <SectionTemplateSelector
            sectionKey="faq"
            currentTemplate={faq.template}
            onSelect={(template) => updateSection('faq', { template })}
          />
          <Form.Group>
            <Form.Label>العنوان</Form.Label>
            <Form.Control type="text" value={faq.data.title} onChange={(e) => handleChange('title', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>العنوان الفرعي</Form.Label>
            <Form.Control type="text" value={faq.data.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} />
          </Form.Group>
        </Form>
        <div className="d-flex flex-column gap-3">
          {faq.data.items.map((item) => (
            <Card key={item.id} body className="bg-light">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h4 className="h6 fw-medium">{item.question}</h4>
                <div className="d-flex gap-1">
                  <Button variant="outline-primary" size="sm" onClick={() => { setEditingItem(item); setIsModalOpen(true); }}><Edit size={14} /></Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteItem(item.id)}><Trash2 size={14} /></Button>
                </div>
              </div>
              <p className="small text-muted mb-0">{item.answer}</p>
            </Card>
          ))}
        </div>
      </Card.Body>
      <FAQModal show={isModalOpen} item={editingItem} onSave={handleSaveItem} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
}
