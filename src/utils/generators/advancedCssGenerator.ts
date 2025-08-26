/**
 * مولد CSS المتقدم للمتاجر الثابتة
 * ينشئ CSS احترافي مع حركات متقدمة وتصميم عصري
 */

import { StoreData } from '../../types/store';
import { themes } from '../../themes/palettes';

export interface CSSGeneratorOptions {
  includeAnimations: boolean;
  includeGlassmorphism: boolean;
  includeNeumorphism: boolean;
  minify: boolean;
  rtlSupport: boolean;
}

export class AdvancedCSSGenerator {
  private options: CSSGeneratorOptions;

  constructor(options: Partial<CSSGeneratorOptions> = {}) {
    this.options = {
      includeAnimations: true,
      includeGlassmorphism: true,
      includeNeumorphism: false,
      minify: true,
      rtlSupport: true,
      ...options
    };
  }

  /**
   * إنشاء CSS متقدم للمتجر
   */
  generateAdvancedCSS(storeData: StoreData): string {
    const { settings } = storeData;
    const theme = themes.find(t => t.name === settings.theme) || themes[0];

    const cssBlocks = [
      this.generateCSSVariables(settings, theme),
      this.generateResetAndBase(),
      this.generateTypography(settings),
      this.generateLayoutSystem(),
      this.generateComponentStyles(settings),
      this.generateAnimations(),
      this.generateUtilities(),
      this.generateResponsiveDesign(),
    ];

    if (this.options.includeGlassmorphism) {
      cssBlocks.push(this.generateGlassmorphism());
    }

    if (this.options.includeNeumorphism) {
      cssBlocks.push(this.generateNeumorphism());
    }

    if (this.options.rtlSupport) {
      cssBlocks.push(this.generateRTLSupport());
    }

    let css = cssBlocks.join('\n\n');

    if (this.options.minify) {
      css = this.minifyCSS(css);
    }

    return css;
  }

