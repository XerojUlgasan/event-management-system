import { useState, useEffect } from 'react';
import {
  User,
  UserRole,
  EventPackage,
  MenuItem,
  AddOn,
  Quotation,
  Booking,
  StaffMember,
  EquipmentItem,
  ConsumableItem,
  DispatchLog,
  EventTask,
  EventIncident,
  SystemNotification,
  Announcement,
  CustomerReview,
  PastEventShowcase,
  KnowledgeBaseArticle,
  HandoverRecord,
  AuditLog,
  SystemSettings,
  TurnaroundTimeline,
} from '../types/clemora.ts';

// Initial Mock Seed Data
const INITIAL_USERS: User[] = [
  {
    id: 'usr_admin',
    name: 'Elena Rostova',
    email: 'admin@clemora.com',
    role: 'administrator',
    phone: '+1 (555) 234-8901',
    createdAt: '2026-08-01',
  },
  {
    id: 'usr_coord',
    name: 'Marcus Vance',
    email: 'coordinator@clemora.com',
    role: 'coordinator',
    phone: '+1 (555) 345-6789',
    createdAt: '2026-08-15',
  },
  {
    id: 'usr_staff_1',
    name: 'Chef Antoine Laurent',
    email: 'antoine@clemora.com',
    role: 'staff',
    phone: '+1 (555) 456-7890',
    assignedStaffId: 'stf_1',
    createdAt: '2026-09-01',
  },
  {
    id: 'usr_staff_2',
    name: 'Sophia Chen',
    email: 'sophia@clemora.com',
    role: 'staff',
    phone: '+1 (555) 567-8901',
    assignedStaffId: 'stf_2',
    createdAt: '2026-09-05',
  },
  {
    id: 'usr_cust',
    name: 'Victoria Sterling',
    email: 'victoria.sterling@horizoncapital.com',
    role: 'customer',
    phone: '+1 (555) 890-1234',
    createdAt: '2026-10-01',
  },
];

const INITIAL_PACKAGES: EventPackage[] = [
  {
    id: 'pkg_classic',
    name: 'Classic Bistro Gala',
    tagline: 'Refined three-course dining with understated elegance',
    category: 'corporate',
    pricePerGuest: 48,
    minimumGuests: 40,
    description: 'An elevated seasonal bistro curation perfect for corporate dinners, award ceremonies, and milestone celebrations requiring impeccable timing.',
    inclusions: [
      '3-Course Artisanal Plated Dinner',
      'Artisan bread & herb butter service',
      'Standard porcelain & silver service',
      'Dedicated Service Captain & servers (1:15 ratio)',
      '3.5-hour bar and dining window',
    ],
    courseHighlights: [
      'Smoked duck breast with wild arugula & fig reduction',
      'Pan-seared Chilean sea bass with saffron risotto',
      'Valrhona dark chocolate marquise with raspberry gelée',
    ],
    imageUrl: '/src/assets/images/showcase_culinary_plating_1792158729100.jpg',
    prepDurationHours: 2.5,
    isPublished: true,
    featured: false,
  },
  {
    id: 'pkg_artisan',
    name: 'Premier Artisan Sovereign',
    tagline: 'Four courses of gastronomic mastery with bespoke table styling',
    category: 'wedding',
    pricePerGuest: 78,
    minimumGuests: 60,
    description: 'Our signature bridal and high-profile celebration collection. Features passed amuse-bouche canapés, premium wine pairings, and bespoke floral table staging.',
    inclusions: [
      'Passed Pre-Dinner Canapés (4 selections)',
      '4-Course Gastronomic Plated Service',
      'Imported Italian linen & gold-rim glassware',
      'Dedicated Bridal Coordinator & Maitre d\'',
      'Customized printed menus & calligraphed place cards',
      '5-hour event staging & bar management',
    ],
    courseHighlights: [
      'Truffled burrata with heirloom tomato tartare',
      'Sous-vide prime beef tenderloin with bone marrow glaze',
      'Herb-crusted rack of lamb with mint pea purée',
      'Madagascar vanilla bean panna cotta with passionfruit crisp',
    ],
    imageUrl: '/src/assets/images/luxury_banquet_hero_1792162588544.jpg',
    prepDurationHours: 3.5,
    isPublished: true,
    featured: true,
  },
  {
    id: 'pkg_imperial',
    name: 'Imperial Grand Gala Curation',
    tagline: 'The pinnacle of five-course luxury catering with dedicated sommelier',
    category: 'gala',
    pricePerGuest: 115,
    minimumGuests: 80,
    description: 'Designed for ambassadorial receptions, luxury brand galas, and grand wedding receptions. Complete with sommelier wine flights and live culinary stations.',
    inclusions: [
      'Champagne & Oysters Welcome Bar',
      '5-Course Degustation Tasting Menu',
      'Vintage crystal stemware & Bernardaud porcelain',
      'Master Sommelier & 2 Mixologists included',
      'Full staging turnaround buffer guarantee (zero friction)',
      'Live pastry flambe station during dessert',
    ],
    courseHighlights: [
      'Amuse-bouche of caviar blinis with lemon creme fraiche',
      'Butter-poached Brittany lobster tail with caviar foam',
      'Dry-aged A5 Wagyu striploin with black truffle mousseline',
      'Palate-cleansing yuzu champagne granita',
      'Grand Grand Marnier soufflé with hazelnut praline',
    ],
    imageUrl: '/src/assets/images/hero_event_catering_banquet_1792158710813.jpg',
    prepDurationHours: 4.5,
    isPublished: true,
    featured: true,
  },
  {
    id: 'pkg_intimate',
    name: 'Private Chef Atelier Experience',
    tagline: 'Exclusive interactive dining for VIP gatherings and private estates',
    category: 'private',
    pricePerGuest: 135,
    minimumGuests: 15,
    description: 'A boutique, chef-table experience where our Executive Chef finishes and plates courses in front of guests with storytelling pairing commentary.',
    inclusions: [
      'Custom Chef Consultation before menu lock',
      '6-Course Micro-Degustation',
      'Sommelier wine pairing per course',
      'Bespoke hand-turned ceramic tableware',
      'Full kitchen deep sanitization post-event',
    ],
    courseHighlights: [
      'Hokkaido scallop crudo with finger lime & shiso',
      'Morel mushroom velouté with toasted brioche',
      'Glazed duck magret with spiced sour cherry',
      'Artisanal farmstead cheese honeycomb board',
      'Deconstructed mille-feuille with caramelized figs',
    ],
    imageUrl: '/src/assets/images/luxury_catering_venue_1792162393940.jpg',
    prepDurationHours: 3.0,
    isPublished: true,
    featured: false,
  },
];

const INITIAL_ADDONS: AddOn[] = [
  {
    id: 'add_mixology',
    name: 'Artisan Mixology Bar & 2 Certified Bartenders',
    category: 'bar',
    price: 950,
    pricingType: 'flat',
    description: 'Custom mobile copper bar, botanical infusions, hand-carved crystal ice, and 4 bespoke signature cocktails.',
    requiresSpecialStaff: true,
    requiredStaffRole: 'Mixologist',
  },
  {
    id: 'add_sommelier',
    name: 'Dedicated Master Sommelier Wine Flight Service',
    category: 'service',
    price: 520,
    pricingType: 'flat',
    description: 'Curated international cellar selection, Riedel crystal stemware service, and tableside pairing notes.',
    requiresSpecialStaff: true,
    requiredStaffRole: 'Sommelier',
  },
  {
    id: 'add_lighting',
    name: 'Architectural Pin-Spot & Warm Festoon Array',
    category: 'decor',
    price: 780,
    pricingType: 'flat',
    description: 'Wireless warm 2700K battery pin-spots for every banquet centerpiece and perimeter acoustic wash.',
    requiresSpecialStaff: false,
  },
  {
    id: 'add_acoustic',
    name: 'Classical String Trio (2 Hours Live Prelude)',
    category: 'entertainment',
    price: 1200,
    pricingType: 'flat',
    description: 'Live conservatory acoustic strings performing classical standards and contemporary arrangements during cocktail hour.',
    requiresSpecialStaff: false,
  },
  {
    id: 'add_espresso',
    name: 'Italian Espresso & Gelato Cart',
    category: 'bar',
    price: 8,
    pricingType: 'per_guest',
    description: 'La Marzocco espresso station with single-origin beans, oat milks, and 4 artisanal gelato flavors.',
    requiresSpecialStaff: true,
    requiredStaffRole: 'Service Captain',
  },
];

