"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useShipmentStore } from "./shipment-store";

export function HydrationProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Manually trigger Zustand rehydration, then mark as ready
    useShipmentStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
