"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface HeaderProps {
  isSubscribed: boolean;
  savedStoriesCount: number;
  onMenuToggle: () => void;
  onSavedClick: () => void;
  onProfileClick: () => void;
  onSubscribeClick: () => void;
}

export function Header({
  isSubscribed,
  savedStoriesCount,
  onMenuToggle,
  onSavedClick,
  onProfileClick,
  onSubscribeClick,
}: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <button
                onClick={onMenuToggle}
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
                <Button variant="outline" size="sm" onClick={onSavedClick}>
                  Saved ({savedStoriesCount})
                </Button>
                <Button variant="outline" size="sm" onClick={onProfileClick}>
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
                  onClick={onSubscribeClick}
                >
                  Subscribe
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}