const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'menu_1',
    name: 'Smoked Salmon Blinis with Dill Crema',
    course: 'canapes',
    description: 'House-cured Scottish salmon on buck-wheat blinis with preserved lemon dill emulsion',
    dietary: ['Halal', 'Nut-Free'],
  },
  {
    id: 'menu_2',
    name: 'Truffle & Wild Forest Mushroom Arancini',
    course: 'canapes',
    description: 'Crisp saffron risotto sphere, melted taleggio core, shaved black winter truffle',
    dietary: ['Vegetarian', 'Nut-Free'],
  },
  {
    id: 'menu_3',
    name: 'Burrata di Puglia with Heirloom Carpaccio',
    course: 'starter',
    description: 'Creamy burrata, rainbow heirloom tomatoes, basil oil, aged balsamic glaze',
    dietary: ['Vegetarian', 'Gluten-Free', 'Nut-Free'],
  },
  {
    id: 'menu_4',
    name: 'Prime Dry-Aged Angus Tenderloin',
    course: 'main',
    description: 'Center-cut beef tenderloin, roasted garlic pomme purée, charred broccolini, cabernet reduction',
    dietary: ['Gluten-Free', 'Halal', 'Nut-Free'],
    premiumSurcharge: 12,
  },
  {
    id: 'menu_5',
    name: 'Wild-Caught Chilean Sea Bass',
    course: 'main',
    description: 'Miso-mirin glazed sea bass, bok choy, lemongrass dashi broth, crispy lotus root',
    dietary: ['Gluten-Free', 'Nut-Free'],
    premiumSurcharge: 10,
  },
  {
    id: 'menu_6',
    name: 'Roasted Butternut Squash & Sage Agnolotti',
    course: 'main',
    description: 'Handmade pasta pillows, brown butter emulsions, crispy sage, toasted pine nuts',
    dietary: ['Vegetarian'],
  },
  {
    id: 'menu_7',
    name: 'Valrhona Grand Cru Dark Chocolate Tart',
    course: 'dessert',
    description: '70% Guanaja chocolate ganache, sea salt flakes, raspberry coulis, gold leaf',
    dietary: ['Vegetarian', 'Nut-Free'],
  },
];

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'stf_1',
    name: 'Chef Antoine Laurent',
    email: 'antoine@clemora.com',
    phone: '+1 (555) 456-7890',
    role: 'Executive Chef',
    skills: ['Degustation Curation', 'HACCP Safety Lead', 'French Haute Cuisine', 'Molecular Gastronomy'],
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    rating: 4.95,
    activeEventsCount: 3,
    status: 'active',
  },
  {
    id: 'stf_2',
    name: 'Sophia Chen',
    email: 'sophia@clemora.com',
    phone: '+1 (555) 567-8901',
    role: 'Lead Maitre d\'',
    skills: ['VIP Protocol', 'Floor Captaincy', 'Crisis Management', 'Bilingual (EN/FR)'],
    availableDays: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rating: 4.92,
    activeEventsCount: 4,
    status: 'active',
  },
  {
    id: 'stf_3',
    name: 'Mateo Rossi',
    email: 'mateo@clemora.com',
    phone: '+1 (555) 678-9012',
    role: 'Sommelier',
    skills: ['Old World Wine Cellar', 'Enology Certified', 'Glassware Care', 'Table Pairing'],
    availableDays: ['Thu', 'Fri', 'Sat', 'Sun'],
    rating: 4.88,
    activeEventsCount: 2,
    status: 'active',
  },
  {
    id: 'stf_4',
    name: 'Jasmine Walker',
    email: 'jasmine@clemora.com',
    phone: '+1 (555) 789-0123',
    role: 'Mixologist',
    skills: ['Craft Cocktails', 'Infusion Craft', 'Speed Pouring', 'Ice Carving'],
    availableDays: ['Fri', 'Sat', 'Sun', 'Mon'],
    rating: 4.9,
    activeEventsCount: 2,
    status: 'active',
  },
  {
    id: 'stf_5',
    name: 'Darius Thorne',
    email: 'darius@clemora.com',
    phone: '+1 (555) 890-1234',
    role: 'Logistics Lead',
    skills: ['Warehouse Loading Dock', 'Transit Routing', 'Warewashing Buffer Lead', 'Heavy Rigging'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    rating: 4.98,
    activeEventsCount: 5,
    status: 'active',
  },
  {
    id: 'stf_6',
    name: 'Elena Rostova',
    email: 'admin@clemora.com',
    phone: '+1 (555) 234-8901',
    role: 'Event Coordinator',
    skills: ['Client Relations', 'Quotation Formulation', 'Turnaround Buffer Scheduling', 'Run of Show'],
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    rating: 5.0,
    activeEventsCount: 6,
    status: 'active',
  },
];

const INITIAL_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq_1',
    code: 'CHF-ROLL-01',
    name: 'Stainless Steel Roll-Top Chafing Dish (8.5L)',
    category: 'chafers',
    totalQuantity: 24,
    allocatedQuantity: 12,
    inRepairQuantity: 1,
    unit: 'units',
    condition: 'Pristine',
    location: 'Bay 3 - Aisle C',
  },
  {
    id: 'eq_2',
    code: 'CHR-CHIAV-GLD',
    name: 'Gold Chiavari Banquet Chair with Ivory Cushion',
    category: 'furniture',
    totalQuantity: 350,
    allocatedQuantity: 180,
    inRepairQuantity: 6,
    unit: 'chairs',
    condition: 'Good',
    location: 'Bay 1 - Stacking Racks',
  },
  {
    id: 'eq_3',
    code: 'GLS-RIED-BOR',
    name: 'Riedel Crystal Bordeaux Wine Goblets (Set of 6)',
    category: 'glassware',
    totalQuantity: 80,
    allocatedQuantity: 45,
    inRepairQuantity: 2,
    unit: 'crates (480 stems)',
    condition: 'Pristine',
    location: 'Bay 4 - Stemware Locker',
  },
  {
    id: 'eq_4',
    code: 'LIN-BELG-IVR',
    name: 'Belgian Pure Linen Tablecloth (120" Round Ivory)',
    category: 'linens',
    totalQuantity: 60,
    allocatedQuantity: 28,
    inRepairQuantity: 3,
    unit: 'linens',
    condition: 'Pristine',
    location: 'Bay 2 - Pressed Linens',
  },
  {
    id: 'eq_5',
    code: 'BAR-COPPER-MOB',
    name: 'Handcrafted Antique Copper Modular Bar Station',
    category: 'bar_station',
    totalQuantity: 4,
    allocatedQuantity: 2,
    inRepairQuantity: 0,
    unit: 'bars',
    condition: 'Pristine',
    location: 'Bay 5 - Bar Rigging',
  },
  {
    id: 'eq_6',
    code: 'LGT-PIN-ARRAY',
    name: 'Wireless Warm Ambient Pin-Spot Illuminator Set',
    category: 'sound_lighting',
    totalQuantity: 12,
    allocatedQuantity: 6,
    inRepairQuantity: 0,
    unit: 'charging flight cases',
    condition: 'Good',
    location: 'Bay 6 - Electronics',
  },
];

