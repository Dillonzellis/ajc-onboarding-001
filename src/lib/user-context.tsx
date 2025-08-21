"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  subscription: {
    isActive: boolean;
    plan: string;
    renewalDate?: string;
  };
  savedStories: string[];
  topics: string[];
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  addSavedStory: (storyId: string) => void;
  removeSavedStory: (storyId: string) => void;
  addTopic: (topic: string) => void;
  removeTopic: (topic: string) => void;
  setSubscription: (
    isActive: boolean,
    plan?: string,
    renewalDate?: string,
  ) => void;
}

const defaultUser: User = {
  subscription: {
    isActive: false,
    plan: "",
  },
  savedStories: [],
  topics: [],
  preferences: {
    theme: "light",
    notifications: true,
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  // Load user data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      try {
        setUser({ ...defaultUser, ...JSON.parse(stored) });
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  // Save user data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
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

  const addTopic = (topic: string) => {
    setUser((prev) => ({
      ...prev,
      topics: [...prev.topics, topic],
    }));
  };

  const removeTopic = (topic: string) => {
    setUser((prev) => ({
      ...prev,
      topics: prev.topics.filter((t) => t !== topic),
    }));
  };

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

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        addSavedStory,
        removeSavedStory,
        addTopic,
        removeTopic,
        setSubscription,
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
