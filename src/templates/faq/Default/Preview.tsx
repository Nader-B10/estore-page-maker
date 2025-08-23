import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { faq } = settings.sections;

  if (!faq || !faq.enabled || faq.data.items.length === 0) return null;

  return (
    <section className="py-5">
      <Container>
        <div className="section-header text-center mb-5">
          <h2 className="display-5 fw-bold mb-2">{faq.data.title}</h2>
          <p className="lead text-muted">{faq.data.subtitle}</p>
          <div className="section-divider mx-auto"></div>
        </div>
        <Accordion defaultActiveKey="0" flush className="faq-accordion mx-auto" style={{ maxWidth: '800px' }}>
          {faq.data.items.map((item, index) => (
            <Accordion.Item eventKey={String(index)} key={item.id}>
              <Accordion.Header>{item.question}</Accordion.Header>
              <Accordion.Body>{item.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};
