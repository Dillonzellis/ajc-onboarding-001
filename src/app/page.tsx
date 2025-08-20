"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { MobileMenu } from "@/components/MobileMenu";
import { SubscriptionOverlay } from "@/components/SubscriptionOverlay";
import { ProfileOverlay } from "@/components/ProfileOverlay";
import { SavedOverlay } from "@/components/SavedOverlay";
import { ArticleContent } from "@/components/ArticleContent";
import { Footer } from "@/components/Footer";

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

  const handleBackToPlans = () => {
    setSubscriptionStep("plans");
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
      setSavedStories((prev) =>
        prev.filter((story) => story.id !== currentStory.id),
      );
      setIsCurrentStorySaved(false);
    } else {
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
      <Header
        isSubscribed={isSubscribed}
        savedStoriesCount={savedStories.length}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        onSavedClick={handleSavedClick}
        onProfileClick={handleProfileClick}
        onSubscribeClick={handleSubscribeClick}
      />

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSubscribeClick={handleSubscribeClick}
      />

      <SubscriptionOverlay
        isOpen={showSubscriptionOverlay}
        step={subscriptionStep}
        selectedPlan={selectedPlan}
        plans={subscriptionPlans}
        onClose={closeSubscription}
        onPlanSelect={handlePlanSelect}
        onCompleteSubscription={handleCompleteSubscription}
        onContinueReading={handleContinueReading}
        onSetupPreferences={handleSetupPreferences}
        onBackToPlans={handleBackToPlans}
      />

      <ProfileOverlay
        isOpen={showProfileOverlay}
        onClose={() => setShowProfileOverlay(false)}
      />

      <SavedOverlay
        isOpen={showSavedOverlay}
        savedTab={savedTab}
        savedStories={savedStories}
        followedJournalists={followedJournalists}
        searchQuery={searchQuery}
        filteredSavedStories={filteredSavedStories}
        onClose={() => setShowSavedOverlay(false)}
        onTabChange={setSavedTab}
        onSearchChange={setSearchQuery}
        onRemoveSavedStory={handleRemoveSavedStory}
        onUnfollowJournalist={handleUnfollowJournalist}
      />

      <ArticleContent
        isSubscribed={isSubscribed}
        isCurrentStorySaved={isCurrentStorySaved}
        isFollowingJournalist={followedJournalists.some((j) => j.id === "sarah-mitchell")}
        onSaveStory={handleSaveStory}
        onFollowJournalist={handleFollowJournalist}
      />

      <Footer />
    </div>
  );
}