"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Plus, Volume2, X, Bookmark, Play } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header/header";
import SavedOverlay from "@/components/saved-overlay/saved-overlay";
import Footer from "@/components/footer/footer";
export default function StoryPage() {
  const router = useRouter();
  const [showSavedOverlay, setShowSavedOverlay] = useState(false);
  const [savedStories, setSavedStories] = useState<
    Array<{
      id: string;
      title: string;
      subtitle: string;
      author: string;
      date: string;
      readTime: string;
      category: string;
      image: string;
    }>
  >([]);
  const [savedTab, setSavedTab] = useState<"articles" | "journalists">(
    "articles",
  );
  const [followedJournalists, setFollowedJournalists] = useState<
    Array<{
      id: string;
      name: string;
      title: string;
      avatar: string;
      followedDate: string;
    }>
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCurrentStorySaved, setIsCurrentStorySaved] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const handleSaveStory = () => {
    const currentStory = {
      id: "1",
      title:
        "MARTA Expansion Project Faces New Challenges as Community Voices Concerns Over Affordable Housing Impact",
      subtitle:
        "Local residents and advocacy groups raise questions about displacement and gentrification as transit development moves forward",
      author: "Sarah Mitchell",
      date: "December 15, 2024",
      readTime: "6 min read",
      category: "Georgia News",
      image: "/marta-station-atlanta.png",
    };

    if (isCurrentStorySaved) {
      // Remove from saved stories
      setSavedStories((prev) =>
        prev.filter((story) => story.id !== currentStory.id),
      );
      setIsCurrentStorySaved(false);
    } else {
      // Add to saved stories if not already saved
      if (!savedStories.find((story) => story.id === currentStory.id)) {
        setSavedStories((prev) => [currentStory, ...prev]);
      }
      setIsCurrentStorySaved(true);
    }
  };

  const handleSubscribeClick = () => {
    // Navigate to subscription page with return URL
    router.push(
      `/subscribe?return=${encodeURIComponent(window.location.pathname)}`,
    );
  };

  const handleRemoveSavedStory = (storyId: string) => {
    setSavedStories((prev) => prev.filter((story) => story.id !== storyId));
    if (storyId === "1") {
      setIsCurrentStorySaved(false);
    }
  };

  const handleFollowJournalist = () => {
    const journalist = {
      id: "sarah-mitchell",
      name: "Sarah Mitchell",
      title: "City Hall Reporter",
      avatar: "/placeholder-f78sg.png",
      followedDate: new Date().toLocaleDateString(),
    };

    const isAlreadyFollowed = followedJournalists.some(
      (j) => j.id === journalist.id,
    );
    if (!isAlreadyFollowed) {
      setFollowedJournalists((prev) => [...prev, journalist]);
    }
  };

  const handleUnfollowJournalist = (journalistId: string) => {
    setFollowedJournalists((prev) => prev.filter((j) => j.id !== journalistId));
  };

  const filteredSavedStories = savedStories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white">
      <Header
        savedStoriesCount={savedStories.length}
        onSavedClick={() => setShowSavedOverlay(true)}
        onSubscribeClick={handleSubscribeClick}
      />

      {showSavedOverlay && (
        <SavedOverlay
          isOpen={showSavedOverlay}
          onClose={() => setShowSavedOverlay(false)}
          savedTab={savedTab}
          onTabChange={setSavedTab}
          savedStories={savedStories}
          filteredSavedStories={filteredSavedStories}
          followedJournalists={followedJournalists}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onRemoveSavedStory={handleRemoveSavedStory}
          onUnfollowJournalist={handleUnfollowJournalist}
        />
      )}

      {/* Main Content */}
      <main>
        {/* Article Header */}
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

              {/* Featured Image */}
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
                    {followedJournalists.some((j) => j.id === "sarah-mitchell")
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
              {/* {isSubscribed && ( */}
              {/*   <Button */}
              {/*     variant={isCurrentStorySaved ? "default" : "outline"} */}
              {/*     size="sm" */}
              {/*     onClick={handleSaveStory} */}
              {/*     className={ */}
              {/*       isCurrentStorySaved */}
              {/*         ? "bg-[#004FFF] hover:bg-[#003ACC] text-white" */}
              {/*         : "" */}
              {/*     } */}
              {/*   > */}
              {/*     <Bookmark */}
              {/*       className={`h-4 w-4 mr-2 ${isCurrentStorySaved ? "fill-current" : ""}`} */}
              {/*     /> */}
              {/*     {isCurrentStorySaved ? "Saved" : "Save"} */}
              {/*   </Button> */}
              {/* )} */}
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

            {/* Article Content */}
            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-gray-800 leading-relaxed">
                In a unanimous vote Tuesday evening, the Atlanta City Council
                approved a comprehensive $2.3 billion infrastructure package
                that promises to reshape downtown Atlanta over the next decade.
                The ambitious plan addresses long-standing concerns about
                transportation, affordable housing, and green space
                accessibility in the city&apos;s core.
              </p>

              <p className="text-gray-800 leading-relaxed">
                &quot;This is a transformative moment for our city,&quot; said
                Council President Doug Shipman during the meeting.
                &quot;We&apos;re not just fixing what&apos;s broken – we&apos;re
                building the foundation for Atlanta&apos;s next chapter of
                growth and prosperity.&quot;
              </p>

              <p className="text-gray-800 leading-relaxed">
                The package includes $800 million for transit improvements,
                including expanded MARTA connectivity and dedicated bus rapid
                transit lanes. Another $600 million will fund affordable housing
                initiatives, with a goal of creating 5,000 new units within
                walking distance of major employment centers.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#004FFF] my-8">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Key Investment Areas:
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• $800M for transit and transportation improvements</li>
                  <li>• $600M for affordable housing development</li>
                  <li>• $500M for green infrastructure and parks</li>
                  <li>
                    • $400M for utility modernization and broadband expansion
                  </li>
                </ul>
              </div>

              <p className="text-gray-800 leading-relaxed">
                Environmental sustainability features prominently in the plan,
                with $500 million allocated for green infrastructure projects.
                This includes the creation of three new downtown parks, expanded
                tree canopy coverage, and implementation of sustainable
                stormwater management systems.
              </p>

              <p className="text-gray-800 leading-relaxed">
                The remaining $400 million will modernize the city&apos;s
                utility infrastructure and expand high-speed broadband access to
                underserved neighborhoods, addressing digital equity concerns
                that became more apparent during the pandemic.
              </p>

              <p className="text-gray-800 leading-relaxed">
                Funding for the initiative will come from a combination of
                federal infrastructure grants, municipal bonds, and
                public-private partnerships. City officials expect construction
                to begin in early 2025, with the first phase of projects
                completed by 2027.
              </p>
            </div>

            {/* Related Articles */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Related Stories
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <img
                    src="/marta-station-atlanta.png"
                    alt="MARTA station"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold text-gray-900 hover:text-[#004FFF] cursor-pointer">
                    MARTA Expansion Plans Could Connect More Atlanta
                    Neighborhoods
                  </h3>
                  <p className="text-sm text-gray-500">3 hours ago</p>
                </div>
                <div className="space-y-3">
                  <img
                    src="/atlanta-affordable-housing.png"
                    alt="Housing development"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h3 className="font-semibold text-gray-900 hover:text-[#004FFF] cursor-pointer">
                    Housing Crisis: Atlanta Tackles Affordability with New
                    Initiatives
                  </h3>
                  <p className="text-sm text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
