import React from 'react';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { hero } = settings.sections;
  if (!hero.enabled) return null;

  const { title, subtitle, ctaText, ctaLink, backgroundImage } = hero.data;

  const backgroundStyle: React.CSSProperties = backgroundImage
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${backgroundImage}')` }
    : { background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})` };

  return (
    <section
      id="hero"
      className="py-24 px-6 text-center text-white bg-cover bg-center flex items-center justify-center min-h-[50vh]"
      style={backgroundStyle}
    >
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">{title}</h2>
        <p className="text-lg md:text-xl opacity-90 mb-8">{subtitle}</p>
        <a
          href={ctaLink}
          className="inline-block text-black font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105"
          style={{ backgroundColor: settings.accentColor, color: '#111' }}
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
};
