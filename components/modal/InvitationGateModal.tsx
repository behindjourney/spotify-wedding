'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Sparkles, Music2, Heart, Disc3 } from 'lucide-react';
import { useAudio } from '@/components/player/AudioContext';

interface InvitationGateModalProps {
  isOpen: boolean;
  guestName: string;
  customGreeting?: string;
  onOpenInvitation: () => void;
}

export const InvitationGateModal: React.FC<InvitationGateModalProps> = ({
  isOpen,
  guestName,
  customGreeting,
  onOpenInvitation,
}) => {
  const { startSession } = useAudio();

  if (!isOpen) return null;

  const handleStart = async () => {
    await startSession();
    onOpenInvitation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#241f18] via-spotify-dark to-spotify-black border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-center flex flex-col items-center">
        {/* Glow behind cover */}
        <div className="absolute -top-10 w-48 h-48 bg-spotify-green/15 rounded-full blur-3xl pointer-events-none" />

        {/* Mini Spotify Logo Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-spotify-green flex items-center justify-center text-black">
            <Disc3 className="w-4 h-4 animate-spin-slow" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-white/80">
            Spotify Session • The Wedding
          </span>
        </div>

        {/* Album Cover with Vinyl Effect */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl mb-6 border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80"
            alt="Alif & Widi Wedding"
            width={210}
            height={210}
            className="w-full h-full object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-3">
            <span className="text-[11px] text-white/90 font-medium bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
              <Music2 className="w-3 h-3 text-spotify-green" />
              Hero Track: Kusuma Wijaya
            </span>
          </div>
        </div>

        {/* Guest Dedication */}
        <div className="mb-2">
          <p className="text-xs uppercase tracking-widest text-spotify-green font-bold flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Special Invitation For
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 capitalize">
            {guestName || 'Tamu Terhormat'}
          </h2>
        </div>

        {/* Custom greeting note */}
        <p className="text-xs text-spotify-text-subdued leading-relaxed max-w-xs mb-6">
          {customGreeting ||
            'Tanpa mengurangi rasa hormat, kami mengundang Anda untuk merayakan babak baru cinta kami.'}
        </p>

        {/* Big Spotify Green Button: "Play Invitation" */}
        <button
          onClick={handleStart}
          className="w-full py-4 px-6 rounded-full bg-spotify-green hover:bg-spotify-green-hover text-black font-extrabold text-base flex items-center justify-center gap-3 shadow-[0_10px_25px_rgba(29,185,84,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-black text-spotify-green flex items-center justify-center shadow">
            <Play className="w-4 h-4 fill-spotify-green translate-x-0.5" />
          </div>
          <span>Play Invitation</span>
        </button>

        {/* Footer notes */}
        <p className="text-[11px] text-spotify-text-subdued/80 mt-4 flex items-center gap-1.5">
          <Heart className="w-3 h-3 text-spotify-green fill-spotify-green" />
          Naufal Alif Nurfaizi &amp; Tri Widiyanti • 30 Des 2026
        </p>
      </div>
    </div>
  );
};
