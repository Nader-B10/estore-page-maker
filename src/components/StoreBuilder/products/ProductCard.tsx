import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../../../types/store';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {product.isFeatured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">مميز</span>
          )}
          {product.isBestSeller && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">الأعلى مبيعاً</span>
          )}
          {product.isOnSale && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">عرض</span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-green-600">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="text-blue-600 hover:bg-blue-50 p-1 rounded"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="text-red-600 hover:bg-red-50 p-1 rounded"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}