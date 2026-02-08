"use client";

import { useState, useEffect } from "react";
import { QuoteCard } from "./quote-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Quote } from "@/types/courier";

interface QuoteGridProps {
  quotes: Quote[];
  onSelect: (quote: Quote) => void;
}

export function QuoteGrid({ quotes, onSelect }: QuoteGridProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-3 rounded-lg border p-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const cheapestPrice = Math.min(...quotes.map((q) => q.price));
  const fastestDays = Math.min(...quotes.map((q) => q.estimatedDays));

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {quotes
        .sort((a, b) => a.price - b.price)
        .map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            isCheapest={quote.price === cheapestPrice}
            isFastest={quote.estimatedDays === fastestDays}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}