const INITIAL_CONSUMABLES: ConsumableItem[] = [
  {
    id: 'con_1',
    name: 'Chafing Fuel Eco-Cans (6-Hour Wick)',
    category: 'pantry',
    currentStock: 140,
    minimumThreshold: 50,
    unit: 'cans',
    costPerUnit: 2.8,
    lastRestocked: '2026-10-10',
  },
  {
    id: 'con_2',
    name: 'Single-Estate Cold-Pressed Olive Oil (5L)',
    category: 'pantry',
    currentStock: 4,
    minimumThreshold: 8,
    unit: 'tins',
    costPerUnit: 68.0,
    lastRestocked: '2026-09-28',
  },
  {
    id: 'con_3',
    name: 'Valrhona Guanaja 70% Dark Baking Discs',
    category: 'pantry',
    currentStock: 18,
    minimumThreshold: 15,
    unit: 'kg',
    costPerUnit: 34.5,
    lastRestocked: '2026-10-05',
  },
  {
    id: 'con_4',
    name: 'Artisan Compostable Cocktail Beverage Napkins',
    category: 'disposables',
    currentStock: 3200,
    minimumThreshold: 2000,
    unit: 'napkins',
    costPerUnit: 0.04,
    lastRestocked: '2026-10-02',
  },
  {
    id: 'con_5',
    name: 'Hospital-Grade Commercial Dishwashing Sanitizer',
    category: 'cleaning',
    currentStock: 12,
    minimumThreshold: 10,
    unit: 'gallons',
    costPerUnit: 42.0,
    lastRestocked: '2026-10-12',
  },
];

const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 'qt_1001',
    quoteNumber: 'CLM-2026-1001',
    customerId: 'usr_cust',
    customerName: 'Victoria Sterling',
    customerEmail: 'victoria.sterling@horizoncapital.com',
    customerPhone: '+1 (555) 890-1234',
    eventType: 'corporate',
    eventDate: '2026-11-14',
    guestCount: 85,
    venueName: 'The Conservatory at Grand Terrace',
    venueAddress: '450 Skyline Boulevard, Suite 12',
    packageId: 'pkg_classic',
    packageName: 'Classic Bistro Gala',
    items: [
      {
        id: 'qi_1',
        description: 'Classic Bistro Gala Package (85 guests @ $48/guest)',
        unitPrice: 48,
        quantity: 85,
        total: 4080,
        category: 'package',
      },
      {
        id: 'qi_2',
        description: 'Artisan Mixology Bar & 2 Certified Bartenders',
        unitPrice: 950,
        quantity: 1,
        total: 950,
        category: 'addon',
      },
      {
        id: 'qi_3',
        description: 'Architectural Pin-Spot & Warm Festoon Array',
        unitPrice: 780,
        quantity: 1,
        total: 780,
        category: 'addon',
      },
      {
        id: 'qi_4',
        description: 'Dedicated Turnaround Buffer Logistics & On-Site Staging Crew',
        unitPrice: 450,
        quantity: 1,
        total: 450,
        category: 'service',
      },
    ],
    subtotal: 6260,
    discountPercentage: 5,
    discountAmount: 313,
    serviceCharge: 594.7,
    taxAmount: 784.92,
    totalAmount: 7326.62,
    depositRequired: 2197.99,
    status: 'accepted',
    notes: 'Client confirmed vegetarian alternatives for 12 guests. Standard turnaround buffers verified.',
    validUntil: '2026-10-31',
    createdAt: '2026-10-08',
    updatedAt: '2026-10-12',
    revision: 1,
  },
  {
    id: 'qt_1002',
    quoteNumber: 'CLM-2026-1002',
    customerId: 'usr_cust_2',
    customerName: 'Julian & Claire Montgomery',
    customerEmail: 'claire.montgomery@outlook.com',
    customerPhone: '+1 (555) 321-4567',
    eventType: 'wedding',
    eventDate: '2026-12-05',
    guestCount: 120,
    venueName: 'St. Claire Vineyard Pavilion',
    venueAddress: '880 Estate Vineyard Road, Napa Hills',
    packageId: 'pkg_artisan',
    packageName: 'Premier Artisan Sovereign',
    items: [
      {
        id: 'qi_11',
        description: 'Premier Artisan Sovereign Package (120 guests @ $78/guest)',
        unitPrice: 78,
        quantity: 120,
        total: 9360,
        category: 'package',
      },
      {
        id: 'qi_12',
        description: 'Dedicated Master Sommelier Wine Flight Service',
        unitPrice: 520,
        quantity: 1,
        total: 520,
        category: 'addon',
      },
      {
        id: 'qi_13',
        description: 'Classical String Trio (2 Hours Live Prelude)',
        unitPrice: 1200,
        quantity: 1,
        total: 1200,
        category: 'addon',
      },
    ],
    subtotal: 11080,
    discountPercentage: 0,
    discountAmount: 0,
    serviceCharge: 1108,
    taxAmount: 1462.56,
    totalAmount: 13650.56,
    depositRequired: 4095.17,
    status: 'sent',
    notes: 'Awaiting venue acoustic clearance. Wine flights paired with vineyard reserve.',
    validUntil: '2026-11-05',
    createdAt: '2026-10-14',
    updatedAt: '2026-10-14',
    revision: 1,
  },
  {
    id: 'qt_1003',
    quoteNumber: 'CLM-2026-1003',
    customerId: 'usr_cust_3',
    customerName: 'Solaria Technology Foundation',
    customerEmail: 'events@solariagroup.io',
    eventType: 'gala',
    eventDate: '2026-11-28',
    guestCount: 150,
    venueName: 'Metropolitan Glasshouse Hall',
    venueAddress: '100 Museum Way, Downtown',
    packageId: 'pkg_imperial',
    packageName: 'Imperial Grand Gala Curation',
    items: [
      {
        id: 'qi_21',
        description: 'Imperial Grand Gala Curation (150 guests @ $115/guest)',
        unitPrice: 115,
        quantity: 150,
        total: 17250,
        category: 'package',
      },
      {
        id: 'qi_22',
        description: 'Artisan Mixology Bar & 2 Certified Bartenders',
        unitPrice: 950,
        quantity: 1,
        total: 950,
        category: 'addon',
      },
    ],
    subtotal: 18200,
    discountPercentage: 7.5,
    discountAmount: 1365,
    serviceCharge: 1683.5,
    taxAmount: 2222.22,
    totalAmount: 20740.72,
    depositRequired: 6222.22,
    status: 'draft',
    notes: 'Annual tech awards gala. Diplomatic protocol and staging required.',
    validUntil: '2026-11-15',
    createdAt: '2026-10-15',
    updatedAt: '2026-10-15',
    revision: 1,
  },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk_2001',
    bookingRef: 'CLM-EVT-2001',
    customerId: 'usr_cust',
    customerName: 'Victoria Sterling',
    customerEmail: 'victoria.sterling@horizoncapital.com',
    customerPhone: '+1 (555) 890-1234',
    eventTitle: 'Horizon Capital Executive Dinner',
    eventType: 'corporate',
    eventDate: '2026-11-14',
    eventStartTime: '18:00',
    eventEndTime: '22:30',
    venueName: 'The Conservatory at Grand Terrace',
    venueAddress: '450 Skyline Boulevard, Suite 12',
    guestCount: 85,
    packageId: 'pkg_classic',
    packageName: 'Classic Bistro Gala',
    selectedAddOns: ['add_mixology', 'add_lighting'],
    totalAmount: 7326.62,
    depositPaid: 2197.99,
    status: 'confirmed',
    turnaround: {
      warehouseDispatchMinutes: 75,
      transitToVenueMinutes: 45,
      onSiteSetupMinutes: 150,
      eventExecutionMinutes: 270,
      teardownMinutes: 75,
      returnTransitMinutes: 45,
      warewashSanitizeMinutes: 150, // PROTECTED BUFFER
    },
    assignedStaffIds: ['stf_1', 'stf_2', 'stf_4', 'stf_5'],
    allocatedEquipmentIds: ['eq_1', 'eq_2', 'eq_3', 'eq_4', 'eq_5', 'eq_6'],
    notes: 'Executive board attendance. Strict 18:30 seating.',
    createdAt: '2026-10-12',
  },
  {
    id: 'bk_2002',
    bookingRef: 'CLM-EVT-2002',
    customerId: 'usr_cust_4',
    customerName: 'Ambassador Henrik Lindqvist',
    customerEmail: 'henrik.lindqvist@embassynordic.org',
    customerPhone: '+1 (555) 901-2345',
    eventTitle: 'Nordic Diplomatic Gala Reception',
    eventType: 'gala',
    eventDate: '2026-10-24',
    eventStartTime: '19:00',
    eventEndTime: '23:30',
    venueName: 'Palais de Solitude Ballroom',
    venueAddress: '12 Embassy Row',
    guestCount: 110,
    packageId: 'pkg_imperial',
    packageName: 'Imperial Grand Gala Curation',
    selectedAddOns: ['add_mixology', 'add_sommelier', 'add_lighting', 'add_acoustic'],
    totalAmount: 16840.0,
    depositPaid: 5052.0,
    status: 'preparing',
    turnaround: {
      warehouseDispatchMinutes: 90,
      transitToVenueMinutes: 40,
      onSiteSetupMinutes: 180,
      eventExecutionMinutes: 270,
      teardownMinutes: 90,
      returnTransitMinutes: 40,
      warewashSanitizeMinutes: 180,
    },
    assignedStaffIds: ['stf_1', 'stf_2', 'stf_3', 'stf_4', 'stf_5', 'stf_6'],
    allocatedEquipmentIds: ['eq_1', 'eq_2', 'eq_3', 'eq_4', 'eq_5', 'eq_6'],
    notes: 'Security clearance required for all dispatch vans.',
    createdAt: '2026-09-20',
  },
  {
    id: 'bk_2003',
    bookingRef: 'CLM-EVT-2003',
    customerId: 'usr_cust_5',
    customerName: 'Dr. Alistair & Vivienne Finch',
    customerEmail: 'finch.family@gmail.com',
    customerPhone: '+1 (555) 765-4321',
    eventTitle: 'Golden Jubilee Anniversary Soirée',
    eventType: 'private',
    eventDate: '2026-10-18',
    eventStartTime: '17:00',
    eventEndTime: '21:00',
    venueName: 'Private Garden Estate',
    venueAddress: '722 Cypress Hill Lane',
    guestCount: 30,
    packageId: 'pkg_intimate',
    packageName: 'Private Chef Atelier Experience',
    selectedAddOns: ['add_sommelier'],
    totalAmount: 4980.0,
    depositPaid: 4980.0,
    status: 'ready',
    turnaround: {
      warehouseDispatchMinutes: 60,
      transitToVenueMinutes: 30,
      onSiteSetupMinutes: 120,
      eventExecutionMinutes: 240,
      teardownMinutes: 60,
      returnTransitMinutes: 30,
      warewashSanitizeMinutes: 120,
    },
    assignedStaffIds: ['stf_1', 'stf_3', 'stf_5'],
    allocatedEquipmentIds: ['eq_1', 'eq_3', 'eq_4'],
    notes: 'Intimate setting. Acoustic vinyl requested.',
    createdAt: '2026-09-15',
  },
  {
    id: 'bk_2004',
    bookingRef: 'CLM-EVT-2004',
    customerId: 'usr_cust_6',
    customerName: 'Marcus Belmont',
    customerEmail: 'm.belmont@belmontenterprises.com',
    customerPhone: '+1 (555) 123-9988',
    eventTitle: 'Autumn Venture Founders Luncheon',
    eventType: 'corporate',
    eventDate: '2026-10-05',
    eventStartTime: '11:30',
    eventEndTime: '15:00',
    venueName: 'Skyline Terrace Penthouse',
    venueAddress: '300 Financial Center',
    guestCount: 45,
    packageId: 'pkg_classic',
    packageName: 'Classic Bistro Gala',
    selectedAddOns: [],
    totalAmount: 2850.0,
    depositPaid: 2850.0,
    status: 'completed',
    turnaround: {
      warehouseDispatchMinutes: 60,
      transitToVenueMinutes: 30,
      onSiteSetupMinutes: 120,
      eventExecutionMinutes: 210,
      teardownMinutes: 60,
      returnTransitMinutes: 30,
      warewashSanitizeMinutes: 120,
    },
    assignedStaffIds: ['stf_2', 'stf_5'],
    allocatedEquipmentIds: ['eq_1', 'eq_4'],
    notes: 'Completed with 5-star customer feedback.',
    createdAt: '2026-09-02',
  },
];

