// data.ts

import { HalwaItem } from "./types";

const data: Record<string, HalwaItem> = {
  moong_dal_halwa: {
    name: "Moong Dal",
    small: { weight: "250 gms", price: 250, serves: "2-3" },
    medium: { weight: "500 gms", price: 450, serves: "4-5" },
    large: { weight: "1 kg", price: 800, serves: "6-8" },
    description: "A rich, velvety treat of slow-cooked moong dal and fresh ghee.",
    path: '/videos_mp4/moong.mp4',
  },
  suji_halwa: {
    name: "Suji",
    small: { weight: "250 gms", price: 250, serves: "2-3" },
    medium: { weight: "500 gms", price: 450, serves: "4-5" },
    large: { weight: "1 kg", price: 800, serves: "6-8" },
    description: "Made from suji stirred in fresh ghee.",
    path: "/videos_mp4/suji.mp4",
  },
  kesar_halwa: {
    name: "Kesar",
    small: { weight: "250 gms", price: 250, serves: "2-3" },
    medium: { weight: "500 gms", price: 450, serves: "4-5" },
    large: { weight: "1 kg", price: 800, serves: "6-8" },
    description: "Fragrant saffron and ghee blend into this royal indulgence of Suji.",
    path: "/videos_mp4/kesar.mp4",
  },
  aata_halwa: {
    name: "Aata",
    small: { weight: "250 gms", price: 250, serves: "2-3" },
    medium: { weight: "500 gms", price: 450, serves: "4-5" },
    large: { weight: "1 kg", price: 800, serves: "6-8" },
    description: "Comforting aata halwa soaked in ghee and roasted to perfection.",
    path: "/videos_mp4/aata_fixed.m3u8",
  },
  gajar_halwa: {
    name: "Gajar",
    small: { weight: "250 gms", price: 250, serves: "2-3" },
    medium: { weight: "500 gms", price: 450, serves: "4-5" },
    large: { weight: "1 kg", price: 800, serves: "6-8" },
    description: "The royal indulgence of red carrots slow-cooked in ghee and milk, garnished with nuts.",
    path: "/videos_mp4/gajar.mp4",
  },
  // badam_halwa: {
  //   name: "Badam",
  //   small: { weight: "250 gms", price: 350, serves: "2-3" },
  //   medium: { weight: "500 gms", price: 650, serves: "4-5" },
  //   large: { weight: "1 kg", price: 1200, serves: "6-8" },
  //   description: "Luxuriously smooth with rich blanched almonds and aromatic ghee.",
  //   path: "/videos_mp4/badam.mp4",
  // },
  oreo_halwa: {
    name: "Oreo",
    small: { weight: "250 gms", price: 250, serves: "2-3" },
    medium: { weight: "500 gms", price: 450, serves: "4-5" },
    large: { weight: "1 kg", price: 800, serves: "6-8" },
    description: "A fusion delight with crunchy Oreo bits in a soft, creamy yet flaky base.",
    path: "/videos_mp4/oreo.mp4",
  },
  dry_fruits_mix: {
    name: "Dry Fruits Mix",
    small: { weight: "150 gms", price: 300, serves: "7-10 garnishings" },
    medium: { weight: "250 gms", price: 550, serves: "15-20 garnishings" },
    description:
      "A crunchy blend of premium nuts, shredded to perfection for a burst of flavor. Perfect for toppings, post meal munchies and garnishing.",
    path: "/videos_mp4/dryfruitsmix.mp4",
  },
  rabri: {
    name: "Rabri",
    small: { weight: "250 gms", price: 250, serves: "2-3" },
    medium: { weight: "500 gms", price: 450, serves: "4-5" },
    description:
      "A crunchy blend of premium nuts, shredded to perfection for a burst of flavor. Perfect for toppings, post meal munchies and garnishing.",
    path: "/videos_mp4/rabri.mp4",
  },
  elaichi_peda: {
    name: "Elaichi Peda",
    medium: { weight: "500 gms", price: 350, serves: "6-8" },
    large: { weight: "1 kg", price: 700, serves: "8 or more" },
    description:
      "A crunchy blend of premium nuts, shredded to perfection for a burst of flavor. Perfect for toppings, post meal munchies and garnishing.",
    path: "/videos_mp4/peda.mp4",
  },
  // kesar_peda: {
  //   name: "Kesar Peda",
  //   medium: { weight: "500 gms", price: 400, serves: "15-20 garnishings" },
  //   large: { weight: "1 kg", price: 750, serves: "6-8" },
  //   description:
  //     "A crunchy blend of premium nuts, shredded to perfection for a burst of flavor. Perfect for toppings, post meal munchies and garnishing.",
  //   path: dryFruits.src,
  // },
};

export default data;