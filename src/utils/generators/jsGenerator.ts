export const generateStoreJS = (): string => {
  return `
document.addEventListener('DOMContentLoaded', () => {
  console.log('Store initialized successfully with Bootstrap 5!');

  // Add to cart alert functionality
  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const card = (event.target as HTMLElement).closest('[data-product-id]');
      const productId = card ? card.getAttribute('data-product-id') : 'unknown';
      alert('تمت إضافة المنتج إلى السلة (وظيفة تجريبية)');
      console.log('Product added to cart (demo):', productId);
    });
  });

  // Scroll-triggered animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // Bootstrap components are initialized automatically via data attributes.
});
`;
};
