"use client";

import { Menu, X, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/lib/user-context";

interface HeaderProps {
  savedStoriesCount: number;
  onSavedClick: () => void;
  onSubscribeClick: () => void;
}

export default function Header({
  savedStoriesCount,
  onSavedClick,
  onSubscribeClick,
}: HeaderProps) {
  const { user, setSubscription, isHydrated } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
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
              <Link href="/" className="text-2xl font-bold text-black">
                AJC
              </Link>
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
            {!isHydrated ? (
              <>
                <Button
                  className="rounded-full border-slate-200 border bg-transparent"
                  variant="outline"
                  size="sm"
                  disabled
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-[#004FFF] hover:bg-[#003ACC] rounded-full"
                  disabled
                >
                  Subscribe
                </Button>
              </>
            ) : user.subscription.isActive ? (
              <>
                <Button
                  className="rounded-full bg-transparent"
                  variant="outline"
                  size="sm"
                  onClick={onSavedClick}
                >
                  Saved ({savedStoriesCount})
                </Button>
                <Button
                  asChild
                  className="rounded-full bg-transparent"
                  variant="outline"
                  size="sm"
                >
                  <Link href="/profile" className="flex items-center gap-2">
                    Profile
                    {!user.onboarding.isCompleted && (
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="rounded-full border-slate-200 border bg-transparent"
                  variant="outline"
                  size="sm"
                  onClick={() => setSubscription(true)}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-[#004FFF] hover:bg-[#003ACC] rounded-full"
                  onClick={onSubscribeClick}
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
              />
            </div>
          </div>

          {/* Subscribe CTA Section */}
          <div className="p-4 border-b border-gray-200">
            <Button
              className="w-full bg-[#004FFF] hover:bg-[#003ACC] text-white font-semibold py-3"
              onClick={onSubscribeClick}
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
  );
}
