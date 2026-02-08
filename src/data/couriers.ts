import type { Courier } from "@/types/courier";

export const couriers: Courier[] = [
  {
    id: "courier-a",
    name: "Courier A",
    color: "#3B82F6",
    rating: 3.8,
    totalReviews: 1243,
  },
  {
    id: "courier-b",
    name: "Courier B",
    color: "#10B981",
    rating: 4.2,
    totalReviews: 876,
  },
  {
    id: "courier-c",
    name: "Courier C",
    color: "#8B5CF6",
    rating: 4.5,
    totalReviews: 2104,
  },
  {
    id: "courier-d",
    name: "Courier D",
    color: "#F59E0B",
    rating: 4.7,
    totalReviews: 3210,
  },
  {
    id: "courier-e",
    name: "Courier E",
    color: "#EF4444",
    rating: 3.5,
    totalReviews: 654,
  },
];

export function getCourierById(id: string): Courier | undefined {
  return couriers.find((c) => c.id === id);
}
