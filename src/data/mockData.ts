export interface EventTypeOption {
  id: string;
  name: string;
  description: string;
  baseGuests: number;
}

export interface PackageTier {
  id: string;
  name: string;
  pricePerGuest: number;
  description: string;
  courses: string;
  prepTimeHours: number;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description: string;
  requiresSpecialStaff: boolean;
}

export const EVENT_TYPES: EventTypeOption[] = [
  {
    id: 'wedding',
    name: 'Wedding Banquet',
    description: 'Multi-course seated dining, premium tableware, and dedicated bridal coordination.',
    baseGuests: 120,
  },
  {
    id: 'corporate',
    name: 'Corporate Gala & Dinner',
    description: 'Executive plated service, cocktail lounge staging, and punctual run-of-show logistics.',
    baseGuests: 80,
  },
  {
    id: 'private',
    name: 'Intimate Private Dining',
    description: 'Chef-table experience, bespoke pairing menus, and discreet boutique hospitality.',
    baseGuests: 35,
  },
  {
    id: 'celebration',
    name: 'Milestone Celebration',
    description: 'Festive buffet stations, cocktail bar, and flexible indoor/outdoor equipment setups.',
    baseGuests: 60,
  },
];

export const PACKAGE_TIERS: PackageTier[] = [
  {
    id: 'classic',
    name: 'Classic Bistro Tier',
    pricePerGuest: 45,
    description: '3-course seasonal menu with premium table settings and standard service staff.',
    courses: 'Artisan salad, pan-roasted protein & sides, seasonal dessert tart',
    prepTimeHours: 2.0,
  },
  {
    id: 'premier',
    name: 'Premier Artisan Tier',
    pricePerGuest: 72,
    description: '4-course crafted gourmet menu, welcome canapés, custom table linen, and floor captain.',
    courses: 'Passed canapés, burrata starter, dry-aged beef or seabass, decadent valrhona ganache',
    prepTimeHours: 3.0,
  },
  {
    id: 'imperial',
    name: 'Grand Gala Curation',
    pricePerGuest: 110,
    description: '5-course bespoke gastronomic feast, sommelier wine pairing, floral staging, and lead maitre d\'.',
    courses: 'Amuse-bouche, cured duck breast, Chilean sea bass, truffle tenderloin, citrus granita & patisserie',
    prepTimeHours: 4.0,
  },
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: 'bar_service',
    name: 'Craft Cocktail Bar & Mixologist',
    price: 850,
    description: 'Mobile bar station, artisanal bitters, hand-cut ice, and 2 certified mixologists.',
    requiresSpecialStaff: true,
  },
  {
    id: 'lighting_audio',
    name: 'Ambient Warm Lighting & Acoustic Rig',
    price: 650,
    description: 'Wireless pin-spot table lighting, warm festoon runs, and discreet PA speaker array.',
    requiresSpecialStaff: false,
  },
  {
    id: 'sommelier',
    name: 'Dedicated Head Sommelier Service',
    price: 420,
    description: 'Curated vineyard cellar pairings, glassware service, and guest wine storytelling.',
    requiresSpecialStaff: true,
  },
];
