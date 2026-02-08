import type { Quote } from "@/types/courier";
import type { ShippingRequest } from "@/types/request";
import { couriers } from "./couriers";
import { calculateVolumetricWeight } from "@/lib/format";

const courierModifiers: Record<string, { priceMultiplier: number; speedDays: number }> = {
  "courier-a": { priceMultiplier: 0.7, speedDays: 2 },
  "courier-b": { priceMultiplier: 0.85, speedDays: 1 },
  "courier-c": { priceMultiplier: 1.0, speedDays: 0 },
  "courier-d": { priceMultiplier: 1.3, speedDays: -1 },
  "courier-e": { priceMultiplier: 0.8, speedDays: 1 },
};

const serviceBaseDays: Record<string, number> = {
  economy: 6,
  standard: 4,
  express: 2,
  overnight: 1,
};

const servicePriceMultiplier: Record<string, number> = {
  economy: 0.7,
  standard: 1.0,
  express: 1.6,
  overnight: 2.2,
};

const courierFeatures: Record<string, string[]> = {
  "courier-a": ["Door-to-door", "Basic tracking"],
  "courier-b": ["Door-to-door", "SMS notifications", "Photo on delivery"],
  "courier-c": ["Door-to-door", "Real-time tracking", "Insurance included", "SMS notifications"],
  "courier-d": ["Door-to-door", "Priority handling", "Real-time tracking", "Insurance included", "Dedicated support"],
  "courier-e": ["Door-to-door", "Basic tracking", "Locker pickup option"],
};

export function generateMockQuotes(request: ShippingRequest): Quote[] {
  const { parcel, serviceType } = request;
  const volWeight = calculateVolumetricWeight(parcel.length, parcel.width, parcel.height);
  const chargeableWeight = Math.max(parcel.weight, volWeight) * parcel.quantity;

  // Base price in cents: R50 flat + R15/kg
  const basePrice = 5000 + chargeableWeight * 1500;

  return couriers.map((courier) => {
    const modifier = courierModifiers[courier.id];
    const serviceMultiplier = servicePriceMultiplier[serviceType] ?? 1.0;
    const variance = 0.9 + Math.random() * 0.2; // +/- 10%

    const price = Math.round(basePrice * modifier.priceMultiplier * serviceMultiplier * variance);
    const baseDays = serviceBaseDays[serviceType] ?? 4;
    const days = Math.max(1, baseDays + modifier.speedDays);

    const serviceLevels: Record<string, string> = {
      economy: "Economy",
      standard: "Standard",
      express: "Express",
      overnight: "Overnight",
    };

    return {
      id: `quote-${courier.id}-${Date.now()}`,
      courierId: courier.id,
      courierName: courier.name,
      price,
      estimatedDays: days,
      serviceLevel: serviceLevels[serviceType] ?? "Standard",
      rating: courier.rating,
      features: courierFeatures[courier.id] ?? [],
    };
  });
}