  /**
   * إنشاء متغيرات CSS
   */
  private generateCSSVariables(settings: any, theme: any): string {
    return `
/* Advanced CSS Variables System */
:root {
  /* Color System - HSL for better manipulation */
  --hue-primary: ${this.extractHue(settings.primaryColor)};
  --hue-secondary: ${this.extractHue(settings.secondaryColor)};
  --hue-accent: ${this.extractHue(settings.accentColor)};
  
  /* Primary Color Palette */
  --color-primary-50: hsl(var(--hue-primary), 100%, 97%);
  --color-primary-100: hsl(var(--hue-primary), 95%, 92%);
  --color-primary-200: hsl(var(--hue-primary), 90%, 85%);
  --color-primary-300: hsl(var(--hue-primary), 85%, 75%);
  --color-primary-400: hsl(var(--hue-primary), 85%, 65%);
  --color-primary-500: ${settings.primaryColor};
  --color-primary-600: hsl(var(--hue-primary), 85%, 55%);
  --color-primary-700: hsl(var(--hue-primary), 85%, 45%);
  --color-primary-800: hsl(var(--hue-primary), 85%, 35%);
  --color-primary-900: hsl(var(--hue-primary), 85%, 25%);
  --color-primary-950: hsl(var(--hue-primary), 85%, 15%);
  
  /* Secondary Color Palette */
  --color-secondary-50: hsl(var(--hue-secondary), 100%, 97%);
  --color-secondary-500: ${settings.secondaryColor};
  --color-secondary-900: hsl(var(--hue-secondary), 85%, 25%);
  
  /* Accent Color Palette */
  --color-accent-50: hsl(var(--hue-accent), 100%, 97%);
  --color-accent-500: ${settings.accentColor};
  --color-accent-900: hsl(var(--hue-accent), 85%, 25%);
  
  /* Theme Colors */
  --color-background: ${theme.colors.background};
  --color-surface: ${theme.colors.surface};
  --color-text: ${theme.colors.text};
  --color-text-subtle: ${theme.colors.subtleText};
  --color-footer-bg: ${theme.colors.footerBackground};
  --color-footer-text: ${theme.colors.footerText};
  
  /* Typography System */
  --font-family-primary: '${settings.fontFamily}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-family-heading: var(--font-family-primary);
  --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  
  /* Fluid Typography */
  --font-size-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --font-size-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);
  --font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --font-size-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem);
  --font-size-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --font-size-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --font-size-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem);
  --font-size-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3.5rem);
  --font-size-5xl: clamp(3rem, 2.5rem + 2.5vw, 4.5rem);
  --font-size-6xl: clamp(3.75rem, 3rem + 3.75vw, 6rem);
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* Font Weights */
  --font-weight-thin: 100;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
  
  /* Fluid Spacing System */
  --space-px: 1px;
  --space-0: 0;
  --space-0-5: clamp(0.125rem, 0.1rem + 0.125vw, 0.1875rem);
  --space-1: clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem);
  --space-1-5: clamp(0.375rem, 0.3rem + 0.375vw, 0.5625rem);
  --space-2: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
  --space-2-5: clamp(0.625rem, 0.5rem + 0.625vw, 0.9375rem);
  --space-3: clamp(0.75rem, 0.6rem + 0.75vw, 1.125rem);
  --space-3-5: clamp(0.875rem, 0.7rem + 0.875vw, 1.3125rem);
  --space-4: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-5: clamp(1.25rem, 1rem + 1.25vw, 1.875rem);
  --space-6: clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem);
  --space-7: clamp(1.75rem, 1.4rem + 1.75vw, 2.625rem);
  --space-8: clamp(2rem, 1.6rem + 2vw, 3rem);
  --space-9: clamp(2.25rem, 1.8rem + 2.25vw, 3.375rem);
  --space-10: clamp(2.5rem, 2rem + 2.5vw, 3.75rem);
  --space-11: clamp(2.75rem, 2.2rem + 2.75vw, 4.125rem);
  --space-12: clamp(3rem, 2.4rem + 3vw, 4.5rem);
  --space-14: clamp(3.5rem, 2.8rem + 3.5vw, 5.25rem);
  --space-16: clamp(4rem, 3.2rem + 4vw, 6rem);
  --space-20: clamp(5rem, 4rem + 5vw, 7.5rem);
  --space-24: clamp(6rem, 4.8rem + 6vw, 9rem);
  --space-28: clamp(7rem, 5.6rem + 7vw, 10.5rem);
  --space-32: clamp(8rem, 6.4rem + 8vw, 12rem);
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  
  /* Animation System */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
  
  /* Easing Functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in-back: cubic-bezier(0.6, -0.28, 0.735, 0.045);
  --ease-out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-in-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  
  /* Z-Index Scale */
  --z-0: 0;
  --z-10: 10;
  --z-20: 20;
  --z-30: 30;
  --z-40: 40;
  --z-50: 50;
  --z-auto: auto;
  
  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}`;
  }

  /**
   * إنشاء Reset و Base Styles
   */
  private generateResetAndBase(): string {
    return `
/* Modern CSS Reset */
*, ::before, ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: theme('borderColor.DEFAULT', currentColor);
}

::before, ::after {
  --tw-content: '';
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  -moz-tab-size: 4;
  tab-size: 4;
  font-family: var(--font-family-primary);
  font-feature-settings: normal;
  font-variation-settings: normal;
}

body {
  margin: 0;
  line-height: inherit;
  font-family: var(--font-family-primary);
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

hr {
  height: 0;
  color: inherit;
  border-top-width: 1px;
}

abbr:where([title]) {
  text-decoration: underline dotted;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
  font-family: var(--font-family-heading);
  line-height: var(--line-height-tight);
}

a {
  color: inherit;
  text-decoration: inherit;
}

b, strong {
  font-weight: bolder;
}

code, kbd, samp, pre {
  font-family: var(--font-family-mono);
  font-size: 1em;
}

small {
  font-size: 80%;
}

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

table {
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
}

button, input, optgroup, select, textarea {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button, select {
  text-transform: none;
}

button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
  cursor: pointer;
}

:-moz-focusring {
  outline: auto;
}

:-moz-ui-invalid {
  box-shadow: none;
}

progress {
  vertical-align: baseline;
}

::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
  height: auto;
}

[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

summary {
  display: list-item;
}

blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol, ul, menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

textarea {
  resize: vertical;
}

input::placeholder, textarea::placeholder {
  opacity: 1;
  color: #9ca3af;
}

button, [role="button"] {
  cursor: pointer;
}

:disabled {
  cursor: default;
}

img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

img, video {
  max-width: 100%;
  height: auto;
}

[hidden] {
  display: none;
}`;
  }

