"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SA_PROVINCES } from "@/lib/constants";
import type { Address } from "@/types/shipment";

interface AddressFieldsProps {
  title: string;
  value: Address;
  onChange: (address: Address) => void;
}

export function AddressFields({ title, value, onChange }: AddressFieldsProps) {
  function update(field: keyof Address, val: string) {
    onChange({ ...value, [field]: val });
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Contact Name</Label>
          <Input
            placeholder="Full name"
            value={value.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input
            placeholder="0821234567"
            value={value.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Street Address</Label>
        <Input
          placeholder="12 Long Street"
          value={value.streetAddress}
          onChange={(e) => update("streetAddress", e.target.value)}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Suburb</Label>
          <Input
            placeholder="Gardens"
            value={value.suburb}
            onChange={(e) => update("suburb", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>City</Label>
          <Input
            placeholder="Cape Town"
            value={value.city}
            onChange={(e) => update("city", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Province</Label>
          <Select
            value={value.province}
            onValueChange={(val) => update("province", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select province" />
            </SelectTrigger>
            <SelectContent>
              {SA_PROVINCES.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Postal Code</Label>
          <Input
            placeholder="8001"
            maxLength={4}
            value={value.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
}
