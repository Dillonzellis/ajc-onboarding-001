"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { X, Search, Bookmark, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Story, Journalist } from "@/lib/story-data";

interface JournalistWithFollowDate extends Journalist {
  followedDate: string;
}

interface SavedOverlayProps {
  isOpen: boolean;
  savedTab: "articles" | "journalists";
  savedStories: Story[];
  followedJournalists: JournalistWithFollowDate[];
  searchQuery: string;
  filteredSavedStories: Story[];
  onClose: () => void;
  onTabChange: (tab: "articles" | "journalists") => void;
  onSearchChange: (query: string) => void;
  onRemoveSavedStory: (storyId: string) => void;
  onUnfollowJournalist: (journalistId: string) => void;
}

export default function SavedOverlay({
  isOpen,
  savedTab,
  savedStories,
  followedJournalists,
  searchQuery,
  filteredSavedStories,
  onClose,
  onTabChange,
  onSearchChange,
  onRemoveSavedStory,
  onUnfollowJournalist,
}: SavedOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between md:max-w-4xl md:mx-auto">
            <h1 className="text-2xl font-bold text-gray-900">Saved</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex space-x-8 mt-4 md:max-w-4xl md:mx-auto">
            <button
              onClick={() => onTabChange("articles")}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                savedTab === "articles"
                  ? "border-[#004FFF] text-[#004FFF]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Saved Articles
            </button>
            <button
              onClick={() => onTabChange("journalists")}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                savedTab === "journalists"
                  ? "border-[#004FFF] text-[#004FFF]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Journalists You Follow
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {savedTab === "articles" ? (
            <>
              {savedStories.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search saved articles..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004FFF] focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {filteredSavedStories.length === 0 ? (
                <div className="text-center py-16">
                  <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {savedStories.length === 0
                      ? "No saved stories yet"
                      : "No articles match your search"}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {savedStories.length === 0
                      ? "Stories you save will appear here for easy access later."
                      : "Try adjusting your search terms to find what you&apos;re looking for."}
                  </p>
                  <Button onClick={onClose}>
                    Continue Reading
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                      {filteredSavedStories.length}{" "}
                      {filteredSavedStories.length === 1 ? "story" : "stories"}
                      {searchQuery && " found"}
                    </p>
                  </div>

                  <div className="grid gap-6">
                    {filteredSavedStories.map((story) => (
                      <div
                        key={story.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4">
                          <img
                            src={story.image || "/placeholder.svg"}
                            alt=""
                            className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="inline-block px-2 py-1 text-xs font-medium bg-transparent border border-gray-400 text-white rounded">
                                    {story.category}
                                  </span>
                                  <span className="text-sm text-gray-500">
                                    {story.date} • {story.readTime}
                                  </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                  {story.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                                  {story.subtitle}
                                </p>
                                <p className="text-sm text-gray-500">
                                  By {story.author}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveSavedStory(story.id)}
                                className="text-gray-400 hover:text-red-500 p-1"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {followedJournalists.length === 0 ? (
                <div className="text-center py-16">
                  <UserPlus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    No journalists followed yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Follow journalists to stay updated with their latest
                    stories.
                  </p>
                  <Button onClick={onClose}>
                    Continue Reading
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                      Following {followedJournalists.length}{" "}
                      {followedJournalists.length === 1
                        ? "journalist"
                        : "journalists"}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {followedJournalists.map((journalist) => (
                      <div
                        key={journalist.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage
                                src={journalist.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {journalist.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {journalist.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {journalist.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                Followed on {journalist.followedDate}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUnfollowJournalist(journalist.id)}
                            className="text-gray-600 hover:text-red-600"
                          >
                            Unfollow
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}