"use client";

import { Star, Check, Zap, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatZAR } from "@/lib/format";
import type { Quote } from "@/types/courier";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: Quote;
  isCheapest: boolean;
  isFastest: boolean;
  onSelect: (quote: Quote) => void;
}

export function QuoteCard({
  quote,
  isCheapest,
  isFastest,
  onSelect,
}: QuoteCardProps) {
  return (
    <Card
      className={cn(
        "relative transition-shadow hover:shadow-md",
        (isCheapest || isFastest) && "ring-2 ring-primary/20"
      )}
    >
      {(isCheapest || isFastest) && (
        <div className="absolute -top-3 left-4 flex gap-1">
          {isCheapest && (
            <Badge className="bg-green-600 text-white">Best Price</Badge>
          )}
          {isFastest && (
            <Badge className="bg-blue-600 text-white">Fastest</Badge>
          )}
        </div>
      )}
      <CardHeader className="pb-3 pt-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{quote.courierName}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {quote.rating.toFixed(1)}
          </div>
        </div>
        <Badge variant="outline" className="w-fit">
          {quote.serviceLevel}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{formatZAR(quote.price)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="size-4" />
          <span>
            {quote.estimatedDays === 1
              ? "1 business day"
              : `${quote.estimatedDays} business days`}
          </span>
        </div>
        <div className="space-y-1.5">
          {quote.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <Check className="size-3.5 text-green-600 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <Button className="w-full" onClick={() => onSelect(quote)}>
          <Zap className="mr-2 size-4" />
          Select Courier
        </Button>
      </CardContent>
    </Card>
  );
}