  /**
   * إنشاء نظام Typography
   */
  private generateTypography(settings: any): string {
    return `
/* Advanced Typography System */
.font-thin { font-weight: var(--font-weight-thin); }
.font-light { font-weight: var(--font-weight-light); }
.font-normal { font-weight: var(--font-weight-normal); }
.font-medium { font-weight: var(--font-weight-medium); }
.font-semibold { font-weight: var(--font-weight-semibold); }
.font-bold { font-weight: var(--font-weight-bold); }
.font-extrabold { font-weight: var(--font-weight-extrabold); }
.font-black { font-weight: var(--font-weight-black); }

.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }
.text-5xl { font-size: var(--font-size-5xl); }
.text-6xl { font-size: var(--font-size-6xl); }

.leading-tight { line-height: var(--line-height-tight); }
.leading-snug { line-height: var(--line-height-snug); }
.leading-normal { line-height: var(--line-height-normal); }
.leading-relaxed { line-height: var(--line-height-relaxed); }
.leading-loose { line-height: var(--line-height-loose); }

.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-justify { text-align: justify; }

/* Advanced Text Effects */
.text-gradient {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-shadow-sm { text-shadow: 0 1px 2px rgb(0 0 0 / 0.05); }
.text-shadow { text-shadow: 0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px rgb(0 0 0 / 0.06); }
.text-shadow-md { text-shadow: 0 4px 6px rgb(0 0 0 / 0.1), 0 2px 4px rgb(0 0 0 / 0.06); }
.text-shadow-lg { text-shadow: 0 10px 15px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05); }
.text-shadow-xl { text-shadow: 0 20px 25px rgb(0 0 0 / 0.1), 0 8px 10px rgb(0 0 0 / 0.04); }

/* Typography Utilities */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}`;
  }

  /**
   * إنشاء نظام Layout
   */
  private generateLayoutSystem(): string {
    return `
/* Advanced Layout System */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

/* Flexbox System */
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-nowrap { flex-wrap: nowrap; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.items-center { align-items: center; }
.items-baseline { align-items: baseline; }
.items-stretch { align-items: stretch; }
.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }
.flex-1 { flex: 1 1 0%; }
.flex-auto { flex: 1 1 auto; }
.flex-initial { flex: 0 1 auto; }
.flex-none { flex: none; }
.flex-grow { flex-grow: 1; }
.flex-shrink { flex-shrink: 1; }

/* Grid System */
.grid { display: grid; }
.inline-grid { display: inline-grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
.col-span-1 { grid-column: span 1 / span 1; }
.col-span-2 { grid-column: span 2 / span 2; }
.col-span-3 { grid-column: span 3 / span 3; }
.col-span-4 { grid-column: span 4 / span 4; }
.col-span-6 { grid-column: span 6 / span 6; }
.col-span-12 { grid-column: span 12 / span 12; }
.gap-0 { gap: 0; }
.gap-1 { gap: var(--space-1); }
.gap-2 { gap: var(--space-2); }
.gap-3 { gap: var(--space-3); }
.gap-4 { gap: var(--space-4); }
.gap-5 { gap: var(--space-5); }
.gap-6 { gap: var(--space-6); }
.gap-8 { gap: var(--space-8); }
.gap-10 { gap: var(--space-10); }
.gap-12 { gap: var(--space-12); }

/* Advanced Grid Layouts */
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: var(--space-6);
}

.grid-auto-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(250px, 100%), 1fr));
  gap: var(--space-4);
}

/* Masonry Layout */
.masonry {
  columns: 1;
  column-gap: var(--space-6);
  break-inside: avoid;
}

@media (min-width: 640px) {
  .masonry { columns: 2; }
}

@media (min-width: 1024px) {
  .masonry { columns: 3; }
}

@media (min-width: 1280px) {
  .masonry { columns: 4; }
}`;
  }

