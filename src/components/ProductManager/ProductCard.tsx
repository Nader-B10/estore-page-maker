import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types/store';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h4" className="h6">{product.name}</Card.Title>
        <Card.Text className="small text-muted mb-2 line-clamp-2">{product.description}</Card.Text>
        <div className="d-flex flex-wrap gap-1 mb-2">
          {product.isFeatured && <Badge bg="warning" text="dark">مميز</Badge>}
          {product.isBestSeller && <Badge bg="success">الأعلى مبيعاً</Badge>}
          {product.isOnSale && <Badge bg="danger">عرض</Badge>}
        </div>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <span className="fs-5 fw-bold text-success">${product.price}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="small text-muted text-decoration-line-through">${product.originalPrice}</span>
            )}
          </div>
          <div className="d-flex gap-2">
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(product)}><Edit size={16} /></Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(product.id)}><Trash2 size={16} /></Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
