"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { subscriptionPlans } from "@/components/subcribe-plans/mock-data";
import { useUser } from "@/lib/user-context";
import { Suspense } from "react";

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSubscription } = useUser();
  
  const planId = searchParams.get("plan") || "";
  const returnUrl = searchParams.get("return") || "/";
  const selectedPlan = subscriptionPlans.find((p) => p.id === planId);

  const handleContinueReading = () => {
    const planName = selectedPlan?.name || "Premium Digital Plan";
    setSubscription(true, planName);
    router.push(returnUrl);
  };

  const handleSetupExperience = () => {
    const planName = selectedPlan?.name || "Premium Digital Plan";
    setSubscription(true, planName);
    router.push("/onboarding");
  };

  return (
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
            onClick={handleSetupExperience}
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
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}