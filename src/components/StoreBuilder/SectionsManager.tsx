import React from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import { sectionEditorConfig } from '../SectionsManager/sectionConfig';

export default function SectionsManager() {
  const defaultKey = sectionEditorConfig.length > 0 ? sectionEditorConfig[0].key : '';

  return (
    <Tab.Container id="sections-manager-tabs" defaultActiveKey={defaultKey}>
      <Row className="g-4">
        {/* Vertical Navigation */}
        <Col sm={4} md={3}>
          <Nav variant="pills" className="flex-column">
            {sectionEditorConfig.map(tab => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key}>{tab.title}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>

        {/* Tab Content */}
        <Col sm={8} md={9}>
          <Tab.Content>
            {sectionEditorConfig.map(tab => {
              const { Component } = tab;
              return (
                <Tab.Pane key={tab.key} eventKey={tab.key} className="fade">
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
