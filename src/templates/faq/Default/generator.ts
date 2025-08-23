import { StoreData } from '../../../types/store';

export const generator = (storeData: StoreData): string => {
  const { faq } = storeData.settings.sections;
  if (!faq.enabled || faq.data.items.length === 0) return '';

  return `
    <!-- FAQ Section -->
    <section id="faq" class="py-5 animate-on-scroll">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="display-5 fw-bold mb-2">${faq.data.title}</h2>
          <p class="lead text-muted">${faq.data.subtitle}</p>
          <div class="section-divider mx-auto"></div>
        </div>
        <div class="accordion accordion-flush faq-accordion mx-auto" id="faqAccordion" style="max-width: 800px;">
          ${faq.data.items.map((item, index) => `
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${index === 0 ? 'true' : 'false'}" aria-controls="collapse${index}">
                  ${item.question}
                </button>
              </h2>
              <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#faqAccordion">
                <div class="accordion-body">
                  ${item.answer}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    <!-- End FAQ Section -->`;
};
