import { StoreData } from '../../../types/store';

export const generator = (storeData: StoreData): string => {
  const { settings } = storeData;
  const { hero } = settings.sections;
  if (!hero.enabled) return '';

  const { title, subtitle, ctaText, ctaLink } = hero.data;

  const backgroundStyle = `background: linear-gradient(135deg, var(--bs-primary) 0%, var(--bs-secondary) 100%); min-height: 50vh;`;

  return `
    <!-- Hero Section (Centered) -->
    <section
      id="hero"
      class="hero-section py-5 text-center text-white d-flex align-items-center"
      style="${backgroundStyle}"
    >
      <div class="container">
        <h1 class="display-4 fw-bold mb-3 animate-fade-in-down">${title}</h1>
        <p class="lead fw-normal text-white-75 mb-4 mx-auto animate-fade-in-up" style="max-width: 600px;">${subtitle}</p>
        <a
          href="${ctaLink}"
          class="btn btn-lg btn-cta fw-bold"
        >
          ${ctaText}
        </a>
      </div>
    </section>
    <!-- End Hero Section -->`;
};
