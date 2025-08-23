import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { hero } = settings.sections;
  if (!hero.enabled) return null;

  const { title, subtitle, ctaText, ctaLink, backgroundImage } = hero.data;

  const backgroundStyle: React.CSSProperties = backgroundImage
    ? { 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${backgroundImage}')`,
      }
    : { background: `linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})` };

  return (
    <section
      id="hero"
      className="hero-section py-5 text-center text-white d-flex align-items-center"
      style={backgroundStyle}
    >
      <Container>
        <h1 className="display-3 fw-bolder mb-3 animate-fade-in-down">{title}</h1>
        <p className="lead fw-normal text-white-50 mb-4 animate-fade-in-up">{subtitle}</p>
        <Button
          href={ctaLink}
          size="lg"
          className="btn-cta fw-bold"
        >
          {ctaText}
        </Button>
      </Container>
    </section>
  );
};
