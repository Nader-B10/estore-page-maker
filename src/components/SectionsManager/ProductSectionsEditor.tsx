import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import SectionTemplateSelector from './SectionTemplateSelector';

type SectionKey = 'featuredProducts' | 'bestSellers' | 'onSale' | 'homeAllProducts';

export default function ProductSectionsEditor() {
  const { storeData, updateSection } = useStore();
  const { sections } = storeData.settings;

  const handleSectionChange = (section: SectionKey, field: string, value: any) => {
    updateSection(section, { data: { [field]: value } });
  };

  const handleToggleEnabled = (section: SectionKey) => {
    updateSection(section, { enabled: !sections[section].enabled });
  };
  
  const handleTemplateChange = (section: SectionKey, template: string) => {
    updateSection(section, { template });
  };

  const SectionEditor = ({ sectionKey, title }: { sectionKey: SectionKey, title: string }) => {
    const sectionData = sections[sectionKey];
    return (
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <Card.Title as="h3" className="mb-0 h6">{title}</Card.Title>
          <Button size="sm" variant={sectionData.enabled ? 'success' : 'secondary'} onClick={() => handleToggleEnabled(sectionKey)} className="d-flex align-items-center gap-1">
            {sectionData.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
            {sectionData.enabled ? 'مفعل' : 'معطل'}
          </Button>
        </Card.Header>
        <Card.Body>
          <Form className="d-flex flex-column gap-3">
            <SectionTemplateSelector
              sectionKey={sectionKey}
              currentTemplate={sectionData.template}
              onSelect={(template) => handleTemplateChange(sectionKey, template)}
            />
            <Form.Group>
              <Form.Label>العنوان</Form.Label>
              <Form.Control type="text" value={sectionData.data.title} onChange={(e) => handleSectionChange(sectionKey, 'title', e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>العنوان الفرعي</Form.Label>
              <Form.Control type="text" value={sectionData.data.subtitle} onChange={(e) => handleSectionChange(sectionKey, 'subtitle', e.target.value)} />
            </Form.Group>
            {'limit' in sectionData.data && (
              <Form.Group>
                <Form.Label>عدد المنتجات</Form.Label>
                <Form.Control type="number" min="1" max="12" value={(sectionData.data as any).limit} onChange={(e) => handleSectionChange(sectionKey, 'limit', parseInt(e.target.value))} />
              </Form.Group>
            )}
            {sectionData.template === 'carousel' && (
              <Form.Check 
                type="switch"
                id={`autoplay-switch-${sectionKey}`}
                label="تشغيل تلقائي للـ Carousel"
                checked={!!sectionData.data.autoplay}
                onChange={(e) => handleSectionChange(sectionKey, 'autoplay', e.target.checked)}
              />
            )}
          </Form>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="d-flex flex-column gap-4">
      <SectionEditor sectionKey="featuredProducts" title="المنتجات المميزة" />
      <SectionEditor sectionKey="bestSellers" title="الأعلى مبيعاً" />
      <SectionEditor sectionKey="onSale" title="عروض وتخفيضات" />
      <SectionEditor sectionKey="homeAllProducts" title="قسم جميع المنتجات (بالصفحة الرئيسية)" />
    </div>
  );
}
