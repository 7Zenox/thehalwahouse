import moongDal from './moongdal.webp';
import suji from './suji.webp';
import kesar from './kesar.webp';
import aata from './aata.webp';
import gajar from './gajar.webp';
import badam from './badam.webp';
import oreo from './oreo.webp';
import dryFruits from './dryfruits.webp';

const data = {
  moong_dal_halwa: {
    name: "Moong Dal",
    small: { weight: "250 gms", price: 350, serves: "2-3" },
    medium: { weight: "500 gms", price: 650, serves: "4-5" },
    large: { weight: "1 kg", price: 1200, serves: "6-8" },
    description: "A rich, velvety treat of slow-cooked moong dal and fresh ghee.",
    path: moongDal.src,
  },
  suji_halwa: {
    name: "Suji",
    small: { weight: "250 gms", price: 350, serves: "2-3" },
    medium: { weight: "500 gms", price: 650, serves: "4-5" },
    large: { weight: "1 kg", price: 1200, serves: "6-8" },
    description: "Made from suji stirred in fresh ghee.",
    path: suji.src,
  },
  kesar_halwa: {
    name: "Kesar",
    small: { weight: "250 gms", price: 350, serves: "2-3" },
    medium: { weight: "500 gms", price: 650, serves: "4-5" },
    large: { weight: "1 kg", price: 1200, serves: "6-8" },
    description: "Fragrant saffron and ghee blend into this royal indulgence of Suji.",
    path: kesar.src,
  },
  aata_halwa: {
    name: "Aata",
    small: { weight: "250 gms", price: 350, serves: "2-3" },
    medium: { weight: "500 gms", price: 650, serves: "4-5" },
    large: { weight: "1 kg", price: 1200, serves: "6-8" },
    description: "Comforting aata halwa soaked in ghee and roasted to perfection.",
    path: aata.src,
  },
  gajar_halwa: {
    name: "Gajar",
    small: { weight: "250 gms", price: 350, serves: "2-3" },
    medium: { weight: "500 gms", price: 650, serves: "4-5" },
    large: { weight: "1 kg", price: 1200, serves: "6-8" },
    description: "The royal indulgence of red carrots slow-cooked in ghee and milk, garnished with nuts.",
    path: gajar.src,
  },
  badam_halwa: {
    name: "Badam",
    small: { weight: "250 gms", price: 450, serves: "2-3" },
    medium: { weight: "500 gms", price: 850, serves: "4-5" },
    large: { weight: "1 kg", price: 1600, serves: "6-8" },
    description: "Luxuriously smooth with rich blanched almonds and aromatic ghee.",
    path: badam.src,
  },
  oreo_halwa: {
    name: "Oreo",
    small: { weight: "250 gms", price: 375, serves: "2-3" },
    medium: { weight: "500 gms", price: 700, serves: "4-5" },
    large: { weight: "1 kg", price: 1300, serves: "6-8" },
    description: "A fusion delight with crunchy Oreo bits in a soft, creamy yet flaky base.",
    path: oreo.src,
  },
  dry_fruits_mix: {
    name: "Dry Fruits Mix",
    small: { weight: "150 gms", price: 300, serves: "7-10 garnishings" },
    medium: { weight: "250 gms", price: 550, serves: "15-20 garnishings" },
    description:
      "A crunchy blend of premium nuts, shredded to perfection for a burst of flavor. Perfect for toppings, post meal munchies and garnishing.",
    path: dryFruits.src,
  },
};

export default data;