const INITIAL_TASKS: EventTask[] = [
  {
    id: 'tsk_1',
    bookingId: 'bk_2002',
    title: 'Loading Dock barcode verification & crate strapping',
    category: 'warehouse',
    assignedToStaffId: 'stf_5',
    assignedToName: 'Darius Thorne',
    dueDate: '2026-10-24',
    dueTime: '14:30',
    completed: true,
    completedAt: '2026-10-24 14:15',
  },
  {
    id: 'tsk_2',
    bookingId: 'bk_2002',
    title: 'Sous-vide beef tenderloin batch prep & jus reduction',
    category: 'culinary',
    assignedToStaffId: 'stf_1',
    assignedToName: 'Chef Antoine Laurent',
    dueDate: '2026-10-24',
    dueTime: '15:00',
    completed: true,
    completedAt: '2026-10-24 14:50',
  },
  {
    id: 'tsk_3',
    bookingId: 'bk_2002',
    title: 'Crystal stemware inspection & cloth polishing at venue',
    category: 'setup',
    assignedToStaffId: 'stf_3',
    assignedToName: 'Mateo Rossi',
    dueDate: '2026-10-24',
    dueTime: '17:30',
    completed: false,
  },
  {
    id: 'tsk_4',
    bookingId: 'bk_2002',
    title: 'VIP protocol & diplomat table name cards alignment',
    category: 'hospitality',
    assignedToStaffId: 'stf_2',
    assignedToName: 'Sophia Chen',
    dueDate: '2026-10-24',
    dueTime: '18:15',
    completed: false,
  },
  {
    id: 'tsk_5',
    bookingId: 'bk_2002',
    title: 'Post-event warewash inspection & sanitization buffer run',
    category: 'teardown',
    assignedToStaffId: 'stf_5',
    assignedToName: 'Darius Thorne',
    dueDate: '2026-10-25',
    dueTime: '01:30',
    completed: false,
  },
  {
    id: 'tsk_6',
    bookingId: 'bk_2001',
    title: 'Pre-order 12 vegan course custom substitutions',
    category: 'culinary',
    assignedToStaffId: 'stf_1',
    assignedToName: 'Chef Antoine Laurent',
    dueDate: '2026-11-12',
    dueTime: '12:00',
    completed: false,
  },
];

const INITIAL_INCIDENTS: EventIncident[] = [
  {
    id: 'inc_101',
    bookingId: 'bk_2004',
    eventTitle: 'Autumn Venture Founders Luncheon',
    reportedBy: 'Darius Thorne',
    severity: 'low',
    title: 'Crate latch hinge bent during transport loading',
    description: 'Crate #12 latch loosened during elevator transit. All stemware remained intact without breakage.',
    status: 'resolved',
    resolutionNotes: 'Hinge replaced in workshop. Added silicone bumper to loading dolly.',
    createdAt: '2026-10-05 16:30',
    resolvedAt: '2026-10-06 09:00',
  },
  {
    id: 'inc_102',
    bookingId: 'bk_2002',
    eventTitle: 'Nordic Diplomatic Gala Reception',
    reportedBy: 'Sophia Chen',
    severity: 'medium',
    title: 'Venue service elevator scheduled maintenance overlap',
    description: 'Venue management notified us that freight lift B is undergoing emergency test between 15:30-16:00.',
    status: 'investigating',
    resolutionNotes: 'Shifted warehouse dispatch 30 mins earlier to clear freight elevator by 15:15.',
    createdAt: '2026-10-15 11:20',
  },
];

