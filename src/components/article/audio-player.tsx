"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Play, Volume2, X } from "lucide-react";

export default function AudioPlayer() {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  return (
    <>
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
    </>
  );
}
