import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime, formatRelativeTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { TrackingEvent } from "@/types/tracking";

interface TrackingTimelineProps {
  events: TrackingEvent[];
}

const statusLabels: Record<string, string> = {
  label_created: "Label Created",
  collected: "Collected",
  at_sorting_facility: "At Sorting Facility",
  in_transit: "In Transit",
  at_local_depot: "At Local Depot",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

export function TrackingTimeline({ events }: TrackingTimelineProps) {
  // Events sorted newest first for display
  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tracking History</CardTitle>
      </CardHeader>
      <CardContent>
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No tracking events yet.
          </p>
        ) : (
          <div className="space-y-0">
            {sorted.map((event, index) => {
              const isLatest = index === 0;
              const isLast = index === sorted.length - 1;

              return (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "mt-1 size-3 rounded-full border-2 shrink-0",
                        isLatest
                          ? "border-primary bg-primary"
                          : "border-muted-foreground/30 bg-background"
                      )}
                    />
                    {!isLast && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className={cn("pb-6", isLast && "pb-0")}>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        !isLatest && "text-muted-foreground"
                      )}
                    >
                      {statusLabels[event.status] ?? event.status}
                    </p>
                    <p className="text-sm">{event.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {event.location} · {formatDateTime(event.timestamp)} (
                      {formatRelativeTime(event.timestamp)})
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
