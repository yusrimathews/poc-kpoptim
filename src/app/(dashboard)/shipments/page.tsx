"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { ShipmentTable } from "@/components/shipments/shipment-table";
import { useShipmentStore } from "@/store/shipment-store";
import type { ShipmentStatus } from "@/types/shipment";

const filterTabs: { label: string; value: string; statuses?: ShipmentStatus[] }[] = [
  { label: "All", value: "all" },
  {
    label: "In Transit",
    value: "transit",
    statuses: ["in_transit", "out_for_delivery"],
  },
  { label: "Delivered", value: "delivered", statuses: ["delivered"] },
  {
    label: "Pending",
    value: "pending",
    statuses: ["quote_requested", "quote_accepted", "pending_collection"],
  },
  { label: "Collected", value: "collected", statuses: ["collected"] },
];

export default function ShipmentsPage() {
  const shipments = useShipmentStore((s) => s.shipments);
  const [filter, setFilter] = useState("all");

  const activeTab = filterTabs.find((t) => t.value === filter);
  const filtered = activeTab?.statuses
    ? shipments.filter((s) => activeTab.statuses!.includes(s.status))
    : shipments;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipments"
        description="View and manage all your shipments."
        action={
          <Button asChild>
            <Link href="/new-request">
              <PlusCircle className="mr-2 size-4" />
              New Shipment
            </Link>
          </Button>
        }
      />
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          {filterTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Card>
        <CardContent className="pt-6">
          {filtered.length === 0 ? (
            <EmptyState
              title="No shipments found"
              description="No shipments match the current filter."
            />
          ) : (
            <ShipmentTable shipments={filtered} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
