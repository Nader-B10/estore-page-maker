import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Product, StoreSettings } from '../../types/store';
import ProductCard from './products/ProductCard';
import ProductForm from './products/ProductForm';
import ProductDetailSettings from './settings/ProductDetailSettings';

interface ProductManagerProps {
  products: Product[];
  settings: StoreSettings;
  onAddProduct: (product: Product) => void;
  onEditProduct: (id: string, product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
}

export default function ProductManager({
  products,
  settings,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onUpdateSettings,
}: ProductManagerProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');

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
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📦 إدارة المنتجات
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⚙️ إعدادات صفحة التفاصيل
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'products' && (
        <>
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

          {products.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد منتجات بعد</h3>
              <p className="text-gray-500 mb-4">ابدأ بإضافة منتجات لمتجرك</p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                إضافة أول منتج
              </button>
            </div>
          )}
          {isFormOpen && (
            <ProductForm
              product={editingProduct}
              settings={settings}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </>
      )}

      {activeTab === 'settings' && (
        <ProductDetailSettings
          settings={settings}
          onUpdateSettings={onUpdateSettings}
        />
      )}
    </div>
  );
}