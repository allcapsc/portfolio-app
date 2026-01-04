"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PlayIcon,
  PauseIcon,
} from "lucide-react";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex-1">
      <div className="border-border shadow-shadow text-main-foreground rounded-base bg-main border-2 p-5 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg sm:text-xl">The Aux Cord</h2>
            <Badge variant="destructive" className="text-xs px-2 py-0.5 h-5">LIVE</Badge>
          </div>
          <p className="font-base mt-1.5 text-sm opacity-90">A taste of my music collection</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handlePlayPause}
          className="hover:scale-110 transition-transform ml-2"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </Button>
        <audio
          ref={audioRef}
          src="https://radio.onekeyclick.com/listen/taste/radio.mp3"
        />
      </div>
    </div>
  );
}

export default AudioPlayer