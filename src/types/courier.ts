export interface Courier {
  id: string;
  name: string;
  color: string;
  rating: number;
  totalReviews: number;
}

export interface Quote {
  id: string;
  courierId: string;
  courierName: string;
  price: number;
  estimatedDays: number;
  serviceLevel: string;
  rating: number;
  features: string[];
}
