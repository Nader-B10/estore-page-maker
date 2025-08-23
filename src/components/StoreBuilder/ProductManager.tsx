import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Plus } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { Product } from '../../types/store';
import ProductCard from '../ProductManager/ProductCard';
import ProductForm from '../ProductManager/ProductForm';

export default function ProductManager() {
  const { storeData, addProduct, editProduct, deleteProduct } = useStore();
  const { products, settings } = storeData;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenModalForEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleOpenModalForAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      editProduct(editingProduct.id, product);
    } else {
      addProduct(product);
    }
    handleCloseModal();
  };

  return (
    <div className="d-flex flex-column gap-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="h5 mb-0">إدارة المنتجات</h3>
        <Button onClick={handleOpenModalForAdd} className="d-flex align-items-center gap-2">
          <Plus size={20} />
          إضافة منتج
        </Button>
      </div>

      <Row xs={1} md={2} xl={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductCard
              product={product}
              onEdit={handleOpenModalForEdit}
              onDelete={deleteProduct}
            />
          </Col>
        ))}
      </Row>

      <ProductForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
        settings={settings}
      />
    </div>
  );
}
