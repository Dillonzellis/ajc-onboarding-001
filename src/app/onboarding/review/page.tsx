"use client";

import Link from "next/link";
import { useUser } from "@/lib/user-context";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progress-bar/progress-bar";

export default function ReviewPage() {
  const { user, updateOnboarding, completeOnboarding } = useUser();
  const { selectedNeighborhoods, selectedNewsletters, selectedTopics } =
    user.onboarding;

  const removeNewsletter = (newsletter: string) => {
    updateOnboarding({
      selectedNewsletters: selectedNewsletters.filter((n) => n !== newsletter),
    });
  };

  const removeNeighborhood = (neighborhood: string) => {
    updateOnboarding({
      selectedNeighborhoods: selectedNeighborhoods.filter(
        (n) => n !== neighborhood,
      ),
    });
  };

  const removeTopic = (topic: string) => {
    updateOnboarding({
      selectedTopics: selectedTopics.filter((t) => t !== topic),
    });
  };

  return (
    <>
      <ProgressBar currentStep={5} />
      <div
        className={`z-30 relative pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-8 mt-10">
              <h2 className="text-white text-3xl font-semibold">
                Excellent selections for your Newsletters, Neighborhoods, and
                Topics of Interest.
              </h2>
            </div>

            <p className="text-white text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Let&apos;s review what you&apos;ve chosen. If you&apos;re happy
              with your selections, simply click &quot;Finish Setup&quot; and
              you will be taken back to your personalized AJC Homepage.
              Remember, you can make changes at anytime by accessing your
              profile.
            </p>

            {/* Review Sections */}
            <div className="space-y-8 text-left">
              {/* Newsletters Review */}
              <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-gray-500/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-xl font-semibold">
                    Newsletters ({selectedNewsletters.length})
                  </h3>
                  <button className="text-blue-400 hover:text-blue-300 text-sm underline">
                    <Link href="/onboarding/newsletters">Edit</Link>
                  </button>
                </div>
                {selectedNewsletters.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedNewsletters.map((newsletter) => (
                      <div
                        key={newsletter}
                        className="bg-white/10 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        <span>{newsletter}</span>
                        <button
                          onClick={() => removeNewsletter(newsletter)}
                          className="text-red-400 hover:text-red-300 ml-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No newsletters selected</p>
                )}
              </div>

              {/* Neighborhoods Review */}
              <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-gray-500/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-xl font-semibold">
                    Neighborhoods ({selectedNeighborhoods.length})
                  </h3>
                  <button className="text-blue-400 hover:text-blue-300 text-sm underline">
                    <Link href="/onboarding/neighborhoods">Edit</Link>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedNeighborhoods.map((neighborhood) => (
                    <div
                      key={neighborhood}
                      className="bg-white/10 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      <span>
                        {neighborhood}
                        {neighborhood === "Dunwoody" ? " (Your Area)" : ""}
                      </span>
                      <button
                        onClick={() => removeNeighborhood(neighborhood)}
                        className="text-red-400 hover:text-red-300 ml-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {selectedNeighborhoods.length === 0 && (
                    <p className="text-gray-400">No neighborhoods selected</p>
                  )}
                </div>
              </div>

              <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-gray-500/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white text-xl font-semibold">
                    Topics ({selectedTopics.length})
                  </h3>
                  <button className="text-blue-400 hover:text-blue-300 text-sm underline">
                    <Link href="/onboarding/topics">Edit</Link>
                  </button>
                </div>
                {selectedTopics.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedTopics.map((topic) => (
                      <div
                        key={topic}
                        className="bg-white/10 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        <span>{topic}</span>
                        <button
                          onClick={() => removeTopic(topic)}
                          className="text-red-400 hover:text-red-300 ml-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No topics selected</p>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-12">
              <Button
                asChild
                className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
              >
                <Link href="">Back</Link>
              </Button>
              <Link
                href="/"
                onClick={completeOnboarding}
                className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Finish Setup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
