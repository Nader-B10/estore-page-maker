export const generateEnhancedStoreJS = (): string => {
  return `// Enhanced Store JavaScript with ReactDOMServer Support
class EnhancedStore {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeAnimations();
    }

    init() {
        console.log('🚀 Enhanced Store initialized with ReactDOMServer support');
        this.bindEvents();
        this.setupIntersectionObserver();
        this.initializeLazyLoading();
    }

    setupEventListeners() {
        // Search functionality with debouncing
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

        // Enhanced WhatsApp tracking
        document.querySelectorAll('.whatsapp-btn, [href*="wa.me"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productName = productCard?.querySelector('.product-title')?.textContent || 'Unknown Product';
                
                // Analytics tracking
                this.trackEvent('whatsapp_order_initiated', {
                    product_name: productName,
                    timestamp: new Date().toISOString()
                });
                
                // Visual feedback
                this.showNotification('جاري فتح الواتساب...', 'info');
            });
        });

        // Product card click tracking
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a, button')) return; // Don't trigger for buttons inside
                
                const productName = card.querySelector('.product-title')?.textContent;
                this.trackEvent('product_view', {
                    product_name: productName,
                    timestamp: new Date().toISOString()
                });
            });
        });
    }

    setupIntersectionObserver() {
        // Animate elements when they come into view
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

        // Observe all product cards and sections
        document.querySelectorAll('.product-card, section, .hero-section').forEach(el => {
            observer.observe(el);
        });
    }

    initializeLazyLoading() {
        // Lazy load images for better performance
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
        // Add staggered animation delays to product cards
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.style.animationDelay = \`\${index * 0.1}s\`;
        });
    }

    bindEvents() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Back to top button
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

        // Show/hide based on scroll position
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

        // Show/hide no results message
        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (visibleCount === 0 && term) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }

        // Update results count
        this.updateResultsCount(visibleCount, products.length);
    }

    updateResultsCount(visible, total) {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = \`عرض \${visible} من أصل \${total} منتج\`;
        }
    }

    trackEvent(eventName, data) {
        // Enhanced analytics tracking
        console.log(\`📊 Event: \${eventName}\`, data);
        
        // يمكن إضافة تتبع Google Analytics أو أي خدمة أخرى هنا
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, data);
        }
    }

    showNotification(message, type = 'success') {
        // Enhanced notification system
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

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Enhanced FAQ functionality
    toggleFAQ(index) {
        const faqItems = document.querySelectorAll('.faq-item');
        const targetItem = faqItems[index];
        
        if (!targetItem) return;

        const answer = targetItem.querySelector('.faq-answer');
        const icon = targetItem.querySelector('.faq-icon');
        
        if (answer && icon) {
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';
            
            if (isOpen) {
                answer.style.maxHeight = '0px';
                answer.style.opacity = '0';
                icon.style.transform = 'rotate(0deg)';
                targetItem.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
                targetItem.classList.add('active');
            }
        }
    }

    // Initialize product filtering
    initializeProductFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterProductsByType(filter);
                this.updateActiveFilterButton(e.target);
            });
        });
    }

    filterProductsByType(filter) {
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const shouldShow = this.shouldShowProduct(product, filter);
            
            if (shouldShow) {
                product.style.display = 'block';
                product.classList.add('animate-fade-in-up');
            } else {
                product.style.display = 'none';
                product.classList.remove('animate-fade-in-up');
            }
        });
    }

    shouldShowProduct(productElement, filter) {
        if (filter === 'all') return true;
        
        const badges = productElement.querySelectorAll('.product-badges span');
        const badgeTexts = Array.from(badges).map(badge => badge.textContent.toLowerCase());
        
        switch (filter) {
            case 'featured':
                return badgeTexts.some(text => text.includes('مميز'));
            case 'bestsellers':
                return badgeTexts.some(text => text.includes('الأعلى مبيعاً'));
            case 'onsale':
                return badgeTexts.some(text => text.includes('عرض'));
            default:
                return true;
        }
    }

    updateActiveFilterButton(activeButton) {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = 'transparent';
        });
        
        activeButton.classList.add('active');
        activeButton.style.backgroundColor = 'var(--primary-color)';
        activeButton.style.color = 'white';
    }
}

// Global functions for HTML onclick events
function filterProducts(filter) {
    if (window.enhancedStore) {
        window.enhancedStore.filterProductsByType(filter);
        window.enhancedStore.updateActiveFilterButton(document.querySelector(\`[onclick="filterProducts('\${filter}')"]\`));
    }
}

function toggleFAQ(index) {
    if (window.enhancedStore) {
        window.enhancedStore.toggleFAQ(index);
    }
}

function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: document.querySelector('meta[name="description"]')?.content || '',
            url: window.location.href,
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(window.location.href);
        if (window.enhancedStore) {
            window.enhancedStore.showNotification('تم نسخ رابط المنتج!', 'success');
        }
    }
}

// Initialize enhanced store when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedStore = new EnhancedStore();
});

// Initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.enhancedStore = new EnhancedStore();
    });
} else {
    window.enhancedStore = new EnhancedStore();
}`;
};