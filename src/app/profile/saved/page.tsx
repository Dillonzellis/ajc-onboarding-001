"use client";

import { useState } from "react";
import { Search, Bookmark, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/header";
import { useSavedStories } from "@/lib/use-saved-stories";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function SavedPage() {
  const router = useRouter();
  const {
    savedStories,
    followedJournalists,
    savedStoriesCount,
    removeSavedStory,
    removeFollowedJournalist,
  } = useSavedStories();
  const [activeTab, setActiveTab] = useState<"articles" | "journalists">(
    "articles",
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSavedStories = savedStories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
      <Header
        savedStoriesCount={savedStoriesCount}
        onSavedClick={() => router.push("/profile/saved")}
        onSubscribeClick={() => router.push("/subscribe")}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Saved</h1>
        </div>

        <div className="flex space-x-8 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("articles")}
            className={`pb-4 text-sm font-medium cursor-pointer border-b-2 transition-colors ${
              activeTab === "articles"
                ? "border-[#004FFF] text-[#004FFF]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Saved Articles ({savedStories.length})
          </button>
          <button
            onClick={() => setActiveTab("journalists")}
            className={`pb-4 text-sm font-medium cursor-pointer border-b-2 transition-colors ${
              activeTab === "journalists"
                ? "border-[#004FFF] text-[#004FFF]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Followed Journalists ({followedJournalists.length})
          </button>
        </div>

        {activeTab === "articles" ? (
          <>
            {savedStories.length > 0 && (
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search saved articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                    : "Try adjusting your search terms to find what you're looking for."}
                </p>
                <Button
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                >
                  Continue Reading
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSavedStories.map((story) => (
                  <div
                    key={story.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={story.image}
                        alt=""
                        className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                                {story.category}
                              </span>
                              <span className="text-sm text-gray-500">
                                {story.date} • {story.readTime}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-[#004FFF]">
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
                            variant="outline"
                            size="sm"
                            onClick={() => removeSavedStory(story.id)}
                            className="text-red-600 cursor-pointer hover:text-red-700 hover:border-red-300"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                  Follow journalists to stay updated with their latest stories.
                </p>
                <Button onClick={() => router.push("/")}>
                  Continue Reading
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {followedJournalists.map((journalist) => (
                  <div
                    key={journalist.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={journalist.avatar} />
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
                        onClick={() => removeFollowedJournalist(journalist.id)}
                        className="text-red-600 hover:text-red-700 cursor-pointer hover:border-red-300"
                      >
                        Unfollow
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

