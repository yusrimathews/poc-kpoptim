"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shipments/status-badge";
import { useShipmentStore } from "@/store/shipment-store";
import { formatDate } from "@/lib/format";
import { getCourierById } from "@/data/couriers";

export function RecentShipments() {
  const shipments = useShipmentStore((s) => s.shipments);
  const recent = shipments.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Shipments</CardTitle>
        <Link
          href="/shipments"
          className="text-sm text-muted-foreground hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead className="hidden sm:table-cell">Route</TableHead>
              <TableHead className="hidden md:table-cell">Courier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recent.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell>
                  <Link
                    href={`/shipments/${shipment.id}`}
                    className="font-medium hover:underline"
                  >
                    {shipment.reference}
                  </Link>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {shipment.origin.city} → {shipment.destination.city}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {getCourierById(shipment.selectedCourier)?.name ?? "—"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={shipment.status} />
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {formatDate(shipment.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
