/**
 * مكونات المعاينة للقالب الافتراضي
 * يستخدم المكونات الموجودة حالياً
 */

import { TemplatePreviewComponents } from '../../types/template';

// استيراد المكونات الموجودة
import PreviewHeader from '../../components/StorePreview/PreviewHeader';
import PreviewFooter from '../../components/StorePreview/PreviewFooter';
import PreviewHero from '../../components/StorePreview/PreviewHero';
import PreviewProductSection from '../../components/StorePreview/PreviewProductSection';
import PreviewWhyChooseUs from '../../components/StorePreview/PreviewWhyChooseUs';
import PreviewFAQ from '../../components/StorePreview/PreviewFAQ';

export const previewComponents: TemplatePreviewComponents = {
  Header: PreviewHeader,
  Footer: PreviewFooter,
  Hero: PreviewHero,
  ProductSection: PreviewProductSection,
  WhyChooseUs: PreviewWhyChooseUs,
  FAQ: PreviewFAQ,
};