'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, User, Heart } from 'lucide-react';
import { useAudio } from '@/components/player/AudioContext';

interface TopNavProps {
  guestName?: string;
  onOpenGateModal?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ guestName, onOpenGateModal }) => {
  const { isLiked } = useAudio();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 bg-[#101010]/95 backdrop-blur-md border-b border-[#222222]">
      {/* Left: Back/Forward Navigation Placeholder Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.history.length > 1) {
              window.history.back();
            }
          }}
          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          title="Go back"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.history.forward();
            }
          }}
          className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors opacity-60 hover:opacity-100"
          title="Go forward"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Verified Artist Title in Header */}
        <div className="hidden sm:flex items-center gap-2 ml-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <span>Alif &amp; Widi Wedding</span>
            <CheckCircle2 className="w-3.5 h-3.5 fill-[#3b82f6] text-black" />
          </div>
        </div>
      </div>

      {/* Right: Guest profile pill / gate trigger */}
      <div className="flex items-center gap-3">
        {isLiked && (
          <div className="hidden sm:flex items-center gap-1 text-xs text-spotify-green bg-spotify-green/10 px-2.5 py-1 rounded-full border border-spotify-green/20">
            <Heart className="w-3.5 h-3.5 fill-spotify-green text-spotify-green" />
            <span>Liked</span>
          </div>
        )}

        <button
          onClick={onOpenGateModal}
          className="flex items-center gap-2 bg-[#282828] hover:bg-[#333333] border border-white/10 rounded-full px-3 py-1.5 transition-all text-xs font-semibold text-white cursor-pointer"
          title="Buka Undangan Pribadi"
        >
          <div className="w-5 h-5 rounded-full bg-spotify-green text-black flex items-center justify-center font-bold text-[10px]">
            {guestName ? guestName.charAt(0).toUpperCase() : <User className="w-3 h-3" />}
          </div>
          <span className="max-w-[120px] sm:max-w-[160px] truncate">
            {guestName || 'Undangan Tamu'}
          </span>
        </button>
      </div>
    </header>
  );
};
