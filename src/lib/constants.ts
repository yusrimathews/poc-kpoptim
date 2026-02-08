import type { SAProvince, ShipmentStatus } from "@/types/shipment";

export const SA_PROVINCES: SAProvince[] = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
];

export const SERVICE_TYPES = [
  {
    value: "economy" as const,
    label: "Economy",
    description: "5-7 business days",
    icon: "Wallet",
  },
  {
    value: "standard" as const,
    label: "Standard",
    description: "3-5 business days",
    icon: "Package",
  },
  {
    value: "express" as const,
    label: "Express",
    description: "1-2 business days",
    icon: "Zap",
  },
  {
    value: "overnight" as const,
    label: "Overnight",
    description: "Next business day",
    icon: "Clock",
  },
];

export const SHIPMENT_STATUS_LABELS: Record<ShipmentStatus, string> = {
  quote_requested: "Quote Requested",
  quote_accepted: "Quote Accepted",
  pending_collection: "Pending Collection",
  collected: "Collected",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const SHIPMENT_STATUS_COLORS: Record<
  ShipmentStatus,
  { bg: string; text: string }
> = {
  quote_requested: { bg: "bg-amber-100", text: "text-amber-800" },
  quote_accepted: { bg: "bg-yellow-100", text: "text-yellow-800" },
  pending_collection: { bg: "bg-blue-100", text: "text-blue-800" },
  collected: { bg: "bg-sky-100", text: "text-sky-800" },
  in_transit: { bg: "bg-indigo-100", text: "text-indigo-800" },
  out_for_delivery: { bg: "bg-purple-100", text: "text-purple-800" },
  delivered: { bg: "bg-green-100", text: "text-green-800" },
  cancelled: { bg: "bg-red-100", text: "text-red-800" },
};