  /**
   * إنشاء أنماط المكونات
   */
  private generateComponentStyles(settings: any): string {
    return `
/* Advanced Component Styles */

/* Button System */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-tight);
  border-radius: var(--radius-lg);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all var(--duration-200) var(--ease-out);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-primary-200);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-primary-50);
  border-color: var(--color-primary-300);
}

.btn-outline {
  background: transparent;
  color: var(--color-primary-600);
  border-color: var(--color-primary-500);
}

.btn-outline:hover:not(:disabled) {
  background: var(--color-primary-500);
  color: white;
}

/* Morphing Button Effect */
.btn-morph {
  position: relative;
  overflow: hidden;
}

.btn-morph::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all var(--duration-300) var(--ease-out);
}

.btn-morph:hover::before {
  width: 300px;
  height: 300px;
}

/* Card System */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--duration-300) var(--ease-out);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.card-body {
  padding: var(--space-6);
}

.card-header {
  padding: var(--space-6);
  padding-bottom: 0;
}

.card-footer {
  padding: var(--space-6);
  padding-top: 0;
}

/* Advanced Card with Glassmorphism */
.card-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Product Card */
.product-card {
  background: var(--color-surface);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all var(--duration-300) var(--ease-out-back);
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-2xl);
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left var(--duration-500) var(--ease-out);
  z-index: 1;
}

.product-card:hover::before {
  left: 100%;
}

.product-image {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-300) var(--ease-out);
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

/* Form Elements */
.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-primary-200);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-base);
  transition: all var(--duration-200) var(--ease-out);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(var(--color-primary-500), 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Badge System */
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
}

.badge-primary {
  background: var(--color-primary-100);
  color: var(--color-primary-800);
}

.badge-secondary {
  background: var(--color-secondary-100);
  color: var(--color-secondary-800);
}

.badge-success {
  background: #dcfce7;
  color: #166534;
}

.badge-warning {
  background: #fef3c7;
  color: #92400e;
}

.badge-error {
  background: #fee2e2;
  color: #991b1b;
}

/* Loading States */
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
  border-radius: var(--radius-md);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-primary-200);
  border-top: 2px solid var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}`;
  }

