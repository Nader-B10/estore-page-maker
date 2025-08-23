import { icons } from './iconSvgs';

/**
 * Generates an SVG string for a given icon name.
 * @param iconName The name of the icon to generate.
 * @returns The SVG string for the icon, or an empty string if not found.
 */
export const generateIconHTML = (iconName: string): string => {
  return icons[iconName] || '';
};
