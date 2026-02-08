export type ShipmentStatus =
  | "quote_requested"
  | "quote_accepted"
  | "pending_collection"
  | "collected"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type SAProvince =
  | "Eastern Cape"
  | "Free State"
  | "Gauteng"
  | "KwaZulu-Natal"
  | "Limpopo"
  | "Mpumalanga"
  | "North West"
  | "Northern Cape"
  | "Western Cape";

export interface Address {
  contactName: string;
  phone: string;
  streetAddress: string;
  suburb: string;
  city: string;
  province: SAProvince;
  postalCode: string;
}

export interface Shipment {
  id: string;
  reference: string;
  status: ShipmentStatus;
  origin: Address;
  destination: Address;
  parcel: ParcelDetails;
  serviceType: ServiceType;
  selectedCourier: string;
  selectedQuoteId: string;
  price: number;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

// Re-export from request for convenience
import type { ParcelDetails, ServiceType } from "./request";
export type { ParcelDetails, ServiceType };
