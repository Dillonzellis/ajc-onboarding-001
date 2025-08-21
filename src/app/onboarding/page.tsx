"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [contentVisible, setContentVisible] = useState(false);
  const [selectedNewsletters, setSelectedNewsletters] = useState<string[]>([]);
  const [wantsDunwoodyNews, setWantsDunwoodyNews] = useState<boolean | null>(
    null,
  );
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(
    [],
  );
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [hoveredNewsletter, setHoveredNewsletter] = useState<string | null>(
    null,
  );

  const newsletterDescriptions: { [key: string]: string } = {
    "Subscriber-Only Events":
      "Exclusive access to AJC events, meetups, and subscriber-only experiences",
    UATL: "Underground Atlanta culture, nightlife, and emerging trends in the city",
    "Politically Georgia":
      "In-depth coverage of Georgia politics, elections, and government affairs",
    Travel:
      "Travel guides, destination reviews, and vacation planning for Georgia and beyond",
    "AJC ePaper Daily":
      "Digital replica of the print newspaper delivered to your inbox",
    "Letter from the Editor":
      "Personal insights and behind-the-scenes perspectives from our editorial team",
    "Today's Top 5":
      "The five most important stories you need to know each day",
    "A.M. ATLANTA":
      "Your morning briefing on Atlanta news, weather, and what's happening today",
    "Afternoon Update":
      "Midday news roundup and breaking developments from around Atlanta",
    "Breaking News":
      "Immediate alerts for major news events and developing stories",
    "Sports Daily":
      "Comprehensive coverage of Atlanta sports teams and local athletics",
    "Braves Report":
      "Dedicated coverage of the Atlanta Braves, stats, and game analysis",
    Politics:
      "Local and state political news, candidate profiles, and election coverage",
    "Food & Dining":
      "Restaurant reviews, food trends, and Atlanta's culinary scene",
    "Access ATL":
      "Insider access to Atlanta events, entertainment, and cultural happenings",
    "Aging in Atlanta":
      "Resources, news, and community information for Atlanta's senior population",
    "Evening Update": "End-of-day news summary and tomorrow's preview",
    "Good Day UGA":
      "University of Georgia sports, campus news, and Bulldogs coverage",
    Jobseekers:
      "Career opportunities, job market trends, and professional development in Atlanta",
    "Pulse Plus":
      "Health, wellness, and medical news affecting the Atlanta community",
    "Weekend Update":
      "Weekend events, activities, and things to do around Atlanta",
    "AJC Peachtree Road Race":
      "Training tips, race updates, and coverage of Atlanta's famous 10K",
    "Sweet Tea by the AJC":
      "Southern culture, lifestyle, and the stories that make Georgia unique",
    "Dirty and Birds Dispatch":
      "Atlanta United FC and Atlanta Hawks coverage and analysis",
  };

  const allNewsletters = [
    { name: "Subscriber-Only Events", size: "w-44 h-44" },
    { name: "UATL", size: "w-24 h-24" },
    { name: "Politically Georgia", size: "w-36 h-36" },
    { name: "Travel", size: "w-48 h-48" },
    { name: "AJC ePaper Daily", size: "w-28 h-28" },
    { name: "Letter from the Editor", size: "w-40 h-40" },
    { name: "Today's Top 5", size: "w-26 h-26" },
    { name: "A.M. ATLANTA", size: "w-38 h-38" },
    { name: "Afternoon Update", size: "w-32 h-32" },
    { name: "Breaking News", size: "w-42 h-42" },
    { name: "Sports Daily", size: "w-30 h-30" },
    { name: "Braves Report", size: "w-34 h-34" },
    { name: "Politics", size: "w-28 h-28" },
    { name: "Food & Dining", size: "w-46 h-46" },
    { name: "Access ATL", size: "w-26 h-26" },
    { name: "Aging in Atlanta", size: "w-40 h-40" },
    { name: "Evening Update", size: "w-24 h-24" },
    { name: "Good Day UGA", size: "w-36 h-36" },
    { name: "Jobseekers", size: "w-30 h-30" },
    { name: "Pulse Plus", size: "w-32 h-32" },
    { name: "Weekend Update", size: "w-28 h-28" },
    { name: "AJC Peachtree Road Race", size: "w-44 h-44" },
    { name: "Sweet Tea by the AJC", size: "w-38 h-38" },
    { name: "Dirty and Birds Dispatch", size: "w-34 h-34" },
  ];

  const neighborhoods = [
    { name: "Buckhead", size: "w-40 h-40" },
    { name: "Midtown", size: "w-32 h-32" },
    { name: "Downtown", size: "w-36 h-36" },
    { name: "Old Fourth Ward", size: "w-44 h-44" },
    { name: "Inman Park", size: "w-28 h-28" },
    { name: "Virginia-Highland", size: "w-42 h-42" },
    { name: "Morningside-Lenox Park", size: "w-38 h-38" },
    { name: "Ansley Park", size: "w-30 h-30" },
    { name: "West Midtown / Upper Westside", size: "w-46 h-46" },
    { name: "Castleberry Hill", size: "w-34 h-34" },
    { name: "Grant Park", size: "w-32 h-32" },
    { name: "Cabbagetown", size: "w-28 h-28" },
    { name: "Reynoldstown", size: "w-36 h-36" },
    { name: "Edgewood", size: "w-30 h-30" },
    { name: "Kirkwood", size: "w-32 h-32" },
    { name: "East Atlanta Village (EAV)", size: "w-44 h-44" },
    { name: "Ormewood Park", size: "w-38 h-38" },
    { name: "Mechanicsville", size: "w-34 h-34" },
    { name: "Adair Park", size: "w-30 h-30" },
    { name: "West End", size: "w-28 h-28" },
    { name: "Grove Park", size: "w-32 h-32" },
    { name: "Bankhead", size: "w-30 h-30" },
    { name: "Lakewood Heights", size: "w-36 h-36" },
    { name: "Chosewood Park", size: "w-34 h-34" },
  ];

  const topics = [
    { name: "Politics", size: "w-36 h-36" },
    { name: "Local Sports", size: "w-42 h-42" },
    { name: "Education", size: "w-32 h-32" },
    { name: "Food & Dining", size: "w-40 h-40" },
    { name: "Arts & Culture", size: "w-38 h-38" },
    { name: "Business", size: "w-34 h-34" },
    { name: "Transportation", size: "w-44 h-44" },
    { name: "Housing", size: "w-30 h-30" },
    { name: "Environment", size: "w-36 h-36" },
    { name: "Community Events", size: "w-46 h-46" },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  useEffect(() => {
    if (currentStep > 0) {
      setContentVisible(false);
      const timer = setTimeout(() => setContentVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const toggleNewsletter = (newsletter: string) => {
    setSelectedNewsletters((prev) =>
      prev.includes(newsletter)
        ? prev.filter((n) => n !== newsletter)
        : [...prev, newsletter],
    );
  };

  const toggleNeighborhood = (neighborhood: string) => {
    setSelectedNeighborhoods((prev) =>
      prev.includes(neighborhood)
        ? prev.filter((n) => n !== neighborhood)
        : [...prev, neighborhood],
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const handleGetStarted = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterMouseEnter = (
    newsletter: string,
    event: React.MouseEvent,
  ) => {
    setHoveredNewsletter(newsletter);
  };

  const removeNewsletter = (newsletter: string) => {
    setSelectedNewsletters((prev) => prev.filter((n) => n !== newsletter));
  };

  const removeNeighborhood = (neighborhood: string) => {
    setSelectedNeighborhoods((prev) => prev.filter((n) => n !== neighborhood));
  };

  const removeTopic = (topic: string) => {
    setSelectedTopics((prev) => prev.filter((t) => t !== topic));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="p-6" style={{ backgroundColor: "#282828" }}>
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center justify-between">
            {/* Progress line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-600 -translate-y-1/2 z-0"></div>

            {/* Step circles */}
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

  return (
    <div
      className="min-h-screen w-full font-sans px-5 md:px-0 relative"
      style={{ backgroundColor: "#282828" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-8"
        style={{ backgroundImage: "url('/atlanta-skyline.png')" }}
      ></div>

      <div className="relative z-10">
        {currentStep > 0 && <ProgressBar />}

        {/* Logo and initial text */}
        {currentStep === 0 && (
          <div className="flex flex-col items-center justify-center min-h-screen gap-8">
            <div
              className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
              <div className="flex flex-col items-center gap-6">
                <Image
                  src="/ajc-white-logo.svg"
                  alt="AJC Logo"
                  width={670}
                  height={335}
                  className="object-contain max-w-[670px] w-full h-auto"
                />
                <h1 className="text-white text-center text-2xl max-w-4xl px-4 tracking-normal font-light">
                  {
                    'Welcome to your AJC personalization experience.\n\nDon\'t worry if you forget something...you can always revisit your preference settings under the "Profile" section.'
                  }
                </h1>
                <div className="mt-6 mb-4">
                  <Image
                    src="/profile-illustration.png"
                    alt="Profile section illustration"
                    width={400}
                    height={100}
                    className="object-contain"
                  />
                </div>
                {/* Let's get started button */}
                <button
                  onClick={handleGetStarted}
                  className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors mt-4"
                >
                  Let&apos;s get started
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div
            className={`pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}
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
                    {/* Mobile positioning - top center below progress bar */}
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

                    {/* Desktop positioning - lower left corner */}
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
                <button
                  onClick={handleBack}
                  className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div
            className={`pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}
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
                  onClick={() => setWantsDunwoodyNews(true)}
                  className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                    wantsDunwoodyNews === true
                      ? "bg-white text-gray-800"
                      : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-800"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setWantsDunwoodyNews(false)}
                  className={`px-8 py-3 rounded-full font-semibold transition-colors ${
                    wantsDunwoodyNews === false
                      ? "bg-white text-gray-800"
                      : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-800"
                  }`}
                >
                  No
                </button>
              </div>

              <h3 className="text-white text-center text-2xl font-semibold mb-12">
                Are there other neighborhoods you’d like us to feature in your
                feed?
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
                <button
                  onClick={handleBack}
                  className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(3);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div
            className={`pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}
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
                  <span className="text-white text-xl font-semibold">
                    Topics
                  </span>
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

              <div className="flex justify-center gap-4 mt-12">
                <button
                  onClick={handleBack}
                  className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(4);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div
            className={`pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="text-center px-4">
                <div className="flex flex-col items-center justify-center mb-8 mt-10">
                  <h3 className="text-white text-2xl font-semibold">
                    One last thing before we finish...
                  </h3>
                </div>

                <div className="flex justify-center mb-12">
                  <Image
                    src="/ajc-app-mockup.png"
                    alt="AJC News App Features"
                    width={800}
                    height={400}
                    className="object-contain max-w-full h-auto"
                  />
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12 mx-auto max-w-4xl">
                  {/* QR Code on the left */}
                  <div className="flex-shrink-0 order-2 lg:order-1">
                    <div className="bg-white p-6 rounded-lg">
                      <Image
                        src="/ajc-qr-code.jpg"
                        alt="QR Code to download AJC News app"
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* App icon and text on the right */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-1 order-1 lg:order-2">
                    <div className="flex-shrink-0">
                      <Image
                        src="/ajc-app-icon.png"
                        alt="AJC News App Icon"
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 md:text-left text-center">
                      <p className="text-white text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                        Stay informed, connected, and up to date with the AJC
                        News app. Our app provides you with in-depth news and
                        personalized real-time news alerts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-12">
                  <button
                    onClick={handleBack}
                    className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep(5);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div
            className={`pt-32 md:pt-24 pb-12 min-h-screen transition-opacity duration-500 ${contentVisible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center">
                <div className="mb-8 mt-10">
                  <h2 className="text-white text-3xl font-semibold">
                    Excellent selections for your Newsletters, Neighborhoods,
                    and Topics of Interest.
                  </h2>
                </div>

                <p className="text-white text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                  Let&apos;s review what you&apos;ve chosen. If you&apos;re
                  happy with your selections, simply click &quot;Finish
                  Setup&quot; and you will be taken back to your personalized
                  AJC Homepage. Remember, you can make changes at anytime by
                  accessing your profile.
                </p>

                {/* Review Sections */}
                <div className="space-y-8 text-left">
                  {/* Newsletters Review */}
                  <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-gray-500/30">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white text-xl font-semibold">
                        Newsletters ({selectedNewsletters.length})
                      </h3>
                      <button
                        onClick={() => goToStep(1)}
                        className="text-blue-400 hover:text-blue-300 text-sm underline"
                      >
                        Edit
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
                        Neighborhoods (
                        {selectedNeighborhoods.length +
                          (wantsDunwoodyNews ? 1 : 0)}
                        )
                      </h3>
                      <button
                        onClick={() => goToStep(2)}
                        className="text-blue-400 hover:text-blue-300 text-sm underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {wantsDunwoodyNews && (
                        <div className="bg-white/10 text-white px-3 py-1 rounded-full text-sm">
                          Dunwoody (Your Area)
                        </div>
                      )}
                      {selectedNeighborhoods.map((neighborhood) => (
                        <div
                          key={neighborhood}
                          className="bg-white/10 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                        >
                          <span>{neighborhood}</span>
                          <button
                            onClick={() => removeNeighborhood(neighborhood)}
                            className="text-red-400 hover:text-red-300 ml-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {selectedNeighborhoods.length === 0 &&
                        !wantsDunwoodyNews && (
                          <p className="text-gray-400">
                            No neighborhoods selected
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Topics Review */}
                  <div className="bg-black/20 backdrop-blur-md rounded-lg p-6 border border-gray-500/30">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white text-xl font-semibold">
                        Topics ({selectedTopics.length})
                      </h3>
                      <button
                        onClick={() => goToStep(3)}
                        className="text-blue-400 hover:text-blue-300 text-sm underline"
                      >
                        Edit
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
                  <button
                    onClick={handleBack}
                    className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-800 transition-colors"
                  >
                    Back
                  </button>
                  <Link
                    href="/"
                    className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Finish Setup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
