import {
  Amita,
  Comfortaa,
  Gotu,
  Inknut_Antiqua,
  Laila,
  Pacifico,
  Palanquin_Dark,
  Sura,
  Tiro_Devanagari_Hindi,
  Yatra_One
} from 'next/font/google';

export const logofont = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const mainheading = Comfortaa({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const mainheadingBold = Comfortaa({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export const gotu = Gotu({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const yatraOne = Yatra_One({
  subsets: ['devanagari'],
  weight: ['400'],
  display: 'swap',
});

export const palanquinDark = Palanquin_Dark({
  subsets: ['latin'],
  weight: ['500','700'],
  display: 'swap',
});

export const tiroDevanagariHindi = Tiro_Devanagari_Hindi({
  subsets: ['devanagari'],
  weight: ['400'],
  display: 'swap',
});

export const sura = Sura({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export const amita = Amita({
  subsets: ['devanagari'],
  weight: ['400', '700'],
  display: 'swap',
});
export const laila = Laila({
  subsets: ['devanagari'],
  weight: ['400', '700'],
  display: 'swap',
});

export const inknut_antiqua = Inknut_Antiqua({
  subsets: ['devanagari'],
  weight: ['400', '700','800','900'],
  display: 'swap',
})