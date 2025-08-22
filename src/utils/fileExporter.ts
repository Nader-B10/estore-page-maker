import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { StoreData } from '../types';
import { generateStoreHTML, generateStoreCSS, generateStoreJS } from '../generators';
import { processProductImages, processStoreAssets } from './imageProcessor';
import { generateProductsPageHTML } from '../generators/pagesGenerator';
import { generateProductDetailHTML } from '../generators/productDetailGenerator';
import { generateCustomPageHTML } from '../generators/customPageGenerator';

export const exportStore = async (storeData: StoreData): Promise<boolean> => {
  try {
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
    
    // Create products page
    const productsHTML = generateProductsPageHTML(storeData);
    zip.file('products.html', productsHTML);
    
    // Create product detail pages
    for (const product of storeData.products) {
      try {
        const relatedProducts = storeData.products
          .filter(p => p.id !== product.id && p.category === product.category)
          .slice(0, storeData.settings.productDetailSettings.relatedProductsLimit);
        
        const productDetailHTML = generateProductDetailHTML(product, storeData.settings, relatedProducts);
        zip.file(`product-${product.id}.html`, productDetailHTML);
      } catch (error) {
        console.warn(`Failed to generate detail page for product ${product.id}:`, error);
      }
    }
    
    // Process and add images
    const imagesFolder = zip.folder('images');
    const processedImages = processProductImages(storeData.products);
    
    processedImages.forEach(image => {
      imagesFolder?.file(image.filename, image.data);
    });
    
    // Process and add store assets
    const processedAssets = processStoreAssets(storeData.settings);
    processedAssets.forEach(asset => {
      zip.file(asset.filename, asset.data);
    });
    
    // Create custom pages
    for (const page of storeData.customPages) {
      if (page.isPublished) {
        try {
          const pageHTML = generateCustomPageHTML(page, storeData.settings);
          zip.file(`${page.slug}.html`, pageHTML);
        } catch (error) {
          console.warn(`Failed to generate page ${page.slug}:`, error);
        }
      }
    }
    
    // Create README file
    const readmeContent = generateReadmeContent(storeData);
    zip.file('README.md', readmeContent);
    
    // Generate and download the zip file
    const blob = await zip.generateAsync({ type: 'blob' });
    const fileName = `${storeData.settings.storeName.replace(/[^a-zA-Z0-9\u0600-\u06FF]/g, '_')}_store.zip`;
    saveAs(blob, fileName);
    
    return true;
  } catch (error) {
    console.error('Error creating zip file:', error);
    throw new Error(`فشل في تصدير المتجر: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`);
  }
};

const generateReadmeContent = (storeData: StoreData): string => {
  return `# ${storeData.settings.storeName}

## وصف المتجر
${storeData.settings.description}

## معلومات الاتصال
- البريد الإلكتروني: ${storeData.settings.contactInfo.email || 'غير محدد'}
- الهاتف: ${storeData.settings.contactInfo.phone || 'غير محدد'}
- العنوان: ${storeData.settings.contactInfo.address || 'غير محدد'}

## الملفات المضمنة
- index.html - الصفحة الرئيسية للمتجر
- products.html - صفحة جميع المنتجات
- product-[ID].html - صفحات تفاصيل المنتجات (${storeData.products.length} صفحة)
- css/style.css - ملف الأنماط الأساسي
- js/main.js - ملف الجافا سكريبت للوظائف التفاعلية
- images/ - مجلد صور المنتجات (${storeData.products.length} صورة)
${storeData.customPages.length > 0 ? `\n## الصفحات المخصصة\n${storeData.customPages.filter(p => p.isPublished).map(page => `- ${page.slug}.html - ${page.title}`).join('\n')}` : ''}

## إحصائيات المتجر
- عدد المنتجات: ${storeData.products.length}
- المنتجات المميزة: ${storeData.products.filter(p => p.isFeatured).length}
- الأعلى مبيعاً: ${storeData.products.filter(p => p.isBestSeller).length}
- المنتجات المخفضة: ${storeData.products.filter(p => p.isOnSale).length}
- الصفحات المخصصة: ${storeData.customPages.filter(p => p.isPublished).length}

## كيفية الاستخدام
1. قم برفع الملفات إلى خادم ويب
2. تأكد من أن جميع الملفات والمجلدات في نفس المستوى
3. افتح index.html في المتصفح

## المتطلبات
- متصفح ويب حديث يدعم HTML5 و CSS3 و JavaScript
- خادم ويب (Apache, Nginx, أو أي خادم آخر)

تم إنشاء هذا المتجر باستخدام أداة بناء المتاجر الإلكترونية.
تاريخ الإنشاء: ${new Date().toLocaleDateString('ar-SA')}
`;
};