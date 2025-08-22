import { StoreData } from '../types/store';
import { getThemeById } from '../types/theme';

export const generateStoreCSS = (storeData: StoreData): string => {
  const { settings } = storeData;
  const currentTheme = getThemeById(settings.themeId);

  return `/* CSS Variables for Theme */
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

/* Header Styles */
.header-classic {
    background-color: var(--primary-color);
    color: white;
    padding: 1.5rem 0;
}

.header-modern {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 1.5rem 0;
}

.header-minimal {
    background-color: var(--surface-color);
    color: var(--text-color);
    padding: 1.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

/* Hero Section */
.hero-section {
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    padding: 5rem 0;
    position: relative;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
}

.hero-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
}

.hero-cta {
    display: inline-block;
    background: var(--accent-color);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.hero-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

/* Product Layouts */
.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
}

.product-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.product-masonry {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Product Cards */
.product-card {
    background: var(--surface-color);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.3s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
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
}`;
};