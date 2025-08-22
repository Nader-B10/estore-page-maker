import React from 'react';
import { Product, StoreSettings } from '../../types/store';

interface PreviewProductCardProps {
  product: Product;
  settings: StoreSettings;
}

export default function PreviewProductCard({ product, settings }: PreviewProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.category && (
            <span className="px-2 py-1 text-xs font-medium text-white rounded-full" style={{ backgroundColor: settings.accentColor }}>
              {product.category}
            </span>
          )}
          {product.isOnSale && product.discountPercentage && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
              -{product.discountPercentage}%
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl font-bold" style={{ color: settings.primaryColor }}>
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: settings.secondaryColor }}>
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}
