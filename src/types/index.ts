export interface Branch {
  cityName: string;
  address: string;
  image: string;
  articles: { heading: string; content: string }[];
}

export interface SiteSettings {
  phoneNumber: string;
  phoneLink: string;
  email: string;
  logoUrl: string;
  branches: Branch[];
}

export interface PackageItem {
  _id?: string;
  name: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Destination {
  _id?: string;
  name: string;
  slug: string;
  tagline: string;
  heroImage: string;
  packages: PackageItem[];
  faqs: FaqItem[];
  isActive: boolean;
}

export interface BookingFormData {
  name: string;
  city: string;
  email: string;
  phone: string;
  whatsapp: string;
  destination: string;
  travelDate: string;
  peopleCount: string;
  vacationType: string;
}
