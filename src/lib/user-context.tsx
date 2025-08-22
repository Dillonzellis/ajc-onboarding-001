"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  subscription: {
    isActive: boolean;
    plan: string;
    renewalDate?: string;
  };
  savedStories: string[];
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
  onboarding: {
    isCompleted: boolean;
    selectedNewsletters: string[];
    selectedNeighborhoods: string[];
    selectedTopics: string[];
  };
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  addSavedStory: (storyId: string) => void;
  removeSavedStory: (storyId: string) => void;
  // addTopic: (topic: string) => void;
  // removeTopic: (topic: string) => void;
  setSubscription: (
    isActive: boolean,
    plan?: string,
    renewalDate?: string,
  ) => void;
  updateOnboarding: (onboardingData: Partial<User["onboarding"]>) => void;
  completeOnboarding: () => void;
  resetUser: () => void;
  isHydrated: boolean;
}

const defaultUser: User = {
  subscription: {
    isActive: false,
    plan: "",
  },
  savedStories: [],
  preferences: {
    theme: "light",
    notifications: true,
  },
  onboarding: {
    isCompleted: false,
    selectedNewsletters: [],
    selectedNeighborhoods: [],
    selectedTopics: [],
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load user data from localStorage after hydration
  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      try {
        const storedUser = JSON.parse(stored);
        setUser({
          ...defaultUser,
          ...storedUser,
          onboarding: {
            ...defaultUser.onboarding,
            ...storedUser.onboarding,
          },
        });
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save user data to localStorage when it changes (but only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [user, isHydrated]);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const addSavedStory = (storyId: string) => {
    setUser((prev) => ({
      ...prev,
      savedStories: [...prev.savedStories, storyId],
    }));
  };

  const removeSavedStory = (storyId: string) => {
    setUser((prev) => ({
      ...prev,
      savedStories: prev.savedStories.filter((id) => id !== storyId),
    }));
  };

  // const addTopic = (topic: string) => {
  //   setUser((prev) => ({
  //     ...prev,
  //     topics: [...prev.topics, topic],
  //   }));
  // };
  //
  // const removeTopic = (topic: string) => {
  //   setUser((prev) => ({
  //     ...prev,
  //     topics: prev.topics.filter((t) => t !== topic),
  //   }));
  // };

  const setSubscription = (
    isActive: boolean,
    plan?: string,
    renewalDate?: string,
  ) => {
    setUser((prev) => ({
      ...prev,
      subscription: {
        isActive,
        plan: plan || prev.subscription.plan,
        renewalDate: renewalDate || prev.subscription.renewalDate,
      },
    }));
  };

  const updateOnboarding = (onboardingData: Partial<User["onboarding"]>) => {
    setUser((prev) => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        ...onboardingData,
      },
    }));
  };

  const completeOnboarding = () => {
    setUser((prev) => ({
      ...prev,
      onboarding: {
        ...prev.onboarding,
        isCompleted: true,
      },
    }));
  };

  const resetUser = () => {
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        addSavedStory,
        removeSavedStory,
        // addTopic,
        // removeTopic,
        setSubscription,
        updateOnboarding,
        completeOnboarding,
        resetUser,
        isHydrated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
