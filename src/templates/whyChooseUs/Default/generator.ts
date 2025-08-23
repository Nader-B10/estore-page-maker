import { StoreData } from '../../../types/store';
import { icons } from '../../../utils/generators/iconSvgs';

export const generator = (storeData: StoreData): string => {
  const { whyChooseUs } = storeData.settings.sections;
  if (!whyChooseUs.enabled || whyChooseUs.data.items.length === 0) return '';

  return `
    <!-- Why Choose Us Section -->
    <section id="why-us" class="py-5 bg-light animate-on-scroll">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="display-5 fw-bold mb-2">${whyChooseUs.data.title}</h2>
          <p class="lead text-muted">${whyChooseUs.data.subtitle}</p>
          <div class="section-divider mx-auto"></div>
        </div>
        <div class="row g-4 text-center">
          ${whyChooseUs.data.items.map(item => `
            <div class="col-md-4">
              <div class="feature-item-card">
                <div class="feature-icon mx-auto mb-4">
                  ${icons[item.icon] || ''}
                </div>
                <h3 class="h5 fw-bold">${item.title}</h3>
                <p class="text-muted">${item.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
    <!-- End Why Choose Us Section -->`;
};
