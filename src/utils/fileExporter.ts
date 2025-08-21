import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { StoreData, CustomPage, StoreSettings } from '../types/store';
import { generateStoreHTML, generateStoreCSS, generateStoreJS } from './storeGenerator';

const generatePageHTML = (page: CustomPage, settings: StoreSettings): string => {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.metaTitle || page.title} - ${settings.storeName}</title>
    <meta name="description" content="${page.metaDescription || page.title}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="${settings.favicon}">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <style>
        .page-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-top: 2rem;
            margin-bottom: 2rem;
            line-height: 1.8;
        }
        .page-title {
            color: ${settings.primaryColor};
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-align: center;
        }
        .page-content h1, .page-content h2, .page-content h3 {
            color: ${settings.primaryColor};
            margin-top: 2rem;
            margin-bottom: 1rem;
        }
        .page-content p {
            margin-bottom: 1rem;
        }
        .back-to-home {
            display: inline-block;
            background: ${settings.primaryColor};
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            text-decoration: none;
            margin-bottom: 2rem;
            transition: opacity 0.3s ease;
        }
        .back-to-home:hover {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <header style="background: ${settings.primaryColor}; color: white; padding: 1rem 0;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
            <div style="display: flex; align-items: center; gap: 1rem;">
                ${settings.logo ? `<img src="${settings.logo}" alt="Logo" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px;" />` : ''}
                <div>
                    <h1 style="font-size: 1.5rem; margin: 0;">${settings.storeName}</h1>
                    <p style="font-size: 0.875rem; margin: 0; opacity: 0.9;">${settings.description}</p>
                </div>
            </div>
        </div>
    </header>

    <main class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <a href="index.html" class="back-to-home">← العودة للرئيسية</a>
        
        <div class="page-content">
            <h1 class="page-title">${page.title}</h1>
            <div>${page.content}</div>
        </div>
    </main>

    <footer style="background-color: #1a1a1a; color: white; padding: 2rem 0; margin-top: 3rem;">
        <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px; text-align: center;">
            <p style="margin: 0; font-size: 0.875rem; color: #999;">
                ${settings.footerText || `© ${new Date().getFullYear()} ${settings.storeName}. جميع الحقوق محفوظة.`}
            </p>
        </div>
    </footer>
</body>
</html>`;
};

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
${storeData.customPages.length > 0 ? `\n## الصفحات المخصصة\n${storeData.customPages.map(page => `- ${page.slug}.html - ${page.title}`).join('\n')}` : ''}

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
  
  // Create custom pages
  for (const page of storeData.customPages) {
    if (page.isPublished) {
      const pageHTML = generatePageHTML(page, storeData.settings);
      zip.file(`${page.slug}.html`, pageHTML);
    }
  }
  
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