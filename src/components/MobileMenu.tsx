"use client";

import { Button } from "@/components/ui/button";
import { X, Search, ChevronRight } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeClick: () => void;
}

export function MobileMenu({ isOpen, onClose, onSubscribeClick }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto sm:max-w-[390px] sm:left-0 sm:right-auto sm:border-r sm:border-gray-200">
      {/* Menu Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-black">Menu</h2>
        <button
          onClick={onClose}
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

        {[
          "Home", "Local", "Politics", "Business", "Sports", "Entertainment",
          "Food & Dining", "Things to do", "Wellness", "Education", "Traffic",
          "Real Estate", "Technology", "Crime & Safety", "Weather"
        ].map((section) => (
          <a
            key={section}
            href="#"
            className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
          >
            <span>{section}</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </a>
        ))}
      </div>

      {/* More Section */}
      <div className="py-2 border-t border-gray-200">
        <div className="px-4 py-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            MORE
          </h3>
        </div>

        {[
          { name: "Access Atlanta", desc: "Events, dining, and entertainment" },
          { name: "UATL", desc: "University of Atlanta coverage" },
          { name: "Newsletters", desc: "Subscribe to our newsletters" },
          { name: "Obituaries", desc: "Recent obituaries and memorials" },
          { name: "Classifieds", desc: "Jobs, cars, homes, and more" }
        ].map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center justify-between px-4 py-3 text-base text-gray-900 hover:bg-gray-50"
          >
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-600">{item.desc}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </a>
        ))}
      </div>

      {/* Footer Links */}
      <div className="py-4 px-4 space-y-3 border-t border-gray-200">
        <a href="#" className="block text-sm text-gray-600 hover:text-gray-900">
          Customer Support
        </a>
        <a href="#" className="block text-sm text-gray-600 hover:text-gray-900">
          Privacy Policy
        </a>
        <a href="#" className="block text-sm text-gray-600 hover:text-gray-900">
          Terms of Service
        </a>
        <div className="pt-2 text-xs text-gray-500">
          © 2025 The Atlanta Journal-Constitution
        </div>
      </div>
    </div>
  );
}