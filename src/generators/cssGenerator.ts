import { StoreData } from '../types/store';
import { getThemeById } from '../types/theme';

export const generateStoreCSS = (storeData: StoreData): string => {
  const { settings } = storeData;
  const currentTheme = getThemeById(settings.themeId);

  return `/* Store CSS - Generated from Theme: ${currentTheme.nameAr} */

/* CSS Variables for Theme */
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
    font-family: '${settings.fontFamily}', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    direction: rtl;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Utility Classes */
.bg-primary { background-color: var(--primary-color) !important; }
.bg-secondary { background-color: var(--secondary-color) !important; }
.bg-accent { background-color: var(--accent-color) !important; }
.text-primary { color: var(--primary-color) !important; }
.text-secondary { color: var(--secondary-color) !important; }
.text-accent { color: var(--accent-color) !important; }

/* Custom Animations */
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Animation Classes */
.animate-blob { animation: blob 7s infinite; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-gradient-x { animation: gradient-x 15s ease infinite; }
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
.animate-spin-slow { animation: spin-slow 20s linear infinite; }
.animate-bounce-slow { animation: bounce-slow 3s infinite; }

/* Animation Delays */
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* FAQ Styles */
.faq-item.active .faq-answer {
    max-height: 200px;
    opacity: 1;
}

.faq-answer {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s ease;
}

/* Product Card Enhancements */
.product-card {
    background: var(--surface-color);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .product-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
    }
    
    .text-5xl { font-size: 2.5rem; }
    .text-6xl { font-size: 3rem; }
    .text-7xl { font-size: 3.5rem; }
    .text-8xl { font-size: 4rem; }
}

@media (max-width: 640px) {
    .px-6 { padding-left: 1rem; padding-right: 1rem; }
    .py-20 { padding-top: 3rem; padding-bottom: 3rem; }
    .gap-8 { gap: 1rem; }
    .gap-12 { gap: 1.5rem; }
    .gap-16 { gap: 2rem; }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Line clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Glassmorphism effects */
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}

/* Custom gradient backgrounds */
.bg-gradient-to-r {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-br {
    background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Enhanced shadows */
.shadow-2xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Transform utilities */
.transform {
    transform: var(--tw-transform);
}

.hover\\:scale-105:hover {
    transform: scale(1.05);
}

.hover\\:scale-110:hover {
    transform: scale(1.1);
}

.hover\\:-translate-y-1:hover {
    transform: translateY(-0.25rem);
}

.hover\\:-translate-y-2:hover {
    transform: translateY(-0.5rem);
}

/* Transition utilities */
.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}

.duration-200 {
    transition-duration: 200ms;
}

.duration-300 {
    transition-duration: 300ms;
}

.duration-500 {
    transition-duration: 500ms;
}`;
};