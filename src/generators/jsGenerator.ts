export const generateStoreJS = (): string => {
  return `// Store JavaScript Functionality
class Store {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts(e.target.value);
            });
        }

        // WhatsApp button analytics
        document.querySelectorAll('.whatsapp-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productName = e.target.closest('.product-card')?.querySelector('.product-title')?.textContent;
                console.log('WhatsApp order initiated for:', productName);
            });
        });
    }

    filterProducts(searchTerm) {
        const products = document.querySelectorAll('.product-card');
        const term = searchTerm.toLowerCase().trim();

        products.forEach(product => {
            const title = product.querySelector('.product-title')?.textContent.toLowerCase() || '';
            const description = product.querySelector('.product-description')?.textContent.toLowerCase() || '';
            const category = product.querySelector('.product-category')?.textContent.toLowerCase() || '';

            if (title.includes(term) || description.includes(term) || category.includes(term)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = \`notification notification-\${type}\`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// FAQ Toggle Function
function toggleFAQ(index) {
    const faqItem = document.querySelector(\`.faq-item:nth-child(\${index + 1})\`);
    const faqAnswer = document.getElementById(\`faq-\${index}\`);
    
    if (faqItem && faqAnswer) {
        faqItem.classList.toggle('active');
        faqAnswer.classList.toggle('active');
    }
}

// Initialize store
const store = new Store();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});`;