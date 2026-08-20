export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  shortDescription: string;
  description: string;
  careDifficulty: 'Easy' | 'Moderate' | 'Expert';
  availability: 'In Stock' | 'Out of Stock' | 'Pre-Order';
  uses: string;
  growingConditions: string;
  sunlight: 'Direct Sunlight' | 'Partial Shade' | 'Bright Indirect Light' | 'Low Light';
  watering: string;
  soilType: string;
  fertilizer: string;
  growthTips: string;
  maintenanceLevel: 'Low' | 'Medium' | 'High';
  suitableClimate: string;
  plantSize: 'Small (6-12")' | 'Medium (1-2 ft)' | 'Large (3-5 ft)' | 'Extra Large (5+ ft)' | 'Standard';
  featured?: boolean;
  rating?: number;
  reviewsCount?: number;
}

export interface Category {
  id: string;
  name: string;
  group: 'Plants' | 'Other';
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface LandscapingService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
  features: string[];
}

export interface CompletedProject {
  id: string;
  title: string;
  category: string;
  location?: string;
  imageUrl: string;
  description?: string;
}

export interface WebsiteSettings {
  companyName: string;
  whatsAppNumber: string;
  logoUrl: string;
  heroTitle: string;
  sloganEnglish: string;
  sloganHindi: string;
  sloganTelugu: string;
  heroTagline: string;
  aboutUsMission: string;
  aboutUsTagline?: string;
  aboutUsTitle?: string;
  aboutUsStory?: string;
  aboutUsImage?: string;
  aboutUsEstablished?: string;
  aboutUsPoints?: string[];
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  workingHours: string;
  instagramUrl: string;
  facebookUrl: string;
  landscapingTagline?: string;
  landscapingTitle?: string;
  landscapingDescription?: string;
  landscapingImage?: string;
  services?: LandscapingService[];
  completedProjectsTitle?: string;
  completedProjectsSubtitle?: string;
  completedProjects?: CompletedProject[];
}

export interface OrderRecord {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending WhatsApp' | 'Confirmed' | 'Delivered';
}
