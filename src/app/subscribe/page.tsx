"use client";

import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { subscriptionPlans } from "@/components/subcribe-plans/mock-data";

export default function SubscribePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("return") || "/";

  const closeSubscription = () => {
    router.push(returnUrl);
  };

  const handlePlanSelect = (planId: string) => {
    router.push(`/subscribe/payment?plan=${planId}&return=${encodeURIComponent(returnUrl)}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 md:max-w-4xl md:mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 mt-2">
            Get unlimited access to Georgia&apos;s most trusted news source
          </p>
        </div>
        <button
          onClick={closeSubscription}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-6 relative ${
                plan.popular
                  ? "border-[#004FFF] ring-2 ring-[#004FFF] ring-opacity-20"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#004FFF] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <div className="text-sm text-gray-500 line-through">
                  {plan.originalPrice}
                </div>
                <div className="text-sm font-medium text-green-600">
                  {plan.savings}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full ${
                  plan.popular
                    ? "bg-[#004FFF] hover:bg-[#003ACC]"
                    : "bg-gray-900 hover:bg-gray-800"
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                Select Plan
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Cancel anytime. No commitment required.</p>
        <p className="mt-1">
          By subscribing, you agree to our Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </div>
  );
}