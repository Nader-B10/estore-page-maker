import { CustomPage, StoreSettings } from '../types';

export const generateCustomPageHTML = (page: CustomPage, settings: StoreSettings): string => {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.metaTitle || page.title} - ${settings.storeName}</title>
    <meta name="description" content="${page.metaDescription || page.title}">
    ${settings.favicon ? `<link rel="icon" type="image/x-icon" href="favicon.ico">` : ''}
    <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: '${settings.fontFamily}', sans-serif; }
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
                ${settings.logo ? `<img src="logo.png" alt="Logo" style="width: 40px; height: 40px; object-fit: cover; border-radius: 8px;" />` : ''}
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