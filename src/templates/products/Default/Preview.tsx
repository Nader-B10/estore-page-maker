import React from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert } from 'react-bootstrap';
import { TemplateProps } from '../../TemplateTypes';
import { Product, ProductSectionData } from '../../../types/store';
import { ShoppingBag } from 'lucide-react';

const PreviewProductCard: React.FC<{ product: Product, settings: TemplateProps['storeData']['settings'] }> = ({ product }) => {
  return (
    <Col>
      <Card className="product-card h-100">
        <div className="product-card-img-container">
          <Card.Img variant="top" src={product.image} className="product-card-img" />
          <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-1">
            {product.isOnSale && product.discountPercentage && (
              <Badge bg="danger" className="fs-sm">-{product.discountPercentage}%</Badge>
            )}
          </div>
        </div>
        <Card.Body className="d-flex flex-column p-3">
          <Card.Title as="h3" className="h6 product-card-title">{product.name}</Card.Title>
          <Card.Text className="small text-muted flex-grow-1 line-clamp-2">{product.description}</Card.Text>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="fw-bold fs-5 text-primary">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="ms-2 text-muted text-decoration-line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button size="sm" className="btn-add-to-cart">أضف للسلة</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export const Preview: React.FC<TemplateProps> = ({ storeData, sectionKey }) => {
  const validSectionKeys = ['featuredProducts', 'bestSellers', 'onSale', 'allProducts', 'homeAllProducts'];
  if (!sectionKey || !validSectionKeys.includes(sectionKey)) {
    return null;
  }

  const { settings, products } = storeData;
  const sectionConfig = settings.sections[sectionKey as keyof typeof settings.sections];

  if (!sectionConfig || !sectionConfig.enabled) return null;

  const { title, subtitle } = sectionConfig.data;
  const limit = (sectionConfig.data as ProductSectionData).limit;

  let sectionProducts: Product[] = [];
  switch (sectionKey) {
    case 'featuredProducts': sectionProducts = products.filter(p => p.isFeatured); break;
    case 'bestSellers': sectionProducts = products.filter(p => p.isBestSeller); break;
    case 'onSale': sectionProducts = products.filter(p => p.isOnSale); break;
    case 'allProducts': sectionProducts = products; break;
    case 'homeAllProducts': sectionProducts = products; break;
  }

  if (limit) sectionProducts = sectionProducts.slice(0, limit);

  const rowCols = settings.layout === 'list' ? { xs: 1 } : { xs: 1, sm: 2, lg: 3, xl: 4 };

  return (
    <section className="py-5">
      <Container>
        <div className="section-header text-center mb-5">
          <h2 className="display-5 fw-bold mb-2">{title}</h2>
          <p className="lead text-muted">{subtitle}</p>
          <div className="section-divider mx-auto"></div>
        </div>
        {sectionProducts.length > 0 ? (
          <Row {...rowCols} className="g-4">
            {sectionProducts.map(product => (
              <PreviewProductCard key={product.id} product={product} settings={settings} />
            ))}
          </Row>
        ) : (
          <Alert variant="secondary" className="text-center">
            <ShoppingBag className="mx-auto mb-2" />
            <Alert.Heading as="h4" className="h6">لا توجد منتجات في هذا القسم بعد.</Alert.Heading>
            <p className="small mb-0">
              أضف بعض المنتجات من تبويب "المنتجات" لتظهر هنا.
            </p>
          </Alert>
        )}
      </Container>
    </section>
  );
};
