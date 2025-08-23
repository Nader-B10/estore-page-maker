import React, { useState } from 'react';
import { Navbar, Container, Button, Spinner, Modal } from 'react-bootstrap';
import { Package, Download, Loader } from 'lucide-react';
import { useStore } from '../../contexts/StoreContext';
import { exportStore } from '../../utils/fileExporter';

export default function AppHeader() {
  const { storeData } = useStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportStore(storeData);
    } catch (error) {
      console.error('Export error:', error);
      alert('حدث خطأ أثناء تصدير المتجر');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
        <Container fluid="xl">
          <Navbar.Brand href="#home" className="d-flex align-items-center gap-3">
            <div className="w-10 h-10 bg-primary bg-gradient rounded-3 d-flex align-items-center justify-content-center">
              <Package className="text-white" />
            </div>
            <div>
              <h1 className="h5 mb-0 fw-bold">أداة بناء المتاجر</h1>
              <p className="text-muted small mb-0">اصنع متجرك الإلكتروني في دقائق</p>
            </div>
          </Navbar.Brand>
          <Button
            variant="success"
            disabled={isExporting}
            onClick={handleExport}
            size="lg"
            className="d-flex align-items-center gap-2"
          >
            {isExporting ? (
              <>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                جاري التحضير...
              </>
            ) : (
              <>
                <Download size={20} />
                تحميل المتجر
              </>
            )}
          </Button>
        </Container>
      </Navbar>

      <Modal show={isExporting} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center p-4">
          <div className="d-flex justify-content-center mb-4">
            <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          </div>
          <h3 className="h5 mb-2">جاري تحضير المتجر...</h3>
          <p className="text-muted">يتم الآن تجهيز وضغط ملفات متجرك</p>
        </Modal.Body>
      </Modal>
    </>
  );
}
