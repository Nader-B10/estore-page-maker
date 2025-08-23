import { StoreData } from '../../../types/store';
import { icons } from '../../../utils/generators/iconSvgs';

const defaultSideImage = "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1974&auto=format&fit=crop";

export const generator = (storeData: StoreData): string => {
  const { whyChooseUs } = storeData.settings.sections;
  if (!whyChooseUs.enabled || whyChooseUs.data.items.length === 0) return '';

  const sideImage = (whyChooseUs.data as any).sideImage || defaultSideImage;

  return `
    <!-- Why Choose Us Section (Side by Side) -->
    <section id="why-us" class="py-5 animate-on-scroll">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="display-5 fw-bold mb-2">${whyChooseUs.data.title}</h2>
          <p class="lead text-muted">${whyChooseUs.data.subtitle}</p>
          <div class="section-divider mx-auto"></div>
        </div>
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <img src="${sideImage}" class="img-fluid rounded shadow" alt="Why Choose Us Image" loading="lazy" />
          </div>
          <div class="col-lg-6">
            <div class="d-flex flex-column gap-4">
              ${whyChooseUs.data.items.map(item => `
                <div class="d-flex align-items-start gap-3">
                  <div class="feature-icon flex-shrink-0 mt-1" style="width: 50px; height: 50px;">
                    ${icons[item.icon] || ''}
                  </div>
                  <div>
                    <h3 class="h5 fw-bold mb-1">${item.title}</h3>
                    <p class="text-muted mb-0">${item.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Why Choose Us Section -->`;
};
