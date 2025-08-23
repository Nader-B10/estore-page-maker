import { StoreData } from '../../../types/store';

export const generator = (storeData: StoreData): string => {
  const { settings } = storeData;
  const { hero } = settings.sections;
  if (!hero.enabled) return '';

  const { title, subtitle, ctaText, ctaLink, backgroundImage } = hero.data;

  const backgroundStyle = backgroundImage
    ? `background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${backgroundImage}')`
    : `background: linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor})`;

  return `
    <section
      id="hero"
      class="py-24 px-6 text-center text-white bg-cover bg-center flex items-center justify-center min-h-[60vh]"
      style="${backgroundStyle}"
    >
      <div class="max-w-3xl">
        <h2 class="text-4xl md:text-6xl font-extrabold leading-tight mb-4">${title}</h2>
        <p class="text-lg md:text-xl opacity-90 mb-8">${subtitle}</p>
        <a
          href="${ctaLink}"
          class="inline-block text-black font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105"
          style="background-color: ${settings.accentColor}; color: #111"
        >
          ${ctaText}
        </a>
      </div>
    </section>`;
};
