"use client";

import Link from "next/link";
import { useUser } from "@/lib/user-context";
import { neighborhoods } from "@/components/onboarding/mock-data";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progress-bar/progress-bar";

export default function NeighborhoodsPage() {
  const { user, updateOnboarding, completeOnboarding } = useUser();
  const { selectedNeighborhoods, selectedTopics } = user.onboarding;

  const toggleNeighborhood = (neighborhood: string) => {
    const newNeighborhoods = selectedNeighborhoods.includes(neighborhood)
      ? selectedNeighborhoods.filter((n) => n !== neighborhood)
      : [...selectedNeighborhoods, neighborhood];
    updateOnboarding({ selectedNeighborhoods: newNeighborhoods });
  };

  return (
    <>
      <ProgressBar currentStep={3} />
      <div
        className={`relative z-30 pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-12 mt-10">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-white text-xl font-semibold">
                Neighborhoods
              </span>
            </div>
            <h2 className="text-white text-center text-3xl font-semibold">
              It looks like you&apos;re from Dunwoody! Would you like us to
              highlight content specific to your area?
            </h2>
          </div>

          {/* Yes/No selection */}
          <div className="flex justify-center gap-6 mb-16">
            <button
              onClick={() => toggleNeighborhood("Dunwoody")}
              className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                selectedNeighborhoods.includes("Dunwoody")
                  ? "bg-white text-gray-800"
                  : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-800"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                const newNeighborhoods = selectedNeighborhoods.filter(
                  (n) => n !== "Dunwoody",
                );
                updateOnboarding({
                  selectedNeighborhoods: newNeighborhoods,
                });
              }}
              className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                !selectedNeighborhoods.includes("Dunwoody")
                  ? "bg-white text-gray-800"
                  : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-800"
              }`}
            >
              No
            </button>
          </div>

          <h3 className="text-white text-center text-2xl font-semibold mb-12">
            Are there other neighborhoods you’d like us to feature in your feed?
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 px-4">
            {neighborhoods.map((neighborhood) => (
              <button
                key={neighborhood.name}
                onClick={() => toggleNeighborhood(neighborhood.name)}
                className={`
                      ${neighborhood.size}
                      rounded-full 
                      flex items-center justify-center p-4
                      transition-all duration-300 ease-in-out
                      hover:scale-110 hover:border-blue-400
                      ${
                        selectedNeighborhoods.includes(neighborhood.name)
                          ? "bg-transparent text-white border-[5px] border-[#004fff]"
                          : "border-4 border-white bg-transparent text-white"
                      }
                    `}
              >
                <span className="text-center leading-tight font-normal text-sm px-2">
                  {neighborhood.name}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <Button
              asChild
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
            >
              <Link href="/onboarding/newsletters">Back</Link>
            </Button>
            <Button
              asChild
              className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              <Link href="/onboarding/topics">Continue</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
