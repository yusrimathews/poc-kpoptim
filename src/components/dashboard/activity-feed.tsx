"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShipmentStore } from "@/store/shipment-store";
import { formatRelativeTime } from "@/lib/format";
import type { TrackingEvent } from "@/types/tracking";

export function ActivityFeed() {
  const shipments = useShipmentStore((s) => s.shipments);
  const trackingEvents = useShipmentStore((s) => s.trackingEvents);

  // Flatten all tracking events and sort by timestamp descending
  const allEvents: (TrackingEvent & { shipmentRef: string })[] = [];
  for (const shipment of shipments) {
    const events = trackingEvents[shipment.id] ?? [];
    for (const event of events) {
      allEvents.push({ ...event, shipmentRef: shipment.reference });
    }
  }
  allEvents.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const recentEvents = allEvents.slice(0, 8);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentEvents.map((event) => (
            <div key={event.id} className="flex gap-3">
              <div className="relative flex flex-col items-center">
                <div className="size-2 rounded-full bg-primary mt-2" />
                <div className="w-px flex-1 bg-border" />
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm">
                  <span className="font-medium">{event.shipmentRef}</span>
                  {" — "}
                  {event.description}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {event.location} · {formatRelativeTime(event.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
