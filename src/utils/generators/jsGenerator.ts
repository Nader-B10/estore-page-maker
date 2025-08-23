export const generateStoreJS = (): string => {
  return `
document.addEventListener('DOMContentLoaded', () => {
  console.log('Store initialized successfully!');

  // FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      
      button.setAttribute('aria-expanded', String(!isExpanded));
      
      if (answer && answer.classList.contains('faq-answer')) {
        answer.classList.toggle('hidden');
      }
      
      const chevron = button.querySelector('.faq-chevron');
      if (chevron) {
        chevron.classList.toggle('rotate-180');
      }
    });
  });

  // Add to cart alert using event delegation
  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.add-to-cart-btn');
    if (button) {
      const card = event.target.closest('[data-product-id]');
      const productName = card ? card.querySelector('h3')?.textContent || 'المنتج' : 'المنتج';
      alert(\`تمت إضافة "\${productName}" إلى السلة (وظيفة تجريبية)\`);
    }
  });
});
`;
};