const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif_1',
    title: 'New Quotation Accepted',
    message: 'Victoria Sterling accepted Quotation CLM-2026-1001 ($7,326.62). Booking CLM-EVT-2001 confirmed.',
    category: 'quote',
    read: false,
    createdAt: '2026-10-12 14:02',
    actionUrl: 'bookings',
  },
  {
    id: 'notif_2',
    title: 'Low Stock Alert: Cold-Pressed Olive Oil',
    message: 'Single-Estate Olive Oil is down to 4 tins (Threshold: 8 tins). Supplier reorder recommended.',
    category: 'inventory',
    read: false,
    createdAt: '2026-10-14 08:30',
    actionUrl: 'inventory',
  },
  {
    id: 'notif_3',
    title: 'Turnaround Buffer Conflict Protected',
    message: 'Scheduling engine automatically blocked booking on Oct 24 due to protected warewash buffer for Nordic Gala.',
    category: 'booking',
    read: true,
    createdAt: '2026-10-13 16:45',
    actionUrl: 'calendar',
  },
  {
    id: 'notif_4',
    title: 'Staff Assignment Shift: Nordic Gala',
    message: 'Sophia Chen assigned as Lead Maitre d\' for Oct 24 Diplomatic Reception.',
    category: 'shift',
    read: false,
    createdAt: '2026-10-15 09:15',
    actionUrl: 'staff',
  },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Q4 Turnaround Buffer Compliance Standard',
    content: 'All warehouse crews must log warewash sanitization cycles immediately upon return. No equipment may be allocated for subsequent bookings until the 120-180 minute sanitization buffer completes.',
    priority: 'urgent',
    author: 'Elena Rostova (Administrator)',
    date: '2026-10-01',
  },
  {
    id: 'ann_2',
    title: 'Seasonal Winter Degustation Menu Tasting',
    content: 'Executive Chef Antoine Laurent will host the team kitchen tasting for the upcoming 2026/2027 Winter Holiday Curation next Tuesday at 3:00 PM.',
    priority: 'normal',
    author: 'Antoine Laurent (Executive Chef)',
    date: '2026-10-10',
  },
];

const INITIAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev_1',
    bookingId: 'bk_2004',
    customerName: 'Marcus Belmont',
    eventName: 'Autumn Venture Founders Luncheon',
    eventDate: '2026-10-05',
    rating: 5,
    comment: 'The precision of Clemora was extraordinary. Our executive partners remarked on the Chilean sea bass and the immaculate service. Zero delays, perfectly paced.',
    foodRating: 5,
    serviceRating: 5,
    coordinationRating: 5,
    createdAt: '2026-10-07',
    isPublished: true,
  },
  {
    id: 'rev_2',
    bookingId: 'bk_hist_99',
    customerName: 'Lady Genevieve Astor',
    eventName: 'Verona Garden Charity Ball',
    eventDate: '2026-09-18',
    rating: 5,
    comment: 'Clemora handled our 160-guest charity dinner with royal grace. The turnaround buffer logistics meant their team arrived, staged, and dissolved back without a trace of chaos.',
    foodRating: 5,
    serviceRating: 5,
    coordinationRating: 5,
    createdAt: '2026-09-22',
    isPublished: true,
  },
  {
    id: 'rev_3',
    bookingId: 'bk_hist_98',
    customerName: 'Kieran Sutherland',
    eventName: 'Apex Global Keynote Gala',
    eventDate: '2026-08-30',
    rating: 4.8,
    comment: 'Exceptional catering logistics. The mixology bar was a massive hit among international delegates. Marcus and Elena made planning seamless.',
    foodRating: 5,
    serviceRating: 4.8,
    coordinationRating: 5,
    createdAt: '2026-09-03',
    isPublished: true,
  },
];

const INITIAL_SHOWCASES: PastEventShowcase[] = [
  {
    id: 'sc_1',
    title: 'L\'Hiver Grand Solarium Wedding',
    category: 'wedding',
    date: 'September 2026',
    venue: 'Villa Florentine Glasshouse',
    guestCount: 140,
    description: 'A botanical fairytale wedding featuring a four-course degustation, gold Chiavari chairs, crystal candelabras, and tableside sommelier pairings under starlit glass.',
    menuHighlights: [
      'Passed oysters with champagne mignonette',
      'Wild forest mushroom & truffle agnolotti',
      'Sous-vide prime tenderloin with vintage port jus',
      'Gold-leaf dark chocolate sphere with hot valrhona pour',
    ],
    imageUrl: '/src/assets/images/luxury_banquet_hero_1792162588544.jpg',
    isPublished: true,
    clientConsentApproved: true,
  },
  {
    id: 'sc_2',
    title: 'Aethelgard Technology Global Gala',
    category: 'corporate',
    date: 'August 2026',
    venue: 'The Atrium at City Hall',
    guestCount: 220,
    description: 'Seamless corporate gala catering with synchronized multi-table plating for 220 senior executives, accompanied by artisanal mobile copper cocktail stations.',
    menuHighlights: [
      'Smoked duck tartlet with blackberry reduction',
      'Pan-seared Chilean sea bass over saffron risotto',
      'Bespoke craft cocktail flights',
      'Madagascar vanilla bean granita',
    ],
    imageUrl: '/src/assets/images/hero_event_catering_banquet_1792158710813.jpg',
    isPublished: true,
    clientConsentApproved: true,
  },
  {
    id: 'sc_3',
    title: 'Private Vineyard Harvest Dinner',
    category: 'private',
    date: 'July 2026',
    venue: 'St. Claire Vineyard Cellar Terrace',
    guestCount: 35,
    description: 'An intimate sunset gathering between aged oak barrels, with an open chef atelier and rare reserve library wine flights served in Riedel crystal.',
    menuHighlights: [
      'Heirloom burrata with preserved mission fig',
      'Herb-crusted rack of spring lamb',
      'Artisanal farmstead cheese honeycomb board',
      'Caramelized fig mille-feuille',
    ],
    imageUrl: '/src/assets/images/luxury_catering_venue_1792162393940.jpg',
    isPublished: true,
    clientConsentApproved: true,
  },
];

const INITIAL_KNOWLEDGE_BASE: KnowledgeBaseArticle[] = [
  {
    id: 'kb_1',
    category: 'turnaround_buffer',
    question: 'How does the Clemora Turnaround Buffer work?',
    answer: 'Unlike conventional booking systems that only reserve the 4-5 hours of active dining, Clemora automatically schedules and protects a 7-phase operational buffer: 1) Warehouse Loading (60-90m), 2) Vehicle Transit (30-60m), 3) On-Site Staging (120-180m), 4) Live Event (240-360m), 5) Teardown (60-90m), 6) Return Transit (30-60m), and 7) Protected Warewash & Sanitization (120-180m). This mathematically guarantees zero equipment collisions and zero staff double-booking.',
    tags: ['turnaround', 'buffer', 'scheduling', 'logistics', 'equipment'],
    lastUpdated: '2026-10-01',
  },
  {
    id: 'kb_2',
    category: 'packages',
    question: 'What packages are available and what are the guest minimums?',
    answer: 'Clemora offers 4 core master packages: 1) Classic Bistro Gala ($48/guest, min 40 guests), 2) Premier Artisan Sovereign ($78/guest, min 60 guests), 3) Imperial Grand Gala Curation ($115/guest, min 80 guests), and 4) Private Chef Atelier Experience ($135/guest, min 15 guests). Custom guest counts and package customizers are available in the portal.',
    tags: ['packages', 'pricing', 'guests', 'minimums'],
    lastUpdated: '2026-10-05',
  },
  {
    id: 'kb_3',
    category: 'menus',
    question: 'Can dietary requirements and allergies be accommodated?',
    answer: 'Yes. Every course in our master repertoire includes certified Vegetarian, Vegan, Gluten-Free, Halal, and Nut-Free alternatives prepared under strict HACCP culinary protocols. Custom substitutions are confirmed 7 business days prior to the event date.',
    tags: ['dietary', 'allergies', 'vegan', 'halal', 'gluten-free'],
    lastUpdated: '2026-10-08',
  },
  {
    id: 'kb_4',
    category: 'policies',
    question: 'What is the booking deposit and cancellation policy?',
    answer: 'A standard 30% deposit secures the event date and triggers equipment allocation. Full balance is due 14 business days before the event. Cancellations made 30+ days prior receive a full refund minus a 5% administrative fee; cancellations within 14-29 days receive a 50% deposit credit; cancellations under 14 days forfeit the deposit due to locked procurement.',
    tags: ['deposit', 'payment', 'cancellation', 'refund'],
    lastUpdated: '2026-10-10',
  },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud_1',
    timestamp: '2026-10-16 07:45:10',
    userEmail: 'admin@clemora.com',
    role: 'administrator',
    action: 'SYSTEM_BOOT',
    details: 'System initialized with Turnaround Buffer Engine v4.2 & RBAC policies loaded.',
    ipAddress: '192.168.1.10',
    status: 'success',
  },
  {
    id: 'aud_2',
    timestamp: '2026-10-15 14:22:04',
    userEmail: 'coordinator@clemora.com',
    role: 'coordinator',
    action: 'QUOTATION_GENERATE',
    details: 'Drafted Quotation CLM-2026-1003 for Solaria Technology ($20,740.72).',
    ipAddress: '192.168.1.45',
    status: 'success',
  },
  {
    id: 'aud_3',
    timestamp: '2026-10-14 18:11:32',
    userEmail: 'victoria.sterling@horizoncapital.com',
    role: 'customer',
    action: 'BOOKING_ACCEPT_QUOTE',
    details: 'Quotation CLM-2026-1001 accepted; Booking CLM-EVT-2001 created.',
    ipAddress: '72.14.201.88',
    status: 'success',
  },
  {
    id: 'aud_4',
    timestamp: '2026-10-14 08:30:15',
    userEmail: 'system',
    role: 'system',
    action: 'INVENTORY_THRESHOLD_ALERT',
    details: 'Consumable item con_2 fell below minimum threshold (Current: 4, Min: 8).',
    ipAddress: '127.0.0.1',
    status: 'warning',
  },
];