  /**
   * إنشاء الحركات والتأثيرات
   */
  private generateAnimations(): string {
    return `
/* Advanced Animation System */

/* Keyframes */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

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

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px var(--color-primary-500);
  }
  50% {
    box-shadow: 0 0 40px var(--color-primary-400);
  }
}

/* Animation Classes */
.animate-spin { animation: spin 1s linear infinite; }
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
.animate-bounce { animation: bounce 1s infinite; }
.animate-fade-in { animation: fadeIn var(--duration-500) var(--ease-out); }
.animate-fade-in-up { animation: fadeInUp var(--duration-500) var(--ease-out); }
.animate-fade-in-down { animation: fadeInDown var(--duration-500) var(--ease-out); }
.animate-slide-in-left { animation: slideInLeft var(--duration-500) var(--ease-out); }
.animate-slide-in-right { animation: slideInRight var(--duration-500) var(--ease-out); }
.animate-scale-in { animation: scaleIn var(--duration-300) var(--ease-out-back); }
.animate-float { animation: float 3s ease-in-out infinite; }
.animate-glow { animation: glow 2s ease-in-out infinite; }

/* Transition Classes */
.transition-none { transition-property: none; }
.transition-all { transition-property: all; transition-timing-function: var(--ease-out); transition-duration: var(--duration-150); }
.transition-colors { transition-property: color, background-color, border-color; transition-timing-function: var(--ease-out); transition-duration: var(--duration-150); }
.transition-opacity { transition-property: opacity; transition-timing-function: var(--ease-out); transition-duration: var(--duration-150); }
.transition-shadow { transition-property: box-shadow; transition-timing-function: var(--ease-out); transition-duration: var(--duration-150); }
.transition-transform { transition-property: transform; transition-timing-function: var(--ease-out); transition-duration: var(--duration-150); }

.duration-75 { transition-duration: var(--duration-75); }
.duration-100 { transition-duration: var(--duration-100); }
.duration-150 { transition-duration: var(--duration-150); }
.duration-200 { transition-duration: var(--duration-200); }
.duration-300 { transition-duration: var(--duration-300); }
.duration-500 { transition-duration: var(--duration-500); }
.duration-700 { transition-duration: var(--duration-700); }
.duration-1000 { transition-duration: var(--duration-1000); }

.ease-linear { transition-timing-function: var(--ease-linear); }
.ease-in { transition-timing-function: var(--ease-in); }
.ease-out { transition-timing-function: var(--ease-out); }
.ease-in-out { transition-timing-function: var(--ease-in-out); }
.ease-in-back { transition-timing-function: var(--ease-in-back); }
.ease-out-back { transition-timing-function: var(--ease-out-back); }
.ease-in-out-back { transition-timing-function: var(--ease-in-out-back); }

/* Hover Effects */
.hover-lift:hover {
  transform: translateY(-4px);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-rotate:hover {
  transform: rotate(5deg);
}

.hover-glow:hover {
  box-shadow: 0 0 20px var(--color-primary-500);
}

/* Stagger Animation */
.stagger-children > * {
  animation: fadeInUp var(--duration-500) var(--ease-out-back);
  animation-fill-mode: both;
}

.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 100ms; }
.stagger-children > *:nth-child(3) { animation-delay: 200ms; }
.stagger-children > *:nth-child(4) { animation-delay: 300ms; }
.stagger-children > *:nth-child(5) { animation-delay: 400ms; }
.stagger-children > *:nth-child(6) { animation-delay: 500ms; }`;
  }

  /**
   * إنشاء Glassmorphism
   */
  private generateGlassmorphism(): string {
    return `
/* Glassmorphism Effects */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.glass-dark {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.glass-primary {
  background: rgba(var(--color-primary-500), 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--color-primary-500), 0.2);
  box-shadow: 0 8px 32px rgba(var(--color-primary-500), 0.1);
}`;
  }

  /**
   * إنشاء Neumorphism
   */
  private generateNeumorphism(): string {
    return `
/* Neumorphism Effects */
.neu {
  background: #e0e5ec;
  border-radius: var(--radius-2xl);
  box-shadow: 
    20px 20px 60px #bebebe,
    -20px -20px 60px #ffffff;
}

.neu-inset {
  background: #e0e5ec;
  border-radius: var(--radius-2xl);
  box-shadow: 
    inset 20px 20px 60px #bebebe,
    inset -20px -20px 60px #ffffff;
}

.neu-pressed {
  background: #e0e5ec;
  border-radius: var(--radius-2xl);
  box-shadow: 
    inset 5px 5px 10px #bebebe,
    inset -5px -5px 10px #ffffff;
}`;
  }

