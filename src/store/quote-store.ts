"use client";

import { create } from "zustand";
import type { ShippingRequest } from "@/types/request";
import type { Quote } from "@/types/courier";

interface QuoteState {
  currentRequest: ShippingRequest | null;
  quotes: Quote[];
  selectedQuote: Quote | null;
  setRequest: (request: ShippingRequest) => void;
  setQuotes: (quotes: Quote[]) => void;
  selectQuote: (quote: Quote) => void;
  clearQuotes: () => void;
}

export const useQuoteStore = create<QuoteState>()((set) => ({
  currentRequest: null,
  quotes: [],
  selectedQuote: null,

  setRequest: (request) => set({ currentRequest: request }),
  setQuotes: (quotes) => set({ quotes }),
  selectQuote: (quote) => set({ selectedQuote: quote }),
  clearQuotes: () =>
    set({ currentRequest: null, quotes: [], selectedQuote: null }),
}));
