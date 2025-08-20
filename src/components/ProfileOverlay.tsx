"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, User, Settings, Bell, BookOpen, Mail, Clock, Camera } from "lucide-react";

interface ProfileOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileOverlay({ isOpen, onClose }: ProfileOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Hello Jason!</h2>
          <button
            onClick={onClose}
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
              <h3 className="text-xl font-semibold text-gray-900">Settings</h3>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
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
            </div>
            <Button variant="outline" className="mt-4 bg-transparent">
              Customize Topics
            </Button>
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
                  Atlanta City Council Approves Major Infrastructure Investment
                </h4>
                <p className="text-sm text-gray-600">Read 2 hours ago</p>
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