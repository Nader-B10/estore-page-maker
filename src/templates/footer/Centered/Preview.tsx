import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { TemplateProps } from '../../TemplateTypes';

export const Preview: React.FC<TemplateProps> = ({ storeData }) => {
  const { settings } = storeData;
  const { storeName, logo, contactInfo } = settings;
  const { footer } = settings.sections;

  if (!footer.enabled) return null;

  const socials = contactInfo.socials || {};

  return (
    <footer className="footer-custom bg-dark text-white mt-5">
      <Container className="py-4 text-center">
        <a href="#" className="d-block mb-3 text-decoration-none">
          {logo && <img src={logo} alt="Logo" style={{ height: '40px' }} className="me-2" />}
          <span className="fs-4 fw-bold text-white">{storeName}</span>
        </a>
        
        {Object.values(socials).some(link => link) && (
          <Nav className="justify-content-center my-3">
            {socials.facebook && <Nav.Link href={socials.facebook} target="_blank" className="text-white-50 p-2"><Facebook /></Nav.Link>}
            {socials.twitter && <Nav.Link href={socials.twitter} target="_blank" className="text-white-50 p-2"><Twitter /></Nav.Link>}
            {socials.instagram && <Nav.Link href={socials.instagram} target="_blank" className="text-white-50 p-2"><Instagram /></Nav.Link>}
            {socials.linkedin && <Nav.Link href={socials.linkedin} target="_blank" className="text-white-50 p-2"><Linkedin /></Nav.Link>}
          </Nav>
        )}

        <p className="text-white-50 small">{footer.data.text}</p>
      </Container>
    </footer>
  );
};
