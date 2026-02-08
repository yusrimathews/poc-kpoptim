import type { ShipmentStatus } from "@/types/shipment";
import {
  SHIPMENT_STATUS_LABELS,
  SHIPMENT_STATUS_COLORS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = SHIPMENT_STATUS_COLORS[status];
  const label = SHIPMENT_STATUS_LABELS[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        colors.bg,
        colors.text,
        className
      )}
    >
      {label}
    </span>
  );
}
