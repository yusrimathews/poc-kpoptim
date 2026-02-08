import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Package, Truck } from "lucide-react";
import { formatZAR, formatDate, formatWeight } from "@/lib/format";
import { getCourierById } from "@/data/couriers";
import { SHIPMENT_STATUS_LABELS } from "@/lib/constants";
import { StatusBadge } from "./status-badge";
import type { Shipment } from "@/types/shipment";

interface ShipmentSummaryProps {
  shipment: Shipment;
}

export function ShipmentSummary({ shipment }: ShipmentSummaryProps) {
  const courier = getCourierById(shipment.selectedCourier);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MapPin className="size-4" />
            Addresses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              From
            </p>
            <p className="font-medium">{shipment.origin.contactName}</p>
            <p className="text-sm text-muted-foreground">
              {shipment.origin.streetAddress}, {shipment.origin.suburb}
            </p>
            <p className="text-sm text-muted-foreground">
              {shipment.origin.city}, {shipment.origin.province}{" "}
              {shipment.origin.postalCode}
            </p>
            <p className="text-sm text-muted-foreground">
              {shipment.origin.phone}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              To
            </p>
            <p className="font-medium">{shipment.destination.contactName}</p>
            <p className="text-sm text-muted-foreground">
              {shipment.destination.streetAddress},{" "}
              {shipment.destination.suburb}
            </p>
            <p className="text-sm text-muted-foreground">
              {shipment.destination.city}, {shipment.destination.province}{" "}
              {shipment.destination.postalCode}
            </p>
            <p className="text-sm text-muted-foreground">
              {shipment.destination.phone}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="size-4" />
            Shipment Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Reference</dt>
              <dd className="text-sm font-medium">{shipment.reference}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Status</dt>
              <dd>
                <StatusBadge status={shipment.status} />
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Courier</dt>
              <dd className="text-sm font-medium flex items-center gap-1.5">
                {courier ? (
                  <>
                    <Truck className="size-3.5" />
                    {courier.name}
                  </>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Price</dt>
              <dd className="text-sm font-medium">
                {shipment.price > 0 ? formatZAR(shipment.price) : "—"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Weight</dt>
              <dd className="text-sm font-medium">
                {formatWeight(shipment.parcel.weight)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">
                Estimated Delivery
              </dt>
              <dd className="text-sm font-medium">
                {shipment.estimatedDelivery
                  ? formatDate(shipment.estimatedDelivery)
                  : "—"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-muted-foreground">Created</dt>
              <dd className="text-sm font-medium">
                {formatDate(shipment.createdAt)}
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
