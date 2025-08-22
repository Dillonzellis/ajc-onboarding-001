"use client";

import {
  allNewsletters,
  newsletterDescriptions,
} from "@/components/onboarding/mock-data";
import { useState } from "react";

import { useUser } from "@/lib/user-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProgressBar from "@/components/progress-bar/progress-bar";

export default function NewsletterPage() {
  const [hoveredNewsletter, setHoveredNewsletter] = useState<string | null>(
    null,
  );
  const toggleNewsletter = (newsletter: string) => {
    const newNewsletters = selectedNewsletters.includes(newsletter)
      ? selectedNewsletters.filter((n) => n !== newsletter)
      : [...selectedNewsletters, newsletter];
    updateOnboarding({ selectedNewsletters: newNewsletters });
  };

  const { user, updateOnboarding, completeOnboarding } = useUser();
  const { selectedNewsletters, selectedNeighborhoods, selectedTopics } =
    user.onboarding;

  const handleNewsletterMouseEnter = (
    newsletter: string,
    event: React.MouseEvent,
  ) => {
    setHoveredNewsletter(newsletter);
  };

  return (
    <>
      <ProgressBar currentStep={2} />
      <div
        className={`relative z-30 pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500`}
      >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-16 mt-10">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-white text-xl font-semibold">
              Newsletters
            </span>
          </div>
          <h2 className="text-white text-center text-3xl font-semibold">
            Which newsletters would you like to receive?
          </h2>
        </div>

        <div className="relative">
          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 px-4">
            {allNewsletters.map((newsletter) => (
              <button
                key={newsletter.name}
                onClick={() => toggleNewsletter(newsletter.name)}
                onMouseEnter={(e) =>
                  handleNewsletterMouseEnter(newsletter.name, e)
                }
                onMouseLeave={() => setHoveredNewsletter(null)}
                className={`
                        ${newsletter.size}
                        rounded-full 
                        flex items-center justify-center p-4
                        transition-all duration-300 ease-in-out
                        hover:scale-110 hover:border-blue-400
                        ${
                          selectedNewsletters.includes(newsletter.name)
                            ? "bg-transparent text-white border-[5px] border-[#004fff]"
                            : "border-4 border-white bg-transparent text-white"
                        }
                      `}
              >
                <span className="text-sm font-medium text-center leading-tight px-2">
                  {newsletter.name}
                </span>
              </button>
            ))}
          </div>

          {hoveredNewsletter && (
            <div className="fixed z-20 pointer-events-none">
              <div className="sm:hidden fixed top-32 left-1/2 transform -translate-x-1/2 w-4/5">
                <div className="bg-black/40 backdrop-blur-md text-white p-4 rounded-lg shadow-lg border border-gray-500/30">
                  <h4 className="font-semibold text-sm mb-2">
                    {hoveredNewsletter}
                  </h4>
                  <p className="text-xs leading-relaxed">
                    {newsletterDescriptions[hoveredNewsletter]}
                  </p>
                </div>
              </div>

              <div className="hidden sm:block fixed bottom-8 left-8 max-w-sm">
                <div className="bg-black/40 backdrop-blur-md text-white p-4 rounded-lg shadow-lg border border-gray-500/30">
                  <h4 className="font-semibold text-sm mb-2">
                    {hoveredNewsletter}
                  </h4>
                  <p className="text-xs leading-relaxed">
                    {newsletterDescriptions[hoveredNewsletter]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <Button
            asChild
            className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
          >
            <Link href="/onboarding">Back</Link>
          </Button>
          <Button
            asChild
            className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            <Link href="/onboarding/neighborhoods">Continue</Link>
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
