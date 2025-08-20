"use client";

import { X, CreditCard, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { subscriptionPlans } from "./mock-data";

interface SubscriptionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function SubscriptionOverlay({ isOpen, onClose, onSubscribe }: SubscriptionOverlayProps) {
  const [subscriptionStep, setSubscriptionStep] = useState<
    "plans" | "form" | "completion"
  >("plans");

  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const [showCompletionOptions, setShowCompletionOptions] = useState(false);

  const handleCompleteSubscription = () => {
    setSubscriptionStep("completion");
    setShowCompletionOptions(true);
  };

  const handleContinueReading = () => {
    onSubscribe();
    onClose();
    setSelectedPlan("");
    setSubscriptionStep("plans");
    setShowCompletionOptions(false);
  };

  const closeSubscription = () => {
    onClose();
    setSelectedPlan("");
    setSubscriptionStep("plans");
    setShowCompletionOptions(false);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setSubscriptionStep("form");
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      {subscriptionStep === "plans" ? (
        // Subscription Plans View
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
      ) : subscriptionStep === "form" ? (
        // Personal Information Form View
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Complete Your Subscription
                </h2>
                <p className="text-gray-600 mt-2">
                  {subscriptionPlans.find((p) => p.id === selectedPlan)?.name} -{" "}
                  {subscriptionPlans.find((p) => p.id === selectedPlan)?.price}{" "}
                  {subscriptionPlans.find((p) => p.id === selectedPlan)?.period}
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
              {/* Personal Information */}
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

              {/* Payment Information */}
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
                  onClick={() => setSubscriptionStep("plans")}
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
      ) : (
        // Subscription Completion Options View
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="w-full max-w-2xl text-center">
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                <img
                  src="/ajc-logo.svg"
                  alt="AJC Logo"
                  className="w-[350px] h-auto max-w-lg"
                />
              </div>
              <div className="max-w-lg mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  We&apos;re so glad you&apos;re here Jason!
                </h2>
              </div>

              {/* Welcome Video Section */}
              <div className="mb-8">
                <div className="max-w-lg mx-auto">
                  <p className="text-lg text-gray-700 mb-4 leading-6">
                    A special welcome from Andrew Morse, President and Publisher
                    of The AJC
                  </p>
                </div>
                <div className="relative max-w-lg mx-auto">
                  <video
                    className="w-full rounded-lg shadow-lg"
                    poster="/andrew-morse.jpg"
                    controls
                    preload="metadata"
                  >
                    <source src="/welcome-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="max-w-lg mx-auto">
                <p className="text-gray-600 mb-8 font-medium">
                  Your subscription is now active. What would you like to do
                  next?
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Button
                variant="outline"
                className="px-8 py-4 bg-transparent rounded-full flex-1 text-sm"
                onClick={handleContinueReading}
              >
                Continue reading your story
              </Button>

              <Button
                className="px-8 py-4 rounded-full flex-1 text-base font-semibold"
                style={{ backgroundColor: "#004FFF" }}
                onClick={() => {
                  console.log("Setup AJC experience clicked");
                }}
              >
                Setup your AJC experience
              </Button>
            </div>

            <div className="max-w-lg mx-auto">
              <p className="text-gray-500 mt-6 text-sm">
                You can always update your preferences later in your account
                settings.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
