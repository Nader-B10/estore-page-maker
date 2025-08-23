import React from 'react';
import { Card, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { Upload, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import SectionTemplateSelector from './SectionTemplateSelector';

export default function HeroSectionEditor() {
  const { storeData, updateSection } = useStore();
  const { hero } = storeData.settings.sections;

  const handleChange = (field: string, value: any) => {
    updateSection('hero', { data: { [field]: value } });
  };

  const handleToggleEnabled = () => {
    updateSection('hero', { enabled: !hero.enabled });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => handleChange('backgroundImage', e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Card.Title as="h3" className="mb-0 h6">قسم البطل (Hero)</Card.Title>
        <Button size="sm" variant={hero.enabled ? 'success' : 'secondary'} onClick={handleToggleEnabled} className="d-flex align-items-center gap-1">
          {hero.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
          {hero.enabled ? 'مفعل' : 'معطل'}
        </Button>
      </Card.Header>
      <Card.Body>
        <Form className="d-flex flex-column gap-3">
          <SectionTemplateSelector
            sectionKey="hero"
            currentTemplate={hero.template}
            onSelect={(template) => updateSection('hero', { template })}
          />
          <Form.Group>
            <Form.Label>العنوان الرئيسي</Form.Label>
            <Form.Control type="text" value={hero.data.title} onChange={(e) => handleChange('title', e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>العنوان الفرعي</Form.Label>
            <Form.Control as="textarea" rows={2} value={hero.data.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} />
          </Form.Group>
          {hero.template === 'default' && (
            <Form.Group>
              <Form.Label>صورة الخلفية</Form.Label>
              <div className="d-flex align-items-center gap-3">
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} className="d-none" id="hero-image-upload" />
                <Button as="label" htmlFor="hero-image-upload" className="d-flex align-items-center gap-2">
                  <Upload size={20} />
                  رفع صورة
                </Button>
                {hero.data.backgroundImage && <Image src={hero.data.backgroundImage} alt="Hero Background" rounded style={{ width: '64px', height: '64px', objectFit: 'cover' }} />}
              </div>
            </Form.Group>
          )}
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>نص الزر</Form.Label>
                <Form.Control type="text" value={hero.data.ctaText} onChange={(e) => handleChange('ctaText', e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>رابط الزر</Form.Label>
                <Form.Control type="text" value={hero.data.ctaLink} onChange={(e) => handleChange('ctaLink', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
