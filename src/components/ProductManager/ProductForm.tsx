import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { Product, StoreSettings } from '../../types/store';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  editingProduct: Product | null;
  settings: StoreSettings;
}

export default function ProductForm({ isOpen, onClose, onSave, editingProduct, settings }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '', description: '', price: 0, originalPrice: 0, category: '', image: '',
    isFeatured: false, isBestSeller: false, isOnSale: false, discountPercentage: 0, tags: [] as string[],
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name, description: editingProduct.description, price: editingProduct.price,
        originalPrice: editingProduct.originalPrice || 0, category: editingProduct.category, image: editingProduct.image,
        isFeatured: editingProduct.isFeatured, isBestSeller: editingProduct.isBestSeller, isOnSale: editingProduct.isOnSale,
        discountPercentage: editingProduct.discountPercentage || 0, tags: editingProduct.tags,
      });
    } else {
      setFormData({
        name: '', description: '', price: 0, originalPrice: 0, category: '', image: '',
        isFeatured: false, isBestSeller: false, isOnSale: false, discountPercentage: 0, tags: [],
      });
    }
  }, [editingProduct, isOpen]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setFormData(prev => ({ ...prev, image: e.target?.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert('يرجى ملء الحقول المطلوبة: اسم المنتج، السعر، والصورة.');
      return;
    }
    const product: Product = {
      id: editingProduct?.id || Date.now().toString(),
      ...formData,
      originalPrice: formData.originalPrice || undefined,
      discountPercentage: formData.discountPercentage || undefined,
    };
    onSave(product);
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>اسم المنتج *</Form.Label>
                <Form.Control type="text" value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>الفئة</Form.Label>
                <Form.Control type="text" value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>الوصف</Form.Label>
                <Form.Control as="textarea" rows={3} value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>السعر الحالي *</Form.Label>
                <Form.Control type="number" step="0.01" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>السعر الأصلي</Form.Label>
                <Form.Control type="number" step="0.01" value={formData.originalPrice} onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))} />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Form.Group>
                <Form.Label>صورة المنتج *</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                {formData.image && <Image src={formData.image} alt="معاينة" fluid thumbnail className="mt-2" style={{ maxHeight: '150px' }} />}
              </Form.Group>
            </Col>
            <Col xs={12} className="border-top pt-3">
              <h5 className="h6">إعدادات العرض</h5>
              <div className="d-flex flex-column gap-2">
                {settings.sections.featuredProducts.enabled && <Form.Check type="checkbox" label="منتج مميز" checked={formData.isFeatured} onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))} />}
                {settings.sections.bestSellers.enabled && <Form.Check type="checkbox" label="من الأعلى مبيعاً" checked={formData.isBestSeller} onChange={(e) => setFormData(prev => ({ ...prev, isBestSeller: e.target.checked }))} />}
                {settings.sections.onSale.enabled && <Form.Check type="checkbox" label="عليه عرض/تخفيض" checked={formData.isOnSale} onChange={(e) => setFormData(prev => ({ ...prev, isOnSale: e.target.checked }))} />}
              </div>
            </Col>
          </Row>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <Button variant="secondary" onClick={onClose}>إلغاء</Button>
            <Button variant="primary" type="submit">{editingProduct ? 'حفظ التغييرات' : 'إضافة المنتج'}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
