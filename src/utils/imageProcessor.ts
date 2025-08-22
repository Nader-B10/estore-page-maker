import { Product, StoreSettings } from '../types';

export interface ProcessedImage {
  filename: string;
  data: Uint8Array;
  mimeType: string;
  extension: string;
}

export const processBase64Image = (base64Data: string, filename: string): ProcessedImage | null => {
  try {
    if (!base64Data || !base64Data.startsWith('data:')) {
      return null;
    }

    const [header, data] = base64Data.split(',');
    if (!data) {
      throw new Error('Invalid base64 format');
    }

    const mimeType = header.split(':')[1]?.split(';')[0];
    if (!mimeType) {
      throw new Error('Could not determine MIME type');
    }

    const extension = mimeType.split('/')[1];
    if (!extension) {
      throw new Error('Could not determine file extension');
    }

    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);

    return {
      filename: `${filename}.${extension}`,
      data: byteArray,
      mimeType,
      extension
    };
  } catch (error) {
    console.error(`Error processing image ${filename}:`, error);
    return null;
  }
};

export const processProductImages = (products: Product[]): ProcessedImage[] => {
  const processedImages: ProcessedImage[] = [];

  products.forEach(product => {
    if (product.image && product.image.startsWith('data:')) {
      const processed = processBase64Image(product.image, product.id);
      if (processed) {
        processedImages.push(processed);
      }
    }
  });

  return processedImages;
};

export const processStoreAssets = (settings: StoreSettings): ProcessedImage[] => {
  const processedAssets: ProcessedImage[] = [];

  // Process logo
  if (settings.logo && settings.logo.startsWith('data:')) {
    const processed = processBase64Image(settings.logo, 'logo');
    if (processed) {
      processedAssets.push(processed);
    }
  }

  // Process favicon
  if (settings.favicon && settings.favicon.startsWith('data:')) {
    const processed = processBase64Image(settings.favicon, 'favicon');
    if (processed) {
      processedAssets.push(processed);
    }
  }

  return processedAssets;
};

export const getImagePath = (product: Product): string => {
  if (product.image.startsWith('data:')) {
    const mimeType = product.image.split(':')[1]?.split(';')[0];
    const extension = mimeType?.split('/')[1] || 'jpg';
    return `images/${product.id}.${extension}`;
  }
  return product.image;
};

export const getAssetPath = (assetData: string, filename: string): string => {
  if (assetData.startsWith('data:')) {
    const mimeType = assetData.split(':')[1]?.split(';')[0];
    const extension = mimeType?.split('/')[1] || 'png';
    return `${filename}.${extension}`;
  }
  return assetData;
};