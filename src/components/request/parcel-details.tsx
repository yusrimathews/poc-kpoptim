"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ParcelDetails as ParcelDetailsType } from "@/types/request";
import { calculateVolumetricWeight, formatWeight } from "@/lib/format";

interface ParcelDetailsProps {
  value: ParcelDetailsType;
  onChange: (parcel: ParcelDetailsType) => void;
}

export function ParcelDetails({ value, onChange }: ParcelDetailsProps) {
  function updateNum(field: keyof ParcelDetailsType, val: string) {
    const num = parseFloat(val) || 0;
    onChange({ ...value, [field]: num });
  }

  const volWeight = calculateVolumetricWeight(
    value.length,
    value.width,
    value.height
  );

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Parcel Details</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Length (cm)</Label>
          <Input
            type="number"
            min={1}
            placeholder="30"
            value={value.length || ""}
            onChange={(e) => updateNum("length", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Width (cm)</Label>
          <Input
            type="number"
            min={1}
            placeholder="20"
            value={value.width || ""}
            onChange={(e) => updateNum("width", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Height (cm)</Label>
          <Input
            type="number"
            min={1}
            placeholder="15"
            value={value.height || ""}
            onChange={(e) => updateNum("height", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            min={0.1}
            step={0.1}
            placeholder="2.5"
            value={value.weight || ""}
            onChange={(e) => updateNum("weight", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input
            type="number"
            min={1}
            placeholder="1"
            value={value.quantity || ""}
            onChange={(e) => updateNum("quantity", e.target.value)}
            required
          />
        </div>
      </div>
      {volWeight > 0 && (
        <p className="text-sm text-muted-foreground">
          Volumetric weight: {formatWeight(volWeight)} · Actual weight:{" "}
          {formatWeight(value.weight)} · Chargeable:{" "}
          {formatWeight(Math.max(volWeight, value.weight) * value.quantity)}
        </p>
      )}
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Brief description of the parcel contents"
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
      </div>
    </div>
  );
}
