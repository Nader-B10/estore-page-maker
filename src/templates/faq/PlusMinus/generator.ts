import { StoreData } from '../../../types/store';

export const generator = (storeData: StoreData): string => {
  const { faq } = storeData.settings.sections;
  if (!faq.enabled || faq.data.items.length === 0) return '';

  return `
    <!-- FAQ Section (Plus/Minus) -->
    <section id="faq" class="py-5 animate-on-scroll">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="display-5 fw-bold mb-2">${faq.data.title}</h2>
          <p class="lead text-muted">${faq.data.subtitle}</p>
          <div class="section-divider mx-auto"></div>
        </div>
        <div class="accordion mx-auto" id="faqAccordionPlusMinus" style="max-width: 800px;">
          ${faq.data.items.map((item, index) => `
            <div class="accordion-item product-card mb-3">
              <h2 class="accordion-header" id="headingPlusMinus${index}">
                <button class="accordion-button ${index !== 0 ? 'collapsed' : ''} fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePlusMinus${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapsePlusMinus${index}">
                  ${item.question}
                </button>
              </h2>
              <div id="collapsePlusMinus${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="headingPlusMinus${index}" data-bs-parent="#faqAccordionPlusMinus">
                <div class="accordion-body">
                  ${item.answer}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    <style>
      .accordion-button.collapsed::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z'/%3e%3c/svg%3e");
      }
      .accordion-button:not(.collapsed)::after {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230d6efd'%3e%3cpath fill-rule='evenodd' d='M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z'/%3e%3c/svg%3e");
      }
    </style>
    <!-- End FAQ Section -->`;
};