const INITIAL_SETTINGS: SystemSettings = {
  companyName: 'Clemora Event Planning & Catering Platform',
  contactEmail: 'concierge@clemora.com',
  contactPhone: '+1 (800) 555-CLEM',
  defaultTaxRate: 12.0,
  defaultServiceCharge: 10.0,
  requiredDepositPercent: 30.0,
  autoDetectConflicts: true,
  bufferMultiplier: 1.0,
  allowOvertimeBuffer: true,
};

// LocalStorage Persistence Key
const STORE_KEY = 'clemora_platform_store_v2';

interface StoreState {
  currentUser: User;
  users: User[];
  packages: EventPackage[];
  addons: AddOn[];
  menuItems: MenuItem[];
  staff: StaffMember[];
  equipment: EquipmentItem[];
  consumables: ConsumableItem[];
  quotations: Quotation[];
  bookings: Booking[];
  tasks: EventTask[];
  incidents: EventIncident[];
  notifications: SystemNotification[];
  announcements: Announcement[];
  reviews: CustomerReview[];
  showcases: PastEventShowcase[];
  knowledgeBase: KnowledgeBaseArticle[];
  handovers: HandoverRecord[];
  auditLogs: AuditLog[];
  settings: SystemSettings;
}

// In-Memory state initialization
function loadInitialState(): StoreState {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.packages && parsed.bookings) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read from localStorage, using initial mock dataset', err);
  }

  return {
    currentUser: INITIAL_USERS[0], // Elena Rostova (Admin) default, easily switched in UI
    users: INITIAL_USERS,
    packages: INITIAL_PACKAGES,
    addons: INITIAL_ADDONS,
    menuItems: INITIAL_MENU_ITEMS,
    staff: INITIAL_STAFF,
    equipment: INITIAL_EQUIPMENT,
    consumables: INITIAL_CONSUMABLES,
    quotations: INITIAL_QUOTATIONS,
    bookings: INITIAL_BOOKINGS,
    tasks: INITIAL_TASKS,
    incidents: INITIAL_INCIDENTS,
    notifications: INITIAL_NOTIFICATIONS,
    announcements: INITIAL_ANNOUNCEMENTS,
    reviews: INITIAL_REVIEWS,
    showcases: INITIAL_SHOWCASES,
    knowledgeBase: INITIAL_KNOWLEDGE_BASE,
    handovers: [],
    auditLogs: INITIAL_AUDIT_LOGS,
    settings: INITIAL_SETTINGS,
  };
}

let storeState: StoreState = loadInitialState();
const listeners = new Set<(state: StoreState) => void>();

function persistState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(storeState));
  } catch (err) {
    console.warn('Failed to save to localStorage', err);
  }
  listeners.forEach((listener) => listener({ ...storeState }));
}