  /**
   * إنشاء Utilities
   */
  private generateUtilities(): string {
    return `
/* Utility Classes */

/* Display */
.block { display: block; }
.inline-block { display: inline-block; }
.inline { display: inline; }
.hidden { display: none; }

/* Position */
.static { position: static; }
.fixed { position: fixed; }
.absolute { position: absolute; }
.relative { position: relative; }
.sticky { position: sticky; }

/* Top, Right, Bottom, Left */
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.top-0 { top: 0; }
.right-0 { right: 0; }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }

/* Z-Index */
.z-0 { z-index: var(--z-0); }
.z-10 { z-index: var(--z-10); }
.z-20 { z-index: var(--z-20); }
.z-30 { z-index: var(--z-30); }
.z-40 { z-index: var(--z-40); }
.z-50 { z-index: var(--z-50); }
.z-auto { z-index: var(--z-auto); }

/* Overflow */
.overflow-auto { overflow: auto; }
.overflow-hidden { overflow: hidden; }
.overflow-visible { overflow: visible; }
.overflow-scroll { overflow: scroll; }
.overflow-x-auto { overflow-x: auto; }
.overflow-y-auto { overflow-y: auto; }
.overflow-x-hidden { overflow-x: hidden; }
.overflow-y-hidden { overflow-y: hidden; }

/* Width & Height */
.w-auto { width: auto; }
.w-full { width: 100%; }
.w-screen { width: 100vw; }
.h-auto { height: auto; }
.h-full { height: 100%; }
.h-screen { height: 100vh; }
.min-h-screen { min-height: 100vh; }
.max-w-none { max-width: none; }
.max-w-xs { max-width: 20rem; }
.max-w-sm { max-width: 24rem; }
.max-w-md { max-width: 28rem; }
.max-w-lg { max-width: 32rem; }
.max-w-xl { max-width: 36rem; }
.max-w-2xl { max-width: 42rem; }
.max-w-3xl { max-width: 48rem; }
.max-w-4xl { max-width: 56rem; }
.max-w-5xl { max-width: 64rem; }
.max-w-6xl { max-width: 72rem; }
.max-w-7xl { max-width: 80rem; }

/* Margin */
.m-0 { margin: 0; }
.m-auto { margin: auto; }
.mx-auto { margin-left: auto; margin-right: auto; }
.my-auto { margin-top: auto; margin-bottom: auto; }
.mt-auto { margin-top: auto; }
.mr-auto { margin-right: auto; }
.mb-auto { margin-bottom: auto; }
.ml-auto { margin-left: auto; }

/* Padding */
.p-0 { padding: 0; }
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }
.p-5 { padding: var(--space-5); }
.p-6 { padding: var(--space-6); }
.p-8 { padding: var(--space-8); }
.p-10 { padding: var(--space-10); }
.p-12 { padding: var(--space-12); }
.p-16 { padding: var(--space-16); }
.p-20 { padding: var(--space-20); }
.p-24 { padding: var(--space-24); }

.px-0 { padding-left: 0; padding-right: 0; }
.px-1 { padding-left: var(--space-1); padding-right: var(--space-1); }
.px-2 { padding-left: var(--space-2); padding-right: var(--space-2); }
.px-3 { padding-left: var(--space-3); padding-right: var(--space-3); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
.px-6 { padding-left: var(--space-6); padding-right: var(--space-6); }
.px-8 { padding-left: var(--space-8); padding-right: var(--space-8); }

.py-0 { padding-top: 0; padding-bottom: 0; }
.py-1 { padding-top: var(--space-1); padding-bottom: var(--space-1); }
.py-2 { padding-top: var(--space-2); padding-bottom: var(--space-2); }
.py-3 { padding-top: var(--space-3); padding-bottom: var(--space-3); }
.py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }
.py-6 { padding-top: var(--space-6); padding-bottom: var(--space-6); }
.py-8 { padding-top: var(--space-8); padding-bottom: var(--space-8); }
.py-12 { padding-top: var(--space-12); padding-bottom: var(--space-12); }
.py-16 { padding-top: var(--space-16); padding-bottom: var(--space-16); }
.py-20 { padding-top: var(--space-20); padding-bottom: var(--space-20); }
.py-24 { padding-top: var(--space-24); padding-bottom: var(--space-24); }

/* Border Radius */
.rounded-none { border-radius: var(--radius-none); }
.rounded-sm { border-radius: var(--radius-sm); }
.rounded { border-radius: var(--radius-base); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-2xl { border-radius: var(--radius-2xl); }
.rounded-3xl { border-radius: var(--radius-3xl); }
.rounded-full { border-radius: var(--radius-full); }

/* Box Shadow */
.shadow-none { box-shadow: none; }
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow { box-shadow: var(--shadow-base); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }
.shadow-2xl { box-shadow: var(--shadow-2xl); }
.shadow-inner { box-shadow: var(--shadow-inner); }

/* Opacity */
.opacity-0 { opacity: 0; }
.opacity-25 { opacity: 0.25; }
.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }
.opacity-100 { opacity: 1; }

/* Cursor */
.cursor-auto { cursor: auto; }
.cursor-default { cursor: default; }
.cursor-pointer { cursor: pointer; }
.cursor-wait { cursor: wait; }
.cursor-text { cursor: text; }
.cursor-move { cursor: move; }
.cursor-help { cursor: help; }
.cursor-not-allowed { cursor: not-allowed; }

/* User Select */
.select-none { user-select: none; }
.select-text { user-select: text; }
.select-all { user-select: all; }
.select-auto { user-select: auto; }

/* Pointer Events */
.pointer-events-none { pointer-events: none; }
.pointer-events-auto { pointer-events: auto; }`;
  }

