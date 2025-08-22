import * as HeroDefault from './hero/Default';
import * as ProductsDefault from './products/Default';
import * as WhyChooseUsDefault from './whyChooseUs/Default';
import * as FaqDefault from './faq/Default';
import * as HeaderDefault from './header/Default';
import * as FooterDefault from './footer/Default';

export const templateRegistry = {
  header: {
    default: HeaderDefault,
  },
  footer: {
    default: FooterDefault,
  },
  hero: {
    default: HeroDefault,
  },
  featuredProducts: {
    default: ProductsDefault,
  },
  bestSellers: {
    default: ProductsDefault,
  },
  onSale: {
    default: ProductsDefault,
  },
  allProducts: {
    default: ProductsDefault,
  },
  whyChooseUs: {
    default: WhyChooseUsDefault,
  },
  faq: {
    default: FaqDefault,
  },
};
