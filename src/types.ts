export type EkamModule = 'home' | 'explore' | 'weddings' | 'deals' | 'carry' | 'books' | 'charge' | 'build' | 'activity' | 'notifications' | 'profile' | 'admin';

export type Language = 'en' | 'hi' | 'mr';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  credits: number;
  verified: boolean;
  avatar: string;
}

export interface WeddingFunction {
  id: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  rsvpCount: number;
  vegCount?: number;
  nonVegCount?: number;
}

export interface WeddingHousehold {
  id: string;
  name: string;
  membersCount: number;
  status: 'Confirmed' | 'Pending' | 'Declined';
  mealPref: 'Veg' | 'Non-Veg' | 'Jain';
  arrivalTime?: string;
}

export interface Wedding {
  id: string;
  title: string;
  couple: string;
  date: string;
  location: string;
  budget: number;
  expectedGuests: number;
  confirmedGuests?: number;
  noShowRiskBuffer?: number;
  foodWastageSavedINR?: number;
  functions: WeddingFunction[];
  households: WeddingHousehold[];
}

export interface DealSupplier {
  name: string;
  quotedPrice: number;
  discount: string;
}

export interface Deal {
  id: string;
  title: string;
  category: string;
  targetCohort: number;
  joinedCount: number;
  estimatedSaving: string;
  status: string;
  description?: string;
  suppliers: DealSupplier[];
  endDate: string;
}

export interface CarryRequest {
  id: string;
  itemTitle: string;
  category: string;
  route: string;
  travellerName: string;
  reward: string;
  status: string;
  description?: string;
}

export interface BookListing {
  id: string;
  title: string;
  author: string;
  edition: string;
  condition: string;
  location: string;
  creditValue: number;
  price: string;
  owner: string;
  status: string;
  image: string;
}

export interface Charger {
  id: string;
  title: string;
  connector: string;
  owner: string;
  rate: string;
  location: string;
  status: string;
  rating: number;
  batteryEmergencyHelp?: string;
  slots: string[];
}

export interface BuildListing {
  id: string;
  title: string;
  category: string;
  quantity: string;
  condition: string;
  price: string;
  location: string;
  seller: string;
  status: string;
  image: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  module: string;
}

export interface AppState {
  currentUser: UserProfile;
  weddings: Wedding[];
  deals: Deal[];
  carry: CarryRequest[];
  books: BookListing[];
  charge: Charger[];
  build: BuildListing[];
  notifications: NotificationItem[];
  adminStats: {
    totalUsers: number;
    activeListings: number;
    transactionsToday: number;
    disputesPending: number;
    platformVolumeINR: string;
  };
}
