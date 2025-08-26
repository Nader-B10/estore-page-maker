import { StoreData } from '../types/store';
import { getThemeById } from '../types/theme';

export const generateEnhancedStoreCSS = (storeData: StoreData): string => {
  const { settings } = storeData;
  const currentTheme = getThemeById(settings.themeId);

  return `/* Enhanced CSS for ReactDOMServer Generated HTML */
:root {
  --primary-color: ${currentTheme.palette.primary};
  --secondary-color: ${currentTheme.palette.secondary};
  --accent-color: ${currentTheme.palette.accent};
  --text-color: ${currentTheme.palette.text};
  --text-secondary: ${currentTheme.palette.textSecondary};
  --background-color: ${currentTheme.palette.background};
  --surface-color: ${currentTheme.palette.surface};
  --border-color: ${currentTheme.palette.border};
  --success-color: ${currentTheme.palette.success};
  --warning-color: ${currentTheme.palette.warning};
  --error-color: ${currentTheme.palette.error};
}

/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: '${settings.fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    direction: rtl;
    text-align: right;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Enhanced Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}

@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0, 0, 0);
    }
    40%, 43% {
        transform: translate3d(0, -30px, 0);
    }
    70% {
        transform: translate3d(0, -15px, 0);
    }
    90% {
        transform: translate3d(0, -4px, 0);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* Animation Classes */
.animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
}

.animate-slide-in-right {
    animation: slideInRight 0.6s ease-out forwards;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-bounce {
    animation: bounce 1s infinite;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

/* Product Cards Enhanced */
.product-card {
    background: var(--surface-color);
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.product-card img {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover img {
    transform: scale(1.1);
}

/* Section Styling */
.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.section-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
}

.section-line {
    width: 80px;
    height: 4px;
    background: var(--accent-color);
    margin: 1.5rem auto 0;
    border-radius: 2px;
}

/* Enhanced Button Styles */
.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    border: none;
    cursor: pointer;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
    background: transparent;
    color: var(--primary-color);
    padding: 1rem 2rem;
    border: 2px solid var(--primary-color);
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
}

.btn-secondary:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
}

/* WhatsApp Button */
.whatsapp-btn {
    background: #25D366;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    border: none;
    cursor: pointer;
}

.whatsapp-btn:hover {
    background: #128C7E;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
}

/* Responsive Grid Layouts */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
}

.product-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem 0;
}

.product-masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 2rem 0;
}

/* Enhanced Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.5rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1.125rem; }

p {
    margin-bottom: 1rem;
    line-height: 1.7;
}

/* Utility Classes */
.text-gradient {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.shadow-glow {
    box-shadow: 0 0 20px rgba(var(--primary-color), 0.3);
}

/* Line Clamp Utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Enhanced Responsive Design */
@media (max-width: 768px) {
    .section-title {
        font-size: 2rem;
    }
    
    .section-subtitle {
        font-size: 1rem;
    }
    
    .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    
    .btn-primary,
    .btn-secondary {
        padding: 0.875rem 1.5rem;
        font-size: 0.875rem;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 15px;
    }
    
    .section-title {
        font-size: 1.75rem;
    }
    
    .product-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}

/* Print Styles */
@media print {
    .whatsapp-btn,
    .btn-primary,
    .btn-secondary {
        display: none;
    }
    
    .product-card {
        break-inside: avoid;
        box-shadow: none;
        border: 1px solid #ddd;
    }
}

/* Dark Theme Support */
@media (prefers-color-scheme: dark) {
    body {
        background-color: #111827;
        color: #f9fafb;
    }
    
    .product-card {
        background: #1f2937;
        border: 1px solid #374151;
    }
}

/* Accessibility Enhancements */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

/* Focus Styles */
button:focus,
a:focus,
input:focus,
select:focus,
textarea:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* Loading States */
.loading {
    opacity: 0.6;
    pointer-events: none;
}

.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
}`;
};