"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Share2,
  Plus,
  Menu,
  Volume2,
  X,
  ChevronRight,
  Search,
  CreditCard,
  Check,
  Bookmark,
  User,
  Settings,
  Bell,
  BookOpen,
  Mail,
  Clock,
  UserPlus,
  Camera,
} from "lucide-react";
import { useState } from "react";

export default function AJCStoryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSubscriptionOverlay, setShowSubscriptionOverlay] = useState(false);
  const [subscriptionStep, setSubscriptionStep] = useState<
    "plans" | "form" | "completion"
  >("plans");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [showCompletionOptions, setShowCompletionOptions] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showProfileOverlay, setShowProfileOverlay] = useState(false);
  const [showSavedOverlay, setShowSavedOverlay] = useState(false);
  const [savedStories, setSavedStories] = useState<
    Array<{
      id: string;
      title: string;
      subtitle: string;
      author: string;
      date: string;
      readTime: string;
      category: string;
      image: string;
    }>
  >([]);
  const [savedTab, setSavedTab] = useState<"articles" | "journalists">(
    "articles",
  );
  const [followedJournalists, setFollowedJournalists] = useState<
    Array<{
      id: string;
      name: string;
      title: string;
      avatar: string;
      followedDate: string;
    }>
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCurrentStorySaved, setIsCurrentStorySaved] = useState(false);

  const subscriptionPlans = [
    {
      id: "digital",
      name: "Digital Access",
      price: "$1",
      period: "for first 6 months, then $9.99/month",
      originalPrice: "$9.99/month",
      savings: "Save 90% for 6 months",
      features: [
        "Unlimited access to AJC.com",
        "Premium newsletters",
        "Mobile app access",
        "Ad-free reading experience",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Premium Digital",
      price: "$2",
      period: "for first 6 months, then $14.99/month",
      originalPrice: "$14.99/month",
      savings: "Save 87% for 6 months",
      features: [
        "Everything in Digital Access",
        "Exclusive subscriber content",
        "Premium podcasts",
        "Early access to breaking news",
        "Digital replica of print edition",
      ],
      popular: false,
    },
    {
      id: "print-digital",
      name: "Print + Digital",
      price: "$3",
      period: "for first 6 months, then $19.99/month",
      originalPrice: "$19.99/month",
      savings: "Save 85% for 6 months",
      features: [
        "Everything in Premium Digital",
        "Sunday print delivery",
        "Exclusive subscriber events",
        "Premium customer support",
      ],
      popular: false,
    },
  ];

  const handleSubscribeClick = () => {
    setShowSubscriptionOverlay(true);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setSubscriptionStep("form");
  };

  const handleCompleteSubscription = () => {
    setSubscriptionStep("completion");
    setShowCompletionOptions(true);
  };

  const handleContinueReading = () => {
    setIsSubscribed(true);
    setShowSubscriptionOverlay(false);
    setSelectedPlan("");
    setSubscriptionStep("plans");
    setShowCompletionOptions(false);
  };

  const handleSetupPreferences = () => {
    console.log("Navigate to preferences setup");
  };

  const closeSubscription = () => {
    setShowSubscriptionOverlay(false);
    setSelectedPlan("");
    setSubscriptionStep("plans");
    setShowCompletionOptions(false);
  };

  const handleProfileClick = () => {
    setShowProfileOverlay(true);
  };

  const handleSavedClick = () => {
    setShowSavedOverlay(true);
  };

  const handleSaveStory = () => {
    const currentStory = {
      id: "1",
      title:
        "MARTA Expansion Project Faces New Challenges as Community Voices Concerns Over Affordable Housing Impact",
      subtitle:
        "Local residents and advocacy groups raise questions about displacement and gentrification as transit development moves forward",
      author: "Sarah Mitchell",
      date: "December 15, 2024",
      readTime: "6 min read",
      category: "Georgia News",
      image: "/marta-station-atlanta.png",
    };

    if (isCurrentStorySaved) {
      // Remove from saved stories
      setSavedStories((prev) =>
        prev.filter((story) => story.id !== currentStory.id),
      );
      setIsCurrentStorySaved(false);
    } else {
      // Add to saved stories if not already saved
      if (!savedStories.find((story) => story.id === currentStory.id)) {
        setSavedStories((prev) => [currentStory, ...prev]);
      }
      setIsCurrentStorySaved(true);
    }
  };

  const handleRemoveSavedStory = (storyId: string) => {
    setSavedStories((prev) => prev.filter((story) => story.id !== storyId));
    if (storyId === "1") {
      setIsCurrentStorySaved(false);
    }
  };

  const handleFollowJournalist = () => {
    const journalist = {
      id: "sarah-mitchell",
      name: "Sarah Mitchell",
      title: "City Hall Reporter",
      avatar: "/placeholder-f78sg.png",
      followedDate: new Date().toLocaleDateString(),
    };

    const isAlreadyFollowed = followedJournalists.some(
      (j) => j.id === journalist.id,
    );
    if (!isAlreadyFollowed) {
      setFollowedJournalists((prev) => [...prev, journalist]);
    }
  };

  const handleUnfollowJournalist = (journalistId: string) => {
    setFollowedJournalists((prev) => prev.filter((j) => j.id !== journalistId));
  };

  const filteredSavedStories = savedStories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Menu className="h-6 w-6 text-gray-700" />
                </button>
                <div className="text-2xl font-bold text-black">AJC</div>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-black">
                  News
                </a>
                <a href="#" className="text-gray-700 hover:text-black">
                  Sports
                </a>
                <a href="#" className="text-gray-700 hover:text-black">
                  Business
                </a>
                <a href="#" className="text-gray-700 hover:text-black">
                  Opinion
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              {isSubscribed ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSavedClick}
                  >
                    Saved ({savedStories.length})
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={handleSubscribeClick}
                  >
                    Subscribe
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto sm:max-w-[390px] sm:left-0 sm:right-auto sm:border-r sm:border-gray-200">
            {/* Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-black">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search AJC..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Subscribe CTA Section */}
            <div className="p-4 border-b border-gray-200">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                onClick={handleSubscribeClick}
              >
                Subscribe to AJC
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Get unlimited access to premium content
              </p>
            </div>

            {/* Sections */}
            <div className="py-2">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  SECTIONS
                </h3>
              </div>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Home</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Local</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Politics</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Business</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Sports</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Entertainment</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Food & Dining</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Things to do</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Wellness</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Education</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Traffic</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Real Estate</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Technology</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Crime & Safety</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <span>Weather</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>
            </div>

            {/* More Section */}
            <div className="py-2 border-t border-gray-200">
              <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  MORE
                </h3>
              </div>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">Access Atlanta</div>
                  <div className="text-sm text-gray-600">
                    Events, dining, and entertainment
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">UATL</div>
                  <div className="text-sm text-gray-600">
                    University of Atlanta coverage
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">Newsletters</div>
                  <div className="text-sm text-gray-600">
                    Subscribe to our newsletters
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">Obituaries</div>
                  <div className="text-sm text-gray-600">
                    Recent obituaries and memorials
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>

              <a
                href="#"
                className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">Classifieds</div>
                  <div className="text-sm text-gray-600">
                    Jobs, cars, homes, and more
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>
            </div>

            {/* Footer Links */}
            <div className="py-4 px-4 space-y-3 border-t border-gray-200">
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Customer Support
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-sm text-gray-600 hover:text-gray-900"
              >
                Terms of Service
              </a>
              <div className="pt-2 text-xs text-gray-500">
                © 2025 The Atlanta Journal-Constitution
              </div>
            </div>
          </div>
        )}
      </header>

      {showSubscriptionOverlay && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
          {subscriptionStep === "plans" ? (
            // Subscription Plans View
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Choose Your Plan
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Get unlimited access to Georgia's most trusted news source
                  </p>
                </div>
                <button
                  onClick={closeSubscription}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`border rounded-lg p-6 relative ${
                      plan.popular
                        ? "border-blue-500 ring-2 ring-blue-500 ring-opacity-20"
                        : "border-gray-200"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
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
                        <span className="text-gray-600 ml-1">
                          {plan.period}
                        </span>
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
                          <span className="text-gray-700 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      Select Plan
                    </Button>
                  </div>
                ))}
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
                      {
                        subscriptionPlans.find((p) => p.id === selectedPlan)
                          ?.name
                      }{" "}
                      -{" "}
                      {
                        subscriptionPlans.find((p) => p.id === selectedPlan)
                          ?.price
                      }{" "}
                      {
                        subscriptionPlans.find((p) => p.id === selectedPlan)
                          ?.period
                      }
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="bg-blue-600 hover:bg-blue-700 px-8"
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
                      We're so glad you're here Jason!
                    </h2>
                  </div>

                  {/* Welcome Video Section */}
                  <div className="mb-8">
                    <div className="max-w-lg mx-auto">
                      <p className="text-lg text-gray-700 mb-4 leading-6">
                        A special welcome from Andrew Morse, President and
                        Publisher of The AJC
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

                <div className="flex gap-4 justify-center max-w-lg mx-auto">
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
                    onClick={handleSetupPreferences}
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
      )}

      {showProfileOverlay && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Hello Jason!</h2>
              <button
                onClick={() => setShowProfileOverlay(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Account Information Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Account Information
                  </h3>
                </div>

                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      J
                    </div>
                    <button className="absolute -bottom-1 -right-1 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-50">
                      <Camera className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="ml-4 space-x-2">
                    <Button variant="outline" size="sm">
                      Upload Photo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <p className="text-gray-900">Jason Smith</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">jason.smith@email.com</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Member Since
                    </label>
                    <p className="text-gray-900">December 2024</p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Subscription Details
                  </h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-blue-900">
                          Premium Digital Plan
                        </p>
                        <p className="text-sm text-blue-700">
                          $9.99/month • Renews January 15, 2025
                        </p>
                        <p className="text-sm text-blue-600 mt-1">
                          Unlimited access to all AJC content
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Manage Subscription
                    </Button>
                    <Button variant="outline" size="sm">
                      Billing History
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Payment
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="mt-6 bg-transparent">
                  Edit Account Details
                </Button>
              </div>

              {/* Settings Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Settings className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Settings
                  </h3>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-600">
                        Switch to dark theme
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Toggle
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Email Notifications
                      </p>
                      <p className="text-sm text-gray-600">
                        Receive breaking news alerts
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Privacy Settings
                      </p>
                      <p className="text-sm text-gray-600">
                        Control your data preferences
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">
                    Build Your Routine
                  </h4>

                  {/* Routine Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose Your Routine
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="routine"
                          value="morning"
                          className="mr-2"
                          defaultChecked
                        />
                        <span className="text-gray-900">Morning Routine</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="routine"
                          value="afternoon"
                          className="mr-2"
                        />
                        <span className="text-gray-900">Afternoon Routine</span>
                      </label>
                    </div>
                  </div>

                  {/* Podcast Preferences */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Podcast Preferences
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Politically Georgia",
                        "Breakdown",
                        "The Voices of King",
                        "HBCU Journeys",
                        "The Monica Pearson Show",
                      ].map((podcast) => (
                        <label key={podcast} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-900">{podcast}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Quick Updates */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Quick Updates
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        "Weather",
                        "Traffic",
                        "Breaking News",
                        "Sports Scores",
                      ].map((update) => (
                        <label key={update} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-900">{update}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter Subscriptions */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Newsletter Subscriptions
                    </label>
                    <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          "Politically Georgia",
                          "AJC ePaper Daily",
                          "Letter from the Editor",
                          "Today's Top 5",
                          "A.M. ATLANTA",
                          "Afternoon Update",
                          "Breaking News",
                          "UATL",
                          "Sports Daily",
                          "Braves Report",
                          "Politics",
                          "Food & Dining",
                          "Access ATL",
                          "Aging in Atlanta",
                          "Evening Update",
                          "Good Day UGA",
                          "Jobseekers",
                          "Pulse Plus",
                          "Travel",
                          "Weekend Update",
                          "AJC Peachtree Road Race",
                          "Sweet Tea by the AJC",
                          "Dirty and Birds Dispatch",
                        ].map((newsletter) => (
                          <label
                            key={newsletter}
                            className="flex items-center py-1"
                          >
                            <input type="checkbox" className="mr-2" />
                            <span className="text-gray-900 text-sm">
                              {newsletter}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Routine Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Enable Routine Button
                        </p>
                        <p className="text-sm text-gray-600">
                          Show routine button on homepage
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timeframe
                        </label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                          <option>6:00 AM - 9:00 AM</option>
                          <option>9:00 AM - 12:00 PM</option>
                          <option>12:00 PM - 3:00 PM</option>
                          <option>3:00 PM - 6:00 PM</option>
                          <option>6:00 PM - 9:00 PM</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frequency
                        </label>
                        <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                          <option>Daily</option>
                          <option>Weekdays Only</option>
                          <option>Weekends Only</option>
                          <option>Custom</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                    Save Routine Preferences
                  </Button>
                </div>
              </div>

              {/* Notification Preferences Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Bell className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Notification Preferences
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Breaking News Alerts</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-blue-50 text-blue-600 border-blue-200"
                    >
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Daily Newsletter</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-blue-50 text-blue-600 border-blue-200"
                    >
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Sports Updates</span>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">Weather Alerts</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-blue-50 text-blue-600 border-blue-200"
                    >
                      Enabled
                    </Button>
                  </div>
                </div>
              </div>

              {/* Topics of Interest Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Topics of Interest
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200 justify-center py-2"
                  >
                    Politics
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200 justify-center py-2"
                  >
                    Local News
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200 justify-center py-2"
                  >
                    Business
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    Sports
                  </Badge>
                  <Badge variant="outline" className="justify-center py-2">
                    Entertainment
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-200 justify-center py-2"
                  >
                    Technology
                  </Badge>
                </div>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Customize Topics
                </Button>
              </div>

              {/* Newsletter Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Newsletter Subscriptions
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Morning Briefing
                      </p>
                      <p className="text-sm text-gray-600">
                        Daily news summary delivered at 7 AM
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 text-green-600 border-green-200"
                    >
                      Subscribed
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Atlanta Business Weekly
                      </p>
                      <p className="text-sm text-gray-600">
                        Weekly business insights and market updates
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Subscribe
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Sports Roundup
                      </p>
                      <p className="text-sm text-gray-600">
                        Weekly sports highlights and analysis
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>

              {/* Reading History Section */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-gray-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Reading History
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                      Atlanta City Council Approves Major Infrastructure
                      Investment
                    </h4>
                    <p className="text-sm text-gray-600">Read 2 hours ago</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                      Georgia Election Results: What You Need to Know
                    </h4>
                    <p className="text-sm text-gray-600">Read yesterday</p>
                  </div>
                  <div className="border-b border-gray-100 pb-3">
                    <h4 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                      Hawks Trade Rumors Heat Up Before Deadline
                    </h4>
                    <p className="text-sm text-gray-600">Read 2 days ago</p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 bg-transparent">
                  View Full History
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSavedOverlay && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="min-h-screen">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSavedOverlay(false)}
                  className="p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex space-x-8 mt-4">
                <button
                  onClick={() => setSavedTab("articles")}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    savedTab === "articles"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Saved Articles
                </button>
                <button
                  onClick={() => setSavedTab("journalists")}
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                    savedTab === "journalists"
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Journalists You Follow
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">
              {savedTab === "articles" ? (
                <>
                  {savedStories.length > 0 && (
                    <div className="mb-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search saved articles..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  {filteredSavedStories.length === 0 ? (
                    <div className="text-center py-16">
                      <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {savedStories.length === 0
                          ? "No saved stories yet"
                          : "No articles match your search"}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {savedStories.length === 0
                          ? "Stories you save will appear here for easy access later."
                          : "Try adjusting your search terms to find what you're looking for."}
                      </p>
                      <Button onClick={() => setShowSavedOverlay(false)}>
                        Continue Reading
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                          {filteredSavedStories.length}{" "}
                          {filteredSavedStories.length === 1
                            ? "story"
                            : "stories"}
                          {searchQuery && " found"}
                        </p>
                      </div>

                      <div className="grid gap-6">
                        {filteredSavedStories.map((story) => (
                          <div
                            key={story.id}
                            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex gap-4">
                              <img
                                src={story.image || "/placeholder.svg"}
                                alt=""
                                className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="inline-block px-2 py-1 text-xs font-medium bg-transparent border border-gray-400 text-white rounded">
                                        {story.category}
                                      </span>
                                      <span className="text-sm text-gray-500">
                                        {story.date} • {story.readTime}
                                      </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                      {story.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                      {story.subtitle}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      By {story.author}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleRemoveSavedStory(story.id)
                                    }
                                    className="text-gray-400 hover:text-red-500 p-1"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Added journalists you follow tab content */
                <>
                  {followedJournalists.length === 0 ? (
                    <div className="text-center py-16">
                      <UserPlus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        No journalists followed yet
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Follow journalists to stay updated with their latest
                        stories.
                      </p>
                      <Button onClick={() => setShowSavedOverlay(false)}>
                        Continue Reading
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                          Following {followedJournalists.length}{" "}
                          {followedJournalists.length === 1
                            ? "journalist"
                            : "journalists"}
                        </p>
                      </div>

                      <div className="grid gap-4">
                        {followedJournalists.map((journalist) => (
                          <div
                            key={journalist.id}
                            className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src={
                                      journalist.avatar || "/placeholder.svg"
                                    }
                                  />
                                  <AvatarFallback>
                                    {journalist.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-gray-900">
                                    {journalist.name}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {journalist.title}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Followed on {journalist.followedDate}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleUnfollowJournalist(journalist.id)
                                }
                                className="text-gray-600 hover:text-red-600"
                              >
                                Unfollow
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {/* Article Header */}
        <article className="space-y-6">
          <div
            className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] p-6"
            style={{ backgroundColor: "#282828" }}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="secondary"
                    className="bg-transparent border border-gray-400 text-white hover:bg-transparent"
                  >
                    GEORGIA NEWS
                  </Badge>
                  <span className="text-sm text-gray-300">
                    December 19, 2024 • 6 min read
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-white leading-tight">
                  Atlanta City Council Approves Major Infrastructure Investment
                  for Downtown Revitalization
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  The $2.3 billion plan will transform transportation, housing,
                  and green spaces across the city center over the next decade.
                </p>
              </div>

              {/* Featured Image */}
              <div className="space-y-3 mt-6">
                <img
                  src="/placeholder-tsr1e.png"
                  alt="Atlanta downtown construction and development"
                  className="w-full h-96 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-400 italic">
                  Construction cranes dot the Atlanta skyline as the city
                  prepares for major infrastructure improvements. (AJC file
                  photo)
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-f78sg.png" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-gray-900">
                    Sarah Mitchell
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-3 text-xs bg-transparent"
                    onClick={handleFollowJournalist}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {followedJournalists.some((j) => j.id === "sarah-mitchell")
                      ? "Following"
                      : "Follow"}
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  City Hall Reporter • Published 2 hours ago • Updated 1 hour
                  ago
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
              {isSubscribed && (
                <Button
                  variant={isCurrentStorySaved ? "default" : "outline"}
                  size="sm"
                  onClick={handleSaveStory}
                  className={
                    isCurrentStorySaved
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : ""
                  }
                >
                  <Bookmark
                    className={`h-4 w-4 mr-2 ${isCurrentStorySaved ? "fill-current" : ""}`}
                  />
                  {isCurrentStorySaved ? "Saved" : "Save"}
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Volume2 className="h-4 w-4 mr-2" />
                Listen
              </Button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-gray-800 leading-relaxed">
                In a unanimous vote Tuesday evening, the Atlanta City Council
                approved a comprehensive $2.3 billion infrastructure package
                that promises to reshape downtown Atlanta over the next decade.
                The ambitious plan addresses long-standing concerns about
                transportation, affordable housing, and green space
                accessibility in the city's core.
              </p>

              <p className="text-gray-800 leading-relaxed">
                "This is a transformative moment for our city," said Council
                President Doug Shipman during the meeting. "We're not just
                fixing what's broken – we're building the foundation for
                Atlanta's next chapter of growth and prosperity."
              </p>

              <p className="text-gray-800 leading-relaxed">
                The package includes $800 million for transit improvements,
                including expanded MARTA connectivity and dedicated bus rapid
                transit lanes. Another $600 million will fund affordable housing
                initiatives, with a goal of creating 5,000 new units within
                walking distance of major employment centers.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 my-8">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Key Investment Areas:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• $800M for transit and transportation improvements</li>
                  <li>• $600M for affordable housing development</li>
                  <li>• $500M for green infrastructure and parks</li>
                  <li>
                    • $400M for utility modernization and broadband expansion
                  </li>
                </ul>
              </div>

              <p className="text-gray-800 leading-relaxed">
                Environmental sustainability features prominently in the plan,
                with $500 million allocated for green infrastructure projects.
                This includes the creation of three new downtown parks, expanded
                tree canopy coverage, and implementation of sustainable
                stormwater management systems.
              </p>

              <p className="text-gray-800 leading-relaxed">
                The remaining $400 million will modernize the city's utility
                infrastructure and expand high-speed broadband access to
                underserved neighborhoods, addressing digital equity concerns
                that became more apparent during the pandemic.
              </p>

              <p className="text-gray-800 leading-relaxed">
                Funding for the initiative will come from a combination of
                federal infrastructure grants, municipal bonds, and
                public-private partnerships. City officials expect construction
                to begin in early 2025, with the first phase of projects
                completed by 2027.
              </p>
            </div>

            {/* Related Articles */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <img
                    src="/marta-station-atlanta.png"
                    alt="MARTA station"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                    MARTA Expansion Plans Could Connect More Atlanta
                    Neighborhoods
                  </h3>
                  <p className="text-sm text-gray-500">3 hours ago</p>
                </div>
                <div className="space-y-3">
                  <img
                    src="/atlanta-affordable-housing.png"
                    alt="Housing development"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                    Housing Crisis: Atlanta Tackles Affordability with New
                    Initiatives
                  </h3>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">
                The Atlanta Journal-Constitution
              </h3>
              <p className="text-gray-400 text-sm">
                Georgia's most trusted news source since 1868.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sections</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Opinion
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Subscribe
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Customer Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
