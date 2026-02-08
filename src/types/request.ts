import type { Address } from "./shipment";

export type ServiceType = "economy" | "standard" | "express" | "overnight";

export interface ParcelDetails {
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  description: string;
}

export interface ShippingRequest {
  origin: Address;
  destination: Address;
  parcel: ParcelDetails;
  serviceType: ServiceType;
}
