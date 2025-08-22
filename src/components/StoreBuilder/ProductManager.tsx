import React, { useState } from 'react';
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة المنتجات</h3>
        <button
          onClick={handleOpenModalForAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          إضافة منتج
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleOpenModalForEdit}
            onDelete={deleteProduct}
          />
        ))}
      </div>

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
