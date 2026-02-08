"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { QuoteGrid } from "@/components/quotes/quote-grid";
import { useQuoteStore } from "@/store/quote-store";
import { useShipmentStore } from "@/store/shipment-store";
import type { Quote } from "@/types/courier";
import type { Shipment } from "@/types/shipment";

export default function QuotesPage() {
  const router = useRouter();
  const { currentRequest, quotes, clearQuotes } = useQuoteStore();
  const addShipment = useShipmentStore((s) => s.addShipment);

  if (!currentRequest || quotes.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader title="Compare Quotes" />
        <EmptyState
          title="No active request"
          description="Create a new shipping request to compare quotes from multiple couriers."
          action={
            <Button asChild>
              <Link href="/new-request">Create Request</Link>
            </Button>
          }
        />
      </div>
    );
  }

  function handleSelect(quote: Quote) {
    if (!currentRequest) return;

    const now = new Date().toISOString();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + quote.estimatedDays);

    const shipment: Shipment = {
      id: `ship-${Date.now()}`,
      reference: `KP-2026-${String(Date.now()).slice(-4)}`,
      status: "quote_accepted",
      origin: currentRequest.origin,
      destination: currentRequest.destination,
      parcel: currentRequest.parcel,
      serviceType: currentRequest.serviceType,
      selectedCourier: quote.courierId,
      selectedQuoteId: quote.id,
      price: quote.price,
      estimatedDelivery: deliveryDate.toISOString(),
      createdAt: now,
      updatedAt: now,
    };

    addShipment(shipment);
    clearQuotes();
    router.push(`/shipments/${shipment.id}`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compare Quotes"
        description={`${currentRequest.origin.city} → ${currentRequest.destination.city} · ${currentRequest.parcel.weight}kg · ${currentRequest.serviceType}`}
        action={
          <Button variant="outline" asChild>
            <Link href="/new-request">
              <ArrowLeft className="mr-2 size-4" />
              Modify Request
            </Link>
          </Button>
        }
      />
      <QuoteGrid quotes={quotes} onSelect={handleSelect} />
    </div>
  );
}
