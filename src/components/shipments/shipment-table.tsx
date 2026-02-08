"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import { formatDate, formatZAR } from "@/lib/format";
import { getCourierById } from "@/data/couriers";
import type { Shipment } from "@/types/shipment";

interface ShipmentTableProps {
  shipments: Shipment[];
}

export function ShipmentTable({ shipments }: ShipmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reference</TableHead>
          <TableHead className="hidden sm:table-cell">Origin</TableHead>
          <TableHead className="hidden sm:table-cell">Destination</TableHead>
          <TableHead className="hidden md:table-cell">Courier</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden lg:table-cell">Price</TableHead>
          <TableHead className="hidden lg:table-cell">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipments.map((shipment) => (
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
              {shipment.origin.city}
            </TableCell>
            <TableCell className="hidden sm:table-cell text-muted-foreground">
              {shipment.destination.city}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {getCourierById(shipment.selectedCourier)?.name ?? "—"}
            </TableCell>
            <TableCell>
              <StatusBadge status={shipment.status} />
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {shipment.price > 0 ? formatZAR(shipment.price) : "—"}
            </TableCell>
            <TableCell className="hidden lg:table-cell text-muted-foreground">
              {formatDate(shipment.createdAt)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
