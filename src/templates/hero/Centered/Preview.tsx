import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { hero } = settings.sections;
  if (!hero.enabled) return null;

  const { title, subtitle, ctaText, ctaLink } = hero.data;

  const backgroundStyle: React.CSSProperties = { 
    background: `linear-gradient(135deg, ${settings.primaryColor} 0%, ${settings.secondaryColor} 100%)`,
    minHeight: '50vh',
  };

  return (
    <section
      id="hero"
      className="hero-section py-5 text-center text-white d-flex align-items-center"
      style={backgroundStyle}
    >
      <Container>
        <h1 className="display-4 fw-bold mb-3 animate-fade-in-down">{title}</h1>
        <p className="lead fw-normal text-white-75 mb-4 mx-auto animate-fade-in-up" style={{ maxWidth: '600px' }}>{subtitle}</p>
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
