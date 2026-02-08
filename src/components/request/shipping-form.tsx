"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddressFields } from "./address-fields";
import { ParcelDetails } from "./parcel-details";
import { ServiceSelector } from "./service-selector";
import { useQuoteStore } from "@/store/quote-store";
import { generateMockQuotes } from "@/data/quotes";
import type { Address } from "@/types/shipment";
import type { ParcelDetails as ParcelDetailsType, ServiceType } from "@/types/request";

const prefillOrigin: Address = {
  contactName: "Sipho Mabena",
  phone: "0821234567",
  streetAddress: "22 Oxford Road",
  suburb: "Rosebank",
  city: "Johannesburg",
  province: "Gauteng",
  postalCode: "2196",
};

const prefillDestination: Address = {
  contactName: "Chantal du Toit",
  phone: "0839876543",
  streetAddress: "8 Bree Street",
  suburb: "CBD",
  city: "Cape Town",
  province: "Western Cape",
  postalCode: "8001",
};

const prefillParcel: ParcelDetailsType = {
  length: 30,
  width: 20,
  height: 15,
  weight: 2.5,
  quantity: 1,
  description: "Electronics - Wireless headphones",
};

export function ShippingForm() {
  const router = useRouter();
  const { setRequest, setQuotes } = useQuoteStore();

  const [origin, setOrigin] = useState<Address>(prefillOrigin);
  const [destination, setDestination] = useState<Address>(prefillDestination);
  const [parcel, setParcel] = useState<ParcelDetailsType>(prefillParcel);
  const [serviceType, setServiceType] = useState<ServiceType>("standard");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const request = { origin, destination, parcel, serviceType };
    setRequest(request);
    const quotes = generateMockQuotes(request);
    setQuotes(quotes);
    router.push("/quotes");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <AddressFields title="Origin Address" value={origin} onChange={setOrigin} />
          <Separator />
          <AddressFields
            title="Destination Address"
            value={destination}
            onChange={setDestination}
          />
          <Separator />
          <ParcelDetails value={parcel} onChange={setParcel} />
          <Separator />
          <ServiceSelector value={serviceType} onChange={setServiceType} />
          <div className="flex justify-end pt-4">
            <Button type="submit" size="lg">
              Get Quotes
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
