import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ShoppingCart } from 'lucide-react';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { storeName, logo } = settings;

  return (
    <Navbar bg="white" expand="lg" className="navbar-custom shadow-sm border-bottom sticky-top">
      <Container>
        <Navbar.Brand href="#" className="fw-bold">
          {logo && <img src={logo} alt="Logo" style={{ height: '40px' }} className="me-2" />}
          {storeName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="mainNavbar" />
        <Navbar.Collapse id="mainNavbar">
          <Nav className="me-auto">
            <Nav.Link href="#products">المنتجات</Nav.Link>
            <Nav.Link href="#why-us">لماذا نحن</Nav.Link>
            <Nav.Link href="#faq">الأسئلة الشائعة</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#cart" aria-label="Shopping Cart" className="cart-icon">
              <ShoppingCart size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
