import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { WhyChooseUsItem } from '../../types/store';

interface WhyChooseUsModalProps {
  show: boolean;
  item: WhyChooseUsItem | null;
  onSave: (item: Omit<WhyChooseUsItem, 'id'>) => void;
  onClose: () => void;
}

export default function WhyChooseUsModal({ show, item, onSave, onClose }: WhyChooseUsModalProps) {
  const [formData, setFormData] = useState({ icon: 'star', title: '', description: '' });

  useEffect(() => {
    if (item) {
      setFormData({ icon: item.icon, title: item.title, description: item.description });
    } else {
      setFormData({ icon: 'star', title: '', description: '' });
    }
  }, [item]);

  const iconOptions = [
    { value: 'truck', label: 'شحن' }, { value: 'shield', label: 'حماية' }, { value: 'headphones', label: 'دعم' },
    { value: 'star', label: 'نجمة' }, { value: 'heart', label: 'قلب' }, { value: 'check', label: 'صح' },
    { value: 'gift', label: 'هدية' }, { value: 'clock', label: 'وقت' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{item ? 'تعديل الميزة' : 'إضافة ميزة جديدة'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>الأيقونة</Form.Label>
            <Form.Select value={formData.icon} onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}>
              {iconOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>العنوان</Form.Label>
            <Form.Control type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>الوصف</Form.Label>
            <Form.Control as="textarea" rows={3} value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button variant="primary" type="submit">{item ? 'حفظ التغييرات' : 'إضافة الميزة'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
