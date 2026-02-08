"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Shipment, ShipmentStatus } from "@/types/shipment";
import type { TrackingEvent } from "@/types/tracking";
import { mockShipments } from "@/data/shipments";
import { mockTrackingEvents } from "@/data/tracking-events";

interface ShipmentState {
  shipments: Shipment[];
  trackingEvents: Record<string, TrackingEvent[]>;
  addShipment: (shipment: Shipment) => void;
  updateShipmentStatus: (id: string, status: ShipmentStatus) => void;
  getShipmentById: (id: string) => Shipment | undefined;
  getTrackingEvents: (shipmentId: string) => TrackingEvent[];
}

export const useShipmentStore = create<ShipmentState>()(
  persist(
    (set, get) => ({
      shipments: mockShipments,
      trackingEvents: mockTrackingEvents,

      addShipment: (shipment) =>
        set((state) => ({
          shipments: [shipment, ...state.shipments],
        })),

      updateShipmentStatus: (id, status) =>
        set((state) => ({
          shipments: state.shipments.map((s) =>
            s.id === id
              ? { ...s, status, updatedAt: new Date().toISOString() }
              : s
          ),
        })),

      getShipmentById: (id) => get().shipments.find((s) => s.id === id),

      getTrackingEvents: (shipmentId) =>
        get().trackingEvents[shipmentId] ?? [],
    }),
    {
      name: "kpoptim-shipments",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
