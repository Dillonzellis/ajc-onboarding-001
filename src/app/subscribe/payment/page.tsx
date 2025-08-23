"use client";

import { X, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { subscriptionPlans } from "@/components/subcribe-plans/mock-data";
import { Suspense } from "react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "";
  const returnUrl = searchParams.get("return") || "/";
  
  const selectedPlan = subscriptionPlans.find((p) => p.id === planId);

  const closeSubscription = () => {
    router.push(returnUrl);
  };

  const handleBackToPlans = () => {
    router.push(`/subscribe?return=${encodeURIComponent(returnUrl)}`);
  };

  const handleCompleteSubscription = () => {
    router.push(`/subscribe/confirmation?plan=${planId}&return=${encodeURIComponent(returnUrl)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Complete Your Subscription
            </h2>
            <p className="text-gray-600 mt-2">
              {selectedPlan?.name} - {selectedPlan?.price} {selectedPlan?.period}
            </p>
          </div>
          <button
            onClick={closeSubscription}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                  placeholder="Create a secure password"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                    placeholder="1234 5678 9012 3456"
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Billing Address
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                  placeholder="123 Main St, Atlanta, GA 30309"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 pt-6">
            <button
              onClick={handleBackToPlans}
              className="text-gray-600 hover:text-gray-800 font-medium px-6 py-2"
            >
              ← Back to Plans
            </button>
            <Button
              className="bg-[#004FFF] hover:bg-[#003ACC] px-8 rounded-full"
              onClick={handleCompleteSubscription}
            >
              Complete Subscription
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}