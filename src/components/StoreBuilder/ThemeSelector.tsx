import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { CheckCircle } from 'lucide-react';
import { Theme, themes } from '../../themes/palettes';

interface ThemeSelectorProps {
  currentThemeName: string;
  onSelectTheme: (theme: Theme) => void;
}

export default function ThemeSelector({ currentThemeName, onSelectTheme }: ThemeSelectorProps) {
  return (
    <Row xs={2} md={3} className="g-3">
      {themes.map((theme) => {
        const isSelected = theme.name === currentThemeName;
        return (
          <Col key={theme.name}>
            <Card
              onClick={() => onSelectTheme(theme)}
              className={`text-center cursor-pointer position-relative ${isSelected ? 'border-primary border-2' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {isSelected && (
                <div className="position-absolute bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', top: '-10px', right: '-10px' }}>
                  <CheckCircle size={16} />
                </div>
              )}
              <Card.Body className="p-3">
                <Card.Title as="p" className="small fw-semibold mb-2">{theme.displayName}</Card.Title>
                <div className="d-flex justify-content-center align-items-center gap-1" style={{ height: '32px' }}>
                  <div className="w-100 h-100 rounded-start" style={{ backgroundColor: theme.colors.primary }} />
                  <div className="w-100 h-100" style={{ backgroundColor: theme.colors.secondary }} />
                  <div className="w-100 h-100 rounded-end" style={{ backgroundColor: theme.colors.accent }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
