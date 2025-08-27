export const generateEnhancedStoreJS = (): string => {
  return `// Enhanced Store JavaScript with Full Navigation Support
class InteractiveStore {
    constructor() {
        this.init();
        this.setupNavigation();
        this.setupEventListeners();
        this.initializeAnimations();
        console.log('🚀 Interactive Store initialized with full navigation support');
    }

    init() {
        this.bindEvents();
        this.setupIntersectionObserver();
        this.initializeLazyLoading();
        this.setupFAQFunctionality();
    }

    setupNavigation() {
        // إنشاء نظام التنقل الشامل
        this.createNavigationSystem();
        this.setupSmoothScrolling();
        this.createBackToTopButton();
    }

    createNavigationSystem() {
        // وظائف التنقل العامة
        window.navigateToHome = () => {
            if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
                window.location.href = 'index.html';
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        window.navigateToProducts = (filter = 'all') => {
            window.location.href = \`products.html?filter=\${filter}\`;
        };

        window.navigateToProduct = (productId) => {
            window.location.href = \`product-\${productId}.html\`;
        };

        window.navigateToPage = (slug) => {
            window.location.href = \`\${slug}.html\`;
        };

        window.navigateBack = () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        };

        // وظائف التنقل للأقسام
        window.scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId) || document.querySelector(\`[data-section="\${sectionId}"]\`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
    }

    setupSmoothScrolling() {
        // تفعيل التمرير السلس لجميع الروابط الداخلية
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupFAQFunctionality() {
        // إعداد وظائف الأسئلة الشائعة التفاعلية
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            if (question && answer) {
                // إعداد الحالة الأولية
                answer.style.maxHeight = '0px';
                answer.style.overflow = 'hidden';
                answer.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
                answer.style.opacity = '0';
                
                if (icon) {
                    icon.style.transition = 'transform 0.3s ease';
                }

                question.addEventListener('click', () => {
                    this.toggleFAQ(index);
                });
                
                // إضافة cursor pointer
                question.style.cursor = 'pointer';
            }
        });

        // إنشاء دالة عامة لتبديل FAQ
        window.toggleFAQ = (index) => {
            this.toggleFAQ(index);
        };
    }

    toggleFAQ(index) {
        const faqItems = document.querySelectorAll('.faq-item');
        const targetItem = faqItems[index];
        
        if (!targetItem) return;

        const answer = targetItem.querySelector('.faq-answer');
        const icon = targetItem.querySelector('.faq-icon');
        
        if (answer) {
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            if (isOpen) {
                // إغلاق
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                if (icon) icon.style.transform = 'rotate(0deg)';
                targetItem.classList.remove('active');
            } else {
                // فتح
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                if (icon) icon.style.transform = 'rotate(180deg)';
                targetItem.classList.add('active');
            }
        }
    }

    setupEventListeners() {
        // البحث مع التأخير
        const searchInput = document.querySelector('#searchInput');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.filterProducts(e.target.value);
                }, 300);
            });
        }

        // تتبع النقرات على الواتساب
        document.querySelectorAll('.whatsapp-btn, [href*="wa.me"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productName = productCard?.querySelector('.product-title')?.textContent || 'Unknown Product';
                
                this.trackEvent('whatsapp_order_initiated', {
                    product_name: productName,
                    timestamp: new Date().toISOString()
                });
                
                this.showNotification('جاري فتح الواتساب...', 'info');
            });
        });

        // تتبع عرض المنتجات
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a, button')) return;
                
                const productName = card.querySelector('.product-title')?.textContent;
                this.trackEvent('product_view', {
                    product_name: productName,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.product-card, section, .hero-section').forEach(el => {
            observer.observe(el);
        });
    }

    initializeLazyLoading() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    initializeAnimations() {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = \`\${index * 0.1}s\`;
        });
    }

    bindEvents() {
        this.createBackToTopButton();
    }

    createBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = \`
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
            </svg>
        \`;
        backToTop.className = 'fixed bottom-6 left-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 z-50 opacity-0 pointer-events-none';
        backToTop.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.body.appendChild(backToTop);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        });
    }

    filterProducts(searchTerm) {
        const products = document.querySelectorAll('.product-card');
        const term = searchTerm.toLowerCase().trim();
        let visibleCount = 0;

        products.forEach(product => {
            const title = product.querySelector('.product-title')?.textContent.toLowerCase() || '';
            const description = product.querySelector('.product-description')?.textContent.toLowerCase() || '';
            const category = product.querySelector('.product-category')?.textContent.toLowerCase() || '';

            if (!term || title.includes(term) || description.includes(term) || category.includes(term)) {
                product.style.display = 'block';
                product.style.animation = 'fadeInUp 0.5s ease-out forwards';
                product.style.animationDelay = \`\${visibleCount * 0.1}s\`;
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (visibleCount === 0 && term) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }

        this.updateResultsCount(visibleCount, products.length);
    }

    updateResultsCount(visible, total) {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = \`عرض \${visible} من أصل \${total} منتج\`;
        }
    }

    trackEvent(eventName, data) {
        console.log(\`📊 Event: \${eventName}\`, data);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = \`notification notification-\${type} fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300\`;
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-black',
            info: 'bg-blue-500 text-white'
        };

        notification.className += \` \${colors[type]}\`;
        notification.innerHTML = \`
            <div class="flex items-center gap-3">
                <span class="text-lg">\${icons[type]}</span>
                <span class="font-medium">\${message}</span>
            </div>
        \`;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // وظائف فلترة المنتجات المحسنة
    initializeProductFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter || e.target.textContent.toLowerCase();
                this.filterProductsByType(filter);
                this.updateActiveFilterButton(e.target);
            });
        });
    }

    filterProductsByType(filter) {
        const products = document.querySelectorAll('.product-card');
        let visibleCount = 0;
        
        products.forEach((product, index) => {
            const shouldShow = this.shouldShowProduct(product, filter);
            
            if (shouldShow) {
                product.style.display = 'block';
                product.style.animation = \`fadeInUp 0.5s ease-out \${index * 0.1}s forwards\`;
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        // تحديث عداد النتائج
        this.updateResultsCount(visibleCount, products.length);
    }

    shouldShowProduct(productElement, filter) {
        if (filter === 'all' || filter === 'جميع المنتجات') return true;
        
        const badges = productElement.querySelectorAll('.product-badges span');
        const badgeTexts = Array.from(badges).map(badge => badge.textContent.toLowerCase());
        
        switch (filter) {
            case 'featured':
            case 'المنتجات المميزة':
                return badgeTexts.some(text => text.includes('مميز'));
            case 'bestsellers':
            case 'الأعلى مبيعاً':
                return badgeTexts.some(text => text.includes('الأعلى مبيعاً'));
            case 'onsale':
            case 'العروض والتخفيضات':
                return badgeTexts.some(text => text.includes('عرض'));
            default:
                return true;
        }
    }

    updateActiveFilterButton(activeButton) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = 'transparent';
            btn.style.color = btn.style.borderColor || '#3b82f6';
        });
        
        if (activeButton) {
            activeButton.classList.add('active');
            const primaryColor = window.storeSettings?.primaryColor || '#3b82f6';
            activeButton.style.backgroundColor = primaryColor;
            activeButton.style.color = 'white';
        }
    }
}

// وظائف عامة للاستخدام في HTML
function filterProducts(filter) {
    if (window.interactiveStore) {
        window.interactiveStore.filterProductsByType(filter);
        const button = document.querySelector(\`[onclick*="filterProducts('\${filter}')"]\`);
        window.interactiveStore.updateActiveFilterButton(button);
    }
}

function toggleFAQ(index) {
    if (window.interactiveStore) {
        window.interactiveStore.toggleFAQ(index);
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
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(url).then(() => {
            if (window.interactiveStore) {
                window.interactiveStore.showNotification('تم نسخ رابط المنتج!', 'success');
            }
        });
    }
}

function addToFavorites(productId) {
    // حفظ في localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        if (window.interactiveStore) {
            window.interactiveStore.showNotification('تم إضافة المنتج للمفضلة!', 'success');
        }
    } else {
        if (window.interactiveStore) {
            window.interactiveStore.showNotification('المنتج موجود بالفعل في المفضلة', 'info');
        }
    }
}

// تهيئة المتجر التفاعلي
document.addEventListener('DOMContentLoaded', () => {
    window.interactiveStore = new InteractiveStore();
    
    // تطبيق الفلتر من URL إذا كان موجوداً
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get('filter');
    if (initialFilter) {
        setTimeout(() => {
            filterProducts(initialFilter);
        }, 100);
    }
});

// تهيئة فورية إذا كان DOM جاهزاً
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.interactiveStore = new InteractiveStore();
    });
} else {
    window.interactiveStore = new InteractiveStore();
}`;
};