"use client";

import { useState } from "react";

export default function ProgressBar() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="p-6" style={{ backgroundColor: "#282828" }}>
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center justify-between">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-600 -translate-y-1/2 z-0"></div>

            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  step <= currentStep ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="h-8 w-full mx-0 my-0"
        style={{
          background: `linear-gradient(to bottom, #282828 0%, rgba(40, 40, 40, 0.8) 50%, transparent 100%)`,
        }}
      ></div>
    </div>
  );
}
