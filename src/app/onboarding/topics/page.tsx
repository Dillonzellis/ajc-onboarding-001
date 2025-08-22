"use client";

import { topics } from "@/components/onboarding/mock-data";
import { useUser } from "@/lib/user-context";
import ProgressBar from "@/components/progress-bar/progress-bar";
import OnboardingContBtns from "@/components/onboarding/helper_components/onboarding-cont-btns";

export default function TopicsPage() {
  const { user, updateOnboarding } = useUser();

  const { selectedTopics } = user.onboarding;

  const toggleTopic = (topic: string) => {
    const newTopics = selectedTopics.includes(topic)
      ? selectedTopics.filter((t) => t !== topic)
      : [...selectedTopics, topic];
    updateOnboarding({ selectedTopics: newTopics });
  };

  return (
    <div>
      <ProgressBar currentStep={3} />
      <div
        className={`relative z-30 pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center mb-8 mt-10">
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
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span className="text-white text-xl font-semibold">Topics</span>
            </div>
            <h2 className="text-white text-center text-3xl font-semibold">
              Let&apos;s make your AJC content tailored to your interests.
            </h2>
          </div>

          <h3 className="text-white text-center text-2xl font-semibold mb-16">
            Which topics would you like to follow?
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-3 mb-16 px-4">
            {topics.map((topic) => (
              <button
                key={topic.name}
                onClick={() => toggleTopic(topic.name)}
                className={`
                      ${topic.size}
                      rounded-full 
                      cursor-pointer
                      flex items-center justify-center p-4
                      transition-all duration-300 ease-in-out
                      hover:scale-110 hover:border-blue-400
                      ${
                        selectedTopics.includes(topic.name)
                          ? "bg-transparent text-white border-[5px] border-[#004fff]"
                          : "border-4 border-white bg-transparent text-white"
                      }
                    `}
              >
                <span className="text-sm font-medium text-center leading-tight px-2">
                  {topic.name}
                </span>
              </button>
            ))}
          </div>
          <OnboardingContBtns
            backLink="/onboarding/neighborhoods"
            contLink="/onboarding/app-download"
          />
        </div>
      </div>
    </div>
  );
}
