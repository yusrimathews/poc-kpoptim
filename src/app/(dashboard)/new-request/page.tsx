"use client";

import { PageHeader } from "@/components/shared/page-header";
import { ShippingForm } from "@/components/request/shipping-form";

export default function NewRequestPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="New Shipping Request"
        description="Enter your shipment details to get quotes from multiple couriers."
      />
      <ShippingForm />
    </div>
  );
}
