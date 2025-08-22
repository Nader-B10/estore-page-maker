import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Product, StoreSettings } from '../../types/store';
import ProductCard from './products/ProductCard';
import ProductForm from './products/ProductForm';

interface ProductManagerProps {
  products: Product[];
  settings: StoreSettings;
  onAddProduct: (product: Product) => void;
  onEditProduct: (id: string, product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export default function ProductManager({
  products,
  settings,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: ProductManagerProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      onEditProduct(editingProduct.id, product);
    } else {
      onAddProduct(product);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة المنتجات</h3>
        <button
          onClick={() => setIsFormOpen(true)}
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
            onEdit={handleEdit}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          settings={settings}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}