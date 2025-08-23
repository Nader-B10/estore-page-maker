import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Truck, Shield, Headphones, Star, Heart, Check, Gift, Clock } from 'lucide-react';
import { TemplateProps } from '../../TemplateTypes';

const iconMap: { [key: string]: React.ElementType } = {
  truck: Truck, shield: Shield, headphones: Headphones, star: Star,
  heart: Heart, check: Check, gift: Gift, clock: Clock,
};

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { whyChooseUs } = settings.sections;

  if (!whyChooseUs || !whyChooseUs.enabled || whyChooseUs.data.items.length === 0) return null;

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="section-header text-center mb-5">
          <h2 className="display-5 fw-bold mb-2">{whyChooseUs.data.title}</h2>
          <p className="lead text-muted">{whyChooseUs.data.subtitle}</p>
          <div className="section-divider mx-auto"></div>
        </div>
        <Row className="g-4 text-center">
          {whyChooseUs.data.items.map((item) => {
            const Icon = iconMap[item.icon] || Star;
            return (
              <Col key={item.id} md={4}>
                <div className="feature-item-card">
                  <div className="feature-icon mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="h5 fw-bold">{item.title}</h3>
                  <p className="text-muted mb-0">{item.description}</p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
