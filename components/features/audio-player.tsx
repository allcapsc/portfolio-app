"use client";

import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  PlayIcon,
  PauseIcon,
  ExternalLinkIcon,
} from "lucide-react";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const popupRef = useRef<Window | null>(null);

  useEffect(() => {
    // Listen for messages from popup window
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'STATE_UPDATE') {
        setIsPlaying(event.data.isPlaying);
        // Stop local audio when popup is playing
        if (event.data.isPlaying && audioRef.current) {
          audioRef.current.pause();
        }
      } else if (event.data.type === 'POPUP_READY') {
        setIsPlaying(event.data.isPlaying);
        // Stop local audio when popup opens
        if (audioRef.current) {
          audioRef.current.pause();
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Check if popup is still open periodically
    const interval = setInterval(() => {
      if (popupRef.current && popupRef.current.closed) {
        popupRef.current = null;
        setIsPopupOpen(false);
        setIsPlaying(false);
      }
    }, 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, []);

  const handlePlayPause = () => {
    if (popupRef.current && !popupRef.current.closed) {
      // If popup is open, send command to it
      popupRef.current.postMessage({ type: 'PLAY_PAUSE' }, '*');
    } else {
      // Play locally on the page
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    }
  };

  const openPopup = () => {
    // Close existing popup if open
    if (popupRef.current && !popupRef.current.closed) {
      popupRef.current.focus();
      return;
    }

    // Pause local audio before opening popup
    const wasPlaying = isPlaying;
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Create popup window with specific dimensions
    const width = 400;
    const height = 200;
    const left = window.screenX + window.outerWidth - width - 50;
    const top = window.screenY + window.outerHeight - height - 100;

    const popup = window.open(
      '/audio-player-popup',
      'audioPlayerPopup',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,status=no`
    );

    if (popup) {
      popupRef.current = popup;
      setIsPopupOpen(true);
      
      // Transfer playback state to popup
      setTimeout(() => {
        if (wasPlaying) {
          popup.postMessage({ type: 'PLAY_PAUSE' }, '*');
        }
      }, 500);
    }
  };

  return (
    <>
      {!isPopupOpen && (
        <div className="w-full">
          <div className="border-border shadow-shadow text-main-foreground rounded-base bg-main border-2 p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg sm:text-xl">The Aux Cord</h2>
                <Badge variant="destructive" className="text-xs px-1.5 py-0.5 h-5">LIVE</Badge>
              </div>
              <p className="font-base mt-1 text-sm sm:text-base">A taste of my music collection</p>
            </div>
            <div className="flex items-center gap-2">
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
              <button 
                onClick={openPopup}
                className="hidden md:flex border-border shadow-shadow rounded-base border-2 p-2 bg-background text-foreground hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:scale-95 cursor-pointer"
                aria-label="Open popup player"
              >
                <ExternalLinkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Audio element for local playback */}
      {!isPopupOpen && (
        <audio
          ref={audioRef}
          src="https://radio.onekeyclick.com/listen/taste/radio.mp3"
          preload="none"
        />
      )}
    </>
  );
}

export default AudioPlayer