"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { useSavedStories } from "@/lib/use-saved-stories";

export default function AuthorWrapper() {
  const { isJournalistFollowed, toggleFollowedJournalist } = useSavedStories();

  const currentJournalistId = "sarah-mitchell";

  const handleFollowJournalist = () => {
    toggleFollowedJournalist(currentJournalistId);
  };

  return (
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
            className="h-7 px-3 cursor-pointer text-xs bg-transparent rounded-full"
            onClick={handleFollowJournalist}
          >
            <Plus className="h-3 w-3 mr-1" />
            {isJournalistFollowed(currentJournalistId) ? "Following" : "Follow"}
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          City Hall Reporter • Published 2 hours ago • Updated 1 hour ago
        </div>
      </div>
    </div>
  );
}
