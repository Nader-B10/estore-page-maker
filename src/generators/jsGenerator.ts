export const generateStoreJS = (): string => {
  return `// Store JavaScript Functionality - Enhanced Version
class Store {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.querySelector('#searchInput, .search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts(e.target.value);
            });
        }

        // WhatsApp button analytics
        document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productName = e.target.closest('.product-card')?.querySelector('.product-title')?.textContent;
                console.log('WhatsApp order initiated for:', productName);
                
                // Track conversion
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        'product_name': productName,
                        'event_category': 'engagement'
                    });
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Product card hover effects
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.product-card, .feature-card, .faq-item').forEach(el => {
            observer.observe(el);
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

            if (title.includes(term) || description.includes(term) || category.includes(term)) {
                product.style.display = 'block';
                visibleCount++;
            } else {
                product.style.display = 'none';
            }
        });

        // Update results info
        this.updateResultsInfo(visibleCount, products.length);
        
        // Show/hide no results message
        const noResults = document.getElementById('noResults');
        if (noResults) {
            if (visibleCount === 0) {
                noResults.classList.remove('hidden');
            } else {
                noResults.classList.add('hidden');
            }
        }
    }

    updateResultsInfo(showing, total) {
        const resultsInfo = document.getElementById('resultsInfo');
        if (resultsInfo) {
            resultsInfo.textContent = \`عرض \${showing} من أصل \${total} منتج\`;
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = \`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-x-full\`;
        
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#10b981';
                break;
            case 'error':
                notification.style.backgroundColor = '#ef4444';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f59e0b';
                break;
            default:
                notification.style.backgroundColor = '#3b82f6';
        }
        
        notification.textContent = message;
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
}

// FAQ Toggle Function - Enhanced
function toggleFAQ(index) {
    const faqAnswer = document.getElementById(\`faq-\${index}\`);
    const chevron = document.querySelector(\`[onclick="toggleFAQ(\${index})"] .faq-chevron\`);
    
    if (faqAnswer) {
        if (faqAnswer.classList.contains('max-h-0')) {
            faqAnswer.classList.remove('max-h-0', 'opacity-0');
            faqAnswer.classList.add('max-h-96', 'opacity-100');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
        } else {
            faqAnswer.classList.add('max-h-0', 'opacity-0');
            faqAnswer.classList.remove('max-h-96', 'opacity-100');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
    }
}

// Product filtering for products page
function filterProducts(filter) {
    if (typeof products === 'undefined') return;
    
    let filteredProducts = products;
    
    if (filter === 'featured') {
        filteredProducts = products.filter(p => p.isFeatured);
    } else if (filter === 'bestsellers') {
        filteredProducts = products.filter(p => p.isBestSeller);
    } else if (filter === 'onsale') {
        filteredProducts = products.filter(p => p.isOnSale);
    }
    
    if (typeof displayProducts === 'function') {
        displayProducts(filteredProducts);
    }
    
    updateActiveButton(filter);
}

function updateActiveButton(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector('[onclick="filterProducts(\\''+filter+'\\')"]');
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Initialize store
const store = new Store();

// Page load animations
document.addEventListener('DOMContentLoaded', function() {
    // Stagger animation for product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = \`\${index * 0.1}s\`;
        card.classList.add('animate-fade-in-up');
    });

    // Initialize any other interactive elements
    const interactiveElements = document.querySelectorAll('[data-interactive]');
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Performance optimization
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}`;
}