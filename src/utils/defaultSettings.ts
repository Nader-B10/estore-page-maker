import { StoreSettings } from '../types/store';

export const defaultSettings: StoreSettings = {
  storeName: 'متجري الإلكتروني',
  description: 'أفضل المنتجات بأسعار منافسة',
  logo: '',
  favicon: '',
  themeId: 'blue-modern',
  primaryColor: '#3b82f6',
  secondaryColor: '#1e40af',
  accentColor: '#f59e0b',
  fontFamily: 'Cairo',
  layout: 'grid',
  headerTemplate: 'classic-header',
  heroTemplate: 'hero-variant-a',
  footerTemplate: 'default-footer',
  aboutTemplate: 'modern-about',
  featuresTemplate: 'grid-features',
  faqTemplate: 'accordion-faq',
  footerText: '',
  sectionsOrder: ['hero', 'featured', 'bestSellers', 'onSale', 'about', 'whyChooseUs', 'faq'],
  headerLinks: [
    { id: '1', text: 'الرئيسية', url: '#home', type: 'internal', isVisible: true, order: 1 },
    { id: '2', text: 'المنتجات', url: '#products', type: 'internal', isVisible: true, order: 2 },
    { id: '3', text: 'من نحن', url: '#about', type: 'internal', isVisible: true, order: 3 },
    { id: '4', text: 'اتصل بنا', url: '#contact', type: 'internal', isVisible: true, order: 4 }
  ],
  footerLinks: [
    { id: '1', text: 'سياسة الخصوصية', url: '#privacy', type: 'page', isVisible: true, order: 1 },
    { id: '2', text: 'شروط الاستخدام', url: '#terms', type: 'page', isVisible: true, order: 2 },
    { id: '3', text: 'الأسئلة الشائعة', url: '#faq', type: 'internal', isVisible: true, order: 3 }
  ],
  contactInfo: {
    email: '',
    phone: '',
    address: ''
  },
  whatsappSettings: {
    enabled: true,
    phoneNumber: '',
    messageTemplate: 'مرحباً، أريد شراء هذا المنتج:\n\n📦 *{productName}*\n💰 السعر: {productPrice}\n\n{productDescription}\n\nشكراً لكم',
    includeProductName: true,
    includeProductDescription: true,
    includeProductPrice: true,
    includeStoreInfo: true,
  },
  heroSection: {
    enabled: true,
    title: 'مرحباً بك في متجرنا',
    subtitle: 'اكتشف أفضل المنتجات بأسعار منافسة',
    backgroundImage: '',
    ctaText: 'تسوق الآن',
    ctaLink: '#products'
  },
  productSections: {
    featured: {
      enabled: true,
      title: 'المنتجات المميزة',
      subtitle: 'اختيارنا الأفضل لك',
      limit: 4
    },
    bestSellers: {
      enabled: true,
      title: 'الأعلى مبيعاً',
      subtitle: 'المنتجات الأكثر طلباً',
      limit: 4
    },
    onSale: {
      enabled: true,
      title: 'عروض وتخفيضات',
      subtitle: 'وفر أكثر مع عروضنا الخاصة',
      limit: 4
    }
  },
  aboutSection: {
    enabled: true,
    title: 'من نحن',
    subtitle: 'تعرف على قصتنا ورؤيتنا',
    content: 'نحن فريق متخصص في تقديم أفضل المنتجات والخدمات لعملائنا. بدأت رحلتنا من شغفنا بالجودة والتميز، ونسعى دائماً لتحقيق رضا عملائنا وتجاوز توقعاتهم.',
    image: '',
    stats: [
      {
        id: '1',
        number: '1000+',
        label: 'عميل سعيد',
        icon: 'users'
      },
      {
        id: '2',
        number: '5+',
        label: 'سنوات خبرة',
        icon: 'calendar'
      },
      {
        id: '3',
        number: '500+',
        label: 'منتج متميز',
        icon: 'package'
      },
      {
        id: '4',
        number: '24/7',
        label: 'دعم العملاء',
        icon: 'headphones'
      }
    ],
    team: [
      {
        id: '1',
        name: 'أحمد محمد',
        position: 'المدير التنفيذي',
        image: '',
        bio: 'خبرة 10 سنوات في إدارة الأعمال والتجارة الإلكترونية'
      },
      {
        id: '2',
        name: 'فاطمة أحمد',
        position: 'مديرة التسويق',
        image: '',
        bio: 'متخصصة في التسويق الرقمي ووسائل التواصل الاجتماعي'
      }
    ]
  },
  whyChooseUs: {
    enabled: true,
    title: 'لماذا تختارنا؟',
    subtitle: 'نحن نقدم أفضل تجربة تسوق',
    items: [
      {
        id: '1',
        icon: 'truck',
        title: 'شحن سريع',
        description: 'توصيل مجاني خلال 24 ساعة'
      },
      {
        id: '2',
        icon: 'shield',
        title: 'ضمان الجودة',
        description: 'منتجات أصلية مع ضمان شامل'
      },
      {
        id: '3',
        icon: 'headphones',
        title: 'دعم 24/7',
        description: 'خدمة عملاء متاحة على مدار الساعة'
      }
    ]
  },
  faq: {
    enabled: true,
    title: 'الأسئلة الشائعة',
    subtitle: 'إجابات على أكثر الأسئلة شيوعاً',
    items: [
      {
        id: '1',
        question: 'كيف يمكنني تتبع طلبي؟',
        answer: 'يمكنك تتبع طلبك من خلال رقم الطلب المرسل إليك عبر البريد الإلكتروني'
      },
      {
        id: '2',
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل جميع بطاقات الائتمان والدفع عند الاستلام'
      }
    ]
  }
};