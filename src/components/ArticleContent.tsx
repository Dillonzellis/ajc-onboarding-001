"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Plus, Volume2, Bookmark } from "lucide-react";

interface ArticleContentProps {
  isSubscribed: boolean;
  isCurrentStorySaved: boolean;
  isFollowingJournalist: boolean;
  onSaveStory: () => void;
  onFollowJournalist: () => void;
}

export function ArticleContent({
  isSubscribed,
  isCurrentStorySaved,
  isFollowingJournalist,
  onSaveStory,
  onFollowJournalist,
}: ArticleContentProps) {
  return (
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
                Construction cranes dot the Atlanta skyline as the city prepares
                for major infrastructure improvements. (AJC file photo)
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
                <h3 className="font-semibold text-gray-900">Sarah Mitchell</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-3 text-xs bg-transparent"
                  onClick={onFollowJournalist}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {isFollowingJournalist ? "Following" : "Follow"}
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                City Hall Reporter • Published 2 hours ago • Updated 1 hour ago
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
            {isSubscribed && (
              <Button
                variant={isCurrentStorySaved ? "default" : "outline"}
                size="sm"
                onClick={onSaveStory}
                className={
                  isCurrentStorySaved
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : ""
                }
              >
                <Bookmark
                  className={`h-4 w-4 mr-2 ${isCurrentStorySaved ? "fill-current" : ""}`}
                />
                {isCurrentStorySaved ? "Saved" : "Save"}
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4 mr-2" />
              Listen
            </Button>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-800 leading-relaxed">
              In a unanimous vote Tuesday evening, the Atlanta City Council
              approved a comprehensive $2.3 billion infrastructure package that
              promises to reshape downtown Atlanta over the next decade. The
              ambitious plan addresses long-standing concerns about
              transportation, affordable housing, and green space accessibility
              in the city&apos;s core.
            </p>

            <p className="text-gray-800 leading-relaxed">
              &quot;This is a transformative moment for our city,&quot; said Council
              President Doug Shipman during the meeting. &quot;We&apos;re not just fixing
              what&apos;s broken – we&apos;re building the foundation for Atlanta&apos;s next
              chapter of growth and prosperity.&quot;
            </p>

            <p className="text-gray-800 leading-relaxed">
              The package includes $800 million for transit improvements,
              including expanded MARTA connectivity and dedicated bus rapid
              transit lanes. Another $600 million will fund affordable housing
              initiatives, with a goal of creating 5,000 new units within
              walking distance of major employment centers.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 my-8">
              <h3 className="font-semibold text-gray-900 mb-2">
                Key Investment Areas:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• $800M for transit and transportation improvements</li>
                <li>• $600M for affordable housing development</li>
                <li>• $500M for green infrastructure and parks</li>
                <li>• $400M for utility modernization and broadband expansion</li>
              </ul>
            </div>

            <p className="text-gray-800 leading-relaxed">
              Environmental sustainability features prominently in the plan,
              with $500 million allocated for green infrastructure projects.
              This includes the creation of three new downtown parks, expanded
              tree canopy coverage, and implementation of sustainable stormwater
              management systems.
            </p>

            <p className="text-gray-800 leading-relaxed">
              The remaining $400 million will modernize the city&apos;s utility
              infrastructure and expand high-speed broadband access to
              underserved neighborhoods, addressing digital equity concerns that
              became more apparent during the pandemic.
            </p>

            <p className="text-gray-800 leading-relaxed">
              Funding for the initiative will come from a combination of federal
              infrastructure grants, municipal bonds, and public-private
              partnerships. City officials expect construction to begin in early
              2025, with the first phase of projects completed by 2027.
            </p>
          </div>

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
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                  MARTA Expansion Plans Could Connect More Atlanta Neighborhoods
                </h3>
                <p className="text-sm text-gray-500">3 hours ago</p>
              </div>
              <div className="space-y-3">
                <img
                  src="/atlanta-affordable-housing.png"
                  alt="Housing development"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
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
  );
}