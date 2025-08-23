import * as HeaderDefault from './header/Default';

import * as FooterDefault from './footer/Default';
import * as FooterCentered from './footer/Centered';

import * as HeroDefault from './hero/Default';
import * as HeroCentered from './hero/Centered';

import * as ProductsDefault from './products/Default';
import * as ProductsCarousel from './products/Carousel';

import * as WhyChooseUsDefault from './whyChooseUs/Default';
import * as WhyChooseUsSideBySide from './whyChooseUs/SideBySide';

import * as FaqDefault from './faq/Default';
import * as FaqPlusMinus from './faq/PlusMinus';

export const templateRegistry = {
  header: {
    default: HeaderDefault,
  },
  footer: {
    default: FooterDefault,
    centered: FooterCentered,
  },
  hero: {
    default: HeroDefault,
    centered: HeroCentered,
  },
  featuredProducts: {
    default: ProductsDefault,
    carousel: ProductsCarousel,
  },
  bestSellers: {
    default: ProductsDefault,
    carousel: ProductsCarousel,
  },
  onSale: {
    default: ProductsDefault,
    carousel: ProductsCarousel,
  },
  homeAllProducts: {
    default: ProductsDefault,
    carousel: ProductsCarousel,
  },
  allProducts: {
    default: ProductsDefault,
  },
  whyChooseUs: {
    default: WhyChooseUsDefault,
    sideBySide: WhyChooseUsSideBySide,
  },
  faq: {
    default: FaqDefault,
    plusMinus: FaqPlusMinus,
  },
};
