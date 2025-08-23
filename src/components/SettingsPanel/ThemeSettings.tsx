import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';
import { Palette } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import ThemeSelector from '../StoreBuilder/ThemeSelector';
import { Theme } from '../../themes/palettes';

export default function ThemeSettings() {
  const { storeData, updateSettings } = useStore();
  const { settings } = storeData;

  const handleChange = (field: string, value: any) => {
    updateSettings({ [field]: value });
  };

  const handleThemeSelect = (theme: Theme) => {
    updateSettings({
      theme: theme.name,
      primaryColor: theme.colors.primary,
      secondaryColor: theme.colors.secondary,
      accentColor: theme.colors.accent,
    });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h3" className="mb-0 h6 d-flex align-items-center gap-2">
          <Palette size={20} />
          الثيم والألوان
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <div className="mb-4">
          <Form.Label className="fw-semibold mb-3">اختر ثيماً جاهزاً</Form.Label>
          <ThemeSelector currentThemeName={settings.theme} onSelectTheme={handleThemeSelect} />
        </div>
        <h4 className="h6 fw-semibold mb-3">أو قم بتخصيص الألوان</h4>
        <Row>
          <Col>
            <Form.Label>الأساسي</Form.Label>
            <Form.Control type="color" value={settings.primaryColor} onChange={(e) => handleChange('primaryColor', e.target.value)} className="form-color-input" />
          </Col>
          <Col>
            <Form.Label>الثانوي</Form.Label>
            <Form.Control type="color" value={settings.secondaryColor} onChange={(e) => handleChange('secondaryColor', e.target.value)} className="form-color-input" />
          </Col>
          <Col>
            <Form.Label>التأكيد</Form.Label>
            <Form.Control type="color" value={settings.accentColor} onChange={(e) => handleChange('accentColor', e.target.value)} className="form-color-input" />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
