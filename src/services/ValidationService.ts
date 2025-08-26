/**
 * خدمة التحقق من صحة البيانات الشاملة
 * تقوم بالتحقق من جميع أنواع البيانات في النظام
 */

import { Product, StoreSettings, WhatsAppSettings, CustomPage } from '../types/store';

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}

export class ValidationService {
  private static instance: ValidationService;
  
  public static getInstance(): ValidationService {
    if (!ValidationService.instance) {
      ValidationService.instance = new ValidationService();
    }
    return ValidationService.instance;
  }

  /**
   * التحقق من صحة بيانات المنتج
   */
  validateProduct(product: Product): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // التحقق من اسم المنتج
    if (!product.name || product.name.trim().length === 0) {
      errors.push({
        field: 'name',
        message: 'اسم المنتج مطلوب',
        code: 'PRODUCT_NAME_REQUIRED'
      });
    } else if (product.name.length > 100) {
      warnings.push({
        field: 'name',
        message: 'اسم المنتج طويل جداً',
        suggestion: 'يفضل أن يكون أقل من 100 حرف'
      });
    }

    // التحقق من السعر
    if (product.price <= 0) {
      errors.push({
        field: 'price',
        message: 'سعر المنتج يجب أن يكون أكبر من صفر',
        code: 'INVALID_PRICE'
      });
    }

    if (product.originalPrice && product.originalPrice <= product.price) {
      warnings.push({
        field: 'originalPrice',
        message: 'السعر الأصلي يجب أن يكون أكبر من السعر الحالي',
        suggestion: 'تأكد من أن السعر الأصلي أعلى من سعر العرض'
      });
    }

    // التحقق من الصورة
    if (!product.image) {
      errors.push({
        field: 'image',
        message: 'صورة المنتج مطلوبة',
        code: 'IMAGE_REQUIRED'
      });
    } else if (!this.isValidImageUrl(product.image)) {
      errors.push({
        field: 'image',
        message: 'رابط الصورة غير صحيح',
        code: 'INVALID_IMAGE_URL'
      });
    }

    // التحقق من الوصف
    if (product.description && product.description.length > 500) {
      warnings.push({
        field: 'description',
        message: 'وصف المنتج طويل',
        suggestion: 'يفضل أن يكون أقل من 500 حرف'
      });
    }

    // التحقق من الفئة
    if (product.category && product.category.length > 50) {
      warnings.push({
        field: 'category',
        message: 'اسم الفئة طويل',
        suggestion: 'يفضل أن يكون أقل من 50 حرف'
      });
    }

