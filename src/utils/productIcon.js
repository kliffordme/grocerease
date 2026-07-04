// Maps a product to a Twemoji flat-icon (bundled in /public/icons as <codepoint>.svg).
// Keyword rules are checked in order, so more specific terms must come first
// (e.g. "rice cooker" before "rice", "dog food" before "dog").

const KEYWORD_ICON = [
  // appliances (before food words they might contain)
  [/rice cooker/i, '1f373'],       // cooking
  [/air fryer/i, '1f373'],         // cooking
  [/kettle/i, '1fad6'],            // teapot
  [/blender/i, '1f964'],           // cup with straw
  [/fan/i, '1f300'],               // cyclone
  [/lamp/i, '1f4a1'],              // light bulb
  [/hair dryer|flat iron/i, '1f4a8'], // dash

  // beverages
  [/water/i, '1f4a7'],             // droplet
  [/coffee/i, '2615'],             // hot beverage
  [/iced tea|bottled tea|tea/i, '1f9c3'], // beverage box
  [/gatorade|juice|tru-orange|royal/i, '1f9c3'],
  [/cola|coke|sprite|mountain dew|soda|zero/i, '1f964'], // cup with straw

  // alcohol
  [/wine/i, '1f377'],              // wine glass
  [/beer|san miguel/i, '1f37a'],   // beer mug
  [/whiskey|gin|vodka|rum/i, '1f943'], // tumbler

  // grocery
  [/rice/i, '1f35a'],              // cooked rice
  [/bread|loaf/i, '1f35e'],        // bread
  [/egg/i, '1f95a'],               // egg
  [/milk/i, '1f95b'],              // glass of milk
  [/noodle|pancit/i, '1f35c'],     // steaming bowl
  [/pasta|spaghetti/i, '1f35d'],   // spaghetti
  [/tuna|corned beef|canned|sauce/i, '1f96b'], // canned food
  [/oil/i, '1fad7'],               // pouring liquid
  [/garlic/i, '1f9c4'],            // garlic
  [/butter/i, '1f9c8'],            // butter
  [/sugar|salt/i, '1f9c2'],        // salt

  // pharmacy
  [/band-?aid|bandage/i, '1fa79'], // adhesive bandage
  [/alcohol/i, '1fad7'],           // pouring liquid (rubbing alcohol)
  [/ointment|syrup|tablet|paracetamol|biogesic|cetirizine|ibuprofen|strepsils|vitamin|allergy|cough|anti/i, '1f48a'], // pill

  // pets
  [/dog food|dog treats|pedigree/i, '1f9b4'], // bone
  [/fish food/i, '1f41f'],         // fish
  [/bird/i, '1f426'],              // bird
  [/cat|dog|pet/i, '1f43e'],       // paw prints

  // healthy
  [/banana/i, '1f34c'],            // banana
  [/nuts|trail mix/i, '1f95c'],    // peanuts
  [/granola|protein bar|cookies|keto|bar/i, '1f36b'], // chocolate bar
  [/chia|seeds/i, '1f331'],        // seedling
  [/oatmeal|oat/i, '1f963'],       // bowl with spoon

  // baby & kids
  [/diaper|pampers/i, '1f476'],    // baby
  [/wipes/i, '1f9fb'],             // roll of paper
  [/formula|feeding|bottle/i, '1f37c'], // baby bottle
  [/powder|soap|lotion|shampoo/i, '1f9f4'], // lotion bottle
];

const CATEGORY_ICON = {
  beverages: '1f964',
  grocery: '1f6d2',
  pharmacy: '1f48a',
  pets: '1f43e',
  appliances: '1f50c',
  healthy: '1f957',
  'baby-and-kids': '1f37c',
  alcohol: '1f377',
};

// Subtle, restrained tile tint per category.
export const CATEGORY_TINT = {
  beverages: 'bg-sky-50',
  grocery: 'bg-amber-50',
  pharmacy: 'bg-rose-50',
  pets: 'bg-orange-50',
  appliances: 'bg-slate-100',
  healthy: 'bg-emerald-50',
  'baby-and-kids': 'bg-pink-50',
  alcohol: 'bg-violet-50',
};

export function productIcon(name = '', category = '') {
  for (const [re, code] of KEYWORD_ICON) {
    if (re.test(name)) return `/icons/${code}.svg`;
  }
  const code = CATEGORY_ICON[category] || '1f6d2';
  return `/icons/${code}.svg`;
}

export function categoryTint(category = '') {
  return CATEGORY_TINT[category] || 'bg-gray-50';
}
