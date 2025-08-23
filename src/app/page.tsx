"use client";

import { Button } from "@/components/ui/button";
import { Share2, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useSavedStories } from "@/lib/use-saved-stories";
import { useUser } from "@/lib/user-context";
import ArticleContent from "@/components/article/article-content";
import RelatedArticles from "@/components/article/related-articles";
import LeadArticle from "@/components/article/lead-article";
import AudioPlayer from "@/components/article/audio-player";
import AuthorWrapper from "@/components/article/author-wrapper";

export default function StoryPage() {
  const router = useRouter();
  const { user } = useUser();
  const { savedStoriesCount, isStorySaved, toggleSavedStory } =
    useSavedStories();

  const currentStoryId = "2";

  const handleSaveStory = () => {
    toggleSavedStory(currentStoryId);
  };

  const handleSubscribeClick = () => {
    router.push(
      `/subscribe?return=${encodeURIComponent(window.location.pathname)}`,
    );
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
          <LeadArticle />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <AuthorWrapper />
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
              <AudioPlayer />
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
