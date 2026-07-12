export interface TourData {
  // Basic Info
  slug: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  price: string;
  priceDetail?: string;
  
  // Images
  image: string; // Card/listing image
  heroImage: string; // Hero section background
  shortDescription: string;
  
  // Departure & Logistics
  departureInfo: string;
  hotelInfo: string;
  transportation: string;
  
  // Content
  fullDescription: string;
  whyChoose: string[];
  bestTime: string;
  attractions: Attraction[];
  
  // Services
  included: string[];
  excluded: string[];
  
  // Hotels
  hotels: Hotel[];
  
  // Itinerary
  itinerary: ItineraryDay[];
  
  // FAQ
  faqs: FAQ[];
  
  // Travel Tips
  tips: string[];
  
  // Documents
  requiredDocuments: string[];
  
  // Related Tours
  relatedTours: string[]; // slugs
  
  // Gallery
  gallery: string[];
  
  // SEO
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage: string;
  };
}

export interface Attraction {
  name: string;
  description: string;
  icon?: string;
}

export interface Hotel {
  name: string;
  stars: number;
  location: string;
  features: string[];
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
  meals?: string;
  accommodation?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