// Store API
export const ClemoraStore = {
  getState: (): StoreState => ({ ...storeState }),

  subscribe: (listener: (state: StoreState) => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // Authentication & Role Management
  login: (email: string, password?: string): { success: boolean; user?: User; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = storeState.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (!existing) {
      // If demo mode, check if email matches any pre-seeded account or allow guest registration
      return { success: false, error: 'No account found with this email. Please check your credentials or register.' };
    }
    // Set user as active
    storeState.currentUser = existing;
    ClemoraStore.logAudit('USER_LOGIN', `User ${existing.name} (${existing.role}) logged in successfully`, 'success');
    ClemoraStore.addNotification(
      'Signed In Successfully',
      `Welcome back, ${existing.name}! Logged in as ${existing.role.toUpperCase()}.`,
      'announcement'
    );
    persistState();
    return { success: true, user: existing };
  },

  register: (data: {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    phone?: string;
    company?: string;
  }): { success: boolean; user?: User; error?: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    const existing = storeState.users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      role: data.role,
      phone: data.phone || '',
      company: data.company || '',
      password: data.password || '',
      createdAt: new Date().toISOString().split('T')[0],
    };

    storeState.users = [...storeState.users, newUser];
    storeState.currentUser = newUser;
    ClemoraStore.logAudit('USER_REGISTER', `New user registered: ${newUser.name} (${newUser.role})`, 'success');
    ClemoraStore.addNotification(
      'Account Created',
      `Welcome to Clemora, ${newUser.name}! Your account has been registered with ${newUser.role.toUpperCase()} privileges.`,
      'announcement'
    );
    persistState();
    return { success: true, user: newUser };
  },

  logout: () => {
    const prev = storeState.currentUser;
    // Fall back to public visitor or guest customer
    const defaultCust = storeState.users.find((u) => u.role === 'customer') || storeState.users[0];
    storeState.currentUser = defaultCust;
    ClemoraStore.logAudit('USER_LOGOUT', `User ${prev?.name} logged out`);
    ClemoraStore.addNotification('Signed Out', 'You have been signed out of your account.', 'announcement');
    persistState();
  },

  updateProfile: (userId: string, data: Partial<User>) => {
    storeState.users = storeState.users.map((u) => (u.id === userId ? { ...u, ...data } : u));
    if (storeState.currentUser?.id === userId) {
      storeState.currentUser = { ...storeState.currentUser, ...data };
    }
    ClemoraStore.logAudit('PROFILE_UPDATE', `Updated user profile for ${userId}`);
    persistState();
  },

  setCurrentUser: (userId: string) => {
    const user = storeState.users.find((u) => u.id === userId);
    if (user) {
      storeState.currentUser = user;
      ClemoraStore.logAudit('USER_ROLE_SWITCH', `Switched active role to ${user.role} (${user.name})`, 'success');
      persistState();
    }
  },

  setCurrentRole: (role: UserRole) => {
    const user = storeState.users.find((u) => u.role === role);
    if (user) {
      storeState.currentUser = user;
      ClemoraStore.logAudit('USER_ROLE_SWITCH', `Switched active role to ${role}`, 'success');
      persistState();
    }
  },

  // Audit Logging
  logAudit: (action: string, details: string, status: 'success' | 'warning' | 'failed' = 'success') => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const newLog: AuditLog = {
      id: `aud_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp,
      userEmail: storeState.currentUser?.email || 'system',
      role: storeState.currentUser?.role || 'system',
      action,
      details,
      ipAddress: '192.168.1.1',
      status,
    };
    storeState.auditLogs = [newLog, ...storeState.auditLogs.slice(0, 99)];
  },

  // Notifications
  addNotification: (title: string, message: string, category: SystemNotification['category'], actionUrl?: string) => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 16);
    const notif: SystemNotification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      category,
      read: false,
      createdAt: timestamp,
      actionUrl,
    };
    storeState.notifications = [notif, ...storeState.notifications];
    persistState();
  },

  markNotificationRead: (id: string) => {
    storeState.notifications = storeState.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    persistState();
  },

  markAllNotificationsRead: () => {
    storeState.notifications = storeState.notifications.map((n) => ({ ...n, read: true }));
    persistState();
  },

  // Quotation Management
  createQuotation: (quoteData: Partial<Quotation>): Quotation => {
    const count = storeState.quotations.length + 1001;
    const now = new Date();
    const createdAt = now.toISOString().split('T')[0];
    const validUntilDate = new Date();
    validUntilDate.setDate(now.getDate() + 14);
    const validUntil = validUntilDate.toISOString().split('T')[0];

    const subtotal = quoteData.items?.reduce((acc, it) => acc + it.total, 0) || 0;
    const discountPercent = quoteData.discountPercentage || 0;
    const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2));
    const taxableSubtotal = subtotal - discountAmount;
    const serviceCharge = Number(((taxableSubtotal * (storeState.settings.defaultServiceCharge / 100))).toFixed(2));
    const taxAmount = Number((((taxableSubtotal + serviceCharge) * (storeState.settings.defaultTaxRate / 100))).toFixed(2));
    const totalAmount = Number((taxableSubtotal + serviceCharge + taxAmount).toFixed(2));
    const depositRequired = Number(((totalAmount * (storeState.settings.requiredDepositPercent / 100))).toFixed(2));

    const newQuote: Quotation = {
      id: `qt_${Date.now()}`,
      quoteNumber: `CLM-${now.getFullYear()}-${count}`,
      customerId: quoteData.customerId || storeState.currentUser.id,
      customerName: quoteData.customerName || storeState.currentUser.name,
      customerEmail: quoteData.customerEmail || storeState.currentUser.email,
      customerPhone: quoteData.customerPhone || '',
      eventType: quoteData.eventType || 'corporate',
      eventDate: quoteData.eventDate || createdAt,
      guestCount: quoteData.guestCount || 50,
      venueName: quoteData.venueName || 'To Be Determined',
      venueAddress: quoteData.venueAddress || '',
      packageId: quoteData.packageId || storeState.packages[0].id,
      packageName: quoteData.packageName || storeState.packages[0].name,
      items: quoteData.items || [],
      subtotal,
      discountPercentage: discountPercent,
      discountAmount,
      serviceCharge,
      taxAmount,
      totalAmount,
      depositRequired,
      status: quoteData.status || 'draft',
      notes: quoteData.notes || '',
      validUntil: quoteData.validUntil || validUntil,
      createdAt,
      updatedAt: createdAt,
      revision: 1,
    };

    storeState.quotations = [newQuote, ...storeState.quotations];
    ClemoraStore.logAudit('QUOTATION_CREATE', `Created quotation ${newQuote.quoteNumber} ($${totalAmount})`);
    ClemoraStore.addNotification(
      'New Quotation Formulated',
      `Quotation ${newQuote.quoteNumber} for ${newQuote.customerName} has been formulated.`,
      'quote',
      'quotations'
    );
    persistState();
    return newQuote;
  },

  updateQuotationStatus: (id: string, status: Quotation['status']) => {
    storeState.quotations = storeState.quotations.map((q) => {
      if (q.id === id) {
        return {
          ...q,
          status,
          updatedAt: new Date().toISOString().split('T')[0],
          revision: q.revision + 1,
        };
      }
      return q;
    });
    ClemoraStore.logAudit('QUOTATION_STATUS_UPDATE', `Quotation ${id} marked as ${status}`);
    persistState();
  },

  // Turnaround Buffer Calculation & Collision Detection
  calculateTurnaround: (guestCount: number, prepHours: number): TurnaroundTimeline => {
    // Dynamic buffer math based on guest scale
    const scaleFactor = guestCount > 100 ? 1.2 : guestCount > 60 ? 1.0 : 0.8;
    return {
      warehouseDispatchMinutes: Math.round(75 * scaleFactor),
      transitToVenueMinutes: 45,
      onSiteSetupMinutes: Math.round(prepHours * 60),
      eventExecutionMinutes: 270,
      teardownMinutes: Math.round(75 * scaleFactor),
      returnTransitMinutes: 45,
      warewashSanitizeMinutes: Math.round(150 * scaleFactor), // Protected Sanitization Buffer
    };
  },

  checkSchedulingConflicts: (
    eventDate: string,
    startTime: string,
    endTime: string,
    excludeBookingId?: string
  ): { hasConflict: boolean; conflictingBookings: Booking[]; reason?: string } => {
    const dateBookings = storeState.bookings.filter(
      (b) => b.eventDate === eventDate && b.status !== 'cancelled' && b.id !== excludeBookingId
    );

    if (dateBookings.length === 0) {
      return { hasConflict: false, conflictingBookings: [] };
    }

    // Convert start and end times to minutes from midnight
    const toMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + (m || 0);
    };

    const requestedStart = toMinutes(startTime);
    const requestedEnd = toMinutes(endTime);

    const conflictingBookings: Booking[] = [];

    for (const b of dateBookings) {
      const bStart = toMinutes(b.eventStartTime);
      const bEnd = toMinutes(b.eventEndTime);

      // Include Turnaround Buffer Windows
      // Total protected window = (bStart - onSiteSetup - transit) to (bEnd + teardown + return + warewash)
      const bProtectedStart = bStart - (b.turnaround.onSiteSetupMinutes + b.turnaround.transitToVenueMinutes);
      const bProtectedEnd = bEnd + (b.turnaround.teardownMinutes + b.turnaround.returnTransitMinutes + b.turnaround.warewashSanitizeMinutes);

      // If active overlaps with protected turnaround window
      if (requestedStart < bProtectedEnd && requestedEnd > bProtectedStart) {
        conflictingBookings.push(b);
      }
    }

    if (conflictingBookings.length > 0) {
      return {
        hasConflict: true,
        conflictingBookings,
        reason: `Turnaround Buffer Overlap: Existing event "${conflictingBookings[0].eventTitle}" protects warehouse sanitization until ${Math.floor(requestedStart / 60)}:00.`,
      };
    }

    return { hasConflict: false, conflictingBookings: [] };
  },

  // Booking Management
  createBooking: (bookingData: Partial<Booking>): Booking => {
    const pkg = storeState.packages.find((p) => p.id === bookingData.packageId) || storeState.packages[0];
    const guestCount = bookingData.guestCount || 50;
    const turnaround = ClemoraStore.calculateTurnaround(guestCount, pkg.prepDurationHours);

    const newBooking: Booking = {
      id: `bk_${Date.now()}`,
      bookingRef: `CLM-EVT-${storeState.bookings.length + 2001}`,
      customerId: bookingData.customerId || storeState.currentUser.id,
      customerName: bookingData.customerName || storeState.currentUser.name,
      customerEmail: bookingData.customerEmail || storeState.currentUser.email,
      customerPhone: bookingData.customerPhone || '+1 (555) 000-0000',
      eventTitle: bookingData.eventTitle || `${pkg.name} for ${bookingData.customerName || 'Client'}`,
      eventType: bookingData.eventType || pkg.category,
      eventDate: bookingData.eventDate || new Date().toISOString().split('T')[0],
      eventStartTime: bookingData.eventStartTime || '18:00',
      eventEndTime: bookingData.eventEndTime || '22:30',
      venueName: bookingData.venueName || 'TBD Venue',
      venueAddress: bookingData.venueAddress || '',
      guestCount,
      packageId: pkg.id,
      packageName: pkg.name,
      selectedAddOns: bookingData.selectedAddOns || [],
      totalAmount: bookingData.totalAmount || pkg.pricePerGuest * guestCount,
      depositPaid: bookingData.depositPaid || (pkg.pricePerGuest * guestCount) * 0.3,
      status: bookingData.status || 'confirmed',
      turnaround,
      assignedStaffIds: bookingData.assignedStaffIds || ['stf_1', 'stf_2', 'stf_5'],
      allocatedEquipmentIds: bookingData.allocatedEquipmentIds || ['eq_1', 'eq_2', 'eq_3', 'eq_4'],
      notes: bookingData.notes || '',
      createdAt: new Date().toISOString().split('T')[0],
    };

    storeState.bookings = [newBooking, ...storeState.bookings];

    // Automatically generate preparation tasks for this booking
    const defaultTasks: EventTask[] = [
      {
        id: `tsk_${Date.now()}_1`,
        bookingId: newBooking.id,
        title: 'Warehouse loading dock packing & barcoding',
        category: 'warehouse',
        assignedToStaffId: 'stf_5',
        assignedToName: 'Darius Thorne',
        dueDate: newBooking.eventDate,
        dueTime: '13:00',
        completed: false,
      },
      {
        id: `tsk_${Date.now()}_2`,
        bookingId: newBooking.id,
        title: 'Mise-en-place & dietary course staging',
        category: 'culinary',
        assignedToStaffId: 'stf_1',
        assignedToName: 'Chef Antoine Laurent',
        dueDate: newBooking.eventDate,
        dueTime: '14:30',
        completed: false,
      },
      {
        id: `tsk_${Date.now()}_3`,
        bookingId: newBooking.id,
        title: 'Venue table staging & crystal stemware polish',
        category: 'setup',
        assignedToStaffId: 'stf_2',
        assignedToName: 'Sophia Chen',
        dueDate: newBooking.eventDate,
        dueTime: '16:30',
        completed: false,
      },
      {
        id: `tsk_${Date.now()}_4`,
        bookingId: newBooking.id,
        title: 'Protected Warewash & Sanitization Cycle',
        category: 'teardown',
        assignedToStaffId: 'stf_5',
        assignedToName: 'Darius Thorne',
        dueDate: newBooking.eventDate,
        dueTime: '23:45',
        completed: false,
      },
    ];

    storeState.tasks = [...defaultTasks, ...storeState.tasks];

    ClemoraStore.logAudit('BOOKING_CREATE', `Created booking ${newBooking.bookingRef} on ${newBooking.eventDate}`);
    ClemoraStore.addNotification(
      'New Event Booked & Scheduled',
      `Booking ${newBooking.bookingRef} (${newBooking.eventTitle}) has been locked with Turnaround Buffer.`,
      'booking',
      'bookings'
    );
    persistState();
    return newBooking;
  },

  updateBookingStatus: (id: string, status: Booking['status'], cancellationReason?: string) => {
    storeState.bookings = storeState.bookings.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          status,
          ...(cancellationReason ? { cancellationReason } : {}),
        };
      }
      return b;
    });
    ClemoraStore.logAudit('BOOKING_STATUS_UPDATE', `Booking ${id} status updated to ${status}`);
    persistState();
  },

  // Package Admin (CRUD)
  savePackage: (pkg: EventPackage) => {
    const exists = storeState.packages.some((p) => p.id === pkg.id);
    if (exists) {
      storeState.packages = storeState.packages.map((p) => (p.id === pkg.id ? pkg : p));
      ClemoraStore.logAudit('PACKAGE_UPDATE', `Updated package ${pkg.name}`);
    } else {
      storeState.packages = [pkg, ...storeState.packages];
      ClemoraStore.logAudit('PACKAGE_CREATE', `Created package ${pkg.name}`);
    }
    persistState();
  },

  deletePackage: (id: string) => {
    storeState.packages = storeState.packages.filter((p) => p.id !== id);
    ClemoraStore.logAudit('PACKAGE_DELETE', `Deleted package ${id}`);
    persistState();
  },

  // Staff Assignment
  updateStaffAssignments: (bookingId: string, staffIds: string[]) => {
    storeState.bookings = storeState.bookings.map((b) =>
      b.id === bookingId ? { ...b, assignedStaffIds: staffIds } : b
    );
    ClemoraStore.logAudit('STAFF_ASSIGNMENT', `Updated staff assignments for booking ${bookingId}`);
    persistState();
  },

  // Inventory Management
  updateEquipmentStock: (id: string, totalQuantity: number, inRepairQuantity: number) => {
    storeState.equipment = storeState.equipment.map((eq) =>
      eq.id === id ? { ...eq, totalQuantity, inRepairQuantity } : eq
    );
    ClemoraStore.logAudit('INVENTORY_UPDATE', `Updated stock for equipment item ${id}`);
    persistState();
  },

  updateConsumableStock: (id: string, currentStock: number) => {
    storeState.consumables = storeState.consumables.map((c) => {
      if (c.id === id) {
        if (currentStock <= c.minimumThreshold) {
          ClemoraStore.addNotification(
            'Low Stock Alert',
            `${c.name} is down to ${currentStock} ${c.unit} (Threshold: ${c.minimumThreshold}).`,
            'inventory',
            'inventory'
          );
        }
        return { ...c, currentStock };
      }
      return c;
    });
    persistState();
  },

  // Task Completion
  toggleTaskCompleted: (taskId: string) => {
    storeState.tasks = storeState.tasks.map((t) => {
      if (t.id === taskId) {
        const completed = !t.completed;
        return {
          ...t,
          completed,
          completedAt: completed ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined,
        };
      }
      return t;
    });
    persistState();
  },

  // Incident Management
  createIncident: (incident: Omit<EventIncident, 'id' | 'createdAt'>): EventIncident => {
    const newInc: EventIncident = {
      ...incident,
      id: `inc_${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    storeState.incidents = [newInc, ...storeState.incidents];
    ClemoraStore.addNotification(
      `Incident Reported: ${newInc.title}`,
      `Severity: ${newInc.severity.toUpperCase()} in event ${newInc.eventTitle}.`,
      'incident',
      'operations'
    );
    ClemoraStore.logAudit('INCIDENT_REPORT', `Reported incident ${newInc.title} (${newInc.severity})`, 'warning');
    persistState();
    return newInc;
  },

  resolveIncident: (id: string, resolutionNotes: string) => {
    storeState.incidents = storeState.incidents.map((inc) =>
      inc.id === id
        ? {
            ...inc,
            status: 'resolved',
            resolutionNotes,
            resolvedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          }
        : inc
    );
    ClemoraStore.logAudit('INCIDENT_RESOLVE', `Resolved incident ${id}`);
    persistState();
  },

  // Customer Reviews
  addReview: (review: Omit<CustomerReview, 'id' | 'createdAt'>) => {
    const newRev: CustomerReview = {
      ...review,
      id: `rev_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    storeState.reviews = [newRev, ...storeState.reviews];
    ClemoraStore.logAudit('REVIEW_CREATE', `Customer review left for booking ${newRev.bookingId}`);
    persistState();
  },

  // Knowledge Base Admin
  saveKnowledgeArticle: (article: KnowledgeBaseArticle) => {
    const exists = storeState.knowledgeBase.some((k) => k.id === article.id);
    if (exists) {
      storeState.knowledgeBase = storeState.knowledgeBase.map((k) => (k.id === article.id ? article : k));
    } else {
      storeState.knowledgeBase = [article, ...storeState.knowledgeBase];
    }
    ClemoraStore.logAudit('KB_UPDATE', `Updated KB article: ${article.question}`);
    persistState();
  },

  deleteKnowledgeArticle: (id: string) => {
    storeState.knowledgeBase = storeState.knowledgeBase.filter((k) => k.id !== id);
    persistState();
  },

  // AI to Manager Handover
  createHandover: (handoverData: Omit<HandoverRecord, 'id' | 'requestedAt' | 'status'>) => {
    const newH: HandoverRecord = {
      ...handoverData,
      id: `hnd_${Date.now()}`,
      status: 'pending',
      requestedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    storeState.handovers = [newH, ...storeState.handovers];
    ClemoraStore.addNotification(
      'AI Chatbot Handover Escalation',
      `Customer ${newH.customerName} requested coordinator consultation. Reason: ${newH.summary}`,
      'announcement',
      'chat'
    );
    ClemoraStore.logAudit('CHAT_HANDOVER', `AI handover initiated for ${newH.customerName}`);
    persistState();
    return newH;
  },

  // System Settings
  updateSettings: (newSettings: Partial<SystemSettings>) => {
    storeState.settings = { ...storeState.settings, ...newSettings };
    ClemoraStore.logAudit('SETTINGS_UPDATE', 'Updated global system business rules');
    persistState();
  },

  // Reset to demo defaults
  resetToDemoData: () => {
    localStorage.removeItem(STORE_KEY);
    storeState = loadInitialState();
    persistState();
  },
};

// React Hook for component state reactivity
export function useClemoraStore() {
  const [state, setState] = useState<StoreState>(ClemoraStore.getState());

  useEffect(() => {
    const unsubscribe = ClemoraStore.subscribe((newState) => {
      setState(newState);
    });
    return unsubscribe;
  }, []);

  return state;
}
