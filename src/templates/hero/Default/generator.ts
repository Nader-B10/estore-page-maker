import { StoreData } from '../../../types/store';

export const generator = (storeData: StoreData): string => {
  const { settings } = storeData;
  const { hero } = settings.sections;
  if (!hero.enabled) return '';

  const { title, subtitle, ctaText, ctaLink, backgroundImage } = hero.data;

  const backgroundStyle = backgroundImage
    ? `background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${backgroundImage}');`
    : `background: linear-gradient(135deg, var(--bs-primary), var(--bs-secondary));`;

  return `
    <!-- Hero Section -->
    <section
      id="hero"
      class="hero-section py-5 text-center text-white d-flex align-items-center"
      style="${backgroundStyle}"
    >
      <div class="container">
        <h1 class="display-3 fw-bolder mb-3 animate-fade-in-down">${title}</h1>
        <p class="lead fw-normal text-white-50 mb-4 animate-fade-in-up">${subtitle}</p>
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
