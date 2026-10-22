const fs = require('fs');
const path = require('path');

const prods = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'joynbloom_products.json'), 'utf8').replace(/^\uFEFF/, ''));
const map = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'joynbloom_collection_map.json'), 'utf8'));

const flowerIds = new Set(map.flowers || []);
const cakeIds = new Set(map.cakes || []);
const plantIds = new Set(map.plants || []);
const hamperIds = new Set(map.hamper || []);

const bdayIds = new Set(map.birthday || []);
const annivIds = new Set(map.anniversary || []);
const thankIds = new Set(map['thank-you'] || []);
const loveIds = new Set(map['love-it-buy'] || []);

function cleanHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const products = prods.products.map(p => {
  let category = 'Gifts & Hampers';
  if (cakeIds.has(p.id) || p.product_type === 'Cakes' || /cake|truffle|forest|butterscotch/i.test(p.title)) {
    category = 'Cakes';
  } else if (plantIds.has(p.id) || p.product_type === 'Plants' || /plant|bamboo|jade|bonsai/i.test(p.title)) {
    category = 'Plants';
  } else if (flowerIds.has(p.id) || !p.product_type || /orchid|rose|lily|bouquet|carnation|gerbera|sunflower|flower/i.test(p.title)) {
    category = 'Flowers';
  } else if (hamperIds.has(p.id) || p.product_type === 'Gifts & Hampers') {
    category = 'Gifts & Hampers';
  }

  const occasions = [];
  if (bdayIds.has(p.id) || /birthday/i.test(p.title)) occasions.push('Birthday');
  if (annivIds.has(p.id) || /anniversary|love|heart|forever/i.test(p.title)) occasions.push('Anniversary');
  if (thankIds.has(p.id) || /thank/i.test(p.title)) occasions.push('Thank You');
  if (loveIds.has(p.id) || /love|heart|rose/i.test(p.title)) occasions.push('Love It. Buy');

  // If no occasion matched yet, default
  if (occasions.length === 0) {
    if (category === 'Cakes') occasions.push('Birthday', 'Anniversary');
    else if (category === 'Flowers') occasions.push('Birthday', 'Love It. Buy');
    else occasions.push('Birthday', 'Thank You');
  }

  let desc = cleanHtml(p.body_html);
  if (!desc || desc.length < 15) {
    if (category === 'Flowers') {
      desc = `Delightfully handcrafted floral arrangement featuring ${p.title}. Picked fresh at peak bloom and wrapped with artisanal finesse for life's sweetest celebrations.`;
    } else if (category === 'Cakes') {
      desc = `Irresistible fresh creation — ${p.title}. Crafted with decadent sponge layers, silky cream, and premium chocolate notes baked to perfection for every celebration.`;
    } else if (category === 'Plants') {
      desc = `A breath of fresh energy for your home or workspace with this vibrant ${p.title}. Easy to maintain, air-purifying, and presented in an elegant planter.`;
    } else {
      desc = `A thoughtfully curated luxury presentation — ${p.title}. Designed with signature JoyNBloom elegance to leave an unforgettable impression.`;
    }
  }

  const features = [];
  if (category === 'Cakes') {
    features.push('100% Freshly Baked', 'Eggless Available', 'Celebration Knife & Candles', 'Handwritten Card');
  } else if (category === 'Flowers') {
    features.push('Fresh Farm Stems', 'Artisanal Paper Wrap', 'Same-Day Delivery', 'Free Message Card');
  } else if (category === 'Plants') {
    features.push('Air-Purifying Greenery', 'Decorative Planter', 'Easy Care Routine', 'Safe PAN India Delivery');
  } else {
    features.push('Luxury Keepsake Packaging', 'Curated Treats & Gifts', 'Handcrafted Arrangement', 'Free Personalized Note');
  }

  const badges = {
    Flowers: ['FRESH BLOOMS', 'HAND-TIED', 'SAME DAY', 'ROMANTIC', 'EXOTIC'],
    Cakes: ['100% EGGLESS', 'FRESH BAKE', 'BESTSELLER', 'DELUXE', 'HEART SPECIAL'],
    'Gifts & Hampers': ['LUXURY HAMPER', 'BALLOON SETUP', 'HERO GIFT', 'CELEBRATION', 'POPULAR'],
    Plants: ['AIR PURIFYING', 'GOOD LUCK', 'INDOOR CHARM', 'EASY CARE']
  };

  const badgeColors = {
    'FRESH BLOOMS': '#22c55e',
    'HAND-TIED': '#ec4899',
    'SAME DAY': '#38bdf8',
    'ROMANTIC': '#f43f5e',
    'EXOTIC': '#a855f7',
    '100% EGGLESS': '#10b981',
    'FRESH BAKE': '#eab308',
    'BESTSELLER': '#f97316',
    'DELUXE': '#a855f7',
    'HEART SPECIAL': '#ec4899',
    'LUXURY HAMPER': '#a855f7',
    'BALLOON SETUP': '#ec4899',
    'HERO GIFT': '#f97316',
    'CELEBRATION': '#22c55e',
    'POPULAR': '#eab308',
    'AIR PURIFYING': '#10b981',
    'GOOD LUCK': '#22c55e',
    'INDOOR CHARM': '#38bdf8',
    'EASY CARE': '#eab308'
  };

  const pool = badges[category] || ['POPULAR'];
  const badgeIndex = (p.id ? Math.abs(Number(p.id)) : 0) % pool.length;
  const badge = pool[badgeIndex];
  const badgeColor = badgeColors[badge] || '#f97316';

  const price = parseFloat(p.variants && p.variants[0] ? p.variants[0].price : '799') || 799;
  const originalPrice = p.variants && p.variants[0] && p.variants[0].compare_at_price
    ? parseFloat(p.variants[0].compare_at_price)
    : Math.round(price * 1.25);

  const ratingSeed = (p.id ? Math.abs(Number(p.id)) : 0) % 4;
  const rating = Number((4.7 + ratingSeed * 0.1).toFixed(1));
  const reviewsCount = 45 + ((p.id ? Math.abs(Number(p.id)) : 0) % 240);

  return {
    id: String(p.id),
    name: p.title,
    handle: p.handle,
    category,
    occasions,
    price,
    originalPrice,
    rating,
    reviewsCount,
    badge,
    badgeColor,
    description: desc,
    ingredients: features,
    features,
    image: (p.images && p.images[0] ? p.images[0].src : ''),
    images: (p.images || []).map(img => img.src),
    shopifyVariantId: String(p.variants && p.variants[0] ? p.variants[0].id : ''),
    shopifyProductId: 'gid://shopify/Product/' + p.id,
    isPushedToShopify: true
  };
});

const fileContent = `import { BakeryProduct } from "./types";

export const JOY_PRODUCTS: BakeryProduct[] = ${JSON.stringify(products, null, 2)};

export const BAKERY_PRODUCTS: BakeryProduct[] = JOY_PRODUCTS;
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'lib', 'products.ts'), fileContent, 'utf8');
console.log('SUCCESS! Wrote ' + products.length + ' products to src/lib/products.ts');
