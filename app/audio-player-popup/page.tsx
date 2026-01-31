"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { PlayIcon, PauseIcon } from "lucide-react";

export default function AudioPlayerPopup() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Listen for state updates from main window
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'STATE_UPDATE') {
        setIsPlaying(event.data.isPlaying);
      }
    };

    window.addEventListener('message', handleMessage);

    // Request initial state from parent window
    if (window.opener) {
      window.opener.postMessage({ type: 'REQUEST_STATE' }, '*');
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handlePlayPause = () => {
    // Send play/pause command to main window
    if (window.opener) {
      window.opener.postMessage({ type: 'PLAY_PAUSE' }, '*');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg">
        <div className="border-border shadow-shadow text-main-foreground rounded-base bg-main border-2 p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-lg sm:text-xl">The Aux Cord</h2>
              <Badge variant="destructive" className="text-xs px-1.5 py-0.5 h-5">LIVE</Badge>
            </div>
            <p className="font-base mt-1 text-sm sm:text-base">A taste of my music collection</p>
          </div>
          <button 
            onClick={handlePlayPause}
            className="border-border shadow-shadow rounded-base border-2 p-2 bg-background text-foreground hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:scale-95 cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
