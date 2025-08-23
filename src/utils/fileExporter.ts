import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { StoreData } from '../types/store';
import { generatePageHTML } from './generators/pageGenerator';
import { generateStoreCSS } from './generators/cssGenerator';
import { generateStoreJS } from './generators/jsGenerator';
import { generateReadme } from './generators/readmeGenerator';

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
  const exportData = JSON.parse(JSON.stringify(storeData));

  const assetsFolder = zip.folder('assets');
  const imagesFolder = assetsFolder?.folder('images');

  // Process and save all product images
  for (const product of exportData.products) {
    if (product.image && product.image.startsWith('data:')) {
      const parts = product.image.split(',');
      const meta = parts[0].split(':')[1].split(';')[0];
      const extension = meta.split('/')[1];
      const fileName = `${product.id}.${extension}`;
      const blob = base64ToBlob(parts[1], meta);
      imagesFolder?.file(fileName, blob);
      product.image = `assets/images/${fileName}`;
    }
  }

  // Process and save global images (logo, favicon)
  if (exportData.settings.logo && exportData.settings.logo.startsWith('data:')) {
    const parts = exportData.settings.logo.split(',');
    const meta = parts[0].split(':')[1].split(';')[0];
    const extension = meta.split('/')[1];
    const fileName = `logo.${extension}`;
    const blob = base64ToBlob(parts[1], meta);
    assetsFolder?.file(fileName, blob);
    exportData.settings.logo = `assets/${fileName}`;
  }

  if (exportData.settings.favicon && exportData.settings.favicon.startsWith('data:')) {
    const parts = exportData.settings.favicon.split(',');
    const meta = parts[0].split(':')[1].split(';')[0];
    const extension = meta.split('/')[1];
    const fileName = `favicon.${extension}`;
    const blob = base64ToBlob(parts[1], meta);
    assetsFolder?.file(fileName, blob);
    exportData.settings.favicon = `assets/${fileName}`;
  }
  
  // Process and save section-specific images
  const heroSection = exportData.settings.sections.hero;
  if (heroSection?.data.backgroundImage?.startsWith('data:')) {
    const parts = heroSection.data.backgroundImage.split(',');
    const meta = parts[0].split(':')[1].split(';')[0];
    const extension = meta.split('/')[1];
    const fileName = `hero-bg.${extension}`;
    const blob = base64ToBlob(parts[1], meta);
    imagesFolder?.file(fileName, blob);
    heroSection.data.backgroundImage = `assets/images/${fileName}`;
  }
  
  const whyChooseUsSection = exportData.settings.sections.whyChooseUs;
  if (whyChooseUsSection?.data.sideImage?.startsWith('data:')) {
    const parts = whyChooseUsSection.data.sideImage.split(',');
    const meta = parts[0].split(':')[1].split(';')[0];
    const extension = meta.split('/')[1];
    const fileName = `why-us-side.${extension}`;
    const blob = base64ToBlob(parts[1], meta);
    imagesFolder?.file(fileName, blob);
    whyChooseUsSection.data.sideImage = `assets/images/${fileName}`;
  }

  // Generate HTML for each page
  for (const page of exportData.settings.pages) {
    const htmlContent = generatePageHTML(exportData, page);
    zip.file(`${page.slug}.html`, htmlContent);
  }

  // Generate common assets
  const cssContent = generateStoreCSS(exportData);
  assetsFolder?.file('style.css', cssContent);

  const jsContent = generateStoreJS();
  assetsFolder?.file('main.js', jsContent);

  const readmeContent = generateReadme(storeData);
  zip.file('README.md', readmeContent);

  // Create and download the zip file
  const blob = await zip.generateAsync({ type: 'blob' });
  const fileName = `${storeData.settings.storeName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}_store.zip`;
  saveAs(blob, fileName);
};
