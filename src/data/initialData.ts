import { Product, Category, LandscapingService, WebsiteSettings } from '../types';

export const INITIAL_SETTINGS: WebsiteSettings = {
  companyName: "PlantO Nursery Gardens",
  whatsAppNumber: "919876543210",
  logoUrl: "",
  heroTitle: "PlantO",
  sloganEnglish: "Vruksho Rakshati Rakshitah",
  sloganHindi: "वृक्षो रक्षति रक्षितः",
  sloganTelugu: "వృక్షో రక్షతి రక్షితః",
  heroTagline: "Bringing Nature Closer to Every Home.",
  aboutUsMission: "PlantO believes that every home deserves the beauty of nature. We provide healthy plants, premium gardening accessories, landscaping solutions, and expert guidance to help people create greener and healthier spaces.",
  contactPhone: "+91 98765 43210",
  contactEmail: "care@planto.in",
  contactAddress: "Plant'O Nursery, Rajahmundry, Andhra Pradesh 533126",
  workingHours: "Monday - Sunday: 8:00 AM - 8:00 PM",
  instagramUrl: "https://instagram.com/plantonursery",
  facebookUrl: "https://facebook.com/plantonursery",
};

export const INITIAL_CATEGORIES: Category[] = [
  // Plants
  { id: 'cat-indoor', name: 'Indoor Plants', group: 'Plants', description: 'Air-purifying & shade loving green companions for home and office', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-flower', name: 'Flower Plants', group: 'Plants', description: 'Vibrant blooming perennial & seasonal flowers', image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-fruit', name: 'Fruit Plants', group: 'Plants', description: 'Grafted hybrid fruit trees for home gardens and orchards', image: 'https://images.unsplash.com/photo-1557800636-894a6b716c2f?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-creeper', name: 'Creeper Plants', group: 'Plants', description: 'Trailing vines and climbing plants for fences, walls & balconies', image: 'https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-bonsai', name: 'Bonsai Plants', group: 'Plants', description: 'Miniature artfully trained trees with timeless elegance', image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-gift', name: 'Gift Plants', group: 'Plants', description: 'Good luck & decorative living gifts for festive occasions', image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-cactus', name: 'Cactus Plants', group: 'Plants', description: 'Low maintenance drought-tolerant succulents & desert cacti', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80' },
  
  // Other Categories
  { id: 'cat-accessories', name: 'Accessories', group: 'Other', description: 'Gardening tools, sprayers, gloves, pruners & stands', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-pots', name: 'Pots', group: 'Other', description: 'Ceramic, terracotta, plastic & hanging plantholder containers', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-pebbles', name: 'Pebbles', group: 'Other', description: 'Decorative white, marble, river & polished garden stones', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-landscaping', name: 'Landscaping & Gardening', group: 'Other', description: 'Professional turf, garden design & installation solutions', image: 'https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-seeds', name: 'Seeds', group: 'Other', description: 'High germination vegetable, flower & herb seed packets', image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80' },
  { id: 'cat-soil', name: 'Soil & Manure', group: 'Other', description: 'Organic vermicompost, coco peat & nutrient rich soil mixes', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80' },
];

export const INITIAL_PRODUCTS: Product[] = [
  // Indoor Plants
  {
    id: 'p-1',
    name: 'Monstera Deliciosa (Swiss Cheese Plant)',
    category: 'Indoor Plants',
    price: 699,
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Iconic tropical indoor plant with glossy split leaves. Excellent air purifier for living rooms.',
    description: 'Monstera Deliciosa is widely known for its iconic natural leaf holes. It thrives in indirect light and brings an instant tropical luxury aesthetic to any living space or office environment.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Air purification, interior aesthetics, office desk accent, stress relief',
    growingConditions: 'Warm indoors, high humidity preference, avoids cold drafts',
    sunlight: 'Bright Indirect Light',
    watering: 'Water when top 2 inches of soil feel dry (once every 5-7 days)',
    soilType: 'Well-draining porous potting mix with coco peat and perlite',
    fertilizer: 'Apply balanced liquid organic fertilizer once a month during spring and summer',
    growthTips: 'Wipe dust off large leaves with a damp cloth to encourage efficient photosynthesis',
    maintenanceLevel: 'Low',
    suitableClimate: 'Tropical & Subtropical Indoors',
    plantSize: 'Medium (1-2 ft)',
    featured: true,
    rating: 4.9,
    reviewsCount: 128
  },
  {
    id: 'p-2',
    name: 'Snake Plant (Sansevieria Trifasciata)',
    category: 'Indoor Plants',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Indestructible oxygenating plant that filters toxins overnight. Ideal for bedrooms.',
    description: 'The Sansevieria or Snake Plant is famous for its hardiness. It releases oxygen at night, removing harmful indoor pollutants like benzene and formaldehyde.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Bedroom air purification, low light corners, low maintenance indoor décor',
    growingConditions: 'Adapts to almost all light conditions and indoor temperatures',
    sunlight: 'Low Light',
    watering: 'Water sparingly every 12-15 days. Allow soil to dry completely',
    soilType: 'Cactus & succulent sand-rich soil mix',
    fertilizer: 'Slow-release compost twice a year',
    growthTips: 'Do not overwater; roots thrive when slightly pot-bound',
    maintenanceLevel: 'Low',
    suitableClimate: 'All Indian Climate Conditions',
    plantSize: 'Medium (1-2 ft)',
    featured: true,
    rating: 4.8,
    reviewsCount: 210
  },
  {
    id: 'p-3',
    name: 'Golden Pothos (Money Plant)',
    category: 'Indoor Plants',
    price: 249,
    images: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Classic trailing vine with variegated golden-green leaves. Symbol of prosperity.',
    description: 'Golden Pothos is one of the most popular house plants in Indian homes. Fast growing and resilient, it grows smoothly in pots, hanging baskets, or water vases.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Hanging baskets, moss pole climbing, positive Vastu energy',
    growingConditions: 'Thrives both in water containers and potting soil',
    sunlight: 'Bright Indirect Light',
    watering: 'Twice a week in summer, once a week in winter',
    soilType: 'Rich potting mix with organic compost',
    fertilizer: 'Liquid seaweed fertilizer every 3 weeks',
    growthTips: 'Prune vine tips regularly to make the plant bushier',
    maintenanceLevel: 'Low',
    suitableClimate: 'Tropical',
    plantSize: 'Medium (1-2 ft)',
    featured: false,
    rating: 4.9,
    reviewsCount: 340
  },

  // Flower Plants
  {
    id: 'p-4',
    name: 'Royal Jasmine (Mogra / Jasminum Sambac)',
    category: 'Flower Plants',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Fragrant white double blooms with divine aroma. Cherished for terrace & garden.',
    description: 'Mogra is celebrated for its intoxicating sweet scent. Its pure white multi-layered petals bloom profusely from late spring through summer.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Fragrant flower garlands, balcony gardens, natural aroma therapy',
    growingConditions: 'Loves warm sunny weather with ample ventilation',
    sunlight: 'Direct Sunlight',
    watering: 'Daily watering during hot summer; keep soil moist but not waterlogged',
    soilType: 'Loamy soil rich in organic manure',
    fertilizer: 'Mustard cake powder fertilizer or vermicompost every 15 days during blooming',
    growthTips: 'Prune heavily in late winter to boost spring flowering shoots',
    maintenanceLevel: 'Medium',
    suitableClimate: 'Warm Tropical Climate',
    plantSize: 'Medium (1-2 ft)',
    featured: true,
    rating: 4.9,
    reviewsCount: 185
  },
  {
    id: 'p-5',
    name: 'Hybrid Crimson Rose Plant',
    category: 'Flower Plants',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Deep velvet red roses with long-lasting petals and sweet fragrance.',
    description: 'A premium grafted rose variety engineered for continuous blooming throughout the year in home gardens.',
    careDifficulty: 'Moderate',
    availability: 'In Stock',
    uses: 'Cut flower arrangements, garden borders, terrace decoration',
    growingConditions: 'Requires 5-6 hours of direct sunlight daily',
    sunlight: 'Direct Sunlight',
    watering: 'Water early morning directly at the base without soaking leaves',
    soilType: 'Clay loam mixed with organic cow dung manure',
    fertilizer: 'Rose special fertilizer mix every 2 weeks',
    growthTips: 'Remove spent faded roses (deadheading) to encourage new flower buds',
    maintenanceLevel: 'Medium',
    suitableClimate: 'Subtropical / Temperate',
    plantSize: 'Medium (1-2 ft)',
    rating: 4.7,
    reviewsCount: 92
  },

  // Fruit Plants
  {
    id: 'p-6',
    name: 'All-Season Hybrid Mango (Baramasi Mango)',
    category: 'Fruit Plants',
    price: 899,
    images: [
      'https://images.unsplash.com/photo-1557800636-894a6b716c2f?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Grafted miniature mango plant that yields sweet aromatic mangoes multiple times a year.',
    description: 'Specially grafted dwarf mango tree suitable for large container growing on terraces as well as ground planting.',
    careDifficulty: 'Moderate',
    availability: 'In Stock',
    uses: 'Home orchard, fresh organic fruit harvest, terrace gardening',
    growingConditions: 'Full sun exposures with deep pot container (18-24 inch)',
    sunlight: 'Direct Sunlight',
    watering: 'Deep watering when surface dries; reduce during flowering stage',
    soilType: 'Rich sandy loam with 30% organic compost',
    fertilizer: 'Bone meal and organic cow manure before flowering season',
    growthTips: 'Pinch early flowers in the first year to allow root establishment',
    maintenanceLevel: 'Medium',
    suitableClimate: 'Tropical Indian Plains',
    plantSize: 'Large (3-5 ft)',
    featured: true,
    rating: 4.9,
    reviewsCount: 78
  },
  {
    id: 'p-7',
    name: 'Dwarf Seedless Lemon (Kagzi Lemon)',
    category: 'Fruit Plants',
    price: 449,
    images: [
      'https://images.unsplash.com/photo-1534531141161-e4ecc2724211?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Juicy thin-skinned lemons with abundant fruiting all year round.',
    description: 'Compact lemon tree ideal for terrace planters. Produces fragrant white blooms and vitamin C rich lemons.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Culinary cooking, home organic harvests, aromatic citrus leaves',
    growingConditions: 'Loves bright sunny balconies and terrace garden spaces',
    sunlight: 'Direct Sunlight',
    watering: 'Regular watering; avoid soggy soil',
    soilType: 'Well-draining acidic soil mix',
    fertilizer: 'Epsom salt and citrus fruit fertilizer once a month',
    growthTips: 'Prune crossing branches to ensure sunlight penetrates inner canopy',
    maintenanceLevel: 'Medium',
    suitableClimate: 'Warm Sunny Regions',
    plantSize: 'Medium (1-2 ft)',
    rating: 4.8,
    reviewsCount: 114
  },

  // Bonsai Plants
  {
    id: 'p-8',
    name: 'Ficus Microcarpa Ginseng Bonsai (8 Years Old)',
    category: 'Bonsai Plants',
    price: 1899,
    images: [
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599598425947-02064510b56a?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Exquisite sculpted thick-trunked bonsai tree in an oriental ceramic tray.',
    description: 'Ginseng Ficus features striking aerial roots and thick swollen trunks. A statement living art piece for homes and executive offices.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Luxury home centerpiece, corporate gift, meditative indoor gardening',
    growingConditions: 'Bright indoor light with good ambient humidity',
    sunlight: 'Bright Indirect Light',
    watering: 'Mist regularly; water thoroughly when top soil layer turns light brown',
    soilType: 'Special bonsai substrate with lava rock and akadama mix',
    fertilizer: 'Diluted organic liquid bonsai fertilizer every fortnight',
    growthTips: 'Trim back back-shooting stems to maintain compact bonsai silhouette',
    maintenanceLevel: 'Medium',
    suitableClimate: 'Indoor Controlled Environment',
    plantSize: 'Small (6-12")',
    featured: true,
    rating: 5.0,
    reviewsCount: 64
  },

  // Gift Plants
  {
    id: 'p-9',
    name: '3-Layer Lucky Bamboo in Glass Vase',
    category: 'Gift Plants',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Traditional Feng Shui good luck plant set in decorative crystal glass with pebbles.',
    description: 'Lucky Bamboo represents energy, prosperity, and harmony. Low maintenance water plant perfect for gifting on housewarmings, birthdays & Diwali.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Feng Shui luck symbol, desk ornament, housewarming gift',
    growingConditions: 'Grows in clean water without needing soil',
    sunlight: 'Partial Shade',
    watering: 'Change water completely every 7-10 days',
    soilType: 'Hydroponic water setup with polished decorative pebbles',
    fertilizer: 'Drop 2-3 drops of liquid plant nutrient monthly',
    growthTips: 'Use filtered RO water or distilled water to avoid chlorine leaf tips yellowing',
    maintenanceLevel: 'Low',
    suitableClimate: 'All Indoors',
    plantSize: 'Small (6-12")',
    rating: 4.8,
    reviewsCount: 290
  },

  // Cactus Plants
  {
    id: 'p-10',
    name: 'Golden Barrel Cactus (Echinocactus Grusonii)',
    category: 'Cactus Plants',
    price: 499,
    images: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Striking spherical desert cactus with brilliant golden yellow spines.',
    description: 'A classic globe cactus that adds bold geometric form to window sills and succulent terrariums.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Desk decoration, rock gardens, terrarium compositions',
    growingConditions: 'Hot dry environments with maximum direct light',
    sunlight: 'Direct Sunlight',
    watering: 'Water once every 2-3 weeks; keep completely dry in winter',
    soilType: 'Coarse sand, gravel and pumice mix',
    fertilizer: 'Cactus fertilizer twice a year',
    growthTips: 'Avoid getting water droplets trapped inside top ribs',
    maintenanceLevel: 'Low',
    suitableClimate: 'Arid / Sunny Balconies',
    plantSize: 'Small (6-12")',
    rating: 4.9,
    reviewsCount: 88
  },

  // Accessories
  {
    id: 'p-11',
    name: 'Ergonomic Premium Brass Garden Tool Set (3-Pcs)',
    category: 'Accessories',
    price: 799,
    images: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Durable heavy-duty brass-plated trowel, transplanter, and cultivator rake with wooden handles.',
    description: 'Crafted for passionate gardeners. Rust-resistant cast brass head with smooth wooden handgrips that prevent wrist fatigue.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Soil loosening, weeding, transplanting saplings, pot digging',
    growingConditions: 'N/A',
    sunlight: 'Low Light',
    watering: 'Clean and dry tools after garden use',
    soilType: 'N/A',
    fertilizer: 'N/A',
    growthTips: 'Apply mineral oil to metal heads before long storage',
    maintenanceLevel: 'Low',
    suitableClimate: 'N/A',
    plantSize: 'Standard',
    rating: 4.9,
    reviewsCount: 142
  },

  // Pots
  {
    id: 'p-12',
    name: 'Artisanal Terracotta Clay Pot with Saucer (8 Inch)',
    category: 'Pots',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Handcrafted porous terracotta clay planter allowing plant roots to breathe naturally.',
    description: 'Classic eco-friendly terracotta planter crafted by skilled Indian potters. Includes matching moisture drainage tray.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Container gardening, root aeration, organic rustic indoor decor',
    growingConditions: 'Suitable for indoor and outdoor placement',
    sunlight: 'Bright Indirect Light',
    watering: 'Built-in bottom drainage hole prevents root rot',
    soilType: 'All soil types',
    fertilizer: 'N/A',
    growthTips: 'Soak pot in water for 30 minutes before first potting',
    maintenanceLevel: 'Low',
    suitableClimate: 'All Climates',
    plantSize: 'Standard',
    rating: 4.8,
    reviewsCount: 165
  },

  // Pebbles
  {
    id: 'p-13',
    name: 'Snow White Polished River Pebbles (5 KG Bag)',
    category: 'Pebbles',
    price: 399,
    images: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Premium smooth snow-white natural river stones for garden landscaping and pot top dressing.',
    description: 'Polished white marble pebbles ideal for dressing planter tops, pathways, aquariums, and indoor water fountains.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Pot top dressing, terrace garden walkways, terrarium art, fountains',
    growingConditions: 'N/A',
    sunlight: 'Direct Sunlight',
    watering: 'Wash with water to retain glossy luster',
    soilType: 'N/A',
    fertilizer: 'N/A',
    growthTips: 'Prevents soil moisture evaporation and weed growth on pot surfaces',
    maintenanceLevel: 'Low',
    suitableClimate: 'All Climates',
    plantSize: 'Standard',
    rating: 4.9,
    reviewsCount: 230
  },

  // Seeds
  {
    id: 'p-14',
    name: 'Organic Kitchen Garden Heirloom Seed Pack (12 Varieties)',
    category: 'Seeds',
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: 'Non-GMO high germination seeds: Spinach, Tomato, Basil, Coriander, Chilli, Brinjal & more.',
    description: 'Start growing your own chemical-free home vegetables! Includes high germination rate non-treated heirloom seed packets with growing guide card.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Organic home vegetable gardening, balcony herb garden',
    growingConditions: 'Seedling trays or shallow pots',
    sunlight: 'Direct Sunlight',
    watering: 'Keep seedling soil evenly moist using a gentle spray bottle',
    soilType: 'Fine coco peat seed starter mix',
    fertilizer: 'Liquid seaweed spray after 3rd set of leaves appear',
    growthTips: 'Sow at depth equal to twice the seed diameter',
    maintenanceLevel: 'Low',
    suitableClimate: 'All Indian Seasons',
    plantSize: 'Standard',
    rating: 4.7,
    reviewsCount: 310
  },

  // Soil & Manure
  {
    id: 'p-15',
    name: 'Premium Vermicompost & Coco Peat Organic Potting Mix (10 KG)',
    category: 'Soil & Manure',
    price: 499,
    images: [
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80'
    ],
    shortDescription: '100% pure organic earthworm castings mixed with airy washed coco peat & neem cake.',
    description: 'Enriches soil structure, improves root development, and prevents soil-borne fungal diseases naturally.',
    careDifficulty: 'Easy',
    availability: 'In Stock',
    uses: 'Soil enrichment, new potting, repotting older plants, organic farming',
    growingConditions: 'N/A',
    sunlight: 'Direct Sunlight',
    watering: 'Retains soil moisture up to 3x longer',
    soilType: 'Universal soil mix enhancer',
    fertilizer: 'Natural complete organic plant food',
    growthTips: 'Mix 30% of this organic compost with 70% garden soil for best results',
    maintenanceLevel: 'Low',
    suitableClimate: 'All Climates',
    plantSize: 'Standard',
    rating: 4.9,
    reviewsCount: 412
  }
];

export const INITIAL_SERVICES: LandscapingService[] = [
  {
    id: 'srv-1',
    title: 'Home Gardening',
    description: 'Custom landscape layout, lawn turfing, plant selection and planting design for villas, independent bungalows, and balconies.',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=800&q=80',
    features: ['Site survey & soil testing', 'Custom plant selection', 'Drip irrigation installation', 'Initial maintenance support']
  },
  {
    id: 'srv-2',
    title: 'Terrace Garden',
    description: 'Transform empty rooftop terraces into lush green paradises complete with waterproof decking, seating, and fruit/flower garden beds.',
    iconName: 'Building',
    image: 'https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?auto=format&fit=crop&w=800&q=80',
    features: ['Structural weight safety analysis', 'Waterproofing protection', 'Raised planter beds', 'Shade pergolas & mood lighting']
  },
  {
    id: 'srv-3',
    title: 'Vertical Garden',
    description: 'Space-saving living plant walls for interior accent walls, building facades, and compact balcony walls with automated drip watering.',
    iconName: 'Layers',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80',
    features: ['Modular geotextile plant pockets', 'Automatic timer-controlled drip system', 'Air purifying foliage plants', 'Year-round green density guaranteed']
  },
  {
    id: 'srv-4',
    title: 'Office Landscaping',
    description: 'Professional indoor biophilic plant styling for corporate offices, hotel lobbies, IT parks, and retail commercial spaces.',
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: ['Low maintenance oxygenating flora', 'Architectural planter selection', 'Weekly expert gardener care', 'Tax deductible green rental plans']
  },
  {
    id: 'srv-5',
    title: 'Garden Maintenance',
    description: 'Scheduled weekly or monthly maintenance visits by expert horticultural technicians for pruning, fertilizing, and pest management.',
    iconName: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    features: ['Lawn mowing & edging', 'Organic pest & disease spray', 'Soil aeration & fertilization', 'Seasonal replanting care']
  },
  {
    id: 'srv-6',
    title: 'Lawn Development',
    description: 'High-quality natural turf grass installation (Mexican grass, Bermuda grass, Selection No. 1) with automatic underground sprinkler systems.',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    features: ['Leveling & topsoil preparation', 'Weed-free sod grass rolling', 'Popup sprinkler automation', 'Lawn density guarantee']
  },
  {
    id: 'srv-7',
    title: 'Farm Landscaping',
    description: 'Large-scale farm house estate landscaping, fruit orchard layout, fencing tree lines, koi ponds, and natural walkways.',
    iconName: 'Trees',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    features: ['Avenue & perimeter tree planting', 'Natural water feature / koi pond creation', 'Grafted fruit tree orchards', 'Outdoor gazebos']
  },
  {
    id: 'srv-8',
    title: 'Garden Consultation',
    description: 'One-on-one expert consultation with senior plant doctors and landscape architects to diagnose plant diseases and plan garden re-designs.',
    iconName: 'HelpCircle',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    features: ['In-person or virtual consultation', 'Plant health diagnosis & cure roadmap', '3D garden design rendering optional', 'Personalized fertilizer recipe']
  }
];
