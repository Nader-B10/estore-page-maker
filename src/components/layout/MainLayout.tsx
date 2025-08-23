import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { Settings, Package, Layers } from 'lucide-react';
import SettingsPanel from '../StoreBuilder/SettingsPanel';
import ProductManager from '../StoreBuilder/ProductManager';
import StorePreview from '../StoreBuilder/StorePreview';
import SectionsManager from '../StoreBuilder/SectionsManager';
import { useStore } from '../../contexts/StoreContext';

const tabs = [
  { eventKey: 'settings', title: 'الإعدادات', icon: Settings },
  { eventKey: 'sections', title: 'الأقسام', icon: Layers },
  { eventKey: 'products', title: 'المنتجات', icon: Package },
];

export default function MainLayout() {
  const { storeData } = useStore();
  const [previewPageId, setPreviewPageId] = useState('home');

  return (
    <Container fluid className="flex-grow-1 p-0">
      <Tab.Container id="main-builder-tabs" defaultActiveKey="settings">
        <Row className="g-0 min-vh-100">
          {/* Control Panel */}
          <Col lg={5} xl={4} className="bg-white d-flex flex-column border-end">
            <div className="p-3 border-bottom">
              <Nav variant="pills" justify>
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <Nav.Item key={tab.eventKey}>
                      <Nav.Link eventKey={tab.eventKey} className="d-flex align-items-center justify-content-center gap-2">
                        <Icon size={18} />
                        <span>{tab.title}</span>
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </div>

            <div className="flex-grow-1 overflow-y-auto p-3 p-lg-4">
              <Tab.Content>
                <Tab.Pane eventKey="settings"><SettingsPanel /></Tab.Pane>
                <Tab.Pane eventKey="sections"><SectionsManager /></Tab.Pane>
                <Tab.Pane eventKey="products"><ProductManager /></Tab.Pane>
              </Tab.Content>
            </div>
          </Col>

          {/* Preview Panel */}
          <Col lg={7} xl={8} className="bg-light d-flex flex-column h-100">
            <div className="bg-white border-bottom px-4 py-3 z-10">
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="h5 mb-0 fw-semibold">معاينة المتجر المباشرة</h2>
                <Nav variant="pills" activeKey={previewPageId} onSelect={(k) => setPreviewPageId(k || 'home')}>
                  {storeData.settings.pages.map(page => (
                    <Nav.Item key={page.id}>
                      <Nav.Link eventKey={page.id} className="py-1 px-2">{page.title}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
            </div>
            <div className="flex-grow-1 overflow-y-auto">
              <StorePreview pageId={previewPageId} />
            </div>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
