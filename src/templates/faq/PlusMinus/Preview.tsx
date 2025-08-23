import React, { useContext } from 'react';
import { Container, Accordion, useAccordionButton, Card } from 'react-bootstrap';
import { Plus, Minus } from 'lucide-react';
import { TemplateProps } from '../../TemplateTypes';

function CustomToggle({ children, eventKey }: { children: React.ReactNode, eventKey: string }) {
  const { activeEventKey } = useContext(Accordion.Context as any);
  const decoratedOnClick = useAccordionButton(eventKey);
  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Card.Header
      className="d-flex justify-content-between align-items-center cursor-pointer"
      style={{ cursor: 'pointer' }}
      onClick={decoratedOnClick}
    >
      <span className="fw-bold">{children}</span>
      {isCurrentEventKey ? <Minus size={20} /> : <Plus size={20} />}
    </Card.Header>
  );
}

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
        <Accordion defaultActiveKey="0" className="mx-auto d-flex flex-column gap-3" style={{ maxWidth: '800px' }}>
          {faq.data.items.map((item, index) => (
            <Card key={item.id} className="product-card">
              <CustomToggle eventKey={String(index)}>{item.question}</CustomToggle>
              <Accordion.Collapse eventKey={String(index)}>
                <Card.Body>{item.answer}</Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};
