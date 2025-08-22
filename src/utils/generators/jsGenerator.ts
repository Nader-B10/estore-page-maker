export const generateStoreJS = (): string => {
  return `
document.addEventListener('DOMContentLoaded', () => {
  console.log('Store initialized successfully!');

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionButton = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    const chevron = questionButton ? questionButton.querySelector('.faq-chevron') : null;

    if (questionButton && answerDiv) {
      questionButton.addEventListener('click', () => {
        const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';
        
        questionButton.setAttribute('aria-expanded', String(!isExpanded));
        answerDiv.classList.toggle('hidden');

        if (chevron) {
          chevron.classList.toggle('rotate-180');
        }
      });
    }
  });

  // Add to cart alert
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('[data-product-id]');
      const productId = card ? card.dataset.productId : 'unknown';
      alert('تمت إضافة المنتج إلى السلة (وظيفة تجريبية)');
    });
  });
});
`;
};
