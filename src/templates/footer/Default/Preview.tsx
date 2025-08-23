import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { storeName, description, contactInfo } = settings;
  const { footer } = settings.sections;

  if (!footer.enabled) return null;

  return (
    <footer className="footer-custom bg-dark text-white mt-5">
      <Container className="py-5">
        <Row className="gy-4">
          <Col lg={4} md={12}>
            <h3 className="h4 fw-bold mb-2">{storeName}</h3>
            <p className="text-white-50">{description}</p>
          </Col>
          <Col lg={4} md={6}>
            <h4 className="h5 mb-3 footer-heading">روابط سريعة</h4>
            <ul className="list-unstyled footer-links">
              <li className="mb-2"><a href="#products">المنتجات</a></li>
              <li className="mb-2"><a href="#why-us">لماذا نحن</a></li>
              <li><a href="#faq">الأسئلة الشائعة</a></li>
            </ul>
          </Col>
          <Col lg={4} md={6}>
            <h4 className="h5 mb-3 footer-heading">تواصل معنا</h4>
            <ul className="list-unstyled text-white-50">
              {contactInfo.email && <li className="mb-2">البريد: <a href={`mailto:${contactInfo.email}`} className="text-reset text-decoration-none hover-underline">{contactInfo.email}</a></li>}
              {contactInfo.phone && <li className="mb-2">الهاتف: {contactInfo.phone}</li>}
              {contactInfo.address && <li>العنوان: {contactInfo.address}</li>}
            </ul>
          </Col>
        </Row>
        <div className="mt-5 pt-4 border-top border-secondary text-center text-white-50">
          <p>{footer.data.text}</p>
        </div>
      </Container>
    </footer>
  );
};