  /**
   * إنشاء RTL Support
   */
  private generateRTLSupport(): string {
    return `
/* RTL Support */
[dir="rtl"] .text-left { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
[dir="rtl"] .float-left { float: right; }
[dir="rtl"] .float-right { float: left; }
[dir="rtl"] .clear-left { clear: right; }
[dir="rtl"] .clear-right { clear: left; }

[dir="rtl"] .ml-auto { margin-left: 0; margin-right: auto; }
[dir="rtl"] .mr-auto { margin-right: 0; margin-left: auto; }
[dir="rtl"] .pl-0 { padding-left: 0; padding-right: 0; }
[dir="rtl"] .pr-0 { padding-right: 0; padding-left: 0; }

[dir="rtl"] .border-l { border-left: none; border-right: 1px solid; }
[dir="rtl"] .border-r { border-right: none; border-left: 1px solid; }

[dir="rtl"] .rounded-l-none { border-top-left-radius: 0; border-bottom-left-radius: 0; border-top-right-radius: 0; border-bottom-right-radius: 0; }
[dir="rtl"] .rounded-r-none { border-top-right-radius: 0; border-bottom-right-radius: 0; border-top-left-radius: 0; border-bottom-left-radius: 0; }

[dir="rtl"] .left-0 { left: auto; right: 0; }
[dir="rtl"] .right-0 { right: auto; left: 0; }

/* RTL Animations */
[dir="rtl"] .animate-slide-in-left { animation: slideInRight var(--duration-500) var(--ease-out); }
[dir="rtl"] .animate-slide-in-right { animation: slideInLeft var(--duration-500) var(--ease-out); }`;
  }

