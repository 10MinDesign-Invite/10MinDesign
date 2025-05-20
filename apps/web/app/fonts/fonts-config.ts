// apps/frontend/fonts.ts

import { Amita, Comfortaa, Gotu, Pacifico, Palanquin_Dark, Rozha_One, Sura, Tiro_Devanagari_Hindi, Yatra_One } from 'next/font/google'


export const logofont = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap'
})
export const mainheading = Comfortaa({
  weight: ['400'],
  display: 'swap'
})
export const mainheadingbold = Comfortaa({
  weight: ['700'],
  display: 'swap'
})
export const gotu = Gotu({
  weight: ['400'],
  display: 'swap'
})
export const yatra_one = Yatra_One({
  weight: ['400'],
  display: 'swap'
})
export const PalanquinDark = Palanquin_Dark({
  weight: ['500'],
  display: 'swap'
})
export const TiroDevanagariHindi = Tiro_Devanagari_Hindi({
  weight: ['400'],
  display: 'swap'
})
export const sura = Sura({
  weight: ['700'],
  display: 'swap'
})
export const amita = Amita({
  weight: ['400','700'],
  display: 'swap'
})

