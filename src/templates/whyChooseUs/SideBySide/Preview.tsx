import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Truck, Shield, Headphones, Star, Heart, Check, Gift, Clock } from 'lucide-react';
import { TemplateProps } from '../../TemplateTypes';

const iconMap: { [key: string]: React.ElementType } = {
  truck: Truck, shield: Shield, headphones: Headphones, star: Star,
  heart: Heart, check: Check, gift: Gift, clock: Clock,
};

// A default image if none is provided in the data
const defaultSideImage = "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto=format&fit=crop";

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { whyChooseUs } = settings.sections;

  if (!whyChooseUs || !whyChooseUs.enabled || whyChooseUs.data.items.length === 0) return null;

  const sideImage = (whyChooseUs.data as any).sideImage || defaultSideImage;

  return (
    <section className="py-5">
      <Container>
        <div className="section-header text-center mb-5">
          <h2 className="display-5 fw-bold mb-2">{whyChooseUs.data.title}</h2>
          <p className="lead text-muted">{whyChooseUs.data.subtitle}</p>
          <div className="section-divider mx-auto"></div>
        </div>
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <Image src={sideImage} rounded fluid className="shadow" />
          </Col>
          <Col lg={6}>
            <div className="d-flex flex-column gap-4">
              {whyChooseUs.data.items.map((item) => {
                const Icon = iconMap[item.icon] || Star;
                return (
                  <div key={item.id} className="d-flex align-items-start gap-3">
                    <div className="feature-icon flex-shrink-0 mt-1" style={{ width: '50px', height: '50px' }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="h5 fw-bold mb-1">{item.title}</h3>
                      <p className="text-muted mb-0">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