  /**
   * إنشاء Responsive Design
   */
  private generateResponsiveDesign(): string {
    return `
/* Advanced Responsive Design */

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .sm\\:block { display: block; }
  .sm\\:flex { display: flex; }
  .sm\\:grid { display: grid; }
  .sm\\:hidden { display: none; }
  .sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sm\\:text-sm { font-size: var(--font-size-sm); }
  .sm\\:text-base { font-size: var(--font-size-base); }
  .sm\\:text-lg { font-size: var(--font-size-lg); }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .md\\:block { display: block; }
  .md\\:flex { display: flex; }
  .md\\:grid { display: grid; }
  .md\\:hidden { display: none; }
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\\:col-span-1 { grid-column: span 1 / span 1; }
  .md\\:col-span-2 { grid-column: span 2 / span 2; }
  .md\\:text-base { font-size: var(--font-size-base); }
  .md\\:text-lg { font-size: var(--font-size-lg); }
  .md\\:text-xl { font-size: var(--font-size-xl); }
  .md\\:text-2xl { font-size: var(--font-size-2xl); }
  .md\\:text-3xl { font-size: var(--font-size-3xl); }
  .md\\:text-4xl { font-size: var(--font-size-4xl); }
  .md\\:text-5xl { font-size: var(--font-size-5xl); }
  .md\\:text-6xl { font-size: var(--font-size-6xl); }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 1024px) {
  .lg\\:block { display: block; }
  .lg\\:flex { display: flex; }
  .lg\\:grid { display: grid; }
  .lg\\:hidden { display: none; }
  .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .lg\\:text-lg { font-size: var(--font-size-lg); }
  .lg\\:text-xl { font-size: var(--font-size-xl); }
  .lg\\:text-2xl { font-size: var(--font-size-2xl); }
  .lg\\:text-3xl { font-size: var(--font-size-3xl); }
  .lg\\:text-4xl { font-size: var(--font-size-4xl); }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1280px) {
  .xl\\:block { display: block; }
  .xl\\:flex { display: flex; }
  .xl\\:grid { display: grid; }
  .xl\\:hidden { display: none; }
  .xl\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .xl\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .xl\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .xl\\:text-xl { font-size: var(--font-size-xl); }
  .xl\\:text-2xl { font-size: var(--font-size-2xl); }
  .xl\\:text-3xl { font-size: var(--font-size-3xl); }
}

/* Extra extra large devices (larger desktops, 1400px and up) */
@media (min-width: 1536px) {
  .\\32xl\\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .\\32xl\\:grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
}

/* Container Queries Support */
@supports (container-type: inline-size) {
  .container-query {
    container-type: inline-size;
  }
  
  @container (min-width: 400px) {
    .cq-sm\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  
  @container (min-width: 600px) {
    .cq-md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  
  @container (min-width: 800px) {
    .cq-lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
}

/* Print Styles */
@media print {
  .print\\:hidden { display: none !important; }
  .print\\:block { display: block !important; }
  
  * {
    color-adjust: exact;
  }
  
  body {
    font-size: 12pt;
    line-height: 1.4;
  }
  
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
  }
  
  .product-card {
    page-break-inside: avoid;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High Contrast */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid var(--color-text);
  }
  
  .btn {
    border: 2px solid currentColor;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-text: #f1f5f9;
    --color-text-subtle: #cbd5e1;
  }
  
  .dark\\:bg-gray-900 { background-color: #111827; }
  .dark\\:text-white { color: #ffffff; }
  .dark\\:border-gray-700 { border-color: #374151; }
}`;
  }

  /**
   * استخراج Hue من اللون
   */
  private extractHue(color: string): number {
    // تحويل hex إلى HSL واستخراج Hue
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;

    let hue = 0;
    if (diff !== 0) {
      switch (max) {
        case r:
          hue = ((g - b) / diff) % 6;
          break;
        case g:
          hue = (b - r) / diff + 2;
          break;
        case b:
          hue = (r - g) / diff + 4;
          break;
      }
    }

    return Math.round(hue * 60);
  }

  /**
   * ضغط CSS
   */
  private minifyCSS(css: string): string {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // إزالة التعليقات
      .replace(/\s+/g, ' ') // ضغط المسافات
      .replace(/;\s*}/g, '}') // إزالة الفاصلة المنقوطة قبل }
      .replace(/\s*{\s*/g, '{') // ضغط المسافات حول {
      .replace(/;\s*/g, ';') // ضغط المسافات بعد ;
      .replace(/,\s*/g, ',') // ضغط المسافات بعد ,
      .trim();
  }
}

// تصدير المولد
export const advancedCSSGenerator = new AdvancedCSSGenerator();