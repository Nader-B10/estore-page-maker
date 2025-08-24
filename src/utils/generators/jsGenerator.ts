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

  // WhatsApp purchase functionality using event delegation
  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.whatsapp-buy-btn');
    if (button) {
      const phoneNumber = button.dataset.phone;
      const message = button.dataset.message;
      
      if (phoneNumber && message) {
        const whatsappUrl = \`https://wa.me/\${phoneNumber.replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(message)}\`;
        window.open(whatsappUrl, '_blank');
      }
    }
  });

  // Header WhatsApp contact
  document.body.addEventListener('click', (event) => {
    const button = event.target.closest('.header-whatsapp-btn');
    if (button) {
      const phoneNumber = button.dataset.phone;
      const message = button.dataset.message;
      
      if (phoneNumber && message) {
        const whatsappUrl = \`https://wa.me/\${phoneNumber.replace(/[^0-9]/g, '')}?text=\${encodeURIComponent(message)}\`;
        window.open(whatsappUrl, '_blank');
      }
    }
  });
});
`;
};
