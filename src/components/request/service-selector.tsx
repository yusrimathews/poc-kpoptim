"use client";

import { Wallet, Package, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICE_TYPES } from "@/lib/constants";
import type { ServiceType } from "@/types/request";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Wallet,
  Package,
  Zap,
  Clock,
};

interface ServiceSelectorProps {
  value: ServiceType;
  onChange: (service: ServiceType) => void;
}

export function ServiceSelector({ value, onChange }: ServiceSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Service Type</h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_TYPES.map((service) => {
          const Icon = iconMap[service.icon];
          const isSelected = value === service.value;
          return (
            <button
              key={service.value}
              type="button"
              onClick={() => onChange(service.value)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-colors",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "size-5",
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )}
                />
              )}
              <span className="text-sm font-medium">{service.label}</span>
              <span className="text-xs text-muted-foreground">
                {service.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
