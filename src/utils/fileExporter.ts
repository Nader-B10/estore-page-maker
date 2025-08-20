import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { StoreData } from '../types/store';
import { generateStoreHTML, generateStoreCSS, generateStoreJS } from './storeGenerator';

export const exportStore = async (storeData: StoreData) => {
  const zip = new JSZip();
  
  // Create main HTML file
  const htmlContent = generateStoreHTML(storeData);
  zip.file('index.html', htmlContent);
  
  // Create CSS folder and file
  const cssFolder = zip.folder('css');
  const cssContent = generateStoreCSS(storeData);
  cssFolder?.file('style.css', cssContent);
  
  // Create JS folder and file
  const jsFolder = zip.folder('js');
  const jsContent = generateStoreJS();
  jsFolder?.file('main.js', jsContent);
  
  // Create images folder and add product images
  const imagesFolder = zip.folder('images');
  
  // Add product images
  for (const product of storeData.products) {
    if (product.image && product.image.startsWith('data:')) {
      // Convert base64 to blob and add to zip
      const base64Data = product.image.split(',')[1];
      const mimeType = product.image.split(':')[1].split(';')[0];
      const extension = mimeType.split('/')[1];
      
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      
      imagesFolder?.file(`${product.id}.${extension}`, byteArray);
    }
  }
  
  // Add logo if exists
  if (storeData.settings.logo && storeData.settings.logo.startsWith('data:')) {
    const base64Data = storeData.settings.logo.split(',')[1];
    const mimeType = storeData.settings.logo.split(':')[1].split(';')[0];
    const extension = mimeType.split('/')[1];
    
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    
    zip.file(`logo.${extension}`, byteArray);
  }
  
  // Create README file
  const readmeContent = `# ${storeData.settings.storeName}

## وصف المتجر
${storeData.settings.description}

## معلومات الاتصال
- البريد الإلكتروني: ${storeData.settings.contactInfo.email || 'غير محدد'}
- الهاتف: ${storeData.settings.contactInfo.phone || 'غير محدد'}
- العنوان: ${storeData.settings.contactInfo.address || 'غير محدد'}

## الملفات المضمنة
- index.html - الصفحة الرئيسية للمتجر
- css/style.css - ملف الأنماط الأساسي
- js/main.js - ملف الجافا سكريبت للوظائف التفاعلية
- images/ - مجلد صور المنتجات

## كيفية الاستخدام
1. قم برفع الملفات إلى خادم ويب
2. تأكد من أن جميع الملفات والمجلدات في نفس المستوى
3. افتح index.html في المتصفح

## المتطلبات
- متصفح ويب حديث يدعم HTML5 و CSS3 و JavaScript
- خادم ويب (Apache, Nginx, أو أي خادم آخر)

تم إنشاء هذا المتجر باستخدام أداة بناء المتاجر الإلكترونية.
`;
  
  zip.file('README.md', readmeContent);
  
  // Generate and download the zip file
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