"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SubscriptionContextType {
  isSubscribed: boolean;
  setIsSubscribed: (value: boolean) => void;
  selectedPlan: string;
  setSelectedPlan: (value: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  // Load subscription status from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("isSubscribed");
    if (stored === "true") {
      setIsSubscribed(true);
    }
  }, []);

  // Save subscription status to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("isSubscribed", isSubscribed.toString());
  }, [isSubscribed]);

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        setIsSubscribed,
        selectedPlan,
        setSelectedPlan,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }
  return context;
}
