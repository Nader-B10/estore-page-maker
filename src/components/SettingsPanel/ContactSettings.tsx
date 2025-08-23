import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { useStore } from '../../contexts/StoreContext';

export default function ContactSettings() {
  const { storeData, updateSettings } = useStore();
  const { settings } = storeData;

  const handleContactInfoChange = (field: string, value: string) => {
    updateSettings({
      contactInfo: {
        ...settings.contactInfo,
        [field]: value,
      },
    });
  };

  const handleSocialChange = (field: string, value: string) => {
    updateSettings({
      contactInfo: {
        socials: {
          ...settings.contactInfo.socials,
          [field]: value,
        }
      },
    });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h3" className="mb-0 h6">معلومات الاتصال والتواصل الاجتماعي</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form className="d-flex flex-column gap-3">
          <h4 className="h6 fw-semibold">معلومات الاتصال الأساسية</h4>
          <Form.Group>
            <Form.Label>البريد الإلكتروني</Form.Label>
            <Form.Control type="email" value={settings.contactInfo.email} onChange={(e) => handleContactInfoChange('email', e.target.value)} placeholder="example@store.com" />
          </Form.Group>
          <Form.Group>
            <Form.Label>رقم الهاتف</Form.Label>
            <Form.Control type="tel" value={settings.contactInfo.phone} onChange={(e) => handleContactInfoChange('phone', e.target.value)} placeholder="+966 50 123 4567" />
          </Form.Group>
          <Form.Group>
            <Form.Label>العنوان</Form.Label>
            <Form.Control as="textarea" rows={2} value={settings.contactInfo.address} onChange={(e) => handleContactInfoChange('address', e.target.value)} placeholder="الرياض، المملكة العربية السعودية" />
          </Form.Group>
          
          <hr />

          <h4 className="h6 fw-semibold">روابط التواصل الاجتماعي</h4>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>فيسبوك</Form.Label>
                <Form.Control type="url" value={settings.contactInfo.socials?.facebook} onChange={(e) => handleSocialChange('facebook', e.target.value)} placeholder="https://facebook.com/username" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>تويتر (X)</Form.Label>
                <Form.Control type="url" value={settings.contactInfo.socials?.twitter} onChange={(e) => handleSocialChange('twitter', e.target.value)} placeholder="https://twitter.com/username" />
              </Form.Group>
            </Col>
            <Col md={6} className="mt-3">
              <Form.Group>
                <Form.Label>انستغرام</Form.Label>
                <Form.Control type="url" value={settings.contactInfo.socials?.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} placeholder="https://instagram.com/username" />
              </Form.Group>
            </Col>
            <Col md={6} className="mt-3">
              <Form.Group>
                <Form.Label>لينكدإن</Form.Label>
                <Form.Control type="url" value={settings.contactInfo.socials?.linkedin} onChange={(e) => handleSocialChange('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
