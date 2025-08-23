import React from 'react';
import { Product, StoreSettings } from '../../../../types/store';
import { themes } from '../../../../themes/palettes';

interface ProductCardPreviewProps {
  product: Product;
  settings: StoreSettings;
}

export const ProductCardPreview: React.FC<ProductCardPreviewProps> = ({ product, settings }) => {
  const theme = themes.find(t => t.name === settings.theme) || themes[0];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group border border-gray-200/10 flex flex-col" style={{ backgroundColor: theme.colors.surface }}>
      <div className="relative overflow-hidden aspect-square">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.category && <span className="px-2 py-1 text-xs font-medium text-black rounded-full" style={{ backgroundColor: settings.accentColor }}>{product.category}</span>}
          {product.isOnSale && product.discountPercentage && <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">-{product.discountPercentage}%</span>}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2" style={{ color: theme.colors.text }}>{product.name}</h3>
        <p className="text-sm mb-3 line-clamp-2 flex-grow" style={{ color: theme.colors.subtleText }}>{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-bold" style={{ color: settings.primaryColor }}>{product.price} ر.س</span>
            {product.originalPrice && product.originalPrice > product.price && <span className="text-sm line-through" style={{ color: theme.colors.subtleText }}>{product.originalPrice} ر.س</span>}
          </div>
          <button className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: settings.secondaryColor }}>
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
};
