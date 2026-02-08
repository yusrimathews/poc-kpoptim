"use client";

import { Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShipmentStore } from "@/store/shipment-store";

export function StatsCards() {
  const shipments = useShipmentStore((s) => s.shipments);

  const total = shipments.length;
  const inTransit = shipments.filter(
    (s) => s.status === "in_transit" || s.status === "out_for_delivery"
  ).length;
  const delivered = shipments.filter((s) => s.status === "delivered").length;
  const pending = shipments.filter(
    (s) => s.status === "quote_requested" || s.status === "quote_accepted"
  ).length;

  const stats = [
    {
      title: "Total Shipments",
      value: total,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "In Transit",
      value: inTransit,
      icon: Truck,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Delivered",
      value: delivered,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Pending Quotes",
      value: pending,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`rounded-md p-2 ${stat.bg}`}>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
