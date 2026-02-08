"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Printer, Truck } from "lucide-react";
import type { Shipment } from "@/types/shipment";
import { formatZAR, formatWeight } from "@/lib/format";
import { getCourierById } from "@/data/couriers";

interface WaybillDialogProps {
  shipment: Shipment;
}

export function WaybillDialog({ shipment }: WaybillDialogProps) {
  const courier = getCourierById(shipment.selectedCourier);

  function handlePrint() {
    window.print();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Printer className="mr-2 size-4" />
          Print Waybill
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Waybill - {shipment.reference}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 print:text-black" id="waybill-content">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="size-5" />
              <span className="font-bold text-lg">KP Optim</span>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-bold">
                {shipment.reference}
              </p>
              <p className="text-sm text-muted-foreground">
                {courier?.name ?? "—"}
              </p>
            </div>
          </div>

          {/* Barcode placeholder */}
          <div className="flex justify-center py-2">
            <div className="flex items-center gap-px">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-foreground"
                  style={{
                    width: Math.random() > 0.5 ? 3 : 1.5,
                    height: 40,
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-center font-mono text-xs tracking-widest">
            {shipment.reference.replace(/-/g, " ")}
          </p>

          <Separator />

          {/* Addresses */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                From
              </p>
              <p className="text-sm font-medium">
                {shipment.origin.contactName}
              </p>
              <p className="text-xs">
                {shipment.origin.streetAddress}, {shipment.origin.suburb}
              </p>
              <p className="text-xs">
                {shipment.origin.city}, {shipment.origin.province}{" "}
                {shipment.origin.postalCode}
              </p>
              <p className="text-xs">{shipment.origin.phone}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-muted-foreground">
                To
              </p>
              <p className="text-sm font-medium">
                {shipment.destination.contactName}
              </p>
              <p className="text-xs">
                {shipment.destination.streetAddress},{" "}
                {shipment.destination.suburb}
              </p>
              <p className="text-xs">
                {shipment.destination.city}, {shipment.destination.province}{" "}
                {shipment.destination.postalCode}
              </p>
              <p className="text-xs">{shipment.destination.phone}</p>
            </div>
          </div>

          <Separator />

          {/* Parcel info */}
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="text-sm font-medium">
                {formatWeight(shipment.parcel.weight)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Dims (cm)</p>
              <p className="text-sm font-medium">
                {shipment.parcel.length}x{shipment.parcel.width}x
                {shipment.parcel.height}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Qty</p>
              <p className="text-sm font-medium">{shipment.parcel.quantity}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Value</p>
              <p className="text-sm font-medium">{formatZAR(shipment.price)}</p>
            </div>
          </div>

          {shipment.parcel.description && (
            <p className="text-xs text-muted-foreground">
              Contents: {shipment.parcel.description}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-2 print:hidden">
          <Button onClick={handlePrint}>
            <Printer className="mr-2 size-4" />
            Print
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
