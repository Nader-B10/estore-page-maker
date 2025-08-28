// Enhanced Store JavaScript with Professional Event Handling
class InteractiveStore {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        // التأكد من تحميل DOM بالكامل
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupStore());
        } else {
            this.setupStore();
        }
    }

    setupStore() {
        try {
            console.log('🚀 Initializing Interactive Store...');
            
            this.setupNavigation();
            this.setupProductInteractions();
            this.setupFAQFunctionality();
            this.setupSearchFunctionality();
            this.setupFilterFunctionality();
            this.setupSmoothScrolling();
            this.setupBackToTop();
            this.setupNotifications();
            
            this.isInitialized = true;
            console.log('✅ Interactive Store initialized successfully');
            
            // إظهار إشعار نجاح التحميل
            this.showNotification('تم تحميل المتجر بنجاح! 🎉', 'success');
            
        } catch (error) {
            console.error('❌ Error initializing store:', error);
            this.showNotification('حدث خطأ في تحميل المتجر', 'error');
        }
    }

    setupNavigation() {
        console.log('🔗 Setting up navigation...');
        
        // إعداد التنقل للصفحة الرئيسية
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-navigate]');
            if (target) {
                e.preventDefault();
                const navigationType = target.getAttribute('data-navigate');
                const navigationValue = target.getAttribute('data-value');
                
                this.handleNavigation(navigationType, navigationValue);
            }
        });

        // إعداد روابط التمرير السلس
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-scroll-to]');
            if (target) {
                e.preventDefault();
                const sectionId = target.getAttribute('data-scroll-to');
                this.scrollToSection(sectionId);
            }
        });

        // إعداد روابط المنتجات
        document.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            if (productCard && !e.target.closest('a, button')) {
                const productId = productCard.getAttribute('data-product-id');
                if (productId) {
                    this.navigateToProduct(productId);
                }
            }
        });
    }

    handleNavigation(type, value) {
        console.log(`🧭 Navigation: ${type} -> ${value}`);
        
        switch (type) {
            case 'home':
                this.navigateToHome();
                break;
            case 'products':
                this.navigateToProducts(value);
                break;
            case 'product':
                this.navigateToProduct(value);
                break;
            case 'page':
                this.navigateToPage(value);
                break;
            case 'section':
                this.scrollToSection(value);
                break;
            case 'external':
                window.open(value, '_blank', 'noopener,noreferrer');
                break;
            default:
                console.warn('Unknown navigation type:', type);
        }
    }

    navigateToHome() {
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            window.location.href = 'index.html';
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    navigateToProducts(filter = 'all') {
        const url = filter && filter !== 'all' ? `products.html?filter=${filter}` : 'products.html';
        window.location.href = url;
    }

    navigateToProduct(productId) {
        window.location.href = `product-${productId}.html`;
    }

    navigateToPage(slug) {
        window.location.href = `${slug}.html`;
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId) || 
                      document.querySelector(`[data-section="${sectionId}"]`) ||
                      document.querySelector(`.${sectionId}`);
        
        if (element) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 0;
            const elementPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
            
            console.log(`📍 Scrolled to section: ${sectionId}`);
        } else {
            console.warn(`Section not found: ${sectionId}`);
        }
    }

    setupProductInteractions() {
        console.log('🛍️ Setting up product interactions...');
        
        // تتبع النقرات على أزرار الواتساب
        document.addEventListener('click', (e) => {
            const whatsappBtn = e.target.closest('[href*="wa.me"]');
            if (whatsappBtn) {
                const productCard = e.target.closest('.product-card');
                const productName = productCard?.querySelector('.product-title, h3')?.textContent || 'Unknown Product';
                
                this.trackEvent('whatsapp_order_initiated', {
                    product_name: productName,
                    timestamp: new Date().toISOString()
                });
                
                this.showNotification('جاري فتح الواتساب... 📱', 'info');
            }
        });
    }

    setupFAQFunctionality() {
        console.log('❓ Setting up FAQ functionality...');
        
        // إعداد الأسئلة الشائعة التفاعلية
        document.addEventListener('click', (e) => {
            const faqQuestion = e.target.closest('.faq-question');
            if (faqQuestion) {
                e.preventDefault();
                
                const faqItem = faqQuestion.closest('.faq-item');
                const faqAnswer = faqItem?.querySelector('.faq-answer');
                const faqIcon = faqQuestion.querySelector('.faq-icon');
                
                if (faqAnswer) {
                    const isOpen = faqAnswer.style.maxHeight && faqAnswer.style.maxHeight !== '0px';
                    
                    if (isOpen) {
                        // إغلاق
                        faqAnswer.style.maxHeight = '0px';
                        faqAnswer.style.opacity = '0';
                        faqAnswer.style.paddingTop = '0px';
                        faqAnswer.style.paddingBottom = '0px';
                        if (faqIcon) faqIcon.style.transform = 'rotate(0deg)';
                        faqItem?.classList.remove('active');
                    } else {
                        // فتح
                        faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                        faqAnswer.style.opacity = '1';
                        faqAnswer.style.paddingTop = '1rem';
                        faqAnswer.style.paddingBottom = '1rem';
                        if (faqIcon) faqIcon.style.transform = 'rotate(180deg)';
                        faqItem?.classList.add('active');
                    }
                    
                    console.log(`❓ FAQ toggled: ${isOpen ? 'closed' : 'opened'}`);
                }
            }
        });

        // تهيئة حالة FAQ الأولية
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.style.maxHeight = '0px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease';
            answer.style.opacity = '0';
            answer.style.paddingTop = '0px';
            answer.style.paddingBottom = '0px';
        });

        document.querySelectorAll('.faq-icon').forEach(icon => {
            icon.style.transition = 'transform 0.3s ease';
        });

        document.querySelectorAll('.faq-question').forEach(question => {
            question.style.cursor = 'pointer';
        });
    }

    setupSearchFunctionality() {
        console.log('🔍 Setting up search functionality...');
        
        const searchInput = document.querySelector('#searchInput, .search-input, input[placeholder*="بحث"], input[placeholder*="ابحث"]');
        if (searchInput) {
            let searchTimeout;
            
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.filterProducts(e.target.value);
                }, 300);
            });
            
            console.log('🔍 Search functionality activated');
        }
    }

    setupFilterFunctionality() {
        console.log('🏷️ Setting up filter functionality...');
        
        // إعداد أزرار الفلترة
        document.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('[data-filter]');
            if (filterBtn) {
                e.preventDefault();
                const filter = filterBtn.getAttribute('data-filter');
                this.filterProductsByType(filter);
                this.updateActiveFilterButton(filterBtn);
            }
        });

        // إعداد الأزرار العامة
        document.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (actionBtn) {
                e.preventDefault();
                const action = actionBtn.getAttribute('data-action');
                const productId = actionBtn.getAttribute('data-product-id');
                
                switch (action) {
                    case 'share':
                        this.shareProduct();
                        break;
                    case 'favorite':
                        this.addToFavorites(productId);
                        break;
                    default:
                        console.warn('Unknown action:', action);
                }
            }
        });

        // إعداد الفلتر من URL
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilter = urlParams.get('filter');
        if (initialFilter) {
            setTimeout(() => {
                this.filterProductsByType(initialFilter);
                const filterBtn = document.querySelector(`[data-filter="${initialFilter}"]`);
                if (filterBtn) {
                    this.updateActiveFilterButton(filterBtn);
                }
                const filterBtn = document.querySelector(`[data-filter="${initialFilter}"]`);
                if (filterBtn) {
                    this.updateActiveFilterButton(filterBtn);
                }
            }, 100);
        }
    }

    filterProducts(searchTerm) {
        const products = document.querySelectorAll('.product-card');
        const term = searchTerm.toLowerCase().trim();
        let visibleCount = 0;

        products.forEach((product, index) => {
            const title = product.querySelector('.product-title, h3')?.textContent?.toLowerCase() || '';
            const description = product.querySelector('.product-description, p')?.textContent?.toLowerCase() || '';
            const category = product.querySelector('.product-category')?.textContent?.toLowerCase() || '';

            const shouldShow = !term || title.includes(term) || description.includes(term) || category.includes(term);
            
            if (shouldShow) {
                product.style.display = 'block';
                product.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        this.updateSearchResults(visibleCount, products.length, term);
    }

    filterProductsByType(filter) {
        const products = document.querySelectorAll('.product-card');
        let visibleCount = 0;
        
        products.forEach((product, index) => {
            const shouldShow = this.shouldShowProduct(product, filter);
            
            if (shouldShow) {
                product.style.display = 'block';
                product.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        this.updateSearchResults(visibleCount, products.length);
        console.log(`🏷️ Filtered products: ${filter} (${visibleCount} results)`);
    }

    shouldShowProduct(productElement, filter) {
        if (filter === 'all' || filter === 'جميع المنتجات') return true;
        
        const badges = productElement.querySelectorAll('.product-badges span, .badge, [class*="badge"]');
        const badgeTexts = Array.from(badges).map(badge => badge.textContent?.toLowerCase() || '');
        
        switch (filter) {
            case 'featured':
            case 'المنتجات المميزة':
                return badgeTexts.some(text => text.includes('مميز') || text.includes('featured'));
            case 'bestsellers':
            case 'الأعلى مبيعاً':
                return badgeTexts.some(text => text.includes('الأعلى مبيعاً') || text.includes('bestseller'));
            case 'onsale':
            case 'العروض والتخفيضات':
                return badgeTexts.some(text => text.includes('عرض') || text.includes('تخفيض') || text.includes('sale'));
            default:
                return true;
        }
    }

    updateActiveFilterButton(activeButton) {
        // إزالة الحالة النشطة من جميع الأزرار
        document.querySelectorAll('.filter-btn, [data-filter]').forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = 'transparent';
            btn.style.color = btn.style.borderColor || '#3b82f6';
        });
        
        // تفعيل الزر المحدد
        if (activeButton) {
            activeButton.classList.add('active');
            const primaryColor = window.storeSettings?.primaryColor || '#3b82f6';
            activeButton.style.backgroundColor = primaryColor;
            activeButton.style.color = 'white';
            activeButton.style.transform = 'scale(1.05)';
        }
    }

    updateSearchResults(visible, total, searchTerm = '') {
        // تحديث عداد النتائج
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `عرض ${visible} من أصل ${total} منتج`;
        }

        // إظهار/إخفاء رسالة عدم وجود نتائج
        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (visible === 0 && searchTerm) {
                noResults.classList.remove('hidden');
                noResults.style.display = 'block';
            } else {
                noResults.classList.add('hidden');
                noResults.style.display = 'none';
            }
        }
    }

    setupSmoothScrolling() {
        console.log('🎯 Setting up smooth scrolling...');
        
        // التمرير السلس لجميع الروابط الداخلية
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            }
        });
    }

    setupBackToTop() {
        // إنشاء زر العودة للأعلى
        const backToTop = document.createElement('button');
        backToTop.innerHTML = `
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        `;
        backToTop.className = 'fixed bottom-6 left-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50 opacity-0 pointer-events-none';
        backToTop.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        backToTop.setAttribute('aria-label', 'العودة للأعلى');
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.showNotification('تم الانتقال للأعلى', 'info');
        });

        document.body.appendChild(backToTop);

        // إظهار/إخفاء الزر حسب موقع التمرير
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 300) {
                        backToTop.style.opacity = '1';
                        backToTop.style.pointerEvents = 'auto';
                    } else {
                        backToTop.style.opacity = '0';
                        backToTop.style.pointerEvents = 'none';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    setupNotifications() {
        // إنشاء container للإشعارات
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
        document.body.appendChild(notificationContainer);
    }

    showNotification(message, type = 'success') {
        const container = document.getElementById('notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const colors = {
            success: 'bg-green-500 text-white border-green-600',
            error: 'bg-red-500 text-white border-red-600',
            warning: 'bg-yellow-500 text-black border-yellow-600',
            info: 'bg-blue-500 text-white border-blue-600'
        };

        notification.className = `px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 border-l-4 ${colors[type]}`;
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-lg">${icons[type]}</span>
                <span class="font-medium">${message}</span>
            </div>
        `;

        container.appendChild(notification);

        // إظهار الإشعار
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // إخفاء الإشعار
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (container.contains(notification)) {
                    container.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    shareProduct() {
        const title = document.title;
        const description = document.querySelector('meta[name="description"]')?.content || '';
        const url = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: title,
                text: description,
                url: url,
            }).then(() => {
                this.showNotification('تم مشاركة المنتج بنجاح! 📤', 'success');
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('تم نسخ رابط المنتج! 📋', 'success');
            });
        }
    }

    addToFavorites(productId) {
        if (!productId) return;
        
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(productId)) {
            favorites.push(productId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            this.showNotification('تم إضافة المنتج للمفضلة! ❤️', 'success');
        } else {
            this.showNotification('المنتج موجود بالفعل في المفضلة', 'info');
        }
    }

    trackEvent(eventName, data) {
        console.log(`📊 Event: ${eventName}`, data);
        
        // إرسال للـ Analytics إذا كان متوفراً
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
        
        // حفظ في localStorage للتتبع المحلي
        const events = JSON.parse(localStorage.getItem('store_events') || '[]');
        events.push({ event: eventName, data, timestamp: new Date().toISOString() });
        localStorage.setItem('store_events', JSON.stringify(events.slice(-100))); // الاحتفاظ بآخر 100 حدث
    }

    // وظائف مساعدة للاستخدام العام
    static getInstance() {
        return window.interactiveStore;
    }
}

// وظائف عامة للاستخدام في HTML
function navigateToHome() {
    const store = InteractiveStore.getInstance();
    if (store) store.navigateToHome();
}

function navigateToProducts(filter = 'all') {
    const store = InteractiveStore.getInstance();
    if (store) store.navigateToProducts(filter);
}

function navigateToProduct(productId) {
    const store = InteractiveStore.getInstance();
    if (store) store.navigateToProduct(productId);
}

function navigateToPage(slug) {
    const store = InteractiveStore.getInstance();
    if (store) store.navigateToPage(slug);
}

function scrollToSection(sectionId) {
    const store = InteractiveStore.getInstance();
    if (store) store.scrollToSection(sectionId);
}

function filterProducts(filter) {
    const store = InteractiveStore.getInstance();
    if (store) {
        store.filterProductsByType(filter);
        const button = document.querySelector(`[data-filter="${filter}"]`);
        if (button) store.updateActiveFilterButton(button);
    }
}

function toggleFAQ(index) {
    const faqItems = document.querySelectorAll('.faq-item');
    const targetItem = faqItems[index];
    
    if (targetItem) {
        const question = targetItem.querySelector('.faq-question');
        if (question) {
            question.click();
        }
    }
}

function shareProduct() {
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.content || '';
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: description,
            url: url,
        }).then(() => {
            const store = InteractiveStore.getInstance();
            if (store) store.showNotification('تم مشاركة المنتج بنجاح! 📤', 'success');
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(url).then(() => {
            const store = InteractiveStore.getInstance();
            if (store) store.showNotification('تم نسخ رابط المنتج! 📋', 'success');
        });
    }
}

function addToFavorites(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        const store = InteractiveStore.getInstance();
        if (store) store.showNotification('تم إضافة المنتج للمفضلة! ❤️', 'success');
    } else {
        const store = InteractiveStore.getInstance();
        if (store) store.showNotification('المنتج موجود بالفعل في المفضلة', 'info');
    }
}

function performSearch() {
    const searchInput = document.querySelector('#searchInput, .search-input, input[placeholder*="بحث"]');
    if (searchInput) {
        const store = InteractiveStore.getInstance();
        if (store) store.filterProducts(searchInput.value);
    }
}

function navigateBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        navigateToHome();
    }
}

// تهيئة المتجر التفاعلي
window.interactiveStore = new InteractiveStore();

// إضافة CSS للحركات
const animationCSS = `
<style>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.product-card {
    transition: all 0.3s ease;
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.faq-question {
    transition: background-color 0.2s ease;
}

.faq-question:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.filter-btn {
    transition: all 0.3s ease;
}

.filter-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* تحسين التجاوب */
@media (max-width: 768px) {
    .product-card {
        margin-bottom: 1rem;
    }
    
    .filter-btn {
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
    }
}
</style>
`;

// إضافة CSS للصفحة
if (!document.querySelector('#interactive-store-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'interactive-store-styles';
    styleElement.innerHTML = animationCSS.replace('<style>', '').replace('</style>', '');
    document.head.appendChild(styleElement);
}

console.log('🎉 Interactive Store JavaScript loaded successfully!');