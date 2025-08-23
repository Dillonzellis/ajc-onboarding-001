"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  subscription: {
    isActive: boolean;
    plan: string;
    renewalDate?: string;
  };
  savedStories: string[];
  followedJournalists: string[];
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
  isStorySaved: (storyId: string) => boolean;
  addFollowedJournalist: (journalistId: string) => void;
  removeFollowedJournalist: (journalistId: string) => void;
  isJournalistFollowed: (journalistId: string) => boolean;
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
  followedJournalists: [],
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

function getInitialUser(): User {
  if (typeof window === 'undefined') return defaultUser;
  
  try {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const storedUser = JSON.parse(stored);
      return {
        ...defaultUser,
        ...storedUser,
        onboarding: {
          ...defaultUser.onboarding,
          ...storedUser.onboarding,
        },
      };
    }
  } catch (error) {
    console.error("Failed to parse user data from localStorage:", error);
  }
  return defaultUser;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedUser = getInitialUser();
    setUser(storedUser);
    setIsHydrated(true);
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("userData", JSON.stringify(user));
    }
  }, [user]);

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

  const isStorySaved = (storyId: string) => {
    return user.savedStories.includes(storyId);
  };

  const addFollowedJournalist = (journalistId: string) => {
    setUser((prev) => ({
      ...prev,
      followedJournalists: [...prev.followedJournalists, journalistId],
    }));
  };

  const removeFollowedJournalist = (journalistId: string) => {
    setUser((prev) => ({
      ...prev,
      followedJournalists: prev.followedJournalists.filter((id) => id !== journalistId),
    }));
  };

  const isJournalistFollowed = (journalistId: string) => {
    return user.followedJournalists.includes(journalistId);
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
    setUser((prev) => {
      const updatedOnboarding = {
        ...prev.onboarding,
        ...onboardingData,
      };
      
      // Auto-complete onboarding if any selection is made
      const hasSelections = 
        updatedOnboarding.selectedNewsletters.length > 0 ||
        updatedOnboarding.selectedNeighborhoods.length > 0 ||
        updatedOnboarding.selectedTopics.length > 0;
      
      return {
        ...prev,
        onboarding: {
          ...updatedOnboarding,
          isCompleted: hasSelections,
        },
      };
    });
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
        isStorySaved,
        addFollowedJournalist,
        removeFollowedJournalist,
        isJournalistFollowed,
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
