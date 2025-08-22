"use client";

import { Bell, Camera, Clock, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import Header from "@/components/header/header";
import { useUser } from "@/lib/user-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TopicsOfInterest from "@/components/profile/topics-of-interest";
import Neighborhoods from "@/components/profile/neighborhoods";
import NewsletterSubscriptions from "@/components/profile/newsletter-subscriptions";

export default function ProfileOverlay() {
  const { user, updateUser, resetUser, isHydrated } = useUser();
  const router = useRouter();

  if (!isHydrated) {
    return null; // Prevents flash, hydration happens very quickly
  }

  const handleSignOut = () => {
    resetUser();
    router.push("/");
  };

  const handleThemeToggle = () => {
    updateUser({
      preferences: {
        ...user.preferences,
        theme: user.preferences.theme === "light" ? "dark" : "light",
      },
    });
  };

  const handleNotificationToggle = () => {
    updateUser({
      preferences: {
        ...user.preferences,
        notifications: !user.preferences.notifications,
      },
    });
  };

  return (
    <div className="bg-white">
      <Header
        onSavedClick={() => {}}
        onSubscribeClick={() => {}}
        savedStoriesCount={user.savedStories.length}
      />
      <div className="p-6">
        {!user.onboarding.isCompleted && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="bg-blue-50 border border-[#004FFF] rounded-lg p-4">
              <p className="text-[#004FFF] font-medium">
                Complete your setup by selecting topics of interest below to
                personalize your custom feed.
              </p>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-8 md:max-w-4xl md:mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Hello Jason!</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Account Information
              </h3>
            </div>

            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-[#004FFF] rounded-full flex items-center justify-center text-white text-2xl font-bold">
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
                <p className="text-gray-900">Jason Foust</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">jason.foust@ajc.com</p>
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
              {user.subscription.isActive ? (
                <div className="bg-blue-50 border border-[#004FFF] rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-[#004FFF]">
                        {user.subscription.plan || "Premium Digital Plan"}
                      </p>
                      <p className="text-sm text-[#004FFF]">
                        $9.99/month • Renews{" "}
                        {user.subscription.renewalDate || "January 15, 2025"}
                      </p>
                      <p className="text-sm text-[#004FFF] mt-1">
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
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-600">No active subscription</p>
                </div>
              )}
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
                <Button variant="outline" size="sm" className="bg-transparent">
                  Edit Account Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:border-red-300 bg-transparent cursor-pointer"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">
                    Currently: {user.preferences.theme}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleThemeToggle}>
                  Toggle
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-600">
                    {user.preferences.notifications ? "Enabled" : "Disabled"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNotificationToggle}
                >
                  {user.preferences.notifications ? "Disable" : "Enable"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Privacy Settings</p>
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
                  {["Weather", "Traffic", "Breaking News", "Sports Scores"].map(
                    (update) => (
                      <label key={update} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-gray-900">{update}</span>
                      </label>
                    ),
                  )}
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004FFF]"></div>
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

              <Button className="mt-6 bg-[#004FFF] hover:bg-[#003ACC] text-white">
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
                  className="bg-blue-50 text-[#004FFF] border-[#004FFF]"
                >
                  Enabled
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Daily Newsletter</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-blue-50 text-[#004FFF] border-[#004FFF]"
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
                  className="bg-blue-50 text-[#004FFF] border-[#004FFF]"
                >
                  Enabled
                </Button>
              </div>
            </div>
          </div>

          <TopicsOfInterest />
          <Neighborhoods />
          <NewsletterSubscriptions />

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
                <h4 className="font-medium text-gray-900 hover:text-[#004FFF] cursor-pointer">
                  Atlanta City Council Approves Major Infrastructure Investment
                </h4>
                <p className="text-sm text-gray-600">Read 2 hours ago</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <h4 className="font-medium text-gray-900 hover:text-[#004FFF] cursor-pointer">
                  Georgia Election Results: What You Need to Know
                </h4>
                <p className="text-sm text-gray-600">Read yesterday</p>
              </div>
              <div className="border-b border-gray-100 pb-3">
                <h4 className="font-medium text-gray-900 hover:text-[#004FFF] cursor-pointer">
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
  );
}
