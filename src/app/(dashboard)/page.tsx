"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentShipments } from "@/components/dashboard/recent-shipments";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Overview of your shipping activity."
        action={
          <Button asChild>
            <Link href="/new-request">
              <PlusCircle className="mr-2 size-4" />
              New Shipment
            </Link>
          </Button>
        }
      />
      <StatsCards />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentShipments />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
