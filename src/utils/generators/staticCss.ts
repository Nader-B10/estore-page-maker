import { StoreData } from '../../types/store';
import { themes } from '../../themes/palettes';

export const generateStaticCss = (storeData: StoreData): string => {
  const { settings } = storeData;
  const theme = themes.find(t => t.name === settings.theme) || themes[0];
  
  const cssVariables = `
:root {
  --primary-color: ${settings.primaryColor};
  --secondary-color: ${settings.secondaryColor};
  --accent-color: ${settings.accentColor};
  --background-color: ${theme.colors.background};
  --surface-color: ${theme.colors.surface};
  --text-color: ${theme.colors.text};
  --subtle-text-color: ${theme.colors.subtleText};
  --footer-background-color: ${theme.colors.footerBackground};
  --footer-text-color: ${theme.colors.footerText};
  --font-family: '${settings.fontFamily}';
}`;

  const staticClasses = `
/*
  Static CSS generated to replace Tailwind CDN.
  This file contains a subset of Tailwind CSS classes used in the templates.
  It uses CSS variables for theming, which are defined in the main HTML file.
*/

/* --- RESET & DEFAULTS --- */
*, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
html { line-height: 1.5; -webkit-text-size-adjust: 100%; -moz-tab-size: 4; tab-size: 4; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; }
body { margin: 0; line-height: inherit; font-family: var(--font-family), sans-serif; background-color: var(--background-color); color: var(--text-color); }
h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }
a { color: inherit; text-decoration: inherit; }
button { font-family: inherit; font-size: 100%; font-weight: inherit; line-height: inherit; color: inherit; margin: 0; padding: 0; text-transform: none; background-color: transparent; background-image: none; cursor: pointer; }
img, svg, video, canvas, audio, iframe, embed, object { display: block; vertical-align: middle; max-width: 100%; height: auto; }

/* --- GROUP & PEER --- */
.group:hover .group-hover\\:scale-105 { transform: scale(1.05); }

/* --- LAYOUT --- */
.container { width: 100%; margin-left: auto; margin-right: auto; padding-left: 1.5rem; padding-right: 1.5rem; }
@media (min-width: 640px) { .container { max-width: 640px; } }
@media (min-width: 768px) { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
.absolute { position: absolute; }
.relative { position: relative; }
.sticky { position: sticky; }
.top-0 { top: 0; }
.top-2 { top: 0.5rem; }
.right-2 { right: 0.5rem; }
.z-50 { z-index: 50; }
.overflow-hidden { overflow: hidden; }
.aspect-square { aspect-ratio: 1 / 1; }

/* --- FLEXBOX & GRID --- */
.flex { display: flex; }
.grid { display: grid; }
.hidden { display: none; }
.inline-block { display: inline-block; }
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.flex-col { flex-direction: column; }
.flex-grow { flex-grow: 1; }
.gap-1 { gap: 0.25rem; }
.gap-3 { gap: 0.75rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
.space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
.space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

/* --- SIZING --- */
.w-full { width: 100%; }
.h-full { height: 100%; }
.w-16 { width: 4rem; }
.h-16 { height: 4rem; }
.w-24 { width: 6rem; }
.h-1 { height: 0.25rem; }
.h-10 { height: 2.5rem; }
.max-w-2xl { max-width: 42rem; }
.max-w-3xl { max-width: 48rem; }
.max-w-4xl { max-width: 56rem; }
.min-h-\\[60vh\\] { min-height: 60vh; }

/* --- MARGIN & PADDING --- */
.mx-auto { margin-left: auto; margin-right: auto; }
.mt-4 { margin-top: 1rem; }
.mt-8 { margin-top: 2rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-12 { margin-bottom: 3rem; }
.mt-auto { margin-top: auto; }
.mt-16 { margin-top: 4rem; }
.p-4 { padding: 1rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.py-24 { padding-top: 6rem; padding-bottom: 6rem; }
.pt-6 { padding-top: 1.5rem; }
.pb-4 { padding-bottom: 1rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }

/* --- TYPOGRAPHY --- */
.font-sans { font-family: var(--font-family), ui-sans-serif, system-ui; }
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.text-2xl { font-size: 1.5rem; line-height: 2rem; }
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.leading-tight { line-height: 1.25; }
.line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.line-through { text-decoration-line: line-through; }
.hover\\:underline:hover { text-decoration-line: underline; }

/* --- COLORS --- */
.bg-surface { background-color: var(--surface-color); }
.bg-footer-background { background-color: var(--footer-background-color); }
.text-text { color: var(--text-color); }
.text-subtle-text { color: var(--subtle-text-color); }
.text-footer-text { color: var(--footer-text-color); }
.text-white { color: #ffffff; }
.text-black { color: #000000; }
.bg-red-500 { background-color: #ef4444; }
.hover\\:bg-gray-500\\/10:hover { background-color: rgba(107, 114, 128, 0.1); }
.hover\\:text-text:hover { color: var(--text-color); }

/* --- BORDERS --- */
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-full { border-radius: 9999px; }
.border { border-width: 1px; }
.border-b { border-bottom-width: 1px; }
.border-t { border-top-width: 1px; }
.border-gray-200\\/10 { border-color: rgba(229, 231, 235, 0.1); }
.border-white\\/10 { border-color: rgba(255, 255, 255, 0.1); }

/* --- EFFECTS --- */
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
.hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.opacity-70 { opacity: 0.7; }
.opacity-80 { opacity: 0.8; }
.opacity-90 { opacity: 0.9; }
.hover\\:opacity-90:hover { opacity: 0.9; }
.hover\\:opacity-100:hover { opacity: 1; }

/* --- TRANSITIONS --- */
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-opacity { transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-shadow { transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-transform { transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-300 { transition-duration: 300ms; }

/* --- TRANSFORMS --- */
.hover\\:scale-105:hover { transform: scale(1.05); }
.rotate-180 { transform: rotate(180deg); }

/* --- MISC --- */
.bg-cover { background-size: cover; }
.bg-center { background-position: center; }
.object-cover { object-fit: cover; }

/* --- MEDIA QUERIES --- */
@media (min-width: 768px) {
  .md\\:flex { display: flex; }
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\\:col-span-1 { grid-column: span 1 / span 1; }
  .md\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
  .md\\:text-6xl { font-size: 3.75rem; line-height: 1; }
}
@media (min-width: 1024px) {
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\\:text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
}
@media (min-width: 1280px) {
  .xl\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* --- CUSTOM COMPONENT CLASSES --- */
.faq-chevron { transition: transform 0.3s; }
.faq-answer.hidden { display: none; }
`;

  return `${cssVariables}\n${staticClasses}`;
};
