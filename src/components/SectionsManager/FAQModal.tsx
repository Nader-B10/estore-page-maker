import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FAQItem } from '../../types/store';

interface FAQModalProps {
  show: boolean;
  item: FAQItem | null;
  onSave: (item: Omit<FAQItem, 'id'>) => void;
  onClose: () => void;
}

export default function FAQModal({ show, item, onSave, onClose }: FAQModalProps) {
  const [formData, setFormData] = useState({ question: '', answer: '' });

  useEffect(() => {
    if (item) {
      setFormData({ question: item.question, answer: item.answer });
    } else {
      setFormData({ question: '', answer: '' });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      alert('يرجى ملء جميع الحقول');
      return;
    }
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{item ? 'تعديل السؤال' : 'إضافة سؤال جديد'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>السؤال</Form.Label>
            <Form.Control type="text" value={formData.question} onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>الإجابة</Form.Label>
            <Form.Control as="textarea" rows={4} value={formData.answer} onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))} required />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button variant="primary" type="submit">{item ? 'حفظ التغييرات' : 'إضافة السؤال'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
