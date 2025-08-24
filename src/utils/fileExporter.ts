import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { StoreData } from '../types/store';
import { getTemplate } from '../templates/registry';
import { generateAllCustomPages } from './generators/pageGenerator';

// Helper to convert base64 to Blob
const base64ToBlob = (base64: string, mimeType: string): Blob => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const exportStore = async (storeData: StoreData) => {
  const zip = new JSZip();
  const exportData = JSON.parse(JSON.stringify(storeData)); // Deep copy to avoid mutating state

  const imagesFolder = zip.folder('images');
  if (!imagesFolder) {
    console.error("Could not create images folder in zip");
    return false;
  }

  // Process and add product images
  for (const product of exportData.products) {
    if (product.image && product.image.startsWith('data:')) {
      const parts = product.image.split(',');
      const meta = parts[0].split(':')[1].split(';')[0];
      const extension = meta.split('/')[1] || 'png';
      const fileName = `product-${product.id}.${extension}`;
      
      const blob = base64ToBlob(parts[1], meta);
      imagesFolder.file(fileName, blob);
      product.image = `images/${fileName}`; // Update path for HTML generator
    }
  }

  // Process and add logo
  if (exportData.settings.logo && exportData.settings.logo.startsWith('data:')) {
    const parts = exportData.settings.logo.split(',');
    const meta = parts[0].split(':')[1].split(';')[0];
    const extension = meta.split('/')[1] || 'png';
    const fileName = `logo.${extension}`;
    
    const blob = base64ToBlob(parts[1], meta);
    imagesFolder.file(fileName, blob);
    exportData.settings.logo = `images/${fileName}`; // Update path
  }

  // Process and add favicon
  if (exportData.settings.favicon && exportData.settings.favicon.startsWith('data:')) {
    const parts = exportData.settings.favicon.split(',');
    const meta = parts[0].split(':')[1].split(';')[0];
    const extension = meta.split('/')[1] || 'ico';
    const fileName = `favicon.${extension}`;
    
    const blob = base64ToBlob(parts[1], meta);
    imagesFolder.file(fileName, blob);
    exportData.settings.favicon = `images/${fileName}`; // Update path
  }
  
  // Process hero background image
  const heroSection = exportData.settings.sections.hero;
  if (heroSection && heroSection.data.backgroundImage && heroSection.data.backgroundImage.startsWith('data:')) {
    const parts = heroSection.data.backgroundImage.split(',');
    const meta = parts[0].split(':')[1].split(';')[0];
    const extension = meta.split('/')[1] || 'jpg';
    const fileName = `hero-bg.${extension}`;
    
    const blob = base64ToBlob(parts[1], meta);
    imagesFolder.file(fileName, blob);
    heroSection.data.backgroundImage = `images/${fileName}`;
  }

  // Get current template and generate files using template generator
  const currentTemplate = exportData.settings.currentTemplate || 'default';
  const templateData = getTemplate(currentTemplate);
  
  // Create CSS file using template generator
  const cssContent = templateData.generator.generateCSS(exportData);
  zip.file('styles.css', cssContent);

  // Create main HTML file using template generator
  const htmlContent = templateData.generator.generateHTML(exportData);
  zip.file('index.html', htmlContent);

  // Create JS file using template generator
  const jsContent = templateData.generator.generateJS ? 
    templateData.generator.generateJS(exportData) : 
    '';
  zip.file('main.js', jsContent);

  // Generate custom pages
  const customPages = generateAllCustomPages(exportData);
  Object.entries(customPages).forEach(([filename, content]) => {
    zip.file(filename, content);
  });

  try {
    const blob = await zip.generateAsync({ type: 'blob' });
    const fileName = `${storeData.settings.storeName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}_store.zip`;
    saveAs(blob, fileName);
    return true;
  } catch (error) {
    console.error('Error creating zip file:', error);
    return false;
  }
};