    // التحقق من نسبة الخصم
    if (product.discountPercentage && (product.discountPercentage < 0 || product.discountPercentage > 100)) {
      errors.push({
        field: 'discountPercentage',
        message: 'نسبة الخصم يجب أن تكون بين 0 و 100',
        code: 'INVALID_DISCOUNT_PERCENTAGE'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * التحقق من صحة إعدادات المتجر
   */
  validateStoreSettings(settings: StoreSettings): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // التحقق من اسم المتجر
    if (!settings.storeName || settings.storeName.trim().length === 0) {
      errors.push({
        field: 'storeName',
        message: 'اسم المتجر مطلوب',
        code: 'STORE_NAME_REQUIRED'
      });
    } else if (settings.storeName.length > 100) {
      warnings.push({
        field: 'storeName',
        message: 'اسم المتجر طويل جداً',
        suggestion: 'يفضل أن يكون أقل من 100 حرف'
      });
    }

    // التحقق من وصف المتجر
    if (settings.description && settings.description.length > 300) {
      warnings.push({
        field: 'description',
        message: 'وصف المتجر طويل',
        suggestion: 'يفضل أن يكون أقل من 300 حرف'
      });
    }

    // التحقق من البريد الإلكتروني
    if (settings.contactInfo?.email && !this.validateEmail(settings.contactInfo.email).isValid) {
      errors.push({
        field: 'contactInfo.email',
        message: 'البريد الإلكتروني غير صحيح',
        code: 'INVALID_EMAIL'
      });
    }

    // التحقق من رقم الهاتف
    if (settings.contactInfo?.phone && !this.validatePhoneNumber(settings.contactInfo.phone).isValid) {
      warnings.push({
        field: 'contactInfo.phone',
        message: 'تنسيق رقم الهاتف قد يكون غير صحيح',
        suggestion: 'استخدم التنسيق: +966501234567'
      });
    }

    // التحقق من الألوان
    if (!this.isValidColor(settings.primaryColor)) {
      errors.push({
        field: 'primaryColor',
        message: 'اللون الأساسي غير صحيح',
        code: 'INVALID_PRIMARY_COLOR'
      });
    }

    if (!this.isValidColor(settings.secondaryColor)) {
      errors.push({
        field: 'secondaryColor',
        message: 'اللون الثانوي غير صحيح',
        code: 'INVALID_SECONDARY_COLOR'
      });
    }

    if (!this.isValidColor(settings.accentColor)) {
      errors.push({
        field: 'accentColor',
        message: 'لون التأكيد غير صحيح',
        code: 'INVALID_ACCENT_COLOR'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * التحقق من صحة إعدادات الواتساب
   */
  validateWhatsAppSettings(settings: WhatsAppSettings): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    if (settings.enabled) {
      // التحقق من رقم الواتساب
      if (!settings.phoneNumber) {
        errors.push({
          field: 'phoneNumber',
          message: 'رقم الواتساب مطلوب عند التفعيل',
          code: 'WHATSAPP_PHONE_REQUIRED'
        });
      } else if (!this.validatePhoneNumber(settings.phoneNumber).isValid) {
        errors.push({
          field: 'phoneNumber',
          message: 'رقم الواتساب غير صحيح',
          code: 'INVALID_WHATSAPP_PHONE'
        });
      }

      // التحقق من قالب الرسالة
      if (!settings.messageTemplate || settings.messageTemplate.trim().length === 0) {
        warnings.push({
          field: 'messageTemplate',
          message: 'قالب الرسالة فارغ',
          suggestion: 'أضف قالب رسالة لتحسين تجربة العملاء'
        });
      } else if (settings.messageTemplate.length > 1000) {
        warnings.push({
          field: 'messageTemplate',
          message: 'قالب الرسالة طويل جداً',
          suggestion: 'يفضل أن يكون أقل من 1000 حرف'
        });
      }

      // التحقق من نص الزر
      if (!settings.buttonText || settings.buttonText.trim().length === 0) {
        warnings.push({
          field: 'buttonText',
          message: 'نص الزر فارغ',
          suggestion: 'أضف نص للزر مثل "اشتري عبر الواتساب"'
        });
      } else if (settings.buttonText.length > 50) {
        warnings.push({
          field: 'buttonText',
          message: 'نص الزر طويل',
          suggestion: 'يفضل أن يكون أقل من 50 حرف'
        });
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * التحقق من صحة الصفحة المخصصة
   */
  validateCustomPage(page: CustomPage): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // التحقق من العنوان
    if (!page.title || page.title.trim().length === 0) {
      errors.push({
        field: 'title',
        message: 'عنوان الصفحة مطلوب',
        code: 'PAGE_TITLE_REQUIRED'
      });
    } else if (page.title.length > 100) {
      warnings.push({
        field: 'title',
        message: 'عنوان الصفحة طويل',
        suggestion: 'يفضل أن يكون أقل من 100 حرف'
      });
    }

    // التحقق من الرابط
    if (!page.slug || page.slug.trim().length === 0) {
      errors.push({
        field: 'slug',
        message: 'رابط الصفحة مطلوب',
        code: 'PAGE_SLUG_REQUIRED'
      });
    } else if (!this.validateSlug(page.slug)) {
      errors.push({
        field: 'slug',
        message: 'رابط الصفحة يحتوي على أحرف غير مسموحة',
        code: 'INVALID_SLUG'
      });
    }

    // التحقق من المحتوى
    if (page.pageType === 'content' && (!page.content || page.content.trim().length === 0)) {
      warnings.push({
        field: 'content',
        message: 'محتوى الصفحة فارغ',
        suggestion: 'أضف محتوى للصفحة'
      });
    }

    // التحقق من وصف SEO
    if (page.metaDescription && page.metaDescription.length > 160) {
      warnings.push({
        field: 'metaDescription',
        message: 'وصف SEO طويل',
        suggestion: 'يفضل أن يكون أقل من 160 حرف لأفضل نتائج SEO'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * التحقق من صحة البريد الإلكتروني
   */
  validateEmail(email: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    
    return {
      isValid,
      errors: isValid ? [] : [{
        field: 'email',
        message: 'البريد الإلكتروني غير صحيح',
        code: 'INVALID_EMAIL_FORMAT'
      }],
      warnings: []
    };
  }

  /**
   * التحقق من صحة رقم الهاتف
   */
  validatePhoneNumber(phone: string): ValidationResult {
    // إزالة جميع الأحرف غير الرقمية عدا +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // التحقق من أنه يبدأ بـ + ويحتوي على 10-15 رقم
    const phoneRegex = /^\+\d{10,15}$/;
    const isValid = phoneRegex.test(cleanPhone);
    
    return {
      isValid,
      errors: isValid ? [] : [{
        field: 'phone',
        message: 'رقم الهاتف غير صحيح',
        code: 'INVALID_PHONE_FORMAT'
      }],
      warnings: []
    };
  }

  /**
   * التحقق من صحة الرابط
   */
  validateURL(url: string): ValidationResult {
    try {
      new URL(url);
      return {
        isValid: true,
        errors: [],
        warnings: []
      };
    } catch {
      return {
        isValid: false,
        errors: [{
          field: 'url',
          message: 'الرابط غير صحيح',
          code: 'INVALID_URL'
        }],
        warnings: []
      };
    }
  }

  /**
   * التحقق من صحة ملف الصورة
   */
  validateImageFile(file: File): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // التحقق من نوع الملف
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      errors.push({
        field: 'imageFile',
        message: 'نوع الملف غير مدعوم',
        code: 'INVALID_FILE_TYPE'
      });
    }

    // التحقق من حجم الملف (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      errors.push({
        field: 'imageFile',
        message: 'حجم الملف كبير جداً',
        code: 'FILE_TOO_LARGE'
      });
    } else if (file.size > 1024 * 1024) {
      warnings.push({
        field: 'imageFile',
        message: 'حجم الملف كبير',
        suggestion: 'يفضل ضغط الصورة لتحسين الأداء'
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * التحقق من صحة رابط الصورة
   */
  private isValidImageUrl(url: string): boolean {
    // السماح بـ data URLs
    if (url.startsWith('data:image/')) return true;
    
    try {
      const urlObj = new URL(url);
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      return validExtensions.some(ext => 
        urlObj.pathname.toLowerCase().endsWith(ext)
      );
    } catch {
      return false;
    }
  }

  /**
   * التحقق من صحة الرابط المختصر (slug)
   */
  private validateSlug(slug: string): boolean {
    const slugRegex = /^[a-z0-9\u0600-\u06FF]+(?:-[a-z0-9\u0600-\u06FF]+)*$/;
    return slugRegex.test(slug);
  }

  /**
   * التحقق من صحة اللون
   */
  private isValidColor(color: string): boolean {
    // التحقق من hex colors
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(color)) return true;

    // التحقق من rgb/rgba colors
    const rgbRegex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+)?\s*\)$/;
    if (rgbRegex.test(color)) return true;

    // التحقق من hsl/hsla colors
    const hslRegex = /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[\d.]+)?\s*\)$/;
    if (hslRegex.test(color)) return true;

    return false;
  }

  /**
   * التحقق الشامل من بيانات المتجر
   */
  validateStoreData(storeData: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // التحقق من الإعدادات
    const settingsValidation = this.validateStoreSettings(storeData.settings);
    errors.push(...settingsValidation.errors);
    warnings.push(...settingsValidation.warnings);

    // التحقق من المنتجات
    if (storeData.products && Array.isArray(storeData.products)) {
      storeData.products.forEach((product: Product, index: number) => {
        const productValidation = this.validateProduct(product);
        productValidation.errors.forEach(error => {
          errors.push({
            ...error,
            field: `products[${index}].${error.field}`
          });
        });
        productValidation.warnings.forEach(warning => {
          warnings.push({
            ...warning,
            field: `products[${index}].${warning.field}`
          });
        });
      });
    }

    // التحقق من الصفحات
    if (storeData.pages && Array.isArray(storeData.pages)) {
      storeData.pages.forEach((page: CustomPage, index: number) => {
        const pageValidation = this.validateCustomPage(page);
        pageValidation.errors.forEach(error => {
          errors.push({
            ...error,
            field: `pages[${index}].${error.field}`
          });
        });
        pageValidation.warnings.forEach(warning => {
          warnings.push({
            ...warning,
            field: `pages[${index}].${warning.field}`
          });
        });
      });
    }

    // التحقق من إعدادات الواتساب
    if (storeData.whatsappSettings) {
      const whatsappValidation = this.validateWhatsAppSettings(storeData.whatsappSettings);
      errors.push(...whatsappValidation.errors);
      warnings.push(...whatsappValidation.warnings);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

// تصدير المثيل الوحيد
export const validationService = ValidationService.getInstance();