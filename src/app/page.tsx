"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Plus, Volume2, X, Play, Bookmark } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";

import Footer from "@/components/footer/footer";
import { useSavedStories } from "@/lib/use-saved-stories";
import { useUser } from "@/lib/user-context";
import ArticleContent from "@/components/article/article-content";
import RelatedArticles from "@/components/article/related-articles";
export default function StoryPage() {
  const router = useRouter();
  const { user } = useUser();
  const {
    savedStoriesCount,
    isStorySaved,
    isJournalistFollowed,
    toggleSavedStory,
    toggleFollowedJournalist,
  } = useSavedStories();

  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const currentStoryId = "2"; // Current story ID
  const currentJournalistId = "sarah-mitchell";

  const handleSaveStory = () => {
    toggleSavedStory(currentStoryId);
  };

  const handleSubscribeClick = () => {
    router.push(
      `/subscribe?return=${encodeURIComponent(window.location.pathname)}`,
    );
  };

  const handleFollowJournalist = () => {
    toggleFollowedJournalist(currentJournalistId);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        savedStoriesCount={savedStoriesCount}
        onSavedClick={() => router.push("/profile/saved")}
        onSubscribeClick={handleSubscribeClick}
      />

      <main>
        <article className="space-y-6">
          <div
            className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] p-6"
            style={{ backgroundColor: "#282828" }}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="secondary"
                    className="bg-transparent border border-gray-400 text-white hover:bg-transparent"
                  >
                    GEORGIA NEWS
                  </Badge>
                  <span className="text-sm text-gray-300">
                    December 19, 2024 • 6 min read
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-white leading-tight">
                  Atlanta City Council Approves Major Infrastructure Investment
                  for Downtown Revitalization
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  The $2.3 billion plan will transform transportation, housing,
                  and green spaces across the city center over the next decade.
                </p>
              </div>

              <div className="space-y-3 mt-6">
                <img
                  src="/placeholder-tsr1e.png"
                  alt="Atlanta downtown construction and development"
                  className="w-full h-96 object-cover rounded-lg"
                />
                <p className="text-sm text-gray-400 italic">
                  Construction cranes dot the Atlanta skyline as the city
                  prepares for major infrastructure improvements. (AJC file
                  photo)
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-f78sg.png" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <h3 className="font-semibold text-gray-900">
                    Sarah Mitchell
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-3 text-xs bg-transparent rounded-full"
                    onClick={handleFollowJournalist}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {isJournalistFollowed(currentJournalistId)
                      ? "Following"
                      : "Follow"}
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  City Hall Reporter • Published 2 hours ago • Updated 1 hour
                  ago
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
              {user.subscription.isActive && (
                <Button
                  variant={isStorySaved(currentStoryId) ? "default" : "outline"}
                  size="sm"
                  onClick={handleSaveStory}
                  className={
                    isStorySaved(currentStoryId)
                      ? "bg-[#004FFF] hover:bg-[#003ACC] text-white"
                      : ""
                  }
                >
                  <Bookmark
                    className={`h-4 w-4 mr-2 ${isStorySaved(currentStoryId) ? "fill-current" : ""}`}
                  />
                  {isStorySaved(currentStoryId) ? "Saved" : "Save"}
                </Button>
              )}
              <Button
                className="rounded-full bg-transparent"
                variant="outline"
                size="sm"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              {!showAudioPlayer ? (
                <Button
                  className="rounded-full bg-transparent"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAudioPlayer(true)}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Listen
                </Button>
              ) : (
                <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2 border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full"
                    onClick={() => setShowAudioPlayer(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full bg-[#004FFF] hover:bg-[#003ACC] text-white"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">0:00</span>
                    <div className="w-32 h-1 bg-gray-200 rounded-full">
                      <div className="w-0 h-1 bg-[#004FFF] rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">3:45</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <ArticleContent />
            <RelatedArticles />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
