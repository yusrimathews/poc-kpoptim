export type TrackingStatus =
  | "label_created"
  | "collected"
  | "at_sorting_facility"
  | "in_transit"
  | "at_local_depot"
  | "out_for_delivery"
  | "delivered";

export interface TrackingEvent {
  id: string;
  shipmentId: string;
  status: TrackingStatus;
  description: string;
  location: string;
  timestamp: string;
}
