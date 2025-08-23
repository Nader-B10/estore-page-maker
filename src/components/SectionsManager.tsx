import React from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import HeroSectionEditor from './SectionsManager/HeroSectionEditor';
import ProductSectionsEditor from './SectionsManager/ProductSectionsEditor';
import AllProductsEditor from './SectionsManager/AllProductsEditor';
import WhyChooseUsEditor from './SectionsManager/WhyChooseUsEditor';
import FAQEditor from './SectionsManager/FAQEditor';
import FooterEditor from './SectionsManager/FooterEditor';

// Configuration for section tabs to make it scalable and maintainable
const sectionTabs = [
  { eventKey: 'hero', title: 'قسم البطل (Hero)', Component: HeroSectionEditor },
  { eventKey: 'product-sections', title: 'أقسام المنتجات', Component: ProductSectionsEditor },
  { eventKey: 'all-products', title: 'صفحة جميع المنتجات', Component: AllProductsEditor },
  { eventKey: 'why-choose-us', title: 'لماذا تختارنا', Component: WhyChooseUsEditor },
  { eventKey: 'faq', title: 'الأسئلة الشائعة', Component: FAQEditor },
  { eventKey: 'footer', title: 'التذييل', Component: FooterEditor },
];

export default function SectionsManager() {
  return (
    <Tab.Container id="sections-manager-tabs" defaultActiveKey="hero">
      <Row className="g-4">
        {/* Vertical Navigation */}
        <Col sm={4} md={3}>
          <Nav variant="pills" className="flex-column">
            {sectionTabs.map(tab => (
              <Nav.Item key={tab.eventKey}>
                <Nav.Link eventKey={tab.eventKey}>{tab.title}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        {/* Tab Content */}
        <Col sm={8} md={9}>
          <Tab.Content>
            {sectionTabs.map(tab => {
              const { Component } = tab;
              return (
                <Tab.Pane key={tab.eventKey} eventKey={tab.eventKey} className="fade">
                  <Component />
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
