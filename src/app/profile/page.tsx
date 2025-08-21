"use client";

import {
  Bell,
  BookOpen,
  Camera,
  Clock,
  Mail,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header/header";
import { useUser } from "@/lib/user-context";
import { useRouter } from "next/navigation";

export default function ProfileOverlay() {
  const { user, setSubscription, updateUser } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    setSubscription(false);
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
        <div className="flex justify-between items-center mb-8 md:max-w-4xl md:mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Hello Jason!</h2>
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
                        $9.99/month • Renews {user.subscription.renewalDate || "January 15, 2025"}
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
                  className="text-red-600 hover:text-red-700 hover:border-red-300 bg-transparent"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Personalization Preferences */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Your Preferences</h3>
            </div>
            
            {/* Newsletters */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Newsletters ({user.onboarding.selectedNewsletters.length})</h4>
              {user.onboarding.selectedNewsletters.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.onboarding.selectedNewsletters.map((newsletter) => (
                    <Badge key={newsletter} variant="secondary" className="bg-blue-50 text-blue-700">
                      {newsletter}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No newsletters selected</p>
              )}
            </div>

            {/* Neighborhoods */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Neighborhoods ({user.onboarding.selectedNeighborhoods.length})</h4>
              {user.onboarding.selectedNeighborhoods.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.onboarding.selectedNeighborhoods.map((neighborhood) => (
                    <Badge key={neighborhood} variant="secondary" className="bg-green-50 text-green-700">
                      {neighborhood}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No neighborhoods selected</p>
              )}
            </div>

            {/* Topics */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Topics of Interest ({user.onboarding.selectedTopics.length})</h4>
              {user.onboarding.selectedTopics.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.onboarding.selectedTopics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="bg-purple-50 text-purple-700">
                      {topic}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No topics selected</p>
              )}
            </div>

            <Button variant="outline" size="sm" onClick={() => router.push('/onboarding')}>
              Update Preferences
            </Button>
          </div>

          {/* Settings Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Settings className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Currently: {user.preferences.theme}</p>
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
                <Button variant="outline" size="sm" onClick={handleNotificationToggle}>
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
          </div>
        </div>
      </div>
    </div>
  );
}