"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { ShipmentSummary } from "@/components/shipments/shipment-summary";
import { TrackingTimeline } from "@/components/shipments/tracking-timeline";
import { WaybillDialog } from "@/components/shipments/waybill-dialog";
import { useShipmentStore } from "@/store/shipment-store";
import type { ShipmentStatus } from "@/types/shipment";
import type { TrackingEvent } from "@/types/tracking";

const EMPTY_EVENTS: TrackingEvent[] = [];

const statusProgress: Record<ShipmentStatus, number> = {
  quote_requested: 5,
  quote_accepted: 15,
  pending_collection: 25,
  collected: 40,
  in_transit: 60,
  out_for_delivery: 80,
  delivered: 100,
  cancelled: 0,
};

export default function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const shipment = useShipmentStore((s) => s.shipments.find((sh) => sh.id === id));
  const allTrackingEvents = useShipmentStore((s) => s.trackingEvents);
  const trackingEvents = allTrackingEvents[id] ?? EMPTY_EVENTS;

  if (!shipment) {
    return (
      <div className="space-y-6">
        <PageHeader title="Shipment Not Found" />
        <EmptyState
          title="Shipment not found"
          description="The shipment you're looking for doesn't exist or has been removed."
          action={
            <Button asChild>
              <Link href="/shipments">View All Shipments</Link>
            </Button>
          }
        />
      </div>
    );
  }

  const progress = statusProgress[shipment.status];

  return (
    <div className="space-y-6">
      <PageHeader
        title={shipment.reference}
        description={`${shipment.origin.city} → ${shipment.destination.city}`}
        action={
          <div className="flex gap-2">
            <WaybillDialog shipment={shipment} />
            <Button variant="outline" asChild>
              <Link href="/shipments">
                <ArrowLeft className="mr-2 size-4" />
                Back
              </Link>
            </Button>
          </div>
        }
      />

      {shipment.status !== "cancelled" && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipment Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <ShipmentSummary shipment={shipment} />
      <TrackingTimeline events={trackingEvents} />
    </div>
  );
}